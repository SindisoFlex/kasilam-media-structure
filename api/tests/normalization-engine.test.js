import { afterEach, beforeEach, describe, expect, it } from "vitest";

const originalFlag = process.env.ENABLE_NORMALIZATION_ENGINE;

beforeEach(() => {
  process.env.ENABLE_NORMALIZATION_ENGINE = "true";
});

afterEach(() => {
  process.env.ENABLE_NORMALIZATION_ENGINE = originalFlag;
});

describe("Normalization engine integration", () => {
  it("produces normalized text and audit metadata for intent detection", async () => {
    const { detectIntent } = await import("../chat-intents.js");
    const result = detectIntent("How much does it cost for a WEBSITE?");

    expect(result.intent).toBe("pricing");
    expect(result.normalizedText).toContain("price");
    expect(result.normalizationAudit.enabled).toBe(true);
    expect(result.normalizationConfidence).toBeGreaterThan(0.5);
  });

  it("detects service confidence from normalized service text", async () => {
    const { resolveServiceTransition } = await import("../chat-state.js");
    const result = resolveServiceTransition({ activeServiceId: null, lockedService: false, serviceConfidence: 0 }, "I need a website");

    expect(result.serviceId).toBe("web_development");
    expect(result.normalizationAudit.enabled).toBe(true);
    expect(result.normalizationConfidence).toBeGreaterThan(0.8);
  });
});
