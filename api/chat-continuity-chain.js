/**
 * BRICK A.2.2: Chat Continuity Chain Utilities
 * 
 * Purpose:
 * - Extract, normalize, and expose deterministic continuity chains
 * - Enable operator lookup and validation across all booking surfaces
 * - Support cross-reference visibility without modifying existing persistence
 * 
 * Design Principles:
 * - ADDITIVE ONLY: No changes to BookingContext, chat-session-store.js, or database
 * - Stateless utilities: Pure functions that transform existing data
 * - Feature-flagged: All exports are feature-toggle compatible
 */

/**
 * Extract continuity chain from a session booking record.
 * 
 * Returns canonical identity chain: [sourceSessionId] → [refNumber] → [DB record]
 * 
 * @param {Object} sessionBooking - Chat session booking state
 * @param {Object} dbRecord - Database booking record (if resolved)
 * @returns {Object} Normalized continuity chain
 */
export function extractContinuityChain(sessionBooking, dbRecord = null) {
  if (!sessionBooking) {
    return { valid: false, error: 'Missing sessionBooking' };
  }

  return {
    valid: true,
    sourceSessionId: sessionBooking.sourceSessionId || null,
    refNumber: sessionBooking.refNumber || dbRecord?.ref_number || null,
    status: dbRecord?.booking_info?.status || 'unresolved',
    bookingPhase: dbRecord?.booking_info?.booking_phase || sessionBooking.bookingPhase || null,
    customerName: sessionBooking.customerName || dbRecord?.client_name || null,
    customerPhone: sessionBooking.customerPhone || dbRecord?.client_phone || null,
    service: sessionBooking.service || dbRecord?.booking_info?.service || null,
    location: sessionBooking.location || dbRecord?.location || null,
    bookingDate: sessionBooking.date || dbRecord?.date || null,
    createdAt: dbRecord?.created_at || null,
    persistedAt: dbRecord?.booking_info?.finalized_at || null,
  };
}

/**
 * Build canonical lookup identity for operator queries.
 * 
 * Returns the most reliable key to look up a booking in DB.
 * Precedence: refNumber (UNIQUE) > sourceSessionId > customerPhone (indexed)
 * 
 * @param {Object} continuityChain - Extracted continuity chain
 * @returns {Object} Lookup identity with primary and fallback keys
 */
export function buildOperatorLookupIdentity(continuityChain) {
  if (!continuityChain?.valid) {
    return { valid: false, error: 'Invalid continuity chain' };
  }

  return {
    valid: true,
    primary: {
      field: continuityChain.refNumber ? 'refNumber' : null,
      value: continuityChain.refNumber || null,
    },
    secondary: {
      field: continuityChain.sourceSessionId ? 'sourceSessionId' : null,
      value: continuityChain.sourceSessionId || null,
    },
    tertiary: {
      field: continuityChain.customerPhone ? 'customerPhone' : null,
      value: continuityChain.customerPhone || null,
    },
  };
}

/**
 * Validate continuity chain integrity.
 * 
 * Checks for common continuity failures (missing identity, divergence, etc).
 * Returns risk assessment and recommendations.
 * 
 * @param {Object} continuityChain - Extracted continuity chain
 * @returns {Object} Validation result with risks and recommendations
 */
export function validateContinuityIntegrity(continuityChain) {
  if (!continuityChain?.valid) {
    return {
      valid: false,
      risks: ['No valid continuity chain'],
      severity: 'CRITICAL',
      recommendation: 'Cannot proceed; missing booking identity',
    };
  }

  const risks = [];
  let severity = 'OK';

  // Risk: No refNumber (no DB record)
  if (!continuityChain.refNumber) {
    risks.push('No refNumber; booking not persisted to DB');
    severity = 'HIGH';
  }

  // Risk: No sourceSessionId (no session trace)
  if (!continuityChain.sourceSessionId) {
    risks.push('No sourceSessionId; cannot trace session origin');
    severity = 'MEDIUM';
  }

  // Risk: Missing customer identity
  if (!continuityChain.customerName || !continuityChain.customerPhone) {
    risks.push('Incomplete customer identity (name or phone missing)');
    severity = Math.max(severity === 'OK' ? 'LOW' : severity);
  }

  // Risk: Pending booking (not finalized)
  if (continuityChain.status === 'pending' && continuityChain.bookingPhase !== 'finalized') {
    risks.push('Booking phase mismatch; may not be finalized');
    severity = Math.max(severity === 'OK' ? 'MEDIUM' : severity);
  }

  return {
    valid: risks.length === 0,
    risks,
    severity,
    recommendation:
      risks.length === 0
        ? 'Continuity chain is valid; proceed with operator visibility'
        : `Continuity issues detected (${severity}): ${risks.join('; ')}`,
  };
}

