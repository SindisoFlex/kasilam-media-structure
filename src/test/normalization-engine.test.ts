import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { normalizeText, normalizeWithAudit } from "../../api/lib/normalization-engine.js";

const originalFlag = process.env.ENABLE_NORMALIZATION_ENGINE;

describe("Normalization engine unit tests", () => {
  beforeEach(() => {
    process.env.ENABLE_NORMALIZATION_ENGINE = "true";
  });

  afterEach(() => {
    process.env.ENABLE_NORMALIZATION_ENGINE = originalFlag;
  });

  it("normalizes unicode, lowercases, collapses whitespace, and strips punctuation", () => {
    const result = normalizeWithAudit("  Hëllø, Web Site!!!  ");

    expect(result.normalizedText).toBe("hëllø website");
    expect(result.audit.enabled).toBe(true);
    expect(result.audit.stages.some((stage) => stage.step === "punctuation-stripping")).toBe(true);
    expect(result.tokens).toContain("hëllø");
    expect(result.tokens).toContain("website");
  });

  it("strips currency and preserves numeric values", () => {
    const result = normalizeWithAudit("R4,500 for website design");

    expect(result.normalizedText).toContain("4500");
    expect(result.normalizedText).toContain("web");
    expect(result.tokens).toContain("4500");
    expect(result.collisionDetected).toBe(false);
  });

  it("detects synonym replacements and records audit metadata", () => {
    const result = normalizeWithAudit("I need funeral photography and ads");

    expect(result.normalizedText).toContain("funeral photo");
    expect(result.normalizedText).toContain("advertising");
    expect(result.audit.replacements.length).toBeGreaterThan(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
  });

  it("flags collisions for repeated tokens", () => {
    const result = normalizeWithAudit("book book book");

    expect(result.collisionDetected).toBe(true);
    expect(result.confidence).toBeLessThan(1);
  });
});
