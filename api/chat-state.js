import { normalizeText, normalizeWithAudit } from "./lib/normalization-engine.js";
import { resolveCanonicalMapping } from "./lib/mapping-engine.js";
import { createTelemetryContext, emitTelemetryEvent, telemetryFlags } from "./lib/telemetry-engine.js";

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

const SWITCH_CONFIRM_PATTERNS = [
  /^(yes|yeah|yep|correct|confirmed?|sure)$/i,
  /\b(yes|confirm|switch|change|go ahead|move)\b.*\b(service|topic|website|web|audio|marketing|funeral|wedding|birthday|photography)\b/i,
  /\b(go ahead|switch|change|move)\b/i,
];

const SWITCH_DECLINE_PATTERNS = [
  /^(no|nope|nah)$/i,
  /\b(cancel|keep|stay|continue|don't switch|do not switch)\b/i,
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
    "web",
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
  return normalizeText(text, { context: "service" });
}

export function normalizeServiceTextWithAudit(text) {
  return normalizeWithAudit(text, { context: "service" });
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
    return {
      serviceId: null,
      confidence: 0,
      mappingMetadata: resolveCanonicalMapping(text, {
        sessionId: null,
        sourceSessionId: null,
      }),
    };
  }

  const mapped = resolveCanonicalMapping(text, {
    sessionId: null,
    sourceSessionId: null,
  });
  if (mapped?.canonicalServiceId) {
    const mappedConfidence = Math.max(mapped.confidenceScore || 0, 0);
    return {
      serviceId: mapped.canonicalServiceId,
      confidence: mappedConfidence,
      mappingMetadata: mapped,
    };
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
    mappingMetadata: mapped,
  };
}

function isExplicitTopicChange(normalizedText) {
  return EXPLICIT_SWITCH_PATTERNS.some((pattern) => pattern.test(normalizedText));
}

function confirmsPendingSwitch(normalizedText) {
  return SWITCH_CONFIRM_PATTERNS.some((pattern) => pattern.test(normalizedText));
}

function declinesPendingSwitch(normalizedText) {
  return SWITCH_DECLINE_PATTERNS.some((pattern) => pattern.test(normalizedText));
}

