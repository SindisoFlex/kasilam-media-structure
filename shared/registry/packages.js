// Canonical package tiers + exact prices.
// Seeded verbatim from api/ai-chat.js SERVICE_INTELLIGENCE so existing
// rendered strings remain byte-identical (see api/tests/registry-parity.test.js).

export const PACKAGES = Object.freeze({
  FUNERAL: [
    { code: "FUNERAL_BASIC",    tier: "Basic Memorial Coverage",    prices: { photo: 1500, video: 2000, both: 3500 } },
    { code: "FUNERAL_STANDARD", tier: "Standard Memorial Coverage", prices: { photo: 2200, video: 2800, both: 4200 } },
    { code: "FUNERAL_COMPLETE", tier: "Complete Memorial Coverage", prices: { photo: 3000, video: 3500, both: 5200 } },
  ],
  WEDDING: [
    { code: "WEDDING_ESSENTIAL", tier: "Essential Coverage", prices: { photo: 4500, video: 5000,  both: 7500  } },
    { code: "WEDDING_CLASSIC",   tier: "Classic Coverage",   prices: { photo: 6500, video: 7500,  both: 12000 } },
    { code: "WEDDING_FULL_DAY",  tier: "Full Day Coverage",  prices: { photo: 9000, video: 10500, both: 16500 } },
  ],
  WEB: [
    { code: "WEB_LANDING",  tier: "Landing-page websites", prices: { from: 4500 } },
    { code: "WEB_BUSINESS", tier: "Business websites",     prices: { from: 12000 } },
    { code: "WEB_CUSTOM",   tier: "Custom web apps",       prices: { fromPlus: 25000 } },
  ],
});

// Quick fallback summary strings ("starts from R…")
export const PRICE_FROM = Object.freeze({
  FUNERAL: { photo: 1500, video: 2000, both: 3500 },
  WEDDING: { photo: 4500, video: 5000, both: 7500 },
});
