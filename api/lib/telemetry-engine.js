const TELEMETRY_FLAGS = Object.freeze({
  engine: "ENABLE_TELEMETRY_ENGINE",
  drift: "ENABLE_DRIFT_TRACKING",
  health: "ENABLE_RUNTIME_HEALTH_METRICS",
});

const MAX_EVENT_BUFFER = 1000;

const telemetryState = {
  events: [],
  counters: createEmptyCounters(),
};

function createEmptyCounters() {
  return {
    totalEvents: 0,
    mappingEvents: 0,
    normalizationEvents: 0,
    mappingSuccessCount: 0,
    fallbackCount: 0,
    unresolvedCount: 0,
    ambiguityCount: 0,
    collisionCount: 0,
    fuzzyCount: 0,
    lowConfidenceCount: 0,
    confidenceBands: {
      high: 0,
      medium: 0,
      low: 0,
      unknown: 0,
    },
    mappingMethods: {},
    serviceFrequency: {},
    featureFlags: {},
  };
}

function readFlag(flagName) {
  return process.env[flagName] === "true";
}

export function telemetryFlags() {
  return {
    ENABLE_TELEMETRY_ENGINE: readFlag(TELEMETRY_FLAGS.engine),
    ENABLE_DRIFT_TRACKING: readFlag(TELEMETRY_FLAGS.drift),
    ENABLE_RUNTIME_HEALTH_METRICS: readFlag(TELEMETRY_FLAGS.health),
  };
}

function normalizeSessionId(value) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized || null;
}

function normalizeScore(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return Number(Math.max(0, Math.min(1, parsed)).toFixed(4));
}

function confidenceBand(score) {
  if (!Number.isFinite(score)) return "unknown";
  if (score >= 0.8) return "high";
  if (score >= 0.5) return "medium";
  return "low";
}

function safeObject(input) {
  if (!input || typeof input !== "object") return {};
  return JSON.parse(JSON.stringify(input));
}

export function createTelemetryContext(session = null, overrides = {}) {
  return {
    sessionId: normalizeSessionId(overrides.sessionId ?? session?.sessionId),
    sourceSessionId: normalizeSessionId(
      overrides.sourceSessionId ?? session?.sourceSessionId ?? session?.sessionId
    ),
    correlationId: normalizeSessionId(overrides.correlationId ?? session?.sessionId),
    origin: overrides.origin || "runtime",
  };
}

export function emitFeatureFlagUsage(context = {}, flags = {}) {
  return emitTelemetryEvent(
    "feature_flag_usage",
    {
      featureFlags: safeObject(flags),
    },
    context
  );
}

function registerFeatureFlags(counters, flags) {
  for (const [flagName, value] of Object.entries(flags || {})) {
    const key = `${flagName}:${String(Boolean(value))}`;
    counters.featureFlags[key] = (counters.featureFlags[key] || 0) + 1;
  }
}

function registerMappingMetrics(counters, event) {
  counters.mappingEvents += 1;
  const method = event.mappingMethod || "unknown";
  counters.mappingMethods[method] = (counters.mappingMethods[method] || 0) + 1;

  const serviceKey = event.canonicalId || event.canonicalServiceId || "unresolved";
  counters.serviceFrequency[serviceKey] = (counters.serviceFrequency[serviceKey] || 0) + 1;

  if (
    method === "exact" ||
    method === "normalized" ||
    method === "frontend_label" ||
    method === "synonym" ||
    method === "fuzzy"
  ) {
    counters.mappingSuccessCount += 1;
  }
  if (event.fallbackUsed) counters.fallbackCount += 1;
  if (method === "unresolved" || !event.canonicalId) counters.unresolvedCount += 1;
  if (event.ambiguityDetected) counters.ambiguityCount += 1;
  if (event.collisionDetected) counters.collisionCount += 1;
  if (method === "fuzzy") counters.fuzzyCount += 1;
  if (event.confidenceScore < 0.5) counters.lowConfidenceCount += 1;
}

function registerNormalizationMetrics(counters) {
  counters.normalizationEvents += 1;
}

function updateCounters(event) {
  const counters = telemetryState.counters;
  counters.totalEvents += 1;
  registerFeatureFlags(counters, event.featureFlags || {});

  const band = confidenceBand(event.confidenceScore);
  counters.confidenceBands[band] = (counters.confidenceBands[band] || 0) + 1;

  if (String(event.eventType).startsWith("mapping_")) {
    registerMappingMetrics(counters, event);
  }

  if (event.eventType === "normalization_transform") {
    registerNormalizationMetrics(counters);
  }
}

