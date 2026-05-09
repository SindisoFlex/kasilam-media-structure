const SITE_BASE_URL = "https://kasilammedia.co.za";
const WHATSAPP_NUMBER = "+27659704101";

const SERVICE_FALLBACKS = {
  funeral_photography: {
    serviceId: "funeral_photography",
    bookingService: "funeral",
    name: "Funeral & Memorial Coverage",
    route: "/services/visual-production/funeral-coverage",
    summary:
      "We handle respectful funeral and memorial photography or photo-video coverage with a calm, discreet approach.",
    pricing:
      "Funeral coverage starts from R1,500 for photography, R2,000 for videography, or R3,500 for both.",
    narrowingQuestion:
      "Would you like photography only, videography only, or photo and video coverage?",
    stageQuestions: {
      booking: "What date is the service on?",
      availability: "What date should I check for you?",
      pricing: "What date and location should I work with to guide you properly?",
      qualification: "What location will the service be held at?",
      clarification: "Would you like funeral photography only or photo and video coverage?",
    },
  },
  wedding_coverage: {
    serviceId: "wedding_coverage",
    bookingService: "visual",
    name: "Wedding Production",
    route: "/services/visual-production/wedding-production",
    summary:
      "We cover weddings with cinematic photography, videography, or combined coverage.",
    pricing:
      "Wedding coverage starts from R4,500 for photography, R5,000 for videography, or R7,500 for both.",
    narrowingQuestion:
      "Is this a traditional wedding, white wedding, or both?",
    stageQuestions: {
      booking: "What is the wedding date?",
      availability: "What date should I check for you?",
      pricing: "What date and venue should I work from?",
      qualification: "Where will the ceremony or main venue be?",
      clarification: "Do you need photography, videography, or both?",
    },
  },
  birthday_photography: {
    serviceId: "birthday_photography",
    bookingService: "visual",
    name: "Community & Cultural Events",
    route: "/services/visual-production/community-events",
    summary:
      "We cover birthdays, celebrations, and event photography or photo-video coverage.",
    pricing:
      "Pricing depends on the event scope, duration, location, and whether you need photography or full coverage.",
    narrowingQuestion:
      "Are you looking for funeral coverage, event photography, or another photography service?",
    stageQuestions: {
      booking: "What date is the event?",
      availability: "What date should I check for you?",
      pricing: "What date and venue should I work from?",
      qualification: "What venue or location is the event at?",
      clarification:
        "Are you looking for funeral coverage, event photography, or another photography service?",
    },
  },
  web_development: {
    serviceId: "web_development",
    bookingService: "digital",
    name: "Web & App Development",
    route: "/services/web-development",
    summary:
      "We build landing pages, business websites, and custom web apps designed to convert visitors into clients.",
    pricing:
      "Web projects usually start from R4,500 for landing pages, R12,000 for business websites, and R25,000+ for custom web apps.",
    narrowingQuestion:
      "Are you looking for a landing page, business website, or a custom web app?",
    stageQuestions: {
      booking: "Are you ready to move forward with a new site, redesign, or custom web app?",
      availability: "When would you like to start?",
      pricing: "Is this a landing page, business website, or custom web app?",
      qualification: "What type of website or app do you need?",
      clarification: "Do you need a landing page, business website, or custom web app?",
    },
  },
  audio_production: {
    serviceId: "audio_production",
    bookingService: "audio",
    name: "Audio Production",
    route: "/services/audio-production",
    summary:
      "We handle recording, mixing, mastering, podcast production, and voiceover work.",
    pricing:
      "Pricing depends on the project type, timeline, and whether you need recording, mixing, mastering, or full production support.",
    narrowingQuestion:
      "Do you need studio recording, mixing, mastering, podcast support, or voiceover production?",
    stageQuestions: {
      booking: "When would you like to start?",
      availability: "When would you like to book the session?",
      pricing: "What kind of audio project should I price for you?",
      qualification: "What type of audio project do you need help with?",
      clarification:
        "Do you need studio recording, mixing, mastering, podcast support, or voiceover production?",
    },
  },
  branding_marketing: {
    serviceId: "branding_marketing",
    bookingService: "digital",
    name: "Digital Solutions",
    route: "/services/digital-marketing",
    summary:
      "We support brand visibility through content creation, social media management, paid advertising, and digital strategy.",
    pricing:
      "Pricing depends on the scope, timeline, and whether you need branding, content, social media support, or paid advertising.",
    narrowingQuestion:
      "Do you need branding, content creation, social media management, or paid advertising?",
    stageQuestions: {
      booking: "What kind of digital support would you like to move forward with?",
      availability: "When would you like to start?",
      pricing: "Which digital service do you want pricing for?",
      qualification: "What scope do you need help with: branding, content, social media, or ads?",
      clarification:
        "Do you need branding, content creation, social media management, or paid advertising?",
    },
  },
};

