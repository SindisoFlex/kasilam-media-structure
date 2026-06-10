export const CHAT_INTENTS = {
  PRICING: "pricing",
  BOOKING: "booking",
  NAVIGATION: "navigation",
  AVAILABILITY: "availability",
  COMPARISON: "comparison",
  CLARIFICATION: "clarification",
  GENERAL_INQUIRY: "general_inquiry",
};

import { normalizeWithAudit as normalizeTextWithAudit, normalizeText } from "./lib/normalization-engine.js";
import { resolveCanonicalMapping } from "./lib/mapping-engine.js";
import { createTelemetryContext, emitTelemetryEvent, telemetryFlags } from "./lib/telemetry-engine.js";

function normalizeIntentText(userText) {
  return normalizeText(userText, { context: "intent" });
}

export function normalizeIntentTextWithAudit(userText) {
  return normalizeTextWithAudit(userText, { context: "intent" });
}

function includesAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function isShortClarifier(text) {
  return (
    text === "?" ||
    text === "ok" ||
    text === "okay" ||
    text === "yes" ||
    text === "no" ||
    text === "why" ||
    text === "how" ||
    text === "what" ||
    text === "which" ||
    text === "explain" ||
    text === "tell me more"
  );
}

export function detectIntent(userText, session = null) {
  const normalizedAudit = normalizeIntentTextWithAudit(userText);
  const normalized = normalizedAudit.normalizedText;
  const mapping = resolveCanonicalMapping(userText, {
    fallbackServiceId: session?.activeServiceId || null,
    session,
    sessionId: session?.sessionId,
    sourceSessionId: session?.sourceSessionId,
  });
  const lockedService = Boolean(session?.lockedService);
  const activeServiceId = session?.activeServiceId || null;

  let intent = CHAT_INTENTS.GENERAL_INQUIRY;

  if (
    includesAny(normalized, [
      "price",
      "pricing",
      "how much",
      "cost",
      "quote",
      "rates",
      "budget",
      "afford",
      "starting price",
      "expensive",
    ])
  ) {
    intent = CHAT_INTENTS.PRICING;
  } else if (
    includesAny(normalized, [
      "book",
      "booking",
      "reserve",
      "go ahead",
      "confirm",
      "secure the date",
      "want to proceed",
    ])
  ) {
    intent = CHAT_INTENTS.BOOKING;
  } else if (
    includesAny(normalized, [
      "available",
      "availability",
      "free on",
      "open on",
      "slot",
      "can you do",
    ])
  ) {
    intent = CHAT_INTENTS.AVAILABILITY;
  } else if (
    includesAny(normalized, [
      "link me",
      "show me",
      "take me",
      "open page",
      "go to",
      "page link",
      "where is the page",
      "visit",
      "navigate",
      "send me",
    ])
  ) {
    intent = CHAT_INTENTS.NAVIGATION;
  } else if (
    includesAny(normalized, [
      "difference",
      "compare",
      "comparison",
      "which is better",
      "versus",
      "vs",
      "between",
    ])
  ) {
    intent = CHAT_INTENTS.COMPARISON;
  } else if (
    isShortClarifier(normalized) ||
    includesAny(normalized, [
      "what do you mean",
      "can you clarify",
      "clarify",
      "not sure",
      "i dont understand",
      "i don't understand",
      "explain that",
    ])
  ) {
    intent = CHAT_INTENTS.CLARIFICATION;
  }

  const result = {
    intent,
    activeServiceId,
    lockedService,
    preserveActiveService: lockedService && Boolean(activeServiceId),
    serviceContextChanged: false,
    normalizedText: normalized,
    normalizationAudit: normalizedAudit.audit,
    normalizationConfidence: normalizedAudit.confidence,
    canonicalServiceId: mapping.canonicalServiceId,
    canonicalProductCode: mapping.canonicalProductCode,
    mappingMetadata: mapping,
    mappingConfidence: mapping.confidenceScore,
    mappingAmbiguity: mapping.ambiguityDetected,
    mappingCollision: mapping.collisionDetected,
  };
  const telemetryContext = createTelemetryContext(session, { origin: "chat-intents" });
  emitTelemetryEvent(
    "intent_detected",
    {
      mappingMethod: mapping.mappingMethod,
      confidenceScore: mapping.confidenceScore,
      confidenceLabel: mapping.confidenceLabel,
      ambiguityDetected: mapping.ambiguityDetected,
      collisionDetected: mapping.collisionDetected,
      fallbackUsed: mapping.fallbackUsed,
      canonicalId: mapping.canonicalServiceId || mapping.canonicalProductCode || null,
      canonicalServiceId: mapping.canonicalServiceId,
      canonicalProductCode: mapping.canonicalProductCode,
      normalizedInput: normalized,
      featureFlags: telemetryFlags(),
      metadata: {
        intent,
      },
    },
    telemetryContext
  );
  return result;
}
