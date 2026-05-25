/**
 * BRICK A.2.7: Continuity Validation Endpoint
 * 
 * Purpose:
 * - Validate continuity chain integrity across surfaces
 * - Detect breaks in booking identity propagation
 * - Support operator troubleshooting and monitoring
 * 
 * Endpoint: POST /api/validate-continuity
 * 
 * Request body:
 * {
 *   "refNumber": "KMP-...",
 *   "sourceSessionId": "...",
 *   "customerPhone": "...",
 *   "checkChatSession": false,      // Optional: validate active chat session
 *   "checkWhatsAppHandoff": false,  // Optional: validate WhatsApp readiness
 * }
 * 
 * Response:
 * {
 *   "valid": true,
 *   "validations": {
 *     "bookingExists": true,
 *     "refNumberConsistent": true,
 *     "sessionLinked": true,
 *     "customerIdentityComplete": true,
 *     "bookingPhaseCorrect": true,
 *     "persistenceComplete": true,
 *     "continuityChainValid": true,
 *   },
 *   "riskFlags": [...],
 *   "recommendations": [...]
 * }
 */

import { db } from './lib/db.js';
import { getSession } from './chat-session-store.js';
import {
  extractContinuityChain,
  validateContinuityIntegrity,
  buildOperatorLookupIdentity,
  buildWhatsAppContinuityReference,
} from './chat-continuity-chain.js';

/**
 * Validate that booking exists in database.
 */
async function validateBookingExists(refNumber) {
  if (!refNumber) return { exists: false, reason: 'No refNumber provided' };

  try {
    const record = await db.query(
      'SELECT * FROM bookings WHERE ref_number = $1 LIMIT 1',
      [refNumber]
    );
    if (record?.rows?.length > 0) {
      return { exists: true, record: record.rows[0] };
    }
    return { exists: false, reason: 'Booking not found in database' };
  } catch (err) {
    return { exists: false, reason: `DB query error: ${err.message}` };
  }
}

/**
 * Validate refNumber consistency across persistence layers.
 * 
 * Checks:
 * - refNumber exists (UNIQUE constraint)
 * - refNumber matches database record
 * - sourceSessionId (if provided) maps to same refNumber
 */
async function validateRefNumberConsistency(refNumber, sourceSessionId, dbRecord) {
  if (!refNumber) {
    return { consistent: false, reason: 'No refNumber provided' };
  }

  if (!dbRecord) {
    return { consistent: false, reason: 'Database record not found' };
  }

  if (dbRecord.ref_number !== refNumber) {
    return { consistent: false, reason: 'refNumber mismatch with DB record' };
  }

  // If sourceSessionId provided, verify it maps to same refNumber
  if (sourceSessionId && dbRecord.source_session_id !== sourceSessionId) {
    return {
      consistent: false,
      reason: `sourceSessionId mismatch: provided=${sourceSessionId}, db=${dbRecord.source_session_id}`,
    };
  }

  return { consistent: true, refNumber, dbRefNumber: dbRecord.ref_number };
}

/**
 * Validate session is linked to booking.
 */
async function validateSessionLinked(sourceSessionId, dbRecord) {
  if (!sourceSessionId) {
    return { linked: false, reason: 'No sourceSessionId provided' };
  }

  if (!dbRecord?.source_session_id) {
    return { linked: false, reason: 'Booking has no sourceSessionId' };
  }

  if (dbRecord.source_session_id === sourceSessionId) {
    return { linked: true, sourceSessionId, dbSourceSessionId: dbRecord.source_session_id };
  }

  return {
    linked: false,
    reason: `sourceSessionId mismatch: provided=${sourceSessionId}, db=${dbRecord.source_session_id}`,
  };
}

/**
 * Validate customer identity is complete.
 */
function validateCustomerIdentityComplete(dbRecord) {
  const issues = [];

  if (!dbRecord?.client_name || dbRecord.client_name === 'Unknown') {
    issues.push('Missing or invalid client name');
  }

  if (!dbRecord?.client_phone || dbRecord.client_phone === 'Unknown') {
    issues.push('Missing or invalid client phone');
  }

  if (!dbRecord?.location) {
    issues.push('Missing booking location');
  }

  if (!dbRecord?.date) {
    issues.push('Missing booking date');
  }

  if (issues.length === 0) {
    return { complete: true };
  }

  return { complete: false, issues };
}

/**
 * Validate booking phase is correct (should be 'finalized').
 */
