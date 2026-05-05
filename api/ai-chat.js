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

const SERVICE_CONTEXTS = {
  funeral_photography: {
    id: "funeral_photography",
    name: "Funeral & Memorial Coverage",
    parent: "Creative & Visual Production",
    route: "/services/visual-production/funeral-coverage",
    intro:
      "This service falls under our Funeral & Memorial Coverage section in Creative & Visual Production.",
    description:
      "We handle memorial and funeral photography or photo-video coverage with a respectful, discreet approach.",
    followUps: [
      "What date is the service?",
      "What location will the service be held at?",
      "Do you need photography only or photo + video coverage?",
      "What estimated duration should we plan for?",
    ],
  },
  birthday_photography: {
    id: "birthday_photography",
    name: "Community & Cultural Events",
    parent: "Creative & Visual Production",
    route: "/services/visual-production/community-events",
    intro:
      "This request fits our Community & Cultural Events section in Creative & Visual Production.",
    description:
      "We cover birthdays, private celebrations, and event media with photography or full visual coverage.",
    followUps: [
      "What date is the birthday event?",
      "What venue or location is it at?",
      "About how many guests are expected?",
      "Do you want photography only or full media coverage?",
    ],
  },
  wedding_coverage: {
    id: "wedding_coverage",
    name: "Wedding Production",
    parent: "Creative & Visual Production",
    route: "/services/visual-production/wedding-production",
    intro:
      "This falls under our Wedding Production section in Creative & Visual Production.",
    description:
      "We cover weddings with cinematic photography, videography, or combined coverage.",
    followUps: [
      "What is the wedding date?",
      "Where will the ceremony or main venue be?",
      "Is this a traditional wedding, white wedding, or both?",
      "Do you need photography only, videography only, or both?",
    ],
  },
  web_development: {
    id: "web_development",
    name: "Web & App Development",
    parent: "Digital Solutions",
    route: "/services/web-development",
    intro:
      "This falls under our Web & App Development section in Digital Solutions.",
    description:
      "We build landing pages, business websites, and custom web apps designed to convert visitors into clients.",
    followUps: [
      "Do you need a landing page, business website, or custom web app?",
      "What is the main goal of the website?",
      "Do you already have branding, content, or reference sites?",
      "What timeline are you working toward?",
    ],
  },
  audio_production: {
    id: "audio_production",
    name: "Audio Production",
    parent: "Audio Production",
    route: "/services/audio-production",
    intro: "This request falls under our Audio Production section.",
    description:
      "We handle recording, mixing, mastering, podcast production, and voiceover work.",
    followUps: [
      "What type of audio project do you need help with?",
      "Do you need recording, mixing, mastering, or full production support?",
      "When would you like to start?",
      "Do you already have raw files, a script, or a brief ready?",
    ],
  },
  branding_marketing: {
    id: "branding_marketing",
    name: "Digital Solutions",
    parent: "Digital Solutions",
    route: "/services/digital-marketing",
    intro:
      "This falls under our Digital Solutions section for branding, content, and digital marketing support.",
    description:
      "We support brand visibility through content creation, social media management, paid advertising, and strategy.",
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
  if (userText.includes("funeral")) {
    return "funeral";
  }

  if (
    userText.includes("birthday") ||
    userText.includes("21st") ||
    userText.includes("photoshoot") ||
    userText.includes("photo") ||
    userText.includes("photography")
  ) {
    return "visual";
  }

  if (userText.includes("web design") || userText.includes("website") || userText.includes("web development")) {
    return "web_design";
  }

  if (userText.includes("digital marketing")) {
    return "digital_marketing";
  }

  if (
    userText.includes("voiceover") ||
    userText.includes("recording") ||
    userText.includes("studio recording")
  ) {
    return "audio";
  }

  return "default";
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
  const text = userText.toLowerCase();

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

    const lowered = message.content.toLowerCase();
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
  return (
    /^price\??$/i.test(text) ||
    /^pricing\??$/i.test(text) ||
    /^how much\??$/i.test(text) ||
    /^available\??$/i.test(text) ||
    /^availability\??$/i.test(text) ||
    /^where\??$/i.test(text) ||
    /^when\??$/i.test(text) ||
    /^book\??$/i.test(text) ||
    /^can i book\??$/i.test(text)
  );
}

function isPricingQuestion(text) {
  return (
    text.includes("price") ||
    text.includes("pricing") ||
    text.includes("how much") ||
    text.includes("quote") ||
    text.includes("cost")
  );
}

function isAvailabilityQuestion(text) {
  return (
    text.includes("available") ||
    text.includes("availability") ||
    text.includes("free on") ||
    text.includes("open on")
  );
}

function isLocationQuestion(text) {
  return text.includes("where");
}

function isDateQuestion(text) {
  return text.includes("when") || text.includes("date");
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
    "Behavior rule: Keep answering within this service context unless the user clearly asks about a different service.",
    "Behavior rule: Interpret short follow-ups like 'price?', 'how much?', 'available?', 'where?', and 'when?' relative to this active service.",
    `Booking questions:\n${formatFollowUps(context.followUps)}`,
  ].join("\n");
}

