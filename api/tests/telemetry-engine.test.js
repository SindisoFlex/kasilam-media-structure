import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  emitFeatureFlagUsage,
  emitTelemetryEvent,
  getDriftSummary,
  getRuntimeHealthMetrics,
  getTelemetrySnapshot,
  resetTelemetryState,
} from "../lib/telemetry-engine.js";
import { resolveCanonicalMapping } from "../lib/mapping-engine.js";
import { normalizeWithAudit } from "../lib/normalization-engine.js";

const ORIGINAL_FLAGS = {
  ENABLE_TELEMETRY_ENGINE: process.env.ENABLE_TELEMETRY_ENGINE,
  ENABLE_DRIFT_TRACKING: process.env.ENABLE_DRIFT_TRACKING,
  ENABLE_RUNTIME_HEALTH_METRICS: process.env.ENABLE_RUNTIME_HEALTH_METRICS,
  ENABLE_MAPPING_ENGINE: process.env.ENABLE_MAPPING_ENGINE,
  ENABLE_FUZZY_MAPPING: process.env.ENABLE_FUZZY_MAPPING,
  ENABLE_AI_MAPPING_PLACEHOLDER: process.env.ENABLE_AI_MAPPING_PLACEHOLDER,
  ENABLE_NORMALIZATION_ENGINE: process.env.ENABLE_NORMALIZATION_ENGINE,
};

beforeEach(() => {
  process.env.ENABLE_TELEMETRY_ENGINE = "true";
  process.env.ENABLE_DRIFT_TRACKING = "true";
  process.env.ENABLE_RUNTIME_HEALTH_METRICS = "true";
  process.env.ENABLE_MAPPING_ENGINE = "true";
  process.env.ENABLE_FUZZY_MAPPING = "true";
  process.env.ENABLE_AI_MAPPING_PLACEHOLDER = "false";
  process.env.ENABLE_NORMALIZATION_ENGINE = "true";
  resetTelemetryState();
});

afterEach(() => {
  resetTelemetryState();
  for (const [key, value] of Object.entries(ORIGINAL_FLAGS)) {
    process.env[key] = value;
  }
});

describe("telemetry engine structured events", () => {
  it("emits serialization-safe deterministic event shape", () => {
    const event = emitTelemetryEvent(
      "mapping_success",
      {
        mappingMethod: "normalized",
        confidenceScore: 0.9,
        confidenceLabel: "normalized",
        ambiguityDetected: false,
        collisionDetected: false,
        fallbackUsed: false,
        canonicalId: "WEB-BIZ",
        normalizedInput: "business website",
      },
      {
        sessionId: "sess-1",
        sourceSessionId: "src-1",
      }
    );

    expect(event).toBeTruthy();
    const asJson = JSON.parse(JSON.stringify(event));
    expect(asJson.sessionId).toBe("sess-1");
    expect(asJson.sourceSessionId).toBe("src-1");
    expect(asJson.mappingMethod).toBe("normalized");
    expect(typeof asJson.timestamp).toBe("string");
  });
});

describe("drift and health metrics", () => {
  it("tracks unresolved/fallback/ambiguity/collision/fuzzy rates", () => {
    resolveCanonicalMapping("coverage", { sessionId: "s1", sourceSessionId: "s1" });
    resolveCanonicalMapping("unknown bespoke scope", {
      sessionId: "s1",
      sourceSessionId: "s1",
      fallbackServiceId: "audio_production",
    });
    resolveCanonicalMapping("wedding funeral support", {
      sessionId: "s1",
      sourceSessionId: "s1",
    });

    const drift = getDriftSummary();
    expect(drift.mappingEvents).toBeGreaterThan(0);
    expect(drift.fallbackRate).toBeGreaterThanOrEqual(0);
    expect(drift.ambiguityRate).toBeGreaterThanOrEqual(0);
    expect(drift.collisionRate).toBeGreaterThanOrEqual(0);
    expect(drift.fuzzyUsageRate).toBeGreaterThanOrEqual(0);
  });

  it("computes deterministic health scores and supports snapshot/reset", () => {
    normalizeWithAudit("How much does website cost?", {
      sessionId: "s-health",
      sourceSessionId: "s-health",
    });
    resolveCanonicalMapping("Landing Page", {
      sessionId: "s-health",
      sourceSessionId: "s-health",
    });
    emitFeatureFlagUsage({ sessionId: "s-health" }, { ENABLE_MAPPING_ENGINE: true });

    const health = getRuntimeHealthMetrics();
    expect(health.mappingHealthScore).toBeGreaterThanOrEqual(0);
    expect(health.mappingHealthScore).toBeLessThanOrEqual(1);
    expect(health.rolloutConfidenceScore).toBeGreaterThanOrEqual(0);

    const snapshot = getTelemetrySnapshot();
    expect(snapshot.counters.totalEvents).toBeGreaterThan(0);
    expect(Array.isArray(snapshot.recentEvents)).toBe(true);

    resetTelemetryState();
    const empty = getTelemetrySnapshot();
    expect(empty.counters.totalEvents).toBe(0);
    expect(empty.recentEvents.length).toBe(0);
  });
});

describe("telemetry feature flag rollback safety", () => {
  it("does not emit events when telemetry engine flag is disabled", () => {
    process.env.ENABLE_TELEMETRY_ENGINE = "false";
    const event = emitTelemetryEvent("mapping_success", {
      mappingMethod: "exact",
      confidenceScore: 0.98,
      confidenceLabel: "exact",
    });
    expect(event).toBeNull();
    expect(getTelemetrySnapshot().counters.totalEvents).toBe(0);
  });
});
