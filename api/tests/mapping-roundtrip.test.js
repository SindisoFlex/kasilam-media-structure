// Mapping round-trip: free-text labels and legacy IDs must resolve to
// canonical service codes the same way for both chatbot and frontend.

import { describe, it, expect } from "vitest";
import {
  resolveServiceCode,
  resolvePackageCode,
  getServiceByCode,
  SERVICES,
} from "../../shared/registry/index.js";

describe("resolveServiceCode", () => {
  it("resolves canonical codes", () => {
    for (const code of Object.keys(SERVICES)) {
      expect(resolveServiceCode(code)).toBe(code);
    }
  });

  it("resolves canonical labels", () => {
    expect(resolveServiceCode("Funeral & Memorial Coverage")).toBe("FUNERAL");
    expect(resolveServiceCode("Wedding Production")).toBe("WEDDING");
    expect(resolveServiceCode("Web & App Development")).toBe("WEB");
  });

  it("resolves legacy chatbot IDs", () => {
    expect(resolveServiceCode("funeral_photography")).toBe("FUNERAL");
    expect(resolveServiceCode("wedding_coverage")).toBe("WEDDING");
    expect(resolveServiceCode("branding_marketing")).toBe("DIGITAL");
    expect(resolveServiceCode("audio_production")).toBe("AUDIO");
  });

  it("resolves free-text keywords", () => {
    expect(resolveServiceCode("I need a wedding videographer")).toBe("WEDDING");
    expect(resolveServiceCode("podcast recording session")).toBe("AUDIO");
    expect(resolveServiceCode("build me a website")).toBe("WEB");
  });

  it("returns null for unknown input", () => {
    expect(resolveServiceCode("")).toBeNull();
    expect(resolveServiceCode(null)).toBeNull();
    expect(resolveServiceCode("plumbing")).toBeNull();
  });
});

describe("resolvePackageCode", () => {
  it("resolves wedding tiers", () => {
    expect(resolvePackageCode("WEDDING", "Essential Coverage")).toBe("WEDDING_ESSENTIAL");
    expect(resolvePackageCode("WEDDING", "classic")).toBe("WEDDING_CLASSIC");
    expect(resolvePackageCode("WEDDING", "Full Day Coverage")).toBe("WEDDING_FULL_DAY");
  });

  it("resolves funeral tiers", () => {
    expect(resolvePackageCode("FUNERAL", "Basic Memorial Coverage")).toBe("FUNERAL_BASIC");
  });

  it("returns null for mismatches", () => {
    expect(resolvePackageCode("WEDDING", "nonexistent tier")).toBeNull();
    expect(resolvePackageCode(null, "anything")).toBeNull();
  });
});

describe("getServiceByCode", () => {
  it("returns full service def", () => {
    const svc = getServiceByCode("FUNERAL");
    expect(svc?.label).toBe("Funeral & Memorial Coverage");
    expect(svc?.category).toBe("visual");
  });
});