function validateBookingPhaseCorrect(dbRecord) {
  if (!dbRecord?.booking_info?.booking_phase) {
    return {
      correct: false,
      reason: 'No booking phase in database',
      phase: null,
    };
  }

  const phase = dbRecord.booking_info.booking_phase;
  const isFinalized = phase === 'finalized';

  if (!isFinalized) {
    return {
      correct: false,
      reason: `Booking phase is "${phase}", expected "finalized"`,
      phase,
    };
  }

  return { correct: true, phase };
}

/**
 * Validate persistence is complete (all required fields populated).
 */
function validatePersistenceComplete(dbRecord) {
  const requiredFields = {
    ref_number: 'refNumber',
    client_name: 'client name',
    client_phone: 'client phone',
    booking_info: 'booking info',
    location: 'location',
    date: 'date',
  };

  const missing = [];
  for (const [field, label] of Object.entries(requiredFields)) {
    if (!dbRecord?.[field]) {
      missing.push(label);
    }
  }

  if (missing.length === 0) {
    return { complete: true };
  }

  return { complete: false, missing };
}

/**
 * Execute all continuity validations.
 */
async function executeContinuityValidations(refNumber, sourceSessionId, dbRecord) {
  const validations = {
    bookingExists: await validateBookingExists(refNumber),
    refNumberConsistency: validateRefNumberConsistency(refNumber, sourceSessionId, dbRecord),
    sessionLinked: validateSessionLinked(sourceSessionId, dbRecord),
    customerIdentityComplete: validateCustomerIdentityComplete(dbRecord),
    bookingPhaseCorrect: validateBookingPhaseCorrect(dbRecord),
    persistenceComplete: validatePersistenceComplete(dbRecord),
  };

  // Continuity chain is valid if all critical validations pass
  const criticalValidations = [
    validations.bookingExists.exists,
    validations.refNumberConsistency.consistent,
    validations.customerIdentityComplete.complete,
    validations.bookingPhaseCorrect.correct,
    validations.persistenceComplete.complete,
  ];

  return {
    validations,
    continuityChainValid: criticalValidations.every((v) => v),
  };
}

/**
 * Identify risk flags from validation results.
 */
function identifyRiskFlags(validationResults, dbRecord) {
  const risks = [];

  if (!validationResults.validations.bookingExists.exists) {
    risks.push('CRITICAL: Booking does not exist in database');
  }

  if (!validationResults.validations.refNumberConsistency.consistent) {
    risks.push('CRITICAL: refNumber inconsistency across layers');
  }

  if (!validationResults.validations.sessionLinked.linked) {
    risks.push('HIGH: Chat session not linked to booking (may cause session loss)');
  }

  if (!validationResults.validations.customerIdentityComplete.complete) {
    risks.push('MEDIUM: Customer identity incomplete (support lookup may fail)');
  }

  if (!validationResults.validations.bookingPhaseCorrect.correct) {
    risks.push('MEDIUM: Booking phase not finalized (incomplete booking lifecycle)');
  }

  if (!validationResults.validations.persistenceComplete.complete) {
    risks.push('MEDIUM: Persistence incomplete (some fields missing)');
  }

  // Check for stale bookings
  if (dbRecord?.created_at) {
    const createdTime = new Date(dbRecord.created_at).getTime();
    const nowTime = Date.now();
    const ageMs = nowTime - createdTime;
    const ageHours = ageMs / (1000 * 60 * 60);

    if (ageHours > 72) {
      risks.push(`LOW: Booking is ${Math.floor(ageHours)} hours old (may need archival review)`);
    }
  }

  return risks;
}

/**
 * Generate recommendations based on validation results.
 */
function generateRecommendations(validationResults, riskFlags) {
  const recommendations = [];

  if (!validationResults.continuityChainValid) {
    recommendations.push('⚠️ CRITICAL: Do not proceed with customer handoff; continuity chain is broken');
  } else {
    recommendations.push('✅ Continuity chain is valid; proceed with operator handoff');
  }

  if (!validationResults.validations.sessionLinked.linked) {
    recommendations.push('→ Manually verify chat session exists before proceeding');
  }

  if (!validationResults.validations.customerIdentityComplete.complete) {
    recommendations.push('→ Collect missing customer information before handoff');
  }

  if (riskFlags.some((r) => r.includes('CRITICAL'))) {
    recommendations.push('→ Escalate to engineering; do not attempt customer contact');
  }

  return recommendations;
}