export function resolveServiceTransition(session, userText) {
  const normalizedAudit = normalizeServiceTextWithAudit(userText);
  const normalizedText = normalizedAudit.normalizedText;
  const previousServiceId = session?.activeServiceId || null;
  const wasLocked = Boolean(session?.lockedService);
  const pendingServiceSwitch = session?.pendingServiceSwitch || null;
  const detection = detectServiceConfidence(normalizedText);
  const shortFollowUp = isShortFollowUp(normalizedText);
  const explicitTopicChange = isExplicitTopicChange(normalizedText);
  const events = [];

  const attachAudit = (payload) => {
    const result = {
      ...payload,
    normalizationAudit: normalizedAudit.audit,
    normalizationConfidence: normalizedAudit.confidence,
    mappingMetadata: detection.mappingMetadata || null,
    mappingConfidence:
      detection.mappingMetadata?.confidenceScore ?? detection.confidence ?? 0,
    mappingMethod:
      detection.mappingMetadata?.mappingMethod || "legacy_detection",
    mappingAmbiguity: Boolean(detection.mappingMetadata?.ambiguityDetected),
    mappingCollision: Boolean(detection.mappingMetadata?.collisionDetected),
    };

    const telemetryContext = createTelemetryContext(session, { origin: "chat-state" });
    emitTelemetryEvent(
      "service_transition_evaluated",
      {
        mappingMethod: result.mappingMethod,
        confidenceScore: result.mappingConfidence,
        confidenceLabel:
          detection.mappingMetadata?.confidenceLabel || "fallback",
        ambiguityDetected: result.mappingAmbiguity,
        collisionDetected: result.mappingCollision,
        fallbackUsed: Boolean(detection.mappingMetadata?.fallbackUsed),
        canonicalId:
          detection.mappingMetadata?.canonicalServiceId ||
          detection.mappingMetadata?.canonicalProductCode ||
          result.serviceId ||
          null,
        canonicalServiceId: detection.mappingMetadata?.canonicalServiceId || result.serviceId || null,
        canonicalProductCode: detection.mappingMetadata?.canonicalProductCode || null,
        normalizedInput: normalizedText,
        featureFlags: telemetryFlags(),
        metadata: {
          previousServiceId,
          nextServiceId: result.serviceId || null,
          lockedService: result.lockedService,
          pendingServiceSwitch: result.pendingServiceSwitch || null,
        },
      },
      telemetryContext
    );

    return result;
  };

  // DEV: Log service transition decision points
  const IS_DEV = process.env.NODE_ENV !== "production";
  if (IS_DEV) {
    console.log("[Service Transition]", {
      input: userText.slice(0, 50),
      previousServiceId,
      wasLocked,
      detection: { serviceId: detection.serviceId, confidence: detection.confidence },
      shortFollowUp,
      explicitTopicChange,
      pendingServiceSwitch,
    });
  }

  if (pendingServiceSwitch?.to && previousServiceId) {
    if (confirmsPendingSwitch(normalizedText)) {
      events.push({
        type: "service_switched",
        from: pendingServiceSwitch.from || previousServiceId,
        to: pendingServiceSwitch.to,
        confirmed: true,
      });
      events.push({ type: "service_locked", service: pendingServiceSwitch.to });

      return attachAudit({
        serviceId: pendingServiceSwitch.to,
        confidence: Math.max(pendingServiceSwitch.confidence || 0, 0.8),
        lockedService: true,
        pendingServiceSwitch: null,
        serviceSwitchConfirmed: true,
        events,
      });
    }

    if (declinesPendingSwitch(normalizedText)) {
      events.push({
        type: "service_switch_cancelled",
        from: pendingServiceSwitch.from || previousServiceId,
        to: pendingServiceSwitch.to,
      });

      return attachAudit({
        serviceId: previousServiceId,
        confidence: session?.serviceConfidence || 1,
        lockedService: true,
        pendingServiceSwitch: null,
        serviceSwitchCancelled: true,
        events,
      });
    }

    if (detection.serviceId && detection.serviceId !== previousServiceId) {
      const nextPending = {
        from: previousServiceId,
        to: detection.serviceId,
        confidence: detection.confidence,
        requestedAt: Date.now(),
      };
      events.push({ type: "service_switch_pending", ...nextPending });

      return attachAudit({
        serviceId: previousServiceId,
        confidence: session?.serviceConfidence || 1,
        lockedService: true,
        pendingServiceSwitch: nextPending,
        events,
      });
    }

    return attachAudit({
      serviceId: previousServiceId,
      confidence: session?.serviceConfidence || 1,
      lockedService: true,
      pendingServiceSwitch,
      events,
    });
  }

  if (shortFollowUp && wasLocked && previousServiceId) {
    if (IS_DEV) {
      console.log("[Service Transition Outcome] Short follow-up on locked service", {
        previousServiceId,
        locked: true,
      });
    }
    return attachAudit({
      serviceId: previousServiceId,
      confidence: session?.serviceConfidence || 1,
      lockedService: true,
      pendingServiceSwitch: null,
      events,
    });
  }

  if (!detection.serviceId) {
    return attachAudit({
      serviceId: previousServiceId,
      confidence: previousServiceId ? session?.serviceConfidence || 1 : 0,
      lockedService: wasLocked,
      pendingServiceSwitch: null,
      events,
    });
  }

  if (!previousServiceId) {
    if (detection.confidence >= 0.8) {
      events.push({ type: "service_locked", service: detection.serviceId });
      if (IS_DEV) {
        console.log("[Service Transition Outcome] Service locked (new)", {
          serviceId: detection.serviceId,
          confidence: detection.confidence,
        });
      }
    }

    return attachAudit({
      serviceId: detection.serviceId,
      confidence: detection.confidence,
      lockedService: detection.confidence >= 0.8,
      pendingServiceSwitch: null,
      events,
    });
  }

  if (previousServiceId === detection.serviceId) {
    if (!wasLocked && detection.confidence >= 0.8) {
      events.push({ type: "service_locked", service: detection.serviceId });
    }

    return attachAudit({
      serviceId: detection.serviceId,
      confidence: Math.max(session?.serviceConfidence || 0, detection.confidence),
      lockedService: wasLocked || detection.confidence >= 0.8,
      pendingServiceSwitch: null,
      events,
    });
  }

  if (wasLocked && !explicitTopicChange) {
    return attachAudit({
      serviceId: previousServiceId,
      confidence: session?.serviceConfidence || 1,
      lockedService: true,
      pendingServiceSwitch: null,
      events,
    });
  }

  if (wasLocked && explicitTopicChange && detection.confidence >= 0.6) {
    const nextPending = {
      from: previousServiceId,
      to: detection.serviceId,
      confidence: detection.confidence,
      requestedAt: Date.now(),
    };
    events.push({ type: "service_switch_pending", ...nextPending });

    if (IS_DEV) {
      console.log("[Service Transition Outcome] Service switch pending", {
        from: previousServiceId,
        to: detection.serviceId,
        confidence: detection.confidence,
      });
    }

    return attachAudit({
      serviceId: previousServiceId,
      confidence: session?.serviceConfidence || 1,
      lockedService: true,
      pendingServiceSwitch: nextPending,
      events,
    });
  }
    if (IS_DEV) {
      console.log("[Service Transition Outcome] Service switched", {
        from: previousServiceId,
        to: detection.serviceId,
        confidence: detection.confidence,
        reason: explicitTopicChange ? "explicit_switch" : "high_confidence",
        newLock: detection.confidence >= 0.8,
      });
    }

  if (explicitTopicChange || detection.confidence >= 0.8) {
    events.push({ type: "service_switched", from: previousServiceId, to: detection.serviceId });
    if (detection.confidence >= 0.8) {
      events.push({ type: "service_locked", service: detection.serviceId });
    }

    return attachAudit({
      serviceId: detection.serviceId,
      confidence: detection.confidence,
      lockedService: detection.confidence >= 0.8,
      pendingServiceSwitch: null,
      serviceSwitchConfirmed: previousServiceId !== detection.serviceId,
      events,
    });
  }

  return attachAudit({
    serviceId: previousServiceId,
    confidence: session?.serviceConfidence || 1,
    lockedService: wasLocked,
    pendingServiceSwitch: null,
    events,
  });
}

// BLOCK D: Reusable guard to protect short follow-ups on locked services
// Returns true if service detection logic should be skipped entirely
export function shouldBypassServiceDetectionLogic(userText, session) {
  if (!session?.lockedService || !session?.activeServiceId) {
    return false; // Not locked, detection allowed
  }
  
  const normalized = normalizeServiceText(userText);
  const isShort = isShortFollowUp(normalized);
  
  return isShort; // If locked and short follow-up, skip detection
}
