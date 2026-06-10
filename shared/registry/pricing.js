// Formatters that turn canonical PACKAGES into the exact display strings
// used by the chatbot and fallback copy. Output must remain byte-identical
// to the previously-hardcoded literals (enforced by registry-parity test).

import { PACKAGES, PRICE_FROM } from "./packages.js";

const formatZAR = (n) => `R${Number(n).toLocaleString("en-US")}`;

// "Basic Memorial Coverage: Photography R1,500 | Videography R2,000 | Photo + Video R3,500"
export function formatTierLine(pkg) {
  const p = pkg.prices;
  return `${pkg.tier}: Photography ${formatZAR(p.photo)} | Videography ${formatZAR(p.video)} | Photo + Video ${formatZAR(p.both)}`;
}

// "Landing-page websites from R4,500"
// "Custom web apps from R25,000+"
export function formatFromLine(pkg) {
  const p = pkg.prices;
  if (typeof p.from === "number") return `${pkg.tier} from ${formatZAR(p.from)}`;
  if (typeof p.fromPlus === "number") return `${pkg.tier} from ${formatZAR(p.fromPlus)}+`;
  return pkg.tier;
}

export function exactPricingLines(serviceCode) {
  const list = PACKAGES[serviceCode];
  if (!list) return [];
  // Web uses "from" lines; others use full tier lines.
  if (serviceCode === "WEB") return list.map(formatFromLine);
  return list.map(formatTierLine);
}

// "Funeral coverage starts from R1,500 for photography, R2,000 for videography, or R3,500 for both."
export function startsFromBlurb(serviceCode, noun) {
  const p = PRICE_FROM[serviceCode];
  if (!p) return null;
  return `${noun} starts from ${formatZAR(p.photo)} for photography, ${formatZAR(p.video)} for videography, or ${formatZAR(p.both)} for both.`;
}

// "Web projects usually start from R4,500 for landing pages, R12,000 for business websites, and R25,000+ for custom web apps."
export function webStartsFromBlurb() {
  const [landing, business, custom] = PACKAGES.WEB;
  return `Web projects usually start from ${formatZAR(landing.prices.from)} for landing pages, ${formatZAR(business.prices.from)} for business websites, and ${formatZAR(custom.prices.fromPlus)}+ for custom web apps.`;
}