function createEventSchema(eventType, payload, context = {}) {
  const flags = telemetryFlags();
  const canonicalId = payload.canonicalId || payload.canonicalProductCode || payload.canonicalServiceId || null;
  return {
    eventType,
    timestamp: payload.timestamp || new Date().toISOString(),
    sessionId: normalizeSessionId(context.sessionId),
    sourceSessionId: normalizeSessionId(context.sourceSessionId),
    correlationId: normalizeSessionId(context.correlationId),
    origin: context.origin || "runtime",
    mappingMethod: payload.mappingMethod || "unresolved",
    confidenceScore: normalizeScore(payload.confidenceScore),
    confidenceLabel: payload.confidenceLabel || "unresolved",
    ambiguityDetected: Boolean(payload.ambiguityDetected),
    collisionDetected: Boolean(payload.collisionDetected),
    fallbackUsed: Boolean(payload.fallbackUsed),
    canonicalId,
    canonicalServiceId: payload.canonicalServiceId || null,
    canonicalProductCode: payload.canonicalProductCode || null,
    normalizedInput: String(payload.normalizedInput || ""),
    featureFlags: {
      ...flags,
      ...(safeObject(payload.featureFlags) || {}),
    },
    metadata: safeObject(payload.metadata || {}),
  };
}

export function emitTelemetryEvent(eventType, payload = {}, context = {}) {
  const flags = telemetryFlags();
  if (!flags.ENABLE_TELEMETRY_ENGINE) {
    return null;
  }

  const event = createEventSchema(eventType, payload, context);
  telemetryState.events.push(event);
  if (telemetryState.events.length > MAX_EVENT_BUFFER) {
    telemetryState.events.shift();
  }

  if (flags.ENABLE_DRIFT_TRACKING || flags.ENABLE_RUNTIME_HEALTH_METRICS) {
    updateCounters(event);
  }

  return event;
}

function safeRate(numerator, denominator) {
  if (!denominator) return 0;
  return Number((numerator / denominator).toFixed(4));
}

export function getDriftSummary() {
  const counters = telemetryState.counters;
  const mappingBase = counters.mappingEvents || 0;
  return {
    mappingEvents: mappingBase,
    unresolvedRate: safeRate(counters.unresolvedCount, mappingBase),
    fallbackRate: safeRate(counters.fallbackCount, mappingBase),
    ambiguityRate: safeRate(counters.ambiguityCount, mappingBase),
    collisionRate: safeRate(counters.collisionCount, mappingBase),
    fuzzyUsageRate: safeRate(counters.fuzzyCount, mappingBase),
    lowConfidenceRate: safeRate(counters.lowConfidenceCount, mappingBase),
    timestamp: new Date().toISOString(),
  };
}

export function getRuntimeHealthMetrics() {
  const drift = getDriftSummary();
  const counters = telemetryState.counters;
  const mappingHealthScore = Number(
    Math.max(
      0,
      1 -
        drift.unresolvedRate * 0.35 -
        drift.fallbackRate * 0.2 -
        drift.lowConfidenceRate * 0.2 -
        drift.ambiguityRate * 0.15 -
        drift.collisionRate * 0.1
    ).toFixed(4)
  );
  const normalizationHealthScore = Number(
    Math.min(1, safeRate(counters.normalizationEvents, Math.max(counters.totalEvents, 1)) + 0.5).toFixed(4)
  );
  const ambiguityRiskScore = Number(Math.min(1, drift.ambiguityRate * 1.2).toFixed(4));
  const collisionRiskScore = Number(Math.min(1, drift.collisionRate * 1.2).toFixed(4));
  const rolloutConfidenceScore = Number(
    Math.max(0, 1 - drift.unresolvedRate * 0.4 - drift.fallbackRate * 0.3 - drift.collisionRate * 0.3).toFixed(4)
  );

  return {
    mappingHealthScore,
    normalizationHealthScore,
    ambiguityRiskScore,
    collisionRiskScore,
    rolloutConfidenceScore,
    timestamp: new Date().toISOString(),
  };
}

export function getTelemetrySnapshot() {
  return {
    flags: telemetryFlags(),
    counters: safeObject(telemetryState.counters),
    drift: getDriftSummary(),
    health: getRuntimeHealthMetrics(),
    recentEvents: safeObject(telemetryState.events),
    generatedAt: new Date().toISOString(),
  };
}

export function resetTelemetryState() {
  telemetryState.events = [];
  telemetryState.counters = createEmptyCounters();
}
