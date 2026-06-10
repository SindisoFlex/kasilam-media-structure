import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resolveCanonicalMapping } from "../lib/mapping-engine.js";

const ORIGINAL_FLAGS = {
  ENABLE_MAPPING_ENGINE: process.env.ENABLE_MAPPING_ENGINE,
  ENABLE_FUZZY_MAPPING: process.env.ENABLE_FUZZY_MAPPING,
  ENABLE_AI_MAPPING_PLACEHOLDER: process.env.ENABLE_AI_MAPPING_PLACEHOLDER,
  ENABLE_NORMALIZATION_ENGINE: process.env.ENABLE_NORMALIZATION_ENGINE,
};

beforeEach(() => {
  process.env.ENABLE_MAPPING_ENGINE = "true";
  process.env.ENABLE_FUZZY_MAPPING = "true";
  process.env.ENABLE_AI_MAPPING_PLACEHOLDER = "false";
  process.env.ENABLE_NORMALIZATION_ENGINE = "true";
});

afterEach(() => {
  process.env.ENABLE_MAPPING_ENGINE = ORIGINAL_FLAGS.ENABLE_MAPPING_ENGINE;
  process.env.ENABLE_FUZZY_MAPPING = ORIGINAL_FLAGS.ENABLE_FUZZY_MAPPING;
  process.env.ENABLE_AI_MAPPING_PLACEHOLDER = ORIGINAL_FLAGS.ENABLE_AI_MAPPING_PLACEHOLDER;
  process.env.ENABLE_NORMALIZATION_ENGINE = ORIGINAL_FLAGS.ENABLE_NORMALIZATION_ENGINE;
});

describe("mapping engine precedence and confidence", () => {
  it("resolves exact match with deterministic high confidence", () => {
    const result = resolveCanonicalMapping("web_development");
    expect(result.mappingMethod).toBe("exact");
    expect(result.canonicalServiceId).toBe("web_development");
    expect(result.confidenceLabel).toBe("exact");
    expect(result.confidenceScore).toBe(0.98);
  });

  it("resolves normalized stage before frontend and synonym", () => {
    const result = resolveCanonicalMapping("Business   Website!!!");
    expect(result.mappingMethod).toBe("normalized");
    expect(result.canonicalProductCode).toBe("WEB-BIZ");
    expect(result.confidenceLabel).toBe("normalized");
  });

  it("resolves synonym stage when direct label misses", () => {
    const result = resolveCanonicalMapping("I need marketing support");
    expect(result.mappingMethod).toBe("synonym");
    expect(result.canonicalServiceId).toBe("branding_marketing");
    expect(result.confidenceLabel).toBe("synonym");
  });

  it("resolves fuzzy stage when enabled", () => {
    const result = resolveCanonicalMapping("coverage");
    expect(result.mappingMethod).toBe("fuzzy");
    expect(result.confidenceLabel).toBe("fuzzy");
    expect(result.canonicalServiceId || result.canonicalProductCode).toBeTruthy();
  });

  it("uses ai-assisted placeholder only when enabled", () => {
    process.env.ENABLE_FUZZY_MAPPING = "false";
    process.env.ENABLE_AI_MAPPING_PLACEHOLDER = "true";
    const result = resolveCanonicalMapping("unknown bespoke scope");
    expect(result.mappingMethod).toBe("ai_assisted");
    expect(result.confidenceLabel).toBe("ai-assisted");
  });

  it("uses deterministic fallback with configured fallback service", () => {
    process.env.ENABLE_FUZZY_MAPPING = "false";
    process.env.ENABLE_AI_MAPPING_PLACEHOLDER = "false";
    const result = resolveCanonicalMapping("unknown bespoke scope", {
      fallbackServiceId: "audio_production",
    });
    expect(result.mappingMethod).toBe("fallback");
    expect(result.canonicalServiceId).toBe("audio_production");
    expect(result.fallbackUsed).toBe(true);
  });
});

describe("mapping engine ambiguity and collision handling", () => {
  it("retains all candidates and flags ambiguity", () => {
    const result = resolveCanonicalMapping("wedding funeral support");
    expect(result.ambiguityDetected).toBe(true);
    expect(result.ambiguityCandidates).toContain("wedding_coverage");
    expect(result.ambiguityCandidates).toContain("funeral_photography");
    expect(result.ambiguityReason).toMatch(/multiple canonical candidates/i);
  });

  it("detects synonym overlap collisions", () => {
    const result = resolveCanonicalMapping("wedding funeral services");
    expect(result.collisionDetected).toBe(true);
    expect(result.collisionType).toBe("synonym_overlap");
    expect(result.collisionCandidates).toEqual(
      expect.arrayContaining(["wedding_coverage", "funeral_photography"])
    );
  });

  it("detects fuzzy overlap collisions", () => {
    const result = resolveCanonicalMapping("coverage");
    expect(result.collisionDetected).toBe(true);
    expect(["fuzzy_overlap", "normalized_label_divergence", "synonym_overlap"]).toContain(
      result.collisionType
    );
  });

  it("separates inquiry and product entities deterministically", () => {
    const inquiry = resolveCanonicalMapping("Production Inquiry");
    expect(inquiry.mappingEntityType).toBe("inquiry");
    expect(inquiry.canonicalProductCode).toBe("INQ-PROD");

    const product = resolveCanonicalMapping("Landing Page");
    expect(product.mappingEntityType).toBe("product");
    expect(product.canonicalProductCode).toBe("WEB-LP");
  });
});

describe("mapping engine feature flag rollback behavior", () => {
  it("preserves fallback-only behavior when engine is disabled", () => {
    process.env.ENABLE_MAPPING_ENGINE = "false";
    const result = resolveCanonicalMapping("Landing Page");
    expect(result.mappingMethod).toBe("fallback");
    expect(result.canonicalServiceId).toBeNull();
    expect(result.confidenceLabel).toBe("fallback");
  });

  it("emits serialization-safe audit metadata", () => {
    const result = resolveCanonicalMapping("Landing Page");
    const asJson = JSON.parse(JSON.stringify(result));
    expect(typeof asJson.timestamp).toBe("string");
    expect(Array.isArray(asJson.mappingTrace)).toBe(true);
    expect(asJson.normalizedInput).toBeTruthy();
  });
});
