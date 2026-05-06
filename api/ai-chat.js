import fs from "fs";
import { fileURLToPath } from "url";

// Use a current, supported Gemini model on the v1beta endpoint.
// "gemini-pro" on v1 has been deprecated and returns empty candidates.
const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const MAX_HISTORY_MESSAGES = 20;
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
const MAX_GEMINI_ATTEMPTS = 3;
const RETRY_DELAY_MS = 400;
const SITE_BASE_URL = "https://kasilammedia.co.za";
const WHATSAPP_NUMBER = "+27659704101";
const CONTACT_PAGE_URL = `${SITE_BASE_URL}/contact`;

const SERVICE_CONTEXTS = {
  funeral_photography: {
    id: "funeral_photography",
    slug: "funeral-photography",
    name: "Funeral & Memorial Coverage",
    categoryId: "visual-production",
    parent: "Creative & Visual Production",
    route: "/services/visual-production/funeral-coverage",
    categoryRoute: "/services/visual-production",
    pageSectionLabel: "See Funeral & Memorial Coverage section.",
    intro:
      "This service falls under our Funeral & Memorial Coverage section in Creative & Visual Production.",
    description:
      "We handle memorial and funeral photography or photo-video coverage with a respectful, discreet approach.",
    pricingType: "exact",
    exactPricing: [
      "Basic Memorial Coverage: Photography R1,500 | Videography R2,000 | Photo + Video R3,500",
      "Standard Memorial Coverage: Photography R2,200 | Videography R2,800 | Photo + Video R4,200",
      "Complete Memorial Coverage: Photography R3,000 | Videography R3,500 | Photo + Video R5,200",
    ],
    followUps: [
      "What date is the service?",
      "What location will the service be held at?",
      "Do you need photography only or photo + video coverage?",
      "What estimated duration should we plan for?",
    ],
  },
  birthday_photography: {
    id: "birthday_photography",
    slug: "birthday-photography",
    name: "Community & Cultural Events",
    categoryId: "visual-production",
    parent: "Creative & Visual Production",
    route: "/services/visual-production/community-events",
    categoryRoute: "/services/visual-production",
    pageSectionLabel: "See Community & Cultural Events section.",
    intro:
      "This request fits our Community & Cultural Events section in Creative & Visual Production.",
    description:
      "We cover birthdays, private celebrations, and event media with photography or full visual coverage.",
    pricingType: "tailored",
    followUps: [
      "What date is the birthday event?",
      "What venue or location is it at?",
      "About how many guests are expected?",
      "Do you want photography only or full media coverage?",
    ],
  },
  wedding_coverage: {
    id: "wedding_coverage",
    slug: "wedding-coverage",
    name: "Wedding Production",
    categoryId: "visual-production",
    parent: "Creative & Visual Production",
    route: "/services/visual-production/wedding-production",
    categoryRoute: "/services/visual-production",
    pageSectionLabel: "See Wedding Production section.",
    intro:
      "This falls under our Wedding Production section in Creative & Visual Production.",
    description:
      "We cover weddings with cinematic photography, videography, or combined coverage.",
    pricingType: "exact",
    exactPricing: [
      "Essential Coverage: Photography R4,500 | Videography R5,000 | Photo + Video R7,500",
      "Classic Coverage: Photography R6,500 | Videography R7,500 | Photo + Video R12,000",
      "Full Day Coverage: Photography R9,000 | Videography R10,500 | Photo + Video R16,500",
    ],
    followUps: [
      "What is the wedding date?",
      "Where will the ceremony or main venue be?",
      "Is this a traditional wedding, white wedding, or both?",
      "Do you need photography only, videography only, or both?",
    ],
  },
  web_development: {
    id: "web_development",
    slug: "web-development",
    name: "Web & App Development",
    categoryId: "digital-solutions",
    parent: "Digital Solutions",
    route: "/services/web-development",
    categoryRoute: "/services/digital-marketing",
    pageSectionLabel: "See Web & App Development section.",
    intro:
      "This falls under our Web & App Development section in Digital Solutions.",
    description:
      "We build landing pages, business websites, and custom web apps designed to convert visitors into clients.",
    pricingType: "hybrid",
    exactPricing: [
      "Landing-page websites from R4,500",
      "Business websites from R12,000",
      "Custom web apps from R25,000+",
    ],
    followUps: [
      "Do you need a landing page, business website, or custom web app?",
      "What is the main goal of the website?",
      "Do you already have branding, content, or reference sites?",
      "What timeline are you working toward?",
    ],
  },
  audio_production: {
    id: "audio_production",
    slug: "audio-production",
    name: "Audio Production",
    categoryId: "audio-production",
    parent: "Audio Production",
    route: "/services/audio-production",
    categoryRoute: "/services/audio-production",
    pageSectionLabel: "See Audio Production services.",
    intro: "This request falls under our Audio Production section.",
    description:
      "We handle recording, mixing, mastering, podcast production, and voiceover work.",
    pricingType: "tailored",
    followUps: [
      "What type of audio project do you need help with?",
      "Do you need recording, mixing, mastering, or full production support?",
      "When would you like to start?",
      "Do you already have raw files, a script, or a brief ready?",
    ],
  },
  branding_marketing: {
    id: "branding_marketing",
    slug: "branding-marketing",
    name: "Digital Solutions",
    categoryId: "digital-solutions",
    parent: "Digital Solutions",
    route: "/services/digital-marketing",
    categoryRoute: "/services/digital-marketing",
    pageSectionLabel: "See Digital Solutions services.",
    intro:
      "This falls under our Digital Solutions section for branding, content, and digital marketing support.",
    description:
      "We support brand visibility through content creation, social media management, paid advertising, and strategy.",
    pricingType: "tailored",
    followUps: [
      "Is your priority branding, content creation, social media management, or paid advertising?",
      "What business or brand are we promoting?",
      "What result do you want most right now: awareness, leads, or sales?",
      "Do you already have brand assets and content, or do you need us to create them?",
    ],
  },
};

let cachedKnowledge = null;
function loadKnowledge() {
  if (cachedKnowledge) return cachedKnowledge;
  const filePath = fileURLToPath(
    new URL("../public/data/kmp_knowledge.json", import.meta.url)
  );
  const fileData = fs.readFileSync(filePath, "utf-8");
  cachedKnowledge = JSON.parse(fileData);
  return cachedKnowledge;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRetryDelayMs(retryAfterHeader) {
  if (!retryAfterHeader) return null;

  const numericSeconds = Number(retryAfterHeader);
  if (Number.isFinite(numericSeconds) && numericSeconds >= 0) {
    return numericSeconds * 1000;
  }

  const parsedDate = Date.parse(retryAfterHeader);
  if (Number.isNaN(parsedDate)) return null;

  const delayMs = parsedDate - Date.now();
  return delayMs > 0 ? delayMs : null;
}

function normalizeMessages(body) {
  const rawMessages = Array.isArray(body?.messages)
    ? body.messages
    : typeof body?.message === "string"
      ? [{ role: "user", content: body.message }]
      : [];

  return rawMessages
    .filter((message) => {
      return (
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim()
      );
    })
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }));
}

