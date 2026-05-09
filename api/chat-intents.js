export const CHAT_INTENTS = {
  PRICING: "pricing",
  BOOKING: "booking",
  NAVIGATION: "navigation",
  AVAILABILITY: "availability",
  COMPARISON: "comparison",
  CLARIFICATION: "clarification",
  GENERAL_INQUIRY: "general_inquiry",
};

function normalizeIntentText(userText) {
  return String(userText || "")
    .toLowerCase()
    .replace(/linky\s*me/g, "link me")
    .replace(/linky/g, "link")
    .replace(/back\s*price/g, "basic price")
    .replace(/where\s*page/g, "where is the page")
    .replace(/page\s*link/g, "page link")
    .replace(/book\s*me/g, "can i book")
    .replace(/\s+/g, " ")
    .trim();
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
  const normalized = normalizeIntentText(userText);
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

  return {
    intent,
    activeServiceId,
    lockedService,
    preserveActiveService: lockedService && Boolean(activeServiceId),
    serviceContextChanged: false,
    normalizedText: normalized,
  };
}
