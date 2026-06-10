// Parity test: registry-derived strings must match the literals currently
// hardcoded in the chatbot. This gates the cutover — if these strings drift,
// the chatbot will speak the registry version and this test will fail loudly.

import { describe, it, expect } from "vitest";
import {
  exactPricingLines,
  startsFromBlurb,
  webStartsFromBlurb,
} from "../../shared/registry/index.js";

describe("registry pricing parity", () => {
  it("FUNERAL exact pricing lines match ai-chat.js literals", () => {
    expect(exactPricingLines("FUNERAL")).toEqual([
      "Basic Memorial Coverage: Photography R1,500 | Videography R2,000 | Photo + Video R3,500",
      "Standard Memorial Coverage: Photography R2,200 | Videography R2,800 | Photo + Video R4,200",
      "Complete Memorial Coverage: Photography R3,000 | Videography R3,500 | Photo + Video R5,200",
    ]);
  });

  it("WEDDING exact pricing lines match ai-chat.js literals", () => {
    expect(exactPricingLines("WEDDING")).toEqual([
      "Essential Coverage: Photography R4,500 | Videography R5,000 | Photo + Video R7,500",
      "Classic Coverage: Photography R6,500 | Videography R7,500 | Photo + Video R12,000",
      "Full Day Coverage: Photography R9,000 | Videography R10,500 | Photo + Video R16,500",
    ]);
  });

  it("WEB pricing lines match ai-chat.js literals", () => {
    expect(exactPricingLines("WEB")).toEqual([
      "Landing-page websites from R4,500",
      "Business websites from R12,000",
      "Custom web apps from R25,000+",
    ]);
  });

  it("FUNERAL fallback blurb matches chat-fallbacks.js literal", () => {
    expect(startsFromBlurb("FUNERAL", "Funeral coverage")).toBe(
      "Funeral coverage starts from R1,500 for photography, R2,000 for videography, or R3,500 for both."
    );
  });

  it("WEDDING fallback blurb matches chat-fallbacks.js literal", () => {
    expect(startsFromBlurb("WEDDING", "Wedding coverage")).toBe(
      "Wedding coverage starts from R4,500 for photography, R5,000 for videography, or R7,500 for both."
    );
  });

  it("WEB fallback blurb matches chat-fallbacks.js literal", () => {
    expect(webStartsFromBlurb()).toBe(
      "Web projects usually start from R4,500 for landing pages, R12,000 for business websites, and R25,000+ for custom web apps."
    );
  });
});
