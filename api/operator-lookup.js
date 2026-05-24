/**
 * BRICK A.2.4: Operator Lookup Endpoint
 * 
 * Purpose:
 * - Enable deterministic booking lookup from operator/support queries
 * - Transform implicit assumptions into explicit, queryable API
 * - Reduce support lookup time from ~2 min to ~10 sec per query
 * 
 * Endpoint: POST /api/operator-lookup
 * 
 * Request body:
 * {
 *   "refNumber": "KMP-...",          // HIGHEST priority
 *   "sourceSessionId": "...",        // SECONDARY
 *   "customerPhone": "...",          // TERTIARY
 *   "includeSessionState": false,    // Optional: fetch from session store
 * }
 * 
 * Response:
 * {
 *   "found": true,
 *   "booking": { ...normalized continuity chain... },
 *   "dbRecord": { ...raw DB record... },
 *   "sessionState": { ...if requested... },
 *   "lookupMethod": "refNumber|sourceSessionId|customerPhone",
 *   "timestamp": "...",
 *   "riskAssessment": { ...continuity risks... }
 * }
 * 
 * Design:
 * - Query cascade: refNumber (UNIQUE) → sourceSessionId (indexed) → customerPhone (indexed)
 * - No breaking changes; endpoints are pure additions
 * - Feature-flagged for safe rollout
 */

import { db } from './lib/db.js';
import { getSession } from './chat-session-store.js';
import {
  extractContinuityChain,
  buildOperatorLookupIdentity,
  validateContinuityIntegrity,
  normalizeContinuityForOperator,
  exportContinuitySnapshot,
} from './chat-continuity-chain.js';

/**
 * Query database by refNumber (HIGHEST priority - UNIQUE constraint).
 */
async function queryByRefNumber(refNumber) {
  if (!refNumber) return null;
  try {
    const record = await db.query(
      'SELECT * FROM bookings WHERE ref_number = $1',
      [refNumber]
    );
    return record?.rows?.[0] || null;
  } catch (err) {
    console.error('[OperatorLookup] DB query by refNumber failed:', err.message);
    return null;
  }
}

/**
 * Query database by sourceSessionId (SECONDARY - indexed).
 */
async function queryBySourceSessionId(sourceSessionId) {
  if (!sourceSessionId) return null;
  try {
    const record = await db.query(
      'SELECT * FROM bookings WHERE source_session_id = $1 LIMIT 1',
      [sourceSessionId]
    );
    return record?.rows?.[0] || null;
  } catch (err) {
    console.error('[OperatorLookup] DB query by sourceSessionId failed:', err.message);
    return null;
  }
}

/**
 * Query database by customerPhone (TERTIARY - indexed, may match multiple).
 */
