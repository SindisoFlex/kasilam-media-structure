import {
  extractContinuityChain,
  buildWhatsAppContinuityReference,
} from './chat-continuity-chain.js';

const SITE_BASE_URL = "https://kasilammedia.co.za";
const WHATSAPP_BASE_URL = "https://wa.me/27659704101";

const SERVICE_HANDOFFS = {
  funeral_photography: {
    label: "Funeral Photography",
    route: "/services/visual-production/funeral-coverage",
  },
  wedding_coverage: {
    label: "Wedding Production",
    route: "/services/visual-production/wedding-production",
  },
  birthday_photography: {
    label: "Event Photography",
    route: "/services/visual-production/community-events",
  },
  web_development: {
    label: "Web & App Development",
    route: "/services/web-development",
  },
  audio_production: {
    label: "Audio Production",
    route: "/services/audio-production",
  },
  branding_marketing: {
    label: "Digital Solutions",
    route: "/services/digital-marketing",
  },
};

function joinUrl(route) {
  return route ? `${SITE_BASE_URL}${route}` : `${SITE_BASE_URL}/services`;
}

function formatScope(scope) {
  if (!scope) return null;
  if (scope === "photo and video") return "Photo + Video";
  if (scope === "photo") return "Photography";
  if (scope === "video") return "Videography";
  return scope
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getExactServicePageUrl(serviceId) {
  return joinUrl(SERVICE_HANDOFFS[serviceId]?.route);
}

export function buildBookingSummary(session) {
  const serviceId = session?.activeServiceId || null;
  const config = SERVICE_HANDOFFS[serviceId] || null;
  const memory = session?.bookingMemory || {};

  const lines = [];
  if (config?.label) lines.push(`Service: ${config.label}`);
  if (memory.date) lines.push(`Date: ${memory.date}`);
  if (memory.location) lines.push(`Location: ${memory.location}`);
  if (memory.scope) lines.push(`Scope: ${formatScope(memory.scope)}`);
  if (memory.customerName) lines.push(`Name: ${memory.customerName}`);
  if (memory.customerPhone) lines.push(`Phone: ${memory.customerPhone}`);
  if (memory.customerEmail) lines.push(`Email: ${memory.customerEmail}`);

  return lines.join("\n");
}

export function buildWhatsAppPrefillUrl(session) {
  const summary = buildBookingSummary(session);
  const servicePageUrl = getExactServicePageUrl(session?.activeServiceId);
  const messageLines = [
    "Hi KMP, I'd like to continue this booking.",
    summary,
    `Service page: ${servicePageUrl}`,
  ].filter(Boolean);

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(messageLines.join("\n"))}`;
}

/**
 * BRICK A.2.3: Enhanced WhatsApp prefill URL with continuity reference.
 * 
 * Includes refNumber and sourceSessionId in WhatsApp message so operators
 * can deterministically look up booking without manual pattern matching.
 * 
 * Backward compatible: Falls back to standard URL if continuity data unavailable.
 */
export function buildWhatsAppPrefillUrlWithContinuity(session) {
  const summary = buildBookingSummary(session);
  const servicePageUrl = getExactServicePageUrl(session?.activeServiceId);
  
  // Extract continuity chain for deterministic operator lookup
  const continuityChain = extractContinuityChain(session?.bookingMemory);
  const continuityRef = buildWhatsAppContinuityReference(continuityChain);
  
  const messageLines = [
    "Hi KMP, I'd like to continue this booking.",
    summary,
    `Service page: ${servicePageUrl}`,
  ];
  
  // BRICK A.2.3: Append continuity reference if available
  if (continuityRef) {
    messageLines.push(`\n📋 Reference: ${continuityRef}`);
  }

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(messageLines.join("\n"))}`;
}

export function buildBookingCta(session) {
  const summary = buildBookingSummary(session);
  if (!summary) return null;

  return {
    type: "whatsapp",
    url: buildWhatsAppPrefillUrlWithContinuity(session),
    label: "Continue on WhatsApp",
    summary,
    servicePageUrl: getExactServicePageUrl(session?.activeServiceId),
    continuityEnabled: true,
  };
}