/**
 * Normalize continuity chain for deterministic operator lookup.
 * 
 * Transforms raw session/DB state into a standardized lookup structure
 * that operators can reliably use to find bookings.
 * 
 * @param {Object} sessionBooking - Chat session booking state
 * @param {Object} dbRecord - Database booking record
 * @returns {Object} Normalized lookup structure
 */
export function normalizeContinuityForOperator(sessionBooking, dbRecord = null) {
  const chain = extractContinuityChain(sessionBooking, dbRecord);
  if (!chain.valid) return { valid: false, error: chain.error };

  const lookupIdentity = buildOperatorLookupIdentity(chain);
  const integrity = validateContinuityIntegrity(chain);

  return {
    valid: integrity.valid,
    operatorDisplay: {
      refNumber: chain.refNumber || '(not yet persisted)',
      customerName: chain.customerName || '(unknown)',
      customerPhone: chain.customerPhone || '(unknown)',
      service: chain.service || '(unknown)',
      location: chain.location || '(unknown)',
      bookingDate: chain.bookingDate || '(not set)',
      status: chain.status || 'unresolved',
    },
    lookupIdentity: {
      primary: lookupIdentity.primary,
      secondary: lookupIdentity.secondary,
      tertiary: lookupIdentity.tertiary,
    },
    continuityRisks: integrity.risks,
    riskSeverity: integrity.severity,
    recommendation: integrity.recommendation,
    metadata: {
      chainValidAt: new Date().toISOString(),
      persistedToDb: !!chain.refNumber,
      sessionTraceAvailable: !!chain.sourceSessionId,
    },
  };
}

/**
 * Build WhatsApp continuity reference string.
 * 
 * Creates a deterministic reference that WhatsApp prefill URL can use
 * to ensure chat→WhatsApp continuity without losing booking identity.
 * 
 * Format: "KMP-{refNumber}-{sourceSessionId}-{customerPhone}"
 * (Compact but human-readable for support team copy-paste)
 * 
 * @param {Object} continuityChain - Extracted continuity chain
 * @returns {string} Encoded WhatsApp continuity reference
 */
export function buildWhatsAppContinuityReference(continuityChain) {
  if (!continuityChain?.valid) return null;

  const parts = [
    continuityChain.refNumber || 'SESSION',
    continuityChain.sourceSessionId?.slice(0, 8) || 'UNK',
    continuityChain.customerPhone?.replace(/\D/g, '')?.slice(-4) || 'XXXX',
  ];

  return `KMP-${parts.join('-')}`;
}

/**
 * Build chat URL continuity reference for frontend embedding.
 * 
 * Returns minimal URL-safe reference string that chat UI can embed
 * in messages, logs, or session state for operator troubleshooting.
 * 
 * @param {Object} continuityChain - Extracted continuity chain
 * @returns {string} URL-safe continuity reference
 */
export function buildChatUIReference(continuityChain) {
  if (!continuityChain?.valid) return null;
  return continuityChain.refNumber || continuityChain.sourceSessionId || null;
}

/**
 * Export continuity snapshot for monitoring/alerting.
 * 
 * Creates a structured snapshot suitable for logging, metrics, and
 * anomaly detection systems.
 * 
 * @param {Object} continuityChain - Extracted continuity chain
 * @param {string} event - Event type (e.g., 'handoff', 'finalize', 'lookup')
 * @returns {Object} Monitoring snapshot
 */
export function exportContinuitySnapshot(continuityChain, event = 'handoff') {
  if (!continuityChain?.valid) {
    return {
      event,
      timestamp: new Date().toISOString(),
      valid: false,
      refNumber: null,
      sourceSessionId: null,
    };
  }

  return {
    event,
    timestamp: new Date().toISOString(),
    valid: true,
    refNumber: continuityChain.refNumber,
    sourceSessionId: continuityChain.sourceSessionId,
    customerPhone: continuityChain.customerPhone,
    service: continuityChain.service,
    persistedAt: continuityChain.persistedAt,
    metadata: {
      hasDbRecord: !!continuityChain.refNumber,
      hasSessionTrace: !!continuityChain.sourceSessionId,
    },
  };
}