function buildFallbackServiceInfo(intent, knowledge) {
  const services = knowledge?.services || {};
  const visual = services.visual_production || {};
  const funerals = visual.categories?.funerals || {};
  const audio = services.audio_production || {};
  const digital = services.digital_solutions || {};
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
        serviceName: visual.name || "Visual Production",
        description: pickFirstSentence(
          visual.description,
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

function buildFallbackReply(messages, knowledge) {
  const latestUserMessage = getLatestUserMessage(messages);
  const activeContextId = resolveActiveServiceContext(messages);
  const activeContext = activeContextId ? SERVICE_CONTEXTS[activeContextId] : null;

  if (activeContext && (isShortContextualFollowUp(latestUserMessage) || isPricingQuestion(latestUserMessage))) {
    return `${activeContext.intro}

${activeContext.description}

Pricing for this service depends on the exact coverage you need, so I’ll keep this focused on ${activeContext.name.toLowerCase()} rather than giving company-wide pricing.

To quote you properly, please send me:
${formatFollowUps(activeContext.followUps)}

Relevant page:
${joinUrl(activeContext.route)}

Once I have those details, the next step is WhatsApp on ${WHATSAPP_NUMBER} for a tailored quote and availability check.`;
  }

  if (activeContext && isAvailabilityQuestion(latestUserMessage)) {
    return `${activeContext.intro}

I can help you check ${activeContext.name.toLowerCase()} availability, but availability is always confirmed from the booking details for that specific service.

Please send:
${formatFollowUps(activeContext.followUps)}

Relevant page:
${joinUrl(activeContext.route)}

After that, we can confirm the next step on WhatsApp at ${WHATSAPP_NUMBER}.`;
  }

  if (activeContext && (isLocationQuestion(latestUserMessage) || isDateQuestion(latestUserMessage) || !latestUserMessage.trim())) {
    return `${activeContext.intro}

${activeContext.description}

To guide your booking properly, I need:
${formatFollowUps(activeContext.followUps)}

Relevant page:
${joinUrl(activeContext.route)}`;
  }

  if (activeContext) {
    return `${activeContext.intro}

${activeContext.description}

To move this booking forward, please send:
${formatFollowUps(activeContext.followUps)}

Relevant page:
${joinUrl(activeContext.route)}

When you're ready, we can continue on WhatsApp at ${WHATSAPP_NUMBER}.`;
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
    const shouldRetry =
      attempt < MAX_GEMINI_ATTEMPTS - 1 && isRetryableGeminiError(geminiRes.status, data);
    console.error("[ai-chat] Gemini error", geminiRes.status, data, shouldRetry ? "(retrying)" : "");

    if (!shouldRetry) {
      return { ok: false, status: geminiRes.status, data };
    }

    await sleep(RETRY_DELAY_MS);
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

    if (!messages.length) {
      return res.status(200).json({
        reply: "If you'd like more information or pricing, please contact us on WhatsApp at +27659704101 and we'll assist you.",
        fallback: true,
        model: GEMINI_MODEL,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[ai-chat] GEMINI_API_KEY is not set");
      return res.status(200).json({
        reply: buildFallbackReply(messages, loadKnowledge()),
        fallback: true,
        model: GEMINI_MODEL,
      });
    }

    let knowledge;
    try {
      knowledge = loadKnowledge();
    } catch (e) {
      console.error("[ai-chat] Failed to load knowledge file:", e);
      return res.status(200).json({
        reply: "If you'd like more information or pricing, please contact us on WhatsApp at +27659704101 and we'll assist you.",
        fallback: true,
        model: GEMINI_MODEL,
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
Never switch a short follow-up like "price?", "how much?", "available?", "where?", or "when?" into a generic company-wide answer if there is an active service context.
Reference the relevant website section naturally when identifying a service.
Act like a focused KMP booking consultant, not a generic FAQ bot.
Help qualify the lead by understanding the service type, occasion, date, venue/location, coverage needs, deliverables, and any relevant budget or package fit.
After identifying a service, use a guided booking flow with structured questions that match that service.
Guide users toward booking via WhatsApp (+27659704101) once you have enough information or when they ask how to proceed.
Do not invent prices, packages, policies, or availability that are not in the knowledge.
If something is unknown, say so clearly and offer WhatsApp as the next step.
Prefer short conversational replies. Usually ask one focused follow-up question at a time.

CONVERSATION CONTEXT RULES:
${activeContextSummary}

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
          reply: buildFallbackReply(messages, knowledge),
          fallback: true,
          model: GEMINI_MODEL,
        });
      }

      return res.status(200).json({
        reply: buildFallbackReply(messages, knowledge),
        fallback: true,
        model: GEMINI_MODEL,
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
      });
    }

    return res.status(200).json({ reply, finishReason, model: GEMINI_MODEL });
  } catch (error) {
    console.error("[ai-chat] Unhandled error:", error);
    return res.status(200).json({
      reply: "If you'd like more information or pricing, please contact us on WhatsApp at +27659704101 and we'll assist you.",
      fallback: true,
      model: GEMINI_MODEL,
    });
  }
}
