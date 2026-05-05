import fs from "fs";
import path from "path";

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
  const filePath = path.join(process.cwd(), "public", "data", "kmp_knowledge.json");
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
    normalized.includes("cost")
  );
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
    normalized.includes("reserve") ||
    normalized.includes("go ahead")
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

  return {
    activeService: activeContext?.slug || null,
    activeCategory: activeContext?.categoryId || null,
    conversationStage: detectConversationStage(latestUserMessage),
  };
}

function formatExactPricing(lines) {
  return lines.map((line) => `- ${line}`).join("\n");
}

function buildPricingReply(context) {
  const pageUrl = joinUrl(context.categoryRoute || context.route);

  if (context.pricingType === "exact") {
    return `${context.intro}

Here is the pricing for ${context.name.toLowerCase()}:
${formatExactPricing(context.exactPricing || [])}

Pricing can still vary if travel, extra hours, or extended coverage is needed.

Page:
${pageUrl}
${context.pageSectionLabel}

To confirm the best option, tell me your date and whether you need photography only or photo + video coverage.`;
  }

  if (context.pricingType === "hybrid") {
    return `${context.intro}

Here are the usual starting prices for this service:
${formatExactPricing(context.exactPricing || [])}

Final pricing depends on scope, features, timeline, and any extra setup requirements.

Page:
${pageUrl}
${context.pageSectionLabel}

To guide you properly, tell me what type of website you need and your target launch timeline.`;
  }

  return `${context.intro}

Pricing depends on duration, location, and coverage requirements.

Page:
${pageUrl}
${context.pageSectionLabel}

To quote you properly, please send me:
${formatFollowUps(context.followUps)}`;
}

function buildPageReply(context) {
  const pageUrl = joinUrl(context.categoryRoute || context.route);

  return `${context.intro}

Here is the page for this service:
${pageUrl}
${context.pageSectionLabel}

If you want, I can also help you with pricing or start the booking details for this exact service.`;
}

function buildBookingReply(context) {
  return `${context.intro}

We can book this service. To move forward, send me:
${formatFollowUps(context.followUps)}

Once I have that, the booking step continues on WhatsApp at ${WHATSAPP_NUMBER}.`;
}

function buildAvailabilityReply(context) {
  return `${context.intro}

Availability is checked per booking details for this exact service.

Please send:
${formatFollowUps(context.followUps)}

Then we can confirm the next step on WhatsApp at ${WHATSAPP_NUMBER}.`;
}

function buildQualificationReply(context) {
  return `${context.intro}

${context.description}

To guide your booking properly, I need:
${formatFollowUps(context.followUps)}`;
}

function buildInterestReply(context) {
  const pageUrl = joinUrl(context.categoryRoute || context.route);

  return `${context.intro}

${context.description}

Page:
${pageUrl}
${context.pageSectionLabel}

To get you to the right package, please send:
${formatFollowUps(context.followUps)}`;
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
        intro: "We provide respectful funeral photography and videography under our Visual Production services.",
        serviceName: funerals.name || visual.name || "Visual Production",
        description: pickFirstSentence(
          funerals.description,
          "Respectful, discreet coverage for memorial services, burials, and remembrance gatherings."
        ),
        url: joinUrl(visual.route || "/services/visual-production"),
      };
    case "visual":
      return {
        intro: "We cover birthday, social event, and photoshoot bookings under our Visual Production services.",
        serviceName: communityEvents.name || visual.name || "Visual Production",
        description: pickFirstSentence(
          communityEvents.description || visual.description,
          "Professional photography and videography for events, portraits, and brand content."
        ),
        url: joinUrl(visual.route || "/services/visual-production"),
      };
    case "web_design":
      return {
        intro: "Web design requests fall under our Digital Solutions services.",
        serviceName: webOffering?.name || "Web & App Development",
        description: pickFirstSentence(
          webOffering?.description,
          "High-performance websites and web apps designed to bring in real clients."
        ),
        url: joinUrl(webOffering?.route || "/services/web-development"),
      };
    case "digital_marketing":
      return {
        intro: "Digital marketing support sits under our Digital Solutions services.",
        serviceName: digital.name || "Digital Solutions",
        description: pickFirstSentence(
          digital.description,
          "Websites, digital marketing, content creation, paid advertising, and analytics built to grow your brand online."
        ),
        url: joinUrl(digital.route || "/services/digital-marketing"),
      };
    case "audio":
      return {
        intro: "Voiceover and recording work is handled through our Audio Production services.",
        serviceName: audio.name || "Audio Production",
        description: pickFirstSentence(
          audio.description,
          "Studio recording, mixing, mastering, voiceover, and podcast production."
        ),
        url: joinUrl(audio.route || "/services/audio-production"),
      };
    default:
      return {
        intro: "We can guide you to the right KMP service based on what you need.",
        serviceName: digital.name || "KMP Services",
        description: pickFirstSentence(
          knowledge?.company?.description,
          "KMP combines visual production, audio production, and digital solutions for modern brands."
        ),
        url: SITE_BASE_URL,
      };
  }
}

