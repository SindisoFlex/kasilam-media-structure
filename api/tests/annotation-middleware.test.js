import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { applyRuntimeAnnotations, buildAnnotationEnvelope } from "../lib/annotation-middleware.js";

const ORIGINAL_FLAGS = {
  ENABLE_ANNOTATION_MIDDLEWARE: process.env.ENABLE_ANNOTATION_MIDDLEWARE,
  ENABLE_REPORT_RENDERER: process.env.ENABLE_REPORT_RENDERER,
  ENABLE_RUNTIME_ANNOTATIONS: process.env.ENABLE_RUNTIME_ANNOTATIONS,
  ENABLE_TELEMETRY_ENGINE: process.env.ENABLE_TELEMETRY_ENGINE,
  ENABLE_DRIFT_TRACKING: process.env.ENABLE_DRIFT_TRACKING,
  ENABLE_RUNTIME_HEALTH_METRICS: process.env.ENABLE_RUNTIME_HEALTH_METRICS,
  ANNOTATION_MAX_BYTES: process.env.ANNOTATION_MAX_BYTES,
  ANNOTATION_SAMPLE_RATE: process.env.ANNOTATION_SAMPLE_RATE,
};

beforeEach(() => {
  process.env.ENABLE_ANNOTATION_MIDDLEWARE = "true";
  process.env.ENABLE_REPORT_RENDERER = "true";
  process.env.ENABLE_RUNTIME_ANNOTATIONS = "true";
  process.env.ENABLE_TELEMETRY_ENGINE = "true";
  process.env.ENABLE_DRIFT_TRACKING = "true";
  process.env.ENABLE_RUNTIME_HEALTH_METRICS = "true";
  process.env.ANNOTATION_MAX_BYTES = "8192";
  process.env.ANNOTATION_SAMPLE_RATE = "1";
});

afterEach(() => {
  for (const [key, value] of Object.entries(ORIGINAL_FLAGS)) {
    process.env[key] = value;
  }
});

describe("annotation middleware foundation", () => {
  it("creates standardized annotation envelope", () => {
    const envelope = buildAnnotationEnvelope({
      sessionId: "s1",
      sourceSessionId: "src1",
      conversationStage: "qualification",
    });

    expect(envelope.request.sessionId).toBe("s1");
    expect(envelope.request.sourceSessionId).toBe("src1");
    expect(envelope.runtime.conversationStage).toBe("qualification");
    expect(envelope.telemetry.driftSummary).toBeTruthy();
    expect(envelope.rollback.featureFlagGuarded).toBe(true);
  });

  it("applies runtime annotations and report renderer when enabled", () => {
    const result = applyRuntimeAnnotations(
      { reply: "hello" },
      {
        sessionId: "s1",
        sourceSessionId: "s1",
        activeServiceId: "web_development",
        mappingMethod: "normalized",
        mappingConfidence: 0.93,
      }
    );

    expect(result.annotationsApplied).toBe(true);
    expect(result.payload.annotationEnvelope).toBeTruthy();
    expect(result.payload.annotationReport).toBeTruthy();
    expect(result.payload.annotationReport.rendered).toContain("[[COPY_START:Session]]");
  });

  it("is rollback-safe when middleware flags are disabled", () => {
    process.env.ENABLE_ANNOTATION_MIDDLEWARE = "false";
    const result = applyRuntimeAnnotations({ reply: "hello" }, { sessionId: "s2" });
    expect(result.annotationsApplied).toBe(false);
    expect(result.payload.annotationEnvelope).toBeUndefined();
  });

  it("enforces payload size guard", () => {
    process.env.ANNOTATION_MAX_BYTES = "300";
    const huge = "x".repeat(10000);
    const result = applyRuntimeAnnotations(
      { reply: "hello", huge },
      { sessionId: "s3", mappingMethod: "fallback", mappingConfidence: 0.4 }
    );
    expect(result.payload.__annotationGuard).toBeTruthy();
    expect(result.payload.__annotationGuard.truncated).toBe(true);
  });
});