function joinUrl(route) {
  return route ? `${SITE_BASE_URL}${route}` : SITE_BASE_URL;
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function inferServiceIdFromBookingMemory(session) {
  switch (session?.bookingMemory?.service) {
    case "funeral":
      return "funeral_photography";
    case "audio":
      return "audio_production";
    case "digital":
      if (session?.activeServiceId === "web_development") {
        return "web_development";
      }
      return "branding_marketing";
    case "visual":
      if (session?.activeServiceId === "wedding_coverage") {
        return "wedding_coverage";
      }
      return "birthday_photography";
    default:
      return null;
  }
}

function inferServiceIdFromHeuristics(intent) {
  const normalized = normalizeText(intent?.normalizedText);

  if (normalized.includes("funeral") || normalized.includes("memorial")) {
    return "funeral_photography";
  }
  if (normalized.includes("wedding")) {
    return "wedding_coverage";
  }
  if (
    normalized.includes("website") ||
    normalized.includes("web design") ||
    normalized.includes("web development") ||
    normalized.includes("web app") ||
    normalized.includes("landing page")
  ) {
    return "web_development";
  }
  if (
    normalized.includes("recording") ||
    normalized.includes("mixing") ||
    normalized.includes("mastering") ||
    normalized.includes("voiceover") ||
    normalized.includes("podcast") ||
    normalized.includes("audio")
  ) {
    return "audio_production";
  }
  if (
    normalized.includes("branding") ||
    normalized.includes("marketing") ||
    normalized.includes("social media") ||
    normalized.includes("advertising") ||
    normalized.includes("ads")
  ) {
    return "branding_marketing";
  }
  if (
    normalized.includes("photography") ||
    normalized.includes("videography") ||
    normalized.includes("event")
  ) {
    return "birthday_photography";
  }

  return null;
}

function pickQuestion(config, stage, intentName, confidence) {
  if (confidence < 0.6 || intentName === "clarification") {
    return config.narrowingQuestion;
  }

  if (intentName === "pricing") {
    return config.stageQuestions.pricing;
  }
  if (intentName === "booking") {
    return config.stageQuestions.booking;
  }
  if (intentName === "availability") {
    return config.stageQuestions.availability;
  }
  if (stage === "qualification") {
    return config.stageQuestions.qualification;
  }

  return config.stageQuestions.clarification;
}

function buildLines(lines) {
  return lines.filter(Boolean).join("\n");
}

function getBookingReadinessScore(session) {
  const memory = session?.bookingMemory || {};
  let score = 0;

  if (memory.service) score += 30;
  if (memory.date) score += 25;
  if (memory.location) score += 25;
  if (memory.scope) score += 20;

  return score;
}

export function buildContextualFallback(session, intent) {
  const activeServiceId = session?.activeServiceId || null;
  const bookingMemoryServiceId = inferServiceIdFromBookingMemory(session);
  const heuristicServiceId = inferServiceIdFromHeuristics(intent);
  const serviceId =
    activeServiceId || bookingMemoryServiceId || heuristicServiceId || null;
  const confidence = activeServiceId
    ? 1
    : bookingMemoryServiceId
      ? 0.75
      : heuristicServiceId
        ? 0.45
        : 0;
  const readinessScore = getBookingReadinessScore(session);

  if (!serviceId || !SERVICE_FALLBACKS[serviceId]) {
    return buildLines([
      "You're in the right place, and I can narrow this down for you.",
      "Are you looking for funeral coverage, event photography, or another photography service?",
      `More details: ${SITE_BASE_URL}/services`,
      readinessScore >= 70
        ? `You can also message us on WhatsApp at ${WHATSAPP_NUMBER}.`
        : null,
    ]);
  }

  const config = SERVICE_FALLBACKS[serviceId];
  const stage = session?.conversationStage || "discovery";
  const intentName = intent?.intent || "general_inquiry";
  const question = pickQuestion(config, stage, intentName, confidence);
  const memory = session?.bookingMemory || {};
  const captured = [];

  if (memory.date) captured.push(`date: ${memory.date}`);
  if (memory.location) captured.push(`location: ${memory.location}`);
  if (memory.scope) captured.push(`scope: ${memory.scope}`);

  const summaryLine =
    intentName === "pricing" ? config.pricing : config.summary;
  const memoryLine = captured.length
    ? `So far I have ${captured.join(", ")}.`
    : null;
  const ctaLine =
    readinessScore >= 70
      ? `If you'd like to move faster, message us on WhatsApp at ${WHATSAPP_NUMBER}. ${question}`
      : question;

  return buildLines([
    `${config.name}: You're in the right place, and we handle that.`,
    summaryLine,
    memoryLine,
    `More details: ${joinUrl(config.route)}`,
    ctaLine,
  ]);
}