function buildBusyFallbackReply(messages) {
  const activeContextId = resolveActiveServiceContext(messages);
  const activeContext = activeContextId ? SERVICE_CONTEXTS[activeContextId] : null;

  if (activeContext) {
    return `Our AI assistant is temporarily assisting many visitors right now.

For ${activeContext.name} pricing or booking assistance, please WhatsApp us directly:
+27 65 970 4101

You can also view the relevant page here:
${joinUrl(activeContext.categoryRoute || activeContext.route)}
${activeContext.pageSectionLabel}

Or visit our Contact page:
${CONTACT_PAGE_URL}

Our team will assist you personally with pricing, bookings, and service information.`;
  }

  return `Our AI assistant is temporarily assisting many visitors right now.

To continue immediately, please contact us directly on WhatsApp:
+27 65 970 4101

Or visit our Contact page:
${CONTACT_PAGE_URL}

Our team will assist you personally with pricing, bookings, and service information.`;
}

function buildFallbackReply(messages, knowledge) {
  const latestUserMessage = getLatestUserMessage(messages);
  const state = inferConversationState(messages);
  const activeContextId = resolveActiveServiceContext(messages);
  const activeContext = activeContextId ? SERVICE_CONTEXTS[activeContextId] : null;

  if (activeContext) {
    switch (state.conversationStage) {
      case "pricing":
        return buildPricingReply(activeContext);
      case "page_reference":
        return buildPageReply(activeContext);
      case "booking":
        return buildBookingReply(activeContext);
      case "availability":
        return buildAvailabilityReply(activeContext);
      case "qualification":
        return buildQualificationReply(activeContext);
      default:
        return buildInterestReply(activeContext);
    }
  }

  const intent = detectIntent(latestUserMessage);
  const info = buildFallbackServiceInfo(intent, knowledge);

  return `${info.intro}

${info.description}

You can learn more here:
${info.url}

To get pricing and availability, please WhatsApp us at +27659704101.`;
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
      reply: "If you'd like more information or pricing, please contact us on WhatsApp at +27659704101 and we'll assist you.",
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
        reply: `If you'd like more information or pricing, please contact us on WhatsApp at +27659704101 or visit ${CONTACT_PAGE_URL} and we'll assist you.`,
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
        reply: `If you'd like more information or pricing, please contact us on WhatsApp at +27659704101 or visit ${CONTACT_PAGE_URL} and we'll assist you.`,
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

    const geminiResult = await callGeminiWithRetry(`${GEMINI_URL}?key=${apiKey}`, payload);
    const data = geminiResult.data;

    if (!geminiResult.ok) {
      if (isFallbackWorthyGeminiError(geminiResult.status, data)) {
        return res.status(200).json({
          reply: buildBusyFallbackReply(messages),
          fallback: true,
          model: GEMINI_MODEL,
          state,
        });
      }

      return res.status(200).json({
        reply: buildFallbackReply(messages, knowledge),
        fallback: true,
        model: GEMINI_MODEL,
        state,
      });
    }

    const candidate = data?.candidates?.[0];
    const finishReason = candidate?.finishReason;
    const parts = candidate?.content?.parts;
    const reply = Array.isArray(parts)
      ? parts.map((p) => p?.text || "").join("").trim()
      : "";

    if (!reply) {
      console.error("[ai-chat] Empty reply. finishReason=", finishReason, "data=", JSON.stringify(data).slice(0, 1000));
      return res.status(200).json({
        reply: buildFallbackReply(messages, knowledge),
        fallback: true,
        model: GEMINI_MODEL,
        state,
      });
    }

    return res.status(200).json({ reply, finishReason, model: GEMINI_MODEL, state });
  } catch (error) {
    console.error("[ai-chat] Unhandled error:", error);
    return res.status(200).json({
      reply: `If you'd like more information or pricing, please contact us on WhatsApp at +27659704101 or visit ${CONTACT_PAGE_URL} and we'll assist you.`,
      fallback: true,
      model: GEMINI_MODEL,
      state: {
        activeService: null,
        activeCategory: null,
        conversationStage: "interest",
      },
    });
  }
}