/**
 * Express route handler for continuity validation.
 * 
 * POST /api/validate-continuity
 * 
 * Usage:
 * - Support team validates booking before handoff
 * - Monitoring system checks continuity integrity periodically
 * - Engineering troubleshoots continuity breaks
 */
export async function handleValidateContinuity(req, res) {
  try {
    const {
      refNumber,
      sourceSessionId,
      customerPhone,
      checkChatSession = false,
      checkWhatsAppHandoff = false,
    } = req.body;

    // Validation: at least one identifier required
    if (!refNumber && !sourceSessionId && !customerPhone) {
      return res.status(400).json({
        error: 'At least one identifier required: refNumber, sourceSessionId, or customerPhone',
      });
    }

    // Query database for booking record
    let dbRecord = null;
    let lookupMethod = null;

    if (refNumber) {
      const result = await db.query(
        'SELECT * FROM bookings WHERE ref_number = $1 LIMIT 1',
        [refNumber]
      );
      if (result?.rows?.length > 0) {
        dbRecord = result.rows[0];
        lookupMethod = 'refNumber';
      }
    }

    if (!dbRecord && sourceSessionId) {
      const result = await db.query(
        'SELECT * FROM bookings WHERE source_session_id = $1 LIMIT 1',
        [sourceSessionId]
      );
      if (result?.rows?.length > 0) {
        dbRecord = result.rows[0];
        lookupMethod = 'sourceSessionId';
      }
    }

    // Execute continuity validations
    const validationResults = await executeContinuityValidations(
      refNumber,
      sourceSessionId,
      dbRecord
    );

    // Identify risk flags
    const riskFlags = identifyRiskFlags(validationResults, dbRecord);

    // Generate recommendations
    const recommendations = generateRecommendations(validationResults, riskFlags);

    // Optional: Check chat session
    let chatSessionStatus = null;
    if (checkChatSession && sourceSessionId) {
      try {
        const session = await getSession(sourceSessionId);
        chatSessionStatus = {
          exists: !!session,
          sessionId: sourceSessionId,
        };
      } catch (err) {
        chatSessionStatus = {
          exists: false,
          error: err.message,
        };
      }
    }

    // Optional: Check WhatsApp handoff readiness
    let whatsAppHandoffStatus = null;
    if (checkWhatsAppHandoff && dbRecord) {
      const chain = extractContinuityChain(
        {
          refNumber: dbRecord.ref_number,
          sourceSessionId: dbRecord.source_session_id,
          customerPhone: dbRecord.client_phone,
        },
        dbRecord
      );

      const reference = buildWhatsAppContinuityReference(chain);

      whatsAppHandoffStatus = {
        ready: validationResults.continuityChainValid,
        continuityReference: reference,
        includesRefNumber: !!dbRecord.ref_number,
        includesSessionId: !!dbRecord.source_session_id,
      };
    }

    // Format response
    const response = {
      valid: validationResults.continuityChainValid,
      validations: {
        bookingExists: validationResults.validations.bookingExists.exists,
        refNumberConsistent: validationResults.validations.refNumberConsistency.consistent,
        sessionLinked: validationResults.validations.sessionLinked.linked,
        customerIdentityComplete:
          validationResults.validations.customerIdentityComplete.complete,
        bookingPhaseCorrect: validationResults.validations.bookingPhaseCorrect.correct,
        persistenceComplete: validationResults.validations.persistenceComplete.complete,
        continuityChainValid: validationResults.continuityChainValid,
      },
      dbLookup: {
        method: lookupMethod,
        found: !!dbRecord,
        refNumber: dbRecord?.ref_number || null,
      },
      riskFlags,
      recommendations,
      chatSessionStatus: checkChatSession ? chatSessionStatus : null,
      whatsAppHandoffStatus: checkWhatsAppHandoff ? whatsAppHandoffStatus : null,
      timestamp: new Date().toISOString(),
    };

    // Log validation event (audit trail)
    console.log('[ValidateContinuity] Event:', {
      valid: response.valid,
      method: lookupMethod,
      riskCount: riskFlags.length,
      timestamp: response.timestamp,
    });

    return res.status(200).json(response);
  } catch (err) {
    console.error('[ValidateContinuity] Error:', err.message);
    return res.status(500).json({
      error: 'Internal server error during continuity validation',
      message: err.message,
    });
  }
}

/**
 * Express middleware to mount validation endpoint.
 * 
 * Usage in server.js:
 * 
 * import { handleValidateContinuity } from './api/validate-continuity.js';
 * 
 * app.post('/api/validate-continuity', handleValidateContinuity);
 */
export default handleValidateContinuity;
