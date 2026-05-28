import { describe, expect, it } from "vitest";
import { compareSchemaObjects } from "../../validators/schemaCompatibility.js";

describe("schema compatibility", () => {
  it("allows additive compatibility when new optional fields are added", () => {
    const baseline = {
      properties: {
        productCode: { type: "string" },
        displayName: { type: "string" }
      },
      required: ["productCode", "displayName"]
    };
    const candidate = {
      properties: {
        productCode: { type: "string" },
        displayName: { type: "string" },
        notes: { type: "string" }
      },
      required: ["productCode", "displayName"]
    };

    expect(compareSchemaObjects(baseline, candidate)).toEqual([]);
  });

  it("rejects incompatible schema evolution when required fields are removed", () => {
    const baseline = {
      properties: {
        productCode: { type: "string" },
        displayName: { type: "string" }
      },
      required: ["productCode", "displayName"]
    };
    const candidate = {
      properties: {
        productCode: { type: "string" }
      },
      required: ["productCode"]
    };

    const errors = compareSchemaObjects(baseline, candidate);
    expect(errors.some((error) => error.includes("removed required properties"))).toBe(true);
  });

  it("rejects incompatible enum drift when values are removed", () => {
    const baseline = {
      properties: {
        packageTier: {
          enum: ["basic", "standard", "premium"]
        }
      }
    };
    const candidate = {
      properties: {
        packageTier: {
          enum: ["basic", "standard"]
        }
      }
    };

    const errors = compareSchemaObjects(baseline, candidate);
    expect(errors.some((error) => error.includes("removed enum values"))).toBe(true);
  });
});