function buildGeminiContents(messages) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

function isRetryableGeminiError(status, data) {
  if (RETRYABLE_STATUSES.has(status)) return true;

  const message = data?.error?.message;
  if (typeof message !== "string") return false;

  const lowered = message.toLowerCase();
  return (
    lowered.includes("overloaded") ||
    lowered.includes("high demand") ||
    lowered.includes("rate limit") ||
    lowered.includes("temporarily unavailable") ||
    lowered.includes("resource exhausted")
  );
}

function isFallbackWorthyGeminiError(status, data) {
  if (isRetryableGeminiError(status, data)) return true;

  const message = data?.error?.message;
  if (typeof message !== "string") return false;

  const lowered = message.toLowerCase();
  return (
    lowered.includes("quota") ||
    lowered.includes("rate limit") ||
    lowered.includes("resource exhausted") ||
    lowered.includes("expired") ||
    lowered.includes("deprecated") ||
    lowered.includes("not found") ||
    lowered.includes("unsupported")
  );
}

function getLatestUserMessage(messages) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index]?.role === "user") {
      return messages[index].content.toLowerCase();
    }
  }

  return "";
}

function joinUrl(route) {
  return route ? `${SITE_BASE_URL}${route}` : SITE_BASE_URL;
}

function pickFirstSentence(text, fallback) {
  if (typeof text !== "string" || !text.trim()) return fallback;
  const trimmed = text.trim();
  const match = trimmed.match(/.+?[.!?](\s|$)/);
  return (match ? match[0] : trimmed).trim();
}

function detectIntent(userText) {
  const text = normalizeIntentText(userText);

  if (text.includes("funeral")) {
    return "funeral";
  }

  if (
    text.includes("branding") ||
    text.includes("social media") ||
    text.includes("paid advertising") ||
    text.includes("digital marketing") ||
    text.includes("marketing")
  ) {
    return "digital_marketing";
  }

  if (
    text.includes("birthday") ||
    text.includes("21st") ||
    text.includes("photoshoot") ||
    text.includes("photo") ||
    text.includes("photography")
  ) {
    return "visual";
  }

  if (
    text.includes("web design") ||
    text.includes("website") ||
    text.includes("web development") ||
    text.includes("digital marketing")
  ) {
    return "web_design";
  }

  if (
    text.includes("voiceover") ||
    text.includes("recording") ||
    text.includes("studio recording")
  ) {
    return "audio";
  }

  return "default";
}

function detectIntentOrNull(userText) {
  const detected = detectIntent(userText);
  return detected === "default" ? null : detected;
}

