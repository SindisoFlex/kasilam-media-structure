// Label / legacy-id → canonical service code resolution.
// Used by both the chatbot and the BookingFlow so both pipelines stamp
// the same `serviceCode` / `packageCode` into bookingMemory and persistence.

import { SERVICES } from "./services.js";
import { PACKAGES } from "./packages.js";

function norm(s) {
  return String(s || "").toLowerCase().trim();
}

export function resolveServiceCode(input) {
  if (!input) return null;
  const n = norm(input);
  for (const svc of Object.values(SERVICES)) {
    if (norm(svc.code) === n) return svc.code;
    if (norm(svc.label) === n) return svc.code;
    if (svc.legacyIds?.some((id) => norm(id) === n)) return svc.code;
  }
  // keyword sniff — mirrors getServiceCategory() heuristics
  if (/(funeral|memorial)/.test(n)) return "FUNERAL";
  if (/wedding/.test(n)) return "WEDDING";
  if (/(birthday|community|cultural|event)/.test(n)) return "COMMUNITY";
  if (/(corporate|business)/.test(n)) return "CORPORATE";
  if (/(creator|artist|musician)/.test(n)) return "CREATORS";
  if (/(audio|recording|podcast|voice|mix|master|studio|music)/.test(n)) return "AUDIO";
  if (/(web|site|website|landing|app)/.test(n)) return "WEB";
  if (/(digital|social|marketing|ads?|content|analytics)/.test(n)) return "DIGITAL";
  return null;
}

export function resolvePackageCode(serviceCode, input) {
  if (!serviceCode || !input) return null;
  const n = norm(input);
  const list = PACKAGES[serviceCode] || [];
  for (const pkg of list) {
    if (norm(pkg.code) === n) return pkg.code;
    if (norm(pkg.tier) === n) return pkg.code;
    if (norm(pkg.tier).includes(n) || n.includes(norm(pkg.tier))) return pkg.code;
  }
  return null;
}

export function getServiceByCode(code) {
  return code ? SERVICES[code] || null : null;
}
