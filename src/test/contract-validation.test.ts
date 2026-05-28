import { describe, expect, it } from "vitest";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import path from "path";
import fs from "fs";
import { validateDeprecationRulesForData } from "../../validators/deprecationValidator.js";
import { SERVICE_CATEGORIES, PACKAGE_TIERS, PRICING_CURRENCIES } from "../../registry/enums.js";

function loadSchema(schemaName: string) {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "schemas", schemaName), "utf8"));
}

describe("contract validation", () => {
  it("rejects pricing data with invalid inquiry pricing values", () => {
    const pricingSchema = loadSchema("pricing.schema.json");
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(pricingSchema);

    const invalidPricing = {
      currency: "ZAR",
      price: -100,
      subtotal: -100,
      vat: 20,
      total: -80,
      lineItems: [{ description: "Test item", amount: -100 }]
    };

    expect(validate(invalidPricing)).toBe(false);
    expect(validate.errors?.length).toBeGreaterThan(0);
  });

  it("rejects finalized booking DTOs without finalizedAt", () => {
    const bookingSchema = loadSchema("canonicalBooking.schema.json");
    const pricingSchema = loadSchema("pricing.schema.json");
    const auditSchema = loadSchema("audit.schema.json");
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);
    ajv.addSchema(pricingSchema, "pricing.schema.json");
    ajv.addSchema(auditSchema, "audit.schema.json");
    const validate = ajv.compile(bookingSchema);

    const invalidBooking = {
      bookingId: "BOOK-123",
      status: "finalized",
      createdAt: new Date().toISOString(),
      customer: {
        name: "Test User",
        email: "test@example.com",
        phone: "555-1234"
      },
      bookingInfo: {
        service: "Web Development",
        package: "Landing Page",
        productCode: "WEB-LP",
        serviceId: "web_development"
      },
      pricing: {
        currency: "ZAR",
        price: 4500,
        subtotal: 4500,
        vat: 0,
        total: 4500,
        lineItems: []
      }
    };

    expect(validate(invalidBooking)).toBe(false);
    expect(validate.errors?.some((err) => err.message?.includes("finalizedAt"))).toBe(true);
  });

  it("ensures schema enums remain consistent with the enum registry", () => {
    const serviceSchema = loadSchema("service.schema.json");
    const packageSchema = loadSchema("package.schema.json");
    const pricingSchema = loadSchema("pricing.schema.json");

    expect(serviceSchema.properties.category.enum.sort()).toEqual(SERVICE_CATEGORIES.sort());
    expect(packageSchema.properties.packageTier.enum.filter((value: string | null) => value !== null).sort()).toEqual(PACKAGE_TIERS.sort());
    expect(pricingSchema.properties.currency.enum.sort()).toEqual(PRICING_CURRENCIES.sort());
  });

  it("fails when deprecated packages are still mapped", () => {
    const packages = [
      {
        productCode: "WEB-OLD",
        serviceId: "web_development",
        displayName: "Legacy Web Package",
        frontendLabels: ["Legacy Website"],
        deprecated: true
      }
    ];
    const mappings = {
      "Legacy Website": "WEB-OLD"
    };

    const errors = validateDeprecationRulesForData(packages, mappings);
    expect(errors).toContain("Mapping label Legacy Website points to deprecated product code WEB-OLD.");
  });
});