function normalizeIntentText(userText) {
  return userText
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

function isGeneralServicesRequest(text) {
  return (
    text.includes("all services") ||
    text.includes("all your services") ||
    text.includes("everything you offer") ||
    text.includes("all pricing") ||
    text.includes("price list") ||
    text.includes("full price list")
  );
}

function detectServiceContext(userText) {
  const text = normalizeIntentText(userText);

  if (
    text.includes("funeral") ||
    text.includes("memorial") ||
    text.includes("burial")
  ) {
    return "funeral_photography";
  }

  if (
    text.includes("wedding") ||
    text.includes("traditional wedding") ||
    text.includes("white wedding") ||
    text.includes("lobola")
  ) {
    return "wedding_coverage";
  }

  if (
    text.includes("birthday") ||
    text.includes("party") ||
    text.includes("21st") ||
    text.includes("celebration")
  ) {
    return "birthday_photography";
  }

  if (
    text.includes("website") ||
    text.includes("web design") ||
    text.includes("web development") ||
    text.includes("web app") ||
    text.includes("landing page")
  ) {
    return "web_development";
  }

  if (
    text.includes("recording") ||
    text.includes("studio") ||
    text.includes("mixing") ||
    text.includes("mastering") ||
    text.includes("podcast") ||
    text.includes("voiceover") ||
    text.includes("music production") ||
    text.includes("audio")
  ) {
    return "audio_production";
  }

  if (
    text.includes("branding") ||
    text.includes("brand identity") ||
    text.includes("digital marketing") ||
    text.includes("social media") ||
    text.includes("paid advertising") ||
    text.includes("ads") ||
    text.includes("content creation") ||
    text.includes("marketing")
  ) {
    return "branding_marketing";
  }

  if (
    text.includes("photoshoot") ||
    text.includes("photography") ||
    text.includes("videography") ||
    text.includes("photo + video")
  ) {
    return "birthday_photography";
  }

  return null;
}

function resolveActiveServiceContext(messages) {
  let activeContext = null;

  for (const message of messages) {
    if (message?.role !== "user" || typeof message.content !== "string") continue;

    const lowered = normalizeIntentText(message.content);
    if (isGeneralServicesRequest(lowered)) {
      activeContext = null;
      continue;
    }

    const detected = detectServiceContext(lowered);
    if (detected) activeContext = detected;
  }

  return activeContext;
}

function resolveLastDetectedIntent(messages) {
  let lastIntent = null;

  for (const message of messages) {
    if (message?.role !== "user" || typeof message.content !== "string") continue;

    const detected = detectIntentOrNull(message.content);
    if (detected) lastIntent = detected;
  }

  return lastIntent;
}

function createEmptyBookingMemory() {
  return {
    service: null,
    date: null,
    location: null,
    scope: null,
  };
}

function mapServiceToBookingService(serviceId, lastIntent = null) {
  if (serviceId === "funeral_photography") return "funeral";
  if (
    serviceId === "birthday_photography" ||
    serviceId === "wedding_coverage"
  ) {
    return "visual";
  }
  if (serviceId === "audio_production") return "audio";
  if (
    serviceId === "web_development" ||
    serviceId === "branding_marketing"
  ) {
    return "digital";
  }

  if (lastIntent === "funeral") return "funeral";
  if (lastIntent === "visual") return "visual";
  if (lastIntent === "audio") return "audio";
  if (
    lastIntent === "web_design" ||
    lastIntent === "digital_marketing"
  ) {
    return "digital";
  }

  return null;
}

function extractDateValue(text) {
  if (typeof text !== "string") return null;

  const trimmed = text.trim();
  if (!trimmed) return null;

  const monthPattern = /\b(\d{1,2}\s+(?:jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|sept|september|oct|october|nov|november|dec|december)(?:\s+\d{2,4})?)\b/i;
  const slashPattern = /\b(\d{1,2}[\/-]\d{1,2}(?:[\/-]\d{2,4})?)\b/;
  const isoPattern = /\b(\d{4}-\d{2}-\d{2})\b/;
  const relativePattern = /\b(today|tomorrow|this weekend|next weekend|next week|this friday|this saturday|this sunday|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i;

  return (
    trimmed.match(isoPattern)?.[1] ||
    trimmed.match(monthPattern)?.[1] ||
    trimmed.match(slashPattern)?.[1] ||
    trimmed.match(relativePattern)?.[1] ||
    null
  );
}

function extractScopeValue(text, serviceId = null) {
  if (typeof text !== "string") return null;
  const normalized = normalizeIntentText(text);

  if (
    normalized.includes("photo and video") ||
    normalized.includes("photos and video") ||
    normalized.includes("photography and videography") ||
    normalized.includes("both") ||
    normalized.includes("full coverage")
  ) {
    return "photo and video";
  }

  if (
    normalized.includes("photo + video") ||
    (normalized.includes("photo") && normalized.includes("video"))
  ) {
    return "photo and video";
  }

  if (
    serviceId === "web_development" ||
    normalized.includes("landing page") ||
    normalized.includes("business website") ||
    normalized.includes("custom web app") ||
    normalized.includes("redesign") ||
    normalized.includes("new website")
  ) {
    if (normalized.includes("landing page")) return "landing page";
    if (normalized.includes("business website")) return "business website";
    if (normalized.includes("custom web app")) return "custom web app";
    if (normalized.includes("redesign")) return "redesign";
    if (normalized.includes("new website")) return "new website";
  }

  if (
    serviceId === "branding_marketing" ||
    normalized.includes("branding") ||
    normalized.includes("content") ||
    normalized.includes("social media") ||
    normalized.includes("ads") ||
    normalized.includes("advertising")
  ) {
    if (normalized.includes("branding")) return "branding";
    if (normalized.includes("social media")) return "social media";
    if (normalized.includes("content")) return "content";
    if (normalized.includes("ads") || normalized.includes("advertising")) {
      return "paid ads";
    }
  }

  if (
    serviceId === "audio_production" ||
    normalized.includes("recording") ||
    normalized.includes("mixing") ||
    normalized.includes("mastering") ||
    normalized.includes("voiceover") ||
    normalized.includes("podcast")
  ) {
    if (normalized.includes("voiceover")) return "voiceover";
    if (normalized.includes("podcast")) return "podcast";
    if (normalized.includes("mixing")) return "mixing";
    if (normalized.includes("mastering")) return "mastering";
    if (normalized.includes("recording")) return "recording";
  }

  if (
    normalized.includes("photography") ||
    normalized.includes("photo") ||
    normalized.includes("photos")
  ) {
    return "photo";
  }

  if (
    normalized.includes("videography") ||
    normalized.includes("video")
  ) {
    return "video";
  }

  return null;
}

function getScopePriority(scope) {
  if (!scope) return 0;
  if (scope === "photo and video") return 4;
  if (
    scope === "custom web app" ||
    scope === "business website" ||
    scope === "landing page" ||
    scope === "new website" ||
    scope === "redesign"
  ) {
    return 4;
  }
  if (
    scope === "recording" ||
    scope === "mixing" ||
    scope === "mastering" ||
    scope === "voiceover" ||
    scope === "podcast" ||
    scope === "branding" ||
    scope === "social media" ||
    scope === "content" ||
    scope === "paid ads"
  ) {
    return 3;
  }
  if (scope === "photo" || scope === "video") return 2;
  return 1;
}

function cleanLocationCandidate(text) {
  return text
    .replace(/^(in|at|from|around|near)\s+/i, "")
    .replace(/^(venue|location)\s*(is|:)?\s*/i, "")
    .replace(/[?.!,]+$/g, "")
    .trim();
}

function extractLocationValue(text, memory = null) {
  if (typeof text !== "string") return null;

  const trimmed = text.trim();
  const normalized = normalizeIntentText(trimmed);
  if (!trimmed) return null;

  const directPattern = /\b(?:in|at|from|venue is|venue:|location is|location:)\s+([a-zA-Z][a-zA-Z\s'-]{1,60})/i;
  const directMatch = trimmed.match(directPattern);
  if (directMatch?.[1]) {
    return cleanLocationCandidate(directMatch[1]);
  }

  const looksLikeQuestion =
    normalized.includes("where") ||
    normalized.includes("price") ||
    normalized.includes("available") ||
    normalized.includes("book");
  const looksLikeDate = !!extractDateValue(trimmed);
  const looksLikeScope = !!extractScopeValue(trimmed, memory?.service);

  if (
    memory?.date &&
    !looksLikeQuestion &&
    !looksLikeDate &&
    !looksLikeScope &&
    trimmed.split(/\s+/).length <= 4
  ) {
    return cleanLocationCandidate(trimmed);
  }

  return null;
}

function inferBookingMemory(messages, activeServiceId, lastDetectedIntent) {
  const memory = createEmptyBookingMemory();

  if (activeServiceId) {
    memory.service = mapServiceToBookingService(activeServiceId, lastDetectedIntent);
  }

  for (const message of messages) {
    if (message?.role !== "user" || typeof message.content !== "string") continue;

    const lowered = normalizeIntentText(message.content);
    const detectedServiceId = detectServiceContext(lowered);
    if (detectedServiceId) {
      memory.service = mapServiceToBookingService(detectedServiceId, lastDetectedIntent);
    }

    if (!memory.date) {
      const dateValue = extractDateValue(message.content);
      if (dateValue) memory.date = dateValue;
    }

    {
      const scopeValue = extractScopeValue(message.content, detectedServiceId || activeServiceId);
      if (getScopePriority(scopeValue) >= getScopePriority(memory.scope)) {
        memory.scope = scopeValue || memory.scope;
      }
    }

    {
      const locationValue = extractLocationValue(message.content, memory);
      if (locationValue) memory.location = locationValue;
    }
  }

  return memory;
}

function getRequiredBookingFields(context, bookingMemory) {
  if (context?.id === "funeral_photography") {
    return ["service", "date", "location", "scope"];
  }

  if (
    context?.id === "birthday_photography" ||
    context?.id === "wedding_coverage"
  ) {
    return ["service", "date", "location", "scope"];
  }

  if (context?.id === "audio_production") {
    return ["service", "date", "scope"];
  }

  if (
    context?.id === "web_development" ||
    context?.id === "branding_marketing"
  ) {
    return ["service", "scope"];
  }

  if (bookingMemory?.service === "funeral" || bookingMemory?.service === "visual") {
    return ["service", "date", "location", "scope"];
  }

  if (bookingMemory?.service === "audio") {
    return ["service", "date", "scope"];
  }

  if (bookingMemory?.service === "digital") {
    return ["service", "scope"];
  }

  return ["service"];
}

function getMissingBookingFields(bookingMemory, requiredFields) {
  return requiredFields.filter((field) => !bookingMemory?.[field]);
}

function isShortContextualFollowUp(text) {
  const normalized = normalizeIntentText(text);
  return (
    /^price\??$/i.test(normalized) ||
    /^pricing\??$/i.test(normalized) ||
    /^basic price\??$/i.test(normalized) ||
    /^how much\??$/i.test(normalized) ||
    /^how much basic\??$/i.test(normalized) ||
    /^available\??$/i.test(normalized) ||
    /^availability\??$/i.test(normalized) ||
    /^where\??$/i.test(normalized) ||
    /^where is the page\??$/i.test(normalized) ||
    /^when\??$/i.test(normalized) ||
    /^book\??$/i.test(normalized) ||
    /^can i book\??$/i.test(normalized) ||
    /^link me\??$/i.test(normalized)
  );
}

function isPricingQuestion(text) {
  const normalized = normalizeIntentText(text);
  return (
    normalized.includes("price") ||
    normalized.includes("pricing") ||
    normalized.includes("how much") ||
    normalized.includes("quote") ||
    normalized.includes("cost") ||
    normalized.includes("starting price") ||
    normalized.includes("rates")
  );
}

function detectPriceIntent(text) {
  const normalized = normalizeIntentText(text);
  const priceKeywords = [
    "price",
    "cost",
    "how much",
    "starting price",
    "rates",
    "pricing",
    "quote",
    "expensive",
    "afford",
    "budget",
  ];
  return priceKeywords.some((keyword) => normalized.includes(keyword));
}

function detectNavigationIntent(text) {
  const normalized = normalizeIntentText(text);
  const navigationKeywords = [
    "take me",
    "show me",
    "open page",
    "go to",
    "link me",
    "page link",
    "where page",
    "send me",
    "visit",
    "navigate",
  ];
  return navigationKeywords.some((keyword) => normalized.includes(keyword));
}

function isAvailabilityQuestion(text) {
  const normalized = normalizeIntentText(text);
  return (
    normalized.includes("available") ||
    normalized.includes("availability") ||
    normalized.includes("free on") ||
    normalized.includes("open on")
  );
}

function isLocationQuestion(text) {
  return normalizeIntentText(text).includes("where");
}

function isDateQuestion(text) {
  const normalized = normalizeIntentText(text);
  return normalized.includes("when") || normalized.includes("date");
}

function isPageRequest(text) {
  const normalized = normalizeIntentText(text);
  return (
    normalized.includes("link") ||
    normalized.includes("page") ||
    normalized.includes("where is the page") ||
    normalized.includes("route")
  );
}

function isBookingIntent(text) {
  const normalized = normalizeIntentText(text);
  return (
    normalized.includes("book") ||
    normalized.includes("price") ||
    normalized.includes("how much") ||
    normalized.includes("available") ||
    normalized.includes("availability") ||
    normalized.includes("date") ||
    normalized.includes("reserve") ||
    normalized.includes("go ahead")
  );
}

function isShortUserQuery(text) {
  const normalized = normalizeIntentText(text);
  if (!normalized) return false;

  return (
    isShortContextualFollowUp(normalized) ||
    normalized.split(" ").length <= 4
  );
}

function detectConversationStage(latestUserMessage) {
  const text = normalizeIntentText(latestUserMessage);

  if (isBookingIntent(text)) return "booking";
  if (isPageRequest(text)) return "page_reference";
  if (isPricingQuestion(text)) return "pricing";
  if (isAvailabilityQuestion(text)) return "availability";
  if (isLocationQuestion(text) || isDateQuestion(text)) return "qualification";
  return "interest";
}

function inferConversationState(messages) {
  const activeServiceId = resolveActiveServiceContext(messages);
  const activeContext = activeServiceId ? SERVICE_CONTEXTS[activeServiceId] : null;
  const latestUserMessage = getLatestUserMessage(messages);
  const lastDetectedIntent = resolveLastDetectedIntent(messages);
  const userMessageCount = messages.filter((message) => message?.role === "user").length;
  const bookingMemory = inferBookingMemory(messages, activeServiceId, lastDetectedIntent);
  const requiredBookingFields = getRequiredBookingFields(activeContext, bookingMemory);
  const missingBookingFields = getMissingBookingFields(bookingMemory, requiredBookingFields);

  return {
    activeService: activeContext?.slug || null,
    activeCategory: activeContext?.categoryId || null,
    lastDetectedIntent,
    bookingMemory,
    requiredBookingFields,
    missingBookingFields,
    nextMissingBookingField: missingBookingFields[0] || null,
    conversationStage: detectConversationStage(latestUserMessage),
    hasShortQuery: isShortUserQuery(latestUserMessage),
    userMessageCount,
  };
}

function formatExactPricing(lines) {
  return lines.map((line) => `- ${line}`).join("\n");
}

function pickVariant(options, seed = "") {
  if (!Array.isArray(options) || options.length === 0) return "";
  const normalizedSeed = String(seed || "");
  const total = normalizedSeed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return options[total % options.length];
}

function compactReplyLines(lines) {
  return lines.filter(Boolean).slice(0, 4).join("\n");
}

function compactServiceSummary(context) {
  if (!context) return "We can point you to the right service quickly.";

  if (context.id === "funeral_photography") {
    return "Respectful photo or photo-video coverage for memorial services.";
  }

  if (context.id === "birthday_photography") {
    return "Photo and event coverage that captures the key moments and energy well.";
  }

  if (context.id === "web_development") {
    return "Websites and web apps built around clear business goals and conversions.";
  }

  if (context.id === "branding_marketing") {
    return "Digital support focused on visibility, leads, and stronger brand presence.";
  }

  if (context.id === "audio_production") {
    return "Recording and post-production support with a clean, polished final result.";
  }

  return context.description;
}

function getStartingPriceSummary(context) {
  if (!Array.isArray(context?.exactPricing) || context.exactPricing.length === 0) {
    return "Pricing depends on the scope and booking details.";
  }

  if (context.id === "funeral_photography") {
    return "Packages start from R1,500 for photography, R2,000 for videography, or R3,500 for both.";
  }

  if (context.id === "wedding_coverage") {
    return "Packages start from R4,500 for photography, R5,000 for videography, or R7,500 for both.";
  }

  return context.exactPricing[0];
}

function shouldEncourageWhatsApp(state) {
  return state?.userMessageCount >= 3;
}

function getWhatsAppGuidance(context, state, bookingFocused) {
  if (bookingFocused) {
    return `If you'd like to lock this in faster, WhatsApp us on ${WHATSAPP_NUMBER}.`;
  }

  if (shouldEncourageWhatsApp(state)) {
    return `If you'd like, we can continue this on WhatsApp at ${WHATSAPP_NUMBER}.`;
  }

  if (context?.id === "funeral_photography") {
    return `If it helps, we can also assist directly on WhatsApp at ${WHATSAPP_NUMBER}.`;
  }

  return `You can also message us on WhatsApp at ${WHATSAPP_NUMBER}.`;
}

function getQualificationQuestion(context) {
  if (!context) return "What kind of service are you looking for help with?";

  if (context.id === "funeral_photography") {
    return "Do you already have the date and location for the service?";
  }

  if (context.id === "birthday_photography") {
    return "Do you already have the date and venue in mind for the event?";
  }

  if (context.id === "web_development") {
    return "Are you looking for a new website, a redesign, or a custom web app?";
  }

  if (context.id === "branding_marketing") {
    return "What is the scope of the project: branding, content, social media, ads, or a broader campaign?";
  }

  if (context.id === "audio_production") {
    return "What kind of audio project are you planning?";
  }

  return "Would you like me to help with the next step?";
}

function getServiceValueLine(context) {
  if (!context) {
    return "We can help you find the best fit quickly so you know where to start.";
  }

  if (context.id === "funeral_photography") {
    return "We focus on discreet, well-organized coverage so your family can concentrate on the day.";
  }

  if (context.id === "birthday_photography") {
    return "We make sure the key moments, energy, and details of the event are captured beautifully.";
  }

  if (context.id === "web_development") {
    return "We build with clear business goals in mind so the final product supports leads, trust, and growth.";
  }

  if (context.id === "branding_marketing") {
    return "We shape the work around visibility, consistency, and results that matter to your brand.";
  }

  if (context.id === "audio_production") {
    return "We keep the process clean and focused so the final sound is ready for release or delivery.";
  }

  return "We tailor the service around what you need so the process feels straightforward from the start.";
}

function buildBookingMemorySummary(state) {
  const memory = state?.bookingMemory;
  if (!memory) return null;

  const parts = [];
  if (memory.date) parts.push(`date: ${memory.date}`);
  if (memory.location) parts.push(`location: ${memory.location}`);
  if (memory.scope) parts.push(`scope: ${memory.scope}`);

  return parts.length ? `So far I have ${parts.join(", ")}.` : null;
}

function isBookingMemoryComplete(state) {
  return Array.isArray(state?.requiredBookingFields) && state.requiredBookingFields.length > 0 && state.missingBookingFields?.length === 0;
}

function getReadyToBookLine(context, state) {
  const summary = buildBookingMemorySummary(state);
  const intro = context
    ? `${context.name}: You're in the right place, and we handle that.`
    : "You're in the right place, and we can help with that.";

  return compactReplyLines([
    intro,
    summary || "I have the main booking details.",
    `More details: ${joinUrl(context?.route || context?.categoryRoute || "/contact")}`,
    `You can message us on WhatsApp at ${WHATSAPP_NUMBER} and we'll help you confirm the booking directly.`,
  ]);
}

function getBookingQuestion(context, state) {
  const nextField = state?.nextMissingBookingField;
  const bookingService = state?.bookingMemory?.service;

  if (nextField === "service") {
    return "What kind of service do you need help with?";
  }

  if (nextField === "date") {
    if (context?.id === "funeral_photography" || bookingService === "funeral") {
      return "What date is the service on?";
    }
    if (context?.id === "audio_production" || bookingService === "audio") {
      return "When would you like to start?";
    }
    return "What date do you have in mind?";
  }

  if (nextField === "location") {
    if (context?.id === "funeral_photography" || bookingService === "funeral") {
      return "What venue or exact address is the service at?";
    }
    return "What venue or exact address should I note?";
  }

  if (nextField === "scope") {
    if (context?.id === "web_development") {
      return "Is this a new website, a redesign, or a custom web app?";
    }
    if (context?.id === "branding_marketing") {
      return "What scope do you need help with: branding, content, ads, or digital marketing?";
    }
    if (context?.id === "audio_production" || bookingService === "audio") {
      return "Do you need recording, mixing, mastering, voiceover, or podcast support?";
    }
    return "Do you need photo, video, or both?";
  }

  return "Would you like me to help you move this booking forward on WhatsApp?";
}

function buildCompactContextReply(context, state, options = {}) {
  if (options.useSequentialBookingFlow !== false && isBookingMemoryComplete(state)) {
    return getReadyToBookLine(context, state);
  }

  const tone = getContextTone(context);
  const bookingFocused = options.bookingFocused || false;
  const memorySummary = buildBookingMemorySummary(state);
  const summary = options.summary || memorySummary || compactServiceSummary(context);
  const pageUrl = joinUrl(context.categoryRoute || context.route);
  const question = options.question || getBookingQuestion(context, state);
  const lineOne = bookingFocused
    ? `${context.name}: You're in the right place, and we handle that.`
    : `${context.name}: ${pickVariant(tone.leadOptions, `${context.id}:${options.stage || "interest"}`)}`;

  return compactReplyLines([
    lineOne,
    summary,
    `More details: ${pageUrl}`,
    `${getWhatsAppGuidance(context, state, bookingFocused)} ${question}`,
  ]);
}

function buildCompactGenericReply(info, state, options = {}) {
  if (options.useSequentialBookingFlow !== false && isBookingMemoryComplete(state)) {
    return getReadyToBookLine(null, state);
  }

  const bookingFocused = options.bookingFocused || false;
  const question = options.question || getBookingQuestion(null, state);
  const memorySummary = buildBookingMemorySummary(state);

  return compactReplyLines([
    bookingFocused
      ? `${info.serviceName}: You're in the right place, and we handle that.`
      : info.intro,
    options.summary || memorySummary || `${info.description} ${info.valueLine}`.trim(),
    `More details: ${info.url}`,
    `${getWhatsAppGuidance(null, state, bookingFocused)} ${question}`,
  ]);
}

function buildGeneralFallbackReply(options = {}) {
  const state = {
    userMessageCount: options.userMessageCount || 0,
    conversationStage: options.bookingFocused ? "booking" : "interest",
    lastDetectedIntent: null,
    bookingMemory: createEmptyBookingMemory(),
    requiredBookingFields: ["service"],
    missingBookingFields: ["service"],
    nextMissingBookingField: "service",
  };

  return compactReplyLines([
    options.lead || "You're in the right place, and we can help with pricing and bookings.",
    options.summary || "KMP covers visual production, audio work, and digital solutions.",
    `More details: ${options.url || CONTACT_PAGE_URL}`,
    `${getWhatsAppGuidance(null, state, !!options.bookingFocused)} ${options.question || "What kind of service do you need help with?"}`,
  ]);
}

function buildSafeFallbackResponse(messages, knowledge, state, options = {}) {
  const reply = options.preferBusy
    ? buildBusyFallbackReply(messages)
    : knowledge
      ? buildFallbackReply(messages, knowledge)
      : buildGeneralFallbackReply({
          lead: "You're in the right place, and we can still help with service information and bookings.",
          summary:
            "KMP handles a mix of visual production, audio work, and digital solutions.",
        });

  return {
    reply,
    fallback: true,
    model: GEMINI_MODEL,
    state,
  };
}

function getContextTone(context) {
  if (!context) {
    return {
      leadOptions: [
        "You're in the right place, and I can help point you to the right KMP service.",
        "We handle a range of bookings and projects, so I can point you in the right direction.",
        "That's something I can help you with by matching you to the right KMP service.",
      ],
      bookingTransitionOptions: [
        "If you'd like personal help from here,",
        "If you'd prefer to continue directly with our team,",
        "When you're ready to move forward,",
      ],
      bookingGuidance:
        `you can also message us on WhatsApp at ${WHATSAPP_NUMBER} and we'll assist you directly.`,
      followUpQuestion: "What kind of service are you looking for help with?",
    };
  }

  if (context.id === "funeral_photography") {
    return {
      leadOptions: [
        "You're in the right place, and we handle this with calm, respectful support.",
        "We handle funeral and memorial coverage with care, and I'm here to guide you.",
        "That's something we cover, and we approach it in a calm and respectful way.",
      ],
      bookingTransitionOptions: [
        "If you'd like us to help personally from here,",
        "When you're ready for direct assistance,",
        "If it helps,",
      ],
      bookingGuidance:
        `you can also message us on WhatsApp at ${WHATSAPP_NUMBER} and we'll assist you directly.`,
      followUpQuestion: "Do you already have the date and location for the service?",
    };
  }

  if (context.id === "birthday_photography") {
    return {
      leadOptions: [
        "You're in the right place, and we'd love to help capture the celebration.",
        "We handle this kind of event coverage, and it sounds like a great fit for us.",
        "That's something we cover, and we can help make sure the event is well captured.",
      ],
      bookingTransitionOptions: [
        "If you'd like to keep things moving,",
        "If you'd like direct help with the booking,",
        "When you're ready to lock in the details,",
      ],
      bookingGuidance:
        `you can also message us on WhatsApp at ${WHATSAPP_NUMBER} and we'll assist you directly.`,
      followUpQuestion: "Do you already have the date and venue in mind for the event?",
    };
  }

  if (
    context.id === "web_development" ||
    context.id === "branding_marketing"
  ) {
    return {
      leadOptions: [
        "You're in the right place, and we handle that through our digital solutions team.",
        "That's something we cover, and we can guide you through the right digital solution.",
        "We handle projects like this, and I can help you narrow down the best fit.",
      ],
      bookingTransitionOptions: [
        "If you'd like to continue with our team,",
        "If you'd like us to look at the project directly,",
        "When you're ready to take the next step,",
      ],
      bookingGuidance:
        `you can also message us on WhatsApp at ${WHATSAPP_NUMBER} and we'll assist you directly.`,
      followUpQuestion: getQualificationQuestion(context),
    };
  }

  return {
    leadOptions: [
      "We handle that, and I can help with the next step.",
      "You're in the right place, and we can help you from here.",
      "That's something we cover, and I can point you in the right direction.",
    ],
    bookingTransitionOptions: [
      "If you'd like direct help,",
      "If you'd prefer to continue with our team,",
      "When you're ready to move ahead,",
    ],
    bookingGuidance:
      `you can also message us on WhatsApp at ${WHATSAPP_NUMBER} and we'll assist you directly.`,
    followUpQuestion: getQualificationQuestion(context),
  };
}

function getContextPageLine(context) {
  return `You can also check out more details here:
${joinUrl(context.categoryRoute || context.route)}
${context.pageSectionLabel}`;
}

function buildContextFallbackReply(context, options = {}) {
  const tone = getContextTone(context);
  const variantSeed = `${context?.id || "default"}:${options.stage || "interest"}`;
  const {
    summary,
    valueLine = getServiceValueLine(context),
    bookingGuidance = `${pickVariant(tone.bookingTransitionOptions, variantSeed)} ${tone.bookingGuidance}`,
    followUpQuestion = getQualificationQuestion(context) || tone.followUpQuestion,
  } = options;

  return `${pickVariant(tone.leadOptions, `${variantSeed}:lead`)}

${context.name}: ${summary || context.description}

${valueLine}

${getContextPageLine(context)}

${bookingGuidance}

${followUpQuestion}`;
}

function buildPricingReply(context, state) {
  const bookingFocused = true;

  if (context.pricingType === "exact") {
    return buildCompactContextReply(context, state, {
      stage: "pricing",
      bookingFocused,
      summary: `${getStartingPriceSummary(context)} Final pricing can shift with travel or extra hours.`,
      question:
        context.id === "funeral_photography"
          ? "What date and location should I check for you?"
          : "What date and venue should I work from?",
    });
  }

  if (context.pricingType === "hybrid") {
    return buildCompactContextReply(context, state, {
      stage: "pricing",
      bookingFocused,
      summary: "Projects usually start from R4,500 for landing pages, R12,000 for business sites, and R25,000+ for custom web apps.",
      question: "Is this a new website, a redesign, or a custom web app?",
    });
  }

  return buildCompactContextReply(context, state, {
    stage: "pricing",
    bookingFocused,
    summary: "Pricing depends on the scope, timing, and service details.",
    question: getBookingQuestion(context, state),
  });
}

function buildPageReply(context, state) {
  return buildCompactContextReply(context, state, {
    stage: "page_reference",
    summary: compactServiceSummary(context),
    question: "Would you like pricing, availability, or booking help for this service?",
  });
}

function buildBookingReply(context, state) {
  return buildCompactContextReply(context, state, {
    stage: "booking",
    bookingFocused: true,
    summary: `${compactServiceSummary(context)} Once I have the basics, we can move you straight to booking.`,
    question: getBookingQuestion(context, state),
  });
}

function buildAvailabilityReply(context, state) {
  return buildCompactContextReply(context, state, {
    stage: "availability",
    bookingFocused: true,
    summary: "Availability depends on your booking details, and we can check it quickly once we have them.",
    question: getBookingQuestion(context, state),
  });
}

function buildQualificationReply(context, state) {
  return buildCompactContextReply(context, state, {
    stage: "qualification",
    summary: compactServiceSummary(context),
    question: getBookingQuestion(context, state),
  });
}

function buildInterestReply(context, state) {
  return buildCompactContextReply(context, state, {
    stage: "interest",
    summary: compactServiceSummary(context),
    question: getBookingQuestion(context, state),
  });
}

function formatFollowUps(questions) {
  return questions.map((question) => `- ${question}`).join("\n");
}

function buildContextSummary(contextId) {
  const context = SERVICE_CONTEXTS[contextId];
  if (!context) return "No active service context.";

  return [
    `Active service context: ${context.name}`,
    `Parent section: ${context.parent}`,
    `Relevant page: ${joinUrl(context.route)}`,
    `Category page: ${joinUrl(context.categoryRoute || context.route)}`,
    "Behavior rule: Keep answering within this service context unless the user clearly asks about a different service.",
    "Behavior rule: Interpret short follow-ups like 'price?', 'how much?', 'basic price', 'linky me', 'where page', 'available?', and 'can i book' relative to this active service.",
    `Booking questions:\n${formatFollowUps(context.followUps)}`,
  ].join("\n");
}

function buildFallbackServiceInfo(intent, knowledge) {
  const services = knowledge?.services || {};
  const visual = services.visual_production || {};
  const funerals = visual.categories?.funerals || {};
  const audio = services.audio_production || {};
  const digital = services.digital_solutions || {};
  const communityEvents = visual.categories?.community_events || {};
  const webOffering = Array.isArray(digital.offerings)
    ? digital.offerings.find((offering) => offering?.route === "/services/web-development")
    : null;

  switch (intent) {
    case "funeral":
      return {
        intro: "You're in the right place. We handle respectful funeral photography and videography under our Visual Production services.",
        serviceName: funerals.name || visual.name || "Visual Production",
        description: pickFirstSentence(
          funerals.description,
          "Respectful, discreet coverage for memorial services, burials, and remembrance gatherings."
        ),
        valueLine:
          "Our team works with care and professionalism so coverage stays unobtrusive and well managed.",
        url: joinUrl(visual.route || "/services/visual-production"),
      };
    case "visual":
      return {
        intro: "You're in the right place. We handle birthday, social event, and photoshoot bookings under our Visual Production services.",
        serviceName: communityEvents.name || visual.name || "Visual Production",
        description: pickFirstSentence(
          communityEvents.description || visual.description,
          "Professional photography and videography for events, portraits, and brand content."
        ),
        valueLine:
          "We focus on capturing the atmosphere, key moments, and details that make the event memorable.",
        url: joinUrl(visual.route || "/services/visual-production"),
      };
    case "web_design":
      return {
        intro: "You're in the right place. We handle web design and development through our Digital Solutions services.",
        serviceName: webOffering?.name || "Web & App Development",
        description: pickFirstSentence(
          webOffering?.description,
          "High-performance websites and web apps designed to bring in real clients."
        ),
        valueLine:
          "We shape each build around your goals, whether you need a stronger online presence, leads, or a better user experience.",
        url: joinUrl(webOffering?.route || "/services/web-development"),
      };
    case "digital_marketing":
      return {
        intro: "That's something we cover through our Digital Solutions services.",
        serviceName: digital.name || "Digital Solutions",
        description: pickFirstSentence(
          digital.description,
          "Websites, digital marketing, content creation, paid advertising, and analytics built to grow your brand online."
        ),
        valueLine:
          "We tailor the strategy around what you need most, from visibility and content to leads and campaigns.",
        url: joinUrl(digital.route || "/services/digital-marketing"),
      };
    case "audio":
      return {
        intro: "You're in the right place. We handle voiceover and recording work through our Audio Production services.",
        serviceName: audio.name || "Audio Production",
        description: pickFirstSentence(
          audio.description,
          "Studio recording, mixing, mastering, voiceover, and podcast production."
        ),
        valueLine:
          "We keep the process polished and practical so your final audio is ready for release or delivery.",
        url: joinUrl(audio.route || "/services/audio-production"),
      };
    default:
      return {
        intro: "You're in the right place, and we can guide you to the right KMP service based on what you need.",
        serviceName: digital.name || "KMP Services",
        description: pickFirstSentence(
          knowledge?.company?.description,
          "KMP combines visual production, audio production, and digital solutions for modern brands."
        ),
        valueLine:
          "We can quickly narrow things down based on the type of project, event, or support you need.",
        url: SITE_BASE_URL,
      };
  }
}

function buildBusyFallbackReply(messages) {
  const state = inferConversationState(messages);
  const activeContextId = resolveActiveServiceContext(messages);
  const activeContext = activeContextId ? SERVICE_CONTEXTS[activeContextId] : null;

  if (activeContext) {
    return buildCompactContextReply(activeContext, state, {
      stage: "busy",
      bookingFocused: true,
      summary: "We can help you with pricing and availability. Let me gather the details to move forward.",
      question: "What date should I check for you?",
    });
  }

  return compactReplyLines([
    "You're in the right place, and we can help you with pricing and bookings.",
    "Let me get the details so we can move forward with your request.",
    `More details: ${CONTACT_PAGE_URL}`,
    `${getWhatsAppGuidance(null, state, true)} What kind of service do you need help with?`,
  ]);
}

function buildPriceIntentResponse(context, knowledge) {
  if (!context) return null;

  if (context.pricingType === "exact" && Array.isArray(context.exactPricing)) {
    return `Starting prices for ${context.name}: ${getStartingPriceSummary(context)}`;
  }

  if (context.pricingType === "hybrid") {
    if (context.id === "web_development") {
      return "Web projects typically start from R4,500 for landing pages, R12,000 for business websites, and R25,000+ for custom web apps.";
    }
  }

  return null;
}

function buildNavigationIntentResponse(context) {
  if (!context) return null;

  const url = joinUrl(context.categoryRoute || context.route);
  return `I'll point you to ${context.name}. Check it out here: ${url}`;
}

function buildFallbackReply(messages, knowledge) {
  const latestUserMessage = getLatestUserMessage(messages);
  const state = inferConversationState(messages);
  const activeContextId = resolveActiveServiceContext(messages);
  const activeContext = activeContextId ? SERVICE_CONTEXTS[activeContextId] : null;

  // Check for explicit price intent
  if (detectPriceIntent(latestUserMessage) && activeContext) {
    const priceResponse = buildPriceIntentResponse(activeContext, knowledge);
    if (priceResponse) {
      return `${priceResponse}\n\nWhat date and details should I work with to give you a complete quote?`;
    }
    return buildPricingReply(activeContext, state);
  }

  // Check for explicit navigation intent
  if (detectNavigationIntent(latestUserMessage) && activeContext) {
    const navResponse = buildNavigationIntentResponse(activeContext);
    if (navResponse) {
      return `${navResponse}\n\nNeed help with details or booking?`;
    }
    return buildPageReply(activeContext, state);
  }

  if (activeContext) {
    switch (state.conversationStage) {
      case "pricing":
        return buildPricingReply(activeContext, state);
      case "page_reference":
        return buildPageReply(activeContext, state);
      case "booking":
        return buildBookingReply(activeContext, state);
      case "availability":
        return buildAvailabilityReply(activeContext, state);
      case "qualification":
        return buildQualificationReply(activeContext, state);
      default:
        return buildInterestReply(activeContext, state);
    }
  }

  const intent = detectIntentOrNull(latestUserMessage) || state.lastDetectedIntent || "default";
  const info = buildFallbackServiceInfo(intent, knowledge);
  const bookingFocused =
    state.conversationStage === "pricing" ||
    state.conversationStage === "availability" ||
    state.conversationStage === "booking" ||
    state.conversationStage === "qualification";
  const summary = state.hasShortQuery
    ? info.description
    : `${info.description} ${info.valueLine}`.trim();

  return buildCompactGenericReply(info, state, {
    bookingFocused,
    summary,
    question: getBookingQuestion(null, state),
  });
}

async function callGeminiWithRetry(url, payload) {
  let lastStatus = 502;
  let lastData = null;

  for (let attempt = 0; attempt < MAX_GEMINI_ATTEMPTS; attempt += 1) {
    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const raw = await geminiRes.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("[ai-chat] Non-JSON Gemini response:", raw.slice(0, 500));
      return {
        ok: false,
        status: 502,
        data: { error: { message: "Invalid response from Gemini" }, raw: raw.slice(0, 1000) },
      };
    }

    if (geminiRes.ok) {
      return { ok: true, status: geminiRes.status, data };
    }

    lastStatus = geminiRes.status;
    lastData = data;
    const retryAfterMs = getRetryDelayMs(geminiRes.headers.get("retry-after"));
    const shouldRetry =
      attempt < MAX_GEMINI_ATTEMPTS - 1 && isRetryableGeminiError(geminiRes.status, data);
    console.error("[ai-chat] Gemini error", geminiRes.status, data, shouldRetry ? "(retrying)" : "");

    if (!shouldRetry) {
      return { ok: false, status: geminiRes.status, data };
    }

    await sleep(retryAfterMs ?? RETRY_DELAY_MS);
  }

  return { ok: false, status: lastStatus, data: lastData };
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(200).json({
      reply: buildGeneralFallbackReply(),
      fallback: true,
      model: GEMINI_MODEL,
    });
  }

  try {
    // Body may arrive as string depending on runtime
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    const messages = normalizeMessages(body);
    const state = inferConversationState(messages);

    if (!messages.length) {
      return res.status(200).json({
        reply: buildGeneralFallbackReply({
          lead: "You're in the right place, and I can help you find the right KMP service.",
          summary:
            "KMP covers visual production, audio production, and digital solutions for different kinds of projects and events.",
          question: "What kind of service are you looking for?",
        }),
        fallback: true,
        model: GEMINI_MODEL,
        state,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[ai-chat] GEMINI_API_KEY is not set");
      return res.status(200).json({
        reply: buildFallbackReply(messages, loadKnowledge()),
        fallback: true,
        model: GEMINI_MODEL,
        state,
      });
    }

    let knowledge;
    try {
      knowledge = loadKnowledge();
    } catch (e) {
      console.error("[ai-chat] Failed to load knowledge file:", e);
      return res.status(200).json({
        reply: buildGeneralFallbackReply({
          lead: "You're in the right place, and I can still point you in the right direction.",
          summary:
            "KMP offers support across visual production, audio production, and digital solutions.",
        }),
        fallback: true,
        model: GEMINI_MODEL,
        state,
      });
    }

    const activeContextId = resolveActiveServiceContext(messages);
    const activeContextSummary = buildContextSummary(activeContextId);

    const systemInstruction = `You are the AI assistant for Kasilam Media Productions (KMP).
Base factual claims only on the JSON knowledge below.
Be warm, consultative, and concise, like a professional booking consultant.
Treat the full conversation as one continuous booking discussion and carry context forward naturally.
When a user gives partial information, infer the likely topic from prior messages and ask the next most helpful follow-up question.
Once a service category has been identified, stay in that service context for the rest of the conversation unless the user clearly changes topics.
Never switch a short follow-up like "price?", "how much?", "basic price", "linky me", "where page", "available?", or "can i book" into a generic company-wide answer if there is an active service context.
Reference the relevant website section naturally when identifying a service.
Act like a focused KMP booking consultant, not a generic FAQ bot.
Help qualify the lead by understanding the service type, occasion, date, venue/location, coverage needs, deliverables, and any relevant budget or package fit.
After identifying a service, use a guided booking flow with structured questions that match that service.
Sales flow priority: Interest -> Qualification -> Pricing -> Page reference -> Booking CTA.
If exact service pricing is known from knowledge or configured service packages, provide it.
If exact pricing is not known, say: "Pricing depends on duration, location, and coverage requirements."
Guide users toward booking via WhatsApp (+27659704101) once you have enough information or when they ask how to proceed.
Do not invent prices, packages, policies, or availability that are not in the knowledge.
If something is unknown, say so clearly and offer WhatsApp as the next step.
Prefer short conversational replies. Usually ask one focused follow-up question at a time.

CONVERSATION CONTEXT RULES:
${activeContextSummary}

INFERRED STATE:
${JSON.stringify(state)}

KNOWLEDGE:
${JSON.stringify(knowledge)}`;

    const payload = {
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: buildGeminiContents(messages),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    };

    try {
      const geminiResult = await callGeminiWithRetry(`${GEMINI_URL}?key=${apiKey}`, payload);
      const data = geminiResult?.data;

      if (!geminiResult?.ok) {
        console.log("[ai-chat] Gemini fallback triggered from HTTP/model error:", geminiResult?.status);
        return res.status(200).json(
          buildSafeFallbackResponse(messages, knowledge, state, {
            preferBusy: isFallbackWorthyGeminiError(geminiResult?.status, data),
          })
        );
      }

      if (!data || !Array.isArray(data?.candidates) || data.candidates.length === 0) {
        console.log("[ai-chat] Gemini fallback triggered from missing candidates.");
        return res.status(200).json(buildSafeFallbackResponse(messages, knowledge, state));
      }

      const candidate = data.candidates[0];
      const finishReason = candidate?.finishReason;
      const parts = candidate?.content?.parts;

      if (!Array.isArray(parts) || parts.length === 0) {
        console.log("[ai-chat] Gemini fallback triggered from missing content parts.", finishReason);
        return res.status(200).json(buildSafeFallbackResponse(messages, knowledge, state));
      }

      const reply = parts.map((p) => p?.text || "").join("").trim();
      if (!reply) {
        console.log("[ai-chat] Gemini fallback triggered from empty reply.", finishReason);
        return res.status(200).json(buildSafeFallbackResponse(messages, knowledge, state));
      }

      return res.status(200).json({ reply, finishReason, model: GEMINI_MODEL, state });
    } catch (error) {
      console.log("[ai-chat] Gemini request failed, using fallback:", error);
      return res.status(200).json(buildSafeFallbackResponse(messages, knowledge, state));
    }
  } catch (error) {
    console.error("[ai-chat] Unhandled error:", error);
    return res.status(200).json({
      reply: buildGeneralFallbackReply({
        lead: "You're in the right place, and we can still help with service information and bookings.",
        summary:
          "KMP handles a mix of visual production, audio work, and digital solutions.",
      }),
      fallback: true,
      model: GEMINI_MODEL,
      state: {
        activeService: null,
        activeCategory: null,
        lastDetectedIntent: null,
        conversationStage: "interest",
        hasShortQuery: false,
        userMessageCount: 0,
      },
    });
  }
}