async function queryByCustomerPhone(customerPhone) {
  if (!customerPhone) return null;
  try {
    // Normalize phone: remove all non-digits, take last 10-11 digits
    const normalizedPhone = customerPhone.replace(/\D/g, '').slice(-11);
    
    const records = await db.query(
      `SELECT * FROM bookings 
       WHERE client_phone LIKE $1 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [`%${normalizedPhone}%`]
    );
    return records?.rows?.[0] || null;
  } catch (err) {
    console.error('[OperatorLookup] DB query by customerPhone failed:', err.message);
    return null;
  }
}

/**
 * Execute operator lookup with query cascade.
 * 
 * Tries methods in priority order until finding a match:
 * 1. refNumber (UNIQUE, fastest)
 * 2. sourceSessionId (indexed, reliable)
 * 3. customerPhone (indexed, may match multiple, returns latest)
 */
async function executeOperatorLookup(query) {
  const { refNumber, sourceSessionId, customerPhone } = query;

  let dbRecord = null;
  let lookupMethod = null;

  // Priority 1: refNumber (guaranteed unique)
  if (refNumber) {
    dbRecord = await queryByRefNumber(refNumber);
    if (dbRecord) {
      lookupMethod = 'refNumber';
    }
  }

  // Priority 2: sourceSessionId (if refNumber didn't match)
  if (!dbRecord && sourceSessionId) {
    dbRecord = await queryBySourceSessionId(sourceSessionId);
    if (dbRecord) {
      lookupMethod = 'sourceSessionId';
    }
  }

  // Priority 3: customerPhone (if previous didn't match)
  if (!dbRecord && customerPhone) {
    dbRecord = await queryByCustomerPhone(customerPhone);
    if (dbRecord) {
      lookupMethod = 'customerPhone';
    }
  }

  return { dbRecord, lookupMethod };
}

/**
 * Fetch session state if requested (optional, for debugging).
 */
async function fetchSessionStateIfRequested(query, includeSessionState) {
  if (!includeSessionState || !query.sourceSessionId) {
    return null;
  }

  try {
    const session = await getSession(query.sourceSessionId);
    return session || null;
  } catch (err) {
    console.error('[OperatorLookup] Session fetch failed:', err.message);
    return null;
  }
}

/**
 * Format operator lookup response.
 */
function formatOperatorLookupResponse(dbRecord, lookupMethod, sessionState, query) {
  if (!dbRecord) {
    return {
      found: false,
      booking: null,
      dbRecord: null,
      sessionState: null,
      lookupMethod: null,
      timestamp: new Date().toISOString(),
      message: 'No booking found matching provided identifiers',
      queryAttempted: {
        refNumber: !!query.refNumber,
        sourceSessionId: !!query.sourceSessionId,
        customerPhone: !!query.customerPhone,
      },
    };
  }

  // Transform DB record into normalizedContinuityChain
  const sessionBooking = {
    refNumber: dbRecord.ref_number,
    sourceSessionId: dbRecord.source_session_id,
    customerName: dbRecord.client_name,
    customerPhone: dbRecord.client_phone,
    service: dbRecord.booking_info?.service,
    scope: dbRecord.booking_info?.scope,
    location: dbRecord.location,
    date: dbRecord.date,
    bookingPhase: dbRecord.booking_info?.booking_phase,
    status: dbRecord.booking_info?.status,
  };

  const continuityChain = extractContinuityChain(sessionBooking, dbRecord);
  const normalizedBooking = normalizeContinuityForOperator(sessionBooking, dbRecord);
  const riskAssessment = validateContinuityIntegrity(continuityChain);

  return {
    found: true,
    booking: normalizedBooking.operatorDisplay,
    lookupIdentity: normalizedBooking.lookupIdentity,
    dbRecord: {
      ref_number: dbRecord.ref_number,
      source_session_id: dbRecord.source_session_id,
      client_name: dbRecord.client_name,
      client_phone: dbRecord.client_phone,
      booking_info: dbRecord.booking_info,
      location: dbRecord.location,
      date: dbRecord.date,
      created_at: dbRecord.created_at,
    },
    sessionState: sessionState ? { available: true } : { available: false },
    lookupMethod,
    timestamp: new Date().toISOString(),
    riskAssessment: {
      valid: riskAssessment.valid,
      risks: riskAssessment.risks,
      severity: riskAssessment.severity,
    },
    continuityMonitoring: exportContinuitySnapshot(continuityChain, 'operator-lookup'),
  };
}

/**
 * Express route handler for operator lookup.
 * 
 * POST /api/operator-lookup
 * 
 * Usage:
 * - Support agent knows refNumber: lookup by refNumber
 * - Support agent has sessionId from logs: lookup by sourceSessionId
 * - Support agent only has customer phone: lookup by phone (latest booking)
 */
export async function handleOperatorLookup(req, res) {
  try {
    const { refNumber, sourceSessionId, customerPhone, includeSessionState } = req.body;

    // Validation: at least one identifier required
    if (!refNumber && !sourceSessionId && !customerPhone) {
      return res.status(400).json({
        error: 'At least one identifier required: refNumber, sourceSessionId, or customerPhone',
      });
    }

    // Verify operator authorization (placeholder - implement RBAC)
    // if (!isAuthorizedOperator(req.user)) {
    //   return res.status(403).json({ error: 'Unauthorized' });
    // }

    // Execute lookup with cascade
    const { dbRecord, lookupMethod } = await executeOperatorLookup({
      refNumber,
      sourceSessionId,
      customerPhone,
    });

    // Fetch session state if requested
    const sessionState = await fetchSessionStateIfRequested(
      { sourceSessionId },
      includeSessionState
    );

    // Format response
    const response = formatOperatorLookupResponse(
      dbRecord,
      lookupMethod,
      sessionState,
      { refNumber, sourceSessionId, customerPhone }
    );

    // Log lookup event (audit trail for compliance)
    console.log('[OperatorLookup] Event:', {
      found: response.found,
      method: lookupMethod,
      timestamp: response.timestamp,
      riskSeverity: response.riskAssessment?.severity,
    });

    return res.status(200).json(response);
  } catch (err) {
    console.error('[OperatorLookup] Error:', err.message);
    return res.status(500).json({
      error: 'Internal server error during operator lookup',
      message: err.message,
    });
  }
}

/**
 * Express middleware to mount operator lookup route.
 * 
 * Usage in server.js:
 * 
 * import { handleOperatorLookup } from './api/operator-lookup.js';
 * 
 * app.post('/api/operator-lookup', handleOperatorLookup);
 * 
 * Or with feature flag:
 * 
 * app.post('/api/operator-lookup', (req, res) => {
 *   if (!featureFlags.operatorLookupEnabled) {
 *     return res.status(404).json({ error: 'Not found' });
 *   }
 *   return handleOperatorLookup(req, res);
 * });
 */
export default handleOperatorLookup;
