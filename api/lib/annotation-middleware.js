import { emitFeatureFlagUsage, emitTelemetryEvent, getDriftSummary, getRuntimeHealthMetrics } from "./telemetry-engine.js";
import { renderCopyReadyReport } from "./report-renderer.js";

const FLAGS = Object.freeze({
  middleware: "ENABLE_ANNOTATION_MIDDLEWARE",
  reportRenderer: "ENABLE_REPORT_RENDERER",
  runtimeAnnotations: "ENABLE_RUNTIME_ANNOTATIONS",
});

const DEFAULT_MAX_BYTES = 32768;
const DEFAULT_SAMPLE_RATE = 1;
const MAX_EVENTS_PER_REQUEST = 250;

function enabled(flagName) {
  return process.env[flagName] === "true";
}

export function annotationFlags() {
  return {
    ENABLE_ANNOTATION_MIDDLEWARE: enabled(FLAGS.middleware),
    ENABLE_REPORT_RENDERER: enabled(FLAGS.reportRenderer),
    ENABLE_RUNTIME_ANNOTATIONS: enabled(FLAGS.runtimeAnnotations),
  };
}

function hash(text) {
  const input = String(text || "");
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

function shouldSample(context = {}) {
  const configured = Number(process.env.ANNOTATION_SAMPLE_RATE || DEFAULT_SAMPLE_RATE);
  const sampleRate = Number.isFinite(configured) ? Math.max(0, Math.min(1, configured)) : 1;
  if (sampleRate >= 1) return true;
  if (sampleRate <= 0) return false;

  const seed = context.correlationId || context.sessionId || "default";
  const score = (hash(seed) % 10000) / 10000;
  return score <= sampleRate;
}

function enforcePayloadLimit(value, maxBytes = DEFAULT_MAX_BYTES) {
  const input = value && typeof value === "object" ? value : {};
  const json = JSON.stringify(input);
  if (!json || json.length <= maxBytes) {
    return { payload: input, truncated: false, sizeBytes: json ? json.length : 0 };
  }

  const cloned = JSON.parse(json);
  cloned.__annotationGuard = {
    truncated: true,
    maxBytes,
    originalBytes: json.length,
  };
  if (cloned.annotationEnvelope) {
    delete cloned.annotationEnvelope.telemetry?.recentEvents;
    delete cloned.annotationEnvelope.runtime?.normalizationAudit;
    delete cloned.annotationEnvelope.runtime?.mappingMetadata;
  }
  const clipped = JSON.stringify(cloned);
  return { payload: cloned, truncated: true, sizeBytes: clipped.length };
}

function safeObject(input) {
  if (!input || typeof input !== "object") return {};
  return JSON.parse(JSON.stringify(input));
}

export function buildAnnotationEnvelope(context = {}) {
  const flags = annotationFlags();
  const drift = getDriftSummary();
  const health = getRuntimeHealthMetrics();
  const correlationId =
    context.correlationId ||
    context.sessionId ||
    `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return {
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    correlationId,
    request: {
      sessionId: context.sessionId || null,
      sourceSessionId: context.sourceSessionId || context.sessionId || null,
      messageCount: context.messageCount ?? 0,
    },
    runtime: {
      activeServiceId: context.activeServiceId || null,
      conversationStage: context.conversationStage || null,
      bookingPhase: context.bookingPhase || null,
      mappingMethod: context.mappingMethod || null,
      mappingConfidence: context.mappingConfidence ?? null,
      mappingAmbiguity: Boolean(context.mappingAmbiguity),
      mappingCollision: Boolean(context.mappingCollision),
      mappingMetadata: safeObject(context.mappingMetadata || null),
      normalizationAudit: safeObject(context.normalizationAudit || null),
    },
    telemetry: {
      driftSummary: drift,
      runtimeHealth: health,
      events: [],
      featureFlags: {
        ...flags,
        ...safeObject(context.featureFlags || {}),
      },
    },
    migration: {
      phase: "phase_5_annotation_middleware",
      mode: "additive_non_blocking",
    },
    rollback: {
      fallbackPathRetained: true,
      middlewareDisabledSafe: true,
      featureFlagGuarded: true,
    },
  };
}

export function applyRuntimeAnnotations(payload = {}, context = {}) {
  const flags = annotationFlags();
  if (!flags.ENABLE_ANNOTATION_MIDDLEWARE || !flags.ENABLE_RUNTIME_ANNOTATIONS) {
    return { payload, annotationsApplied: false, annotationEnvelope: null };
  }

  if (!shouldSample(context)) {
    return { payload, annotationsApplied: false, annotationEnvelope: null };
  }

  const annotationEnvelope = buildAnnotationEnvelope({
    ...context,
    featureFlags: flags,
  });

  // Step 8: Safe Event Append API with Caps
  annotationEnvelope.addEvent = function(name, data = {}) {
    if (this.telemetry.events.length >= MAX_EVENTS_PER_REQUEST) {
      if (this.telemetry.events.length === MAX_EVENTS_PER_REQUEST) {
        this.telemetry.events.push({ name: "MAX_EVENTS_REACHED", timestamp: new Date().toISOString() });
      }
      return;
    }
    this.telemetry.events.push({
      name,
      data: safeObject(data),
      timestamp: new Date().toISOString()
    });
  };

  const withAnnotations = {
    ...payload,
    annotationEnvelope,
  };
  const startTime = Date.now();

  const maxBytes = Number(process.env.ANNOTATION_MAX_BYTES || DEFAULT_MAX_BYTES);
  const guarded = enforcePayloadLimit(withAnnotations, Number.isFinite(maxBytes) ? maxBytes : DEFAULT_MAX_BYTES);
  const nextPayload = guarded.payload;

  if (flags.ENABLE_REPORT_RENDERER) {
    nextPayload.annotationReport = renderCopyReadyReport({
      sessionId: context.sessionId,
      sourceSessionId: context.sourceSessionId,
      correlationId: annotationEnvelope.correlationId,
      conversationStage: context.conversationStage,
      bookingPhase: context.bookingPhase,
      activeServiceId: context.activeServiceId,
      mappingMethod: context.mappingMethod,
      mappingConfidence: context.mappingConfidence,
      mappingAmbiguity: context.mappingAmbiguity,
      mappingCollision: context.mappingCollision,
      drift: annotationEnvelope.telemetry.driftSummary,
      health: annotationEnvelope.telemetry.runtimeHealth,
      durationMs: Date.now() - startTime
    });
  }

  emitFeatureFlagUsage(
    {
      sessionId: context.sessionId || null,
      sourceSessionId: context.sourceSessionId || context.sessionId || null,
      correlationId: annotationEnvelope.correlationId,
      origin: "annotation-middleware",
    },
    flags
  );
  emitTelemetryEvent(
    "runtime_annotation_applied",
    {
      mappingMethod: context.mappingMethod || "unresolved",
      confidenceScore: context.mappingConfidence ?? 0,
      confidenceLabel: context.mappingLabel || "unresolved",
      ambiguityDetected: Boolean(context.mappingAmbiguity),
      collisionDetected: Boolean(context.mappingCollision),
      fallbackUsed: Boolean(context.mappingMetadata?.fallbackUsed),
      canonicalId:
        context.mappingMetadata?.canonicalServiceId ||
        context.mappingMetadata?.canonicalProductCode ||
        context.activeServiceId ||
        null,
      normalizedInput: context.normalizedInput || "",
      featureFlags: flags,
      metadata: {
        truncated: guarded.truncated,
        payloadBytes: guarded.sizeBytes,
      },
    },
    {
      sessionId: context.sessionId || null,
      sourceSessionId: context.sourceSessionId || context.sessionId || null,
      correlationId: annotationEnvelope.correlationId,
      origin: "annotation-middleware",
    }
  );

  return {
    payload: nextPayload,
    annotationsApplied: true,
    annotationEnvelope: nextPayload.annotationEnvelope || null,
  };
}
