const SHORT_FOLLOW_UP_PATTERNS = [
  /^price\??$/i,
  /^pricing\??$/i,
  /^how much\??$/i,
  /^link me\??$/i,
  /^available\??$/i,
  /^availability\??$/i,
  /^can i book\??$/i,
  /^book\??$/i,
  /^where page\??$/i,
  /^where is the page\??$/i,
];

const EXPLICIT_SWITCH_PATTERNS = [
  /\bactually\b/i,
  /\bforget\b/i,
  /\binstead\b/i,
  /\bnot funeral\b/i,
  /\bi need\b/i,
  /\btell me about\b/i,
];

const SERVICE_SIGNAL_MAP = {
  funeral_photography: [
    "funeral photography",
    "funeral coverage",
    "funeral",
    "memorial",
    "burial",
  ],
  wedding_coverage: [
    "wedding coverage",
    "wedding photography",
    "wedding videography",
    "wedding",
    "traditional wedding",
    "white wedding",
    "lobola",
  ],
  web_development: [
    "website design",
    "website",
    "web design",
    "web development",
    "web app",
    "landing page",
  ],
  audio_production: [
    "audio production",
    "recording",
    "mixing",
    "mastering",
    "voiceover",
    "podcast",
    "studio recording",
  ],
  branding_marketing: [
    "digital marketing",
    "branding",
    "social media",
    "paid advertising",
    "marketing",
    "content creation",
  ],
  birthday_photography: [
    "birthday",
    "party",
    "celebration",
    "event photography",
    "photoshoot",
  ],
};

export function normalizeServiceText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/linky\s*me/g, "link me")
    .replace(/where\s*page/g, "where page")
    .replace(/\s+/g, " ")
    .trim();
}

export function isShortFollowUp(text) {
  const normalized = normalizeServiceText(text);
  return SHORT_FOLLOW_UP_PATTERNS.some((pattern) => pattern.test(normalized));
}

function scoreServiceMatch(normalizedText, serviceId) {
  const signals = SERVICE_SIGNAL_MAP[serviceId] || [];
  let score = 0;

  for (const signal of signals) {
    if (!normalizedText.includes(signal)) continue;

    if (
      signal === "funeral photography" ||
      signal === "wedding coverage" ||
      signal === "website design" ||
      signal === "audio production"
    ) {
      score = Math.max(score, 0.95);
      continue;
    }

    if (
      signal === "funeral" ||
      signal === "wedding" ||
      signal === "website" ||
      signal === "recording" ||
      signal === "digital marketing"
    ) {
      score = Math.max(score, 0.85);
      continue;
    }

    score = Math.max(score, 0.8);
  }

  return score;
}

export function detectServiceConfidence(text) {
  const normalizedText = normalizeServiceText(text);
  if (!normalizedText) {
    return { serviceId: null, confidence: 0 };
  }

  let bestServiceId = null;
  let bestConfidence = 0;

  for (const serviceId of Object.keys(SERVICE_SIGNAL_MAP)) {
    const confidence = scoreServiceMatch(normalizedText, serviceId);
    if (confidence > bestConfidence) {
      bestServiceId = serviceId;
      bestConfidence = confidence;
    }
  }

  return {
    serviceId: bestServiceId,
    confidence: bestConfidence,
  };
}

function isExplicitTopicChange(normalizedText) {
  return EXPLICIT_SWITCH_PATTERNS.some((pattern) => pattern.test(normalizedText));
}

export function resolveServiceTransition(session, userText) {
  const normalizedText = normalizeServiceText(userText);
  const previousServiceId = session?.activeServiceId || null;
  const wasLocked = Boolean(session?.lockedService);
  const detection = detectServiceConfidence(normalizedText);
  const shortFollowUp = isShortFollowUp(normalizedText);
  const explicitTopicChange = isExplicitTopicChange(normalizedText);
  const events = [];

  if (shortFollowUp && wasLocked && previousServiceId) {
    return {
      serviceId: previousServiceId,
      confidence: session?.serviceConfidence || 1,
      lockedService: true,
      events,
    };
  }

  if (!detection.serviceId) {
    return {
      serviceId: previousServiceId,
      confidence: previousServiceId ? session?.serviceConfidence || 1 : 0,
      lockedService: wasLocked,
      events,
    };
  }

  if (!previousServiceId) {
    if (detection.confidence >= 0.8) {
      events.push({ type: "service_locked", service: detection.serviceId });
    }

    return {
      serviceId: detection.serviceId,
      confidence: detection.confidence,
      lockedService: detection.confidence >= 0.8,
      events,
    };
  }

  if (previousServiceId === detection.serviceId) {
    if (!wasLocked && detection.confidence >= 0.8) {
      events.push({ type: "service_locked", service: detection.serviceId });
    }

    return {
      serviceId: detection.serviceId,
      confidence: Math.max(session?.serviceConfidence || 0, detection.confidence),
      lockedService: wasLocked || detection.confidence >= 0.8,
      events,
    };
  }

  if (wasLocked && !explicitTopicChange) {
    return {
      serviceId: previousServiceId,
      confidence: session?.serviceConfidence || 1,
      lockedService: true,
      events,
    };
  }

  if (explicitTopicChange || detection.confidence >= 0.8) {
    events.push({ type: "service_switched", from: previousServiceId, to: detection.serviceId });
    if (detection.confidence >= 0.8) {
      events.push({ type: "service_locked", service: detection.serviceId });
    }

    return {
      serviceId: detection.serviceId,
      confidence: detection.confidence,
      lockedService: detection.confidence >= 0.8,
      events,
    };
  }

  return {
    serviceId: previousServiceId,
    confidence: session?.serviceConfidence || 1,
    lockedService: wasLocked,
    events,
  };
}
