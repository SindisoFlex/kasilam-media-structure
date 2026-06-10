import { afterEach, beforeEach, describe, expect, it } from "vitest";

const originalFlag = process.env.ENABLE_NORMALIZATION_ENGINE;
const originalMappingFlag = process.env.ENABLE_MAPPING_ENGINE;
const originalFuzzyFlag = process.env.ENABLE_FUZZY_MAPPING;

beforeEach(() => {
  process.env.ENABLE_NORMALIZATION_ENGINE = "true";
  process.env.ENABLE_MAPPING_ENGINE = "true";
  process.env.ENABLE_FUZZY_MAPPING = "true";
});

afterEach(() => {
  process.env.ENABLE_NORMALIZATION_ENGINE = originalFlag;
  process.env.ENABLE_MAPPING_ENGINE = originalMappingFlag;
  process.env.ENABLE_FUZZY_MAPPING = originalFuzzyFlag;
});

describe("Normalization engine integration", () => {
  it("produces normalized text and audit metadata for intent detection", async () => {
    const { detectIntent } = await import("../chat-intents.js");
    const result = detectIntent("How much does it cost for a WEBSITE?");

    expect(result.intent).toBe("pricing");
    expect(result.normalizedText).toContain("price");
    expect(result.normalizationAudit.enabled).toBe(true);
    expect(result.normalizationConfidence).toBeGreaterThan(0.5);
    expect(result.mappingMetadata).toBeTruthy();
    expect(result.mappingConfidence).toBeGreaterThanOrEqual(0);
  }, 10000);

  it("detects service confidence from normalized service text", async () => {
    const { resolveServiceTransition } = await import("../chat-state.js");
    const result = resolveServiceTransition({ activeServiceId: null, lockedService: false, serviceConfidence: 0 }, "I need a website");

    expect(result.serviceId).toBe("web_development");
    expect(result.normalizationAudit.enabled).toBe(true);
    expect(result.normalizationConfidence).toBeGreaterThan(0.8);
    expect(result.mappingMetadata).toBeTruthy();
    expect(result.mappingMethod).toBeTruthy();
  });
});
