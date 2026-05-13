import {
  BOOKING_CONFIRMATION_SCORE_THRESHOLD,
  BOOKING_PHASE,
  buildConfirmationBannerText,
  canBookingBeFinalized,
  computeBookingValidation,
  getBookingFieldQuestion,
  getBookingReadinessScore,
  getInvalidBookingFields,
  getMissingBookingFields,
  getRequiredBookingFields,
  hasBookingDeclineNoNormalized,
  hasExplicitBookingResetIntentNormalized,
  hasBookingCorrectionIntentNormalized,
  hasBookingFinalizeYesNormalized,
  isBookingAwaitingConfirmation,
  buildInvalidFieldRecoveryMessage,
  detectBookingFieldCorrection,
  applyBookingFieldCorrection,
  shouldReopenBookingFromCorrection,
} from "./chat-booking-shared.js";
import {
  buildAdaptivePrompt,
  hasReferenceableContext,
} from "./chat-adaptive-prompts.js";
import {
  detectFieldAmbiguity,
  detectConfirmationAmbiguity,
} from "./chat-ambiguity.js";

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

export function buildContextualFallback(session, intent) {
  // BLOCK C: Fallback Context Enforcement
  // If service is locked, use it directly. Do NOT re-detect via heuristics.
  // Locked service is authoritative, preventing "photography" keyword from overriding funeral/wedding context.
  const IS_DEV = process.env.NODE_ENV !== "production";
  
  let activeServiceId = session?.activeServiceId || null;
  let confidence = 0;
  
  // Priority 1: Locked service is authoritative
  if (session?.lockedService && activeServiceId) {
    if (IS_DEV) {
      console.log("[Fallback] Using locked service", {
        activeServiceId,
        locked: true,
      });
    }
    confidence = 1.0;
  } else {
    // Normal inference: try session, then booking memory, then heuristics
    const bookingMemoryServiceId = inferServiceIdFromBookingMemory(session);
    const heuristicServiceId = inferServiceIdFromHeuristics(intent);
    
    activeServiceId =
      activeServiceId || bookingMemoryServiceId || heuristicServiceId || null;
    confidence = activeServiceId
      ? (activeServiceId === session?.activeServiceId ? 0.95 : bookingMemoryServiceId ? 0.75 : 0.45)
      : 0;
  }

  let memory = session?.bookingMemory || {};
  const phase = session?.bookingPhase || BOOKING_PHASE.COLLECTING;
  const normalizedUser = normalizeText(intent?.normalizedText || "");
  const explicitResetRequested =
    hasExplicitBookingResetIntentNormalized(normalizedUser);
  const reopenFromCorrection =
    shouldReopenBookingFromCorrection(normalizedUser, phase);
  const declineFromAwait =
    isBookingAwaitingConfirmation(session) &&
    hasBookingDeclineNoNormalized(normalizedUser);

  if (explicitResetRequested) {
    activeServiceId = inferServiceIdFromHeuristics(intent);
    confidence = activeServiceId ? 0.45 : 0;
  }
  
  const fieldCorrection = detectBookingFieldCorrection(normalizedUser, memory);
  
  if (explicitResetRequested) {
    memory = {};
  } else if (fieldCorrection) {
    memory = applyBookingFieldCorrection(memory, fieldCorrection);
  }
  
  const bookingValidation = computeBookingValidation(memory);
  const invalidFields = getInvalidBookingFields(memory, bookingValidation);

  const readinessScore = getBookingReadinessScore({
    bookingMemory: memory,
    bookingValidation,
  });

  if (!activeServiceId || !SERVICE_FALLBACKS[activeServiceId]) {
    const missingGen = missingBookingFieldsGenericPlaceholder(memory);
    const blockHighPitch =
      readinessScore >= BOOKING_CONFIRMATION_SCORE_THRESHOLD &&
      ((phase === BOOKING_PHASE.COLLECTING &&
        missingGen.length === 0) ||
        (phase === BOOKING_PHASE.FINALIZED && !session.ctaIssued));

    if (
      phase === BOOKING_PHASE.AWAITING_CONFIRMATION &&
      session.confirmationSnapshot
    ) {
      return buildLines([
        buildConfirmationBannerText(session.confirmationSnapshot),
        `More details: ${SITE_BASE_URL}/services`,
      ]);
    }

    return buildLines([
      "You're in the right place, and I can narrow this down for you.",
      "Are you looking for funeral coverage, event photography, or another photography service?",
      `More details: ${SITE_BASE_URL}/services`,
      !blockHighPitch && readinessScore >= BOOKING_CONFIRMATION_SCORE_THRESHOLD
        ? `You can also message us on WhatsApp at ${WHATSAPP_NUMBER}.`
        : null,
    ]);
  }

  const context = { id: activeServiceId };
  const requiredFields = getRequiredBookingFields(context, memory);
  const missingBookingFields = getMissingBookingFields(
    memory,
    requiredFields,
    bookingValidation
  );
  const nextMissing = missingBookingFields[0] || null;
  const canFinalize = canBookingBeFinalized(
    bookingValidation,
    readinessScore,
    requiredFields,
    invalidFields
  );

  const config = SERVICE_FALLBACKS[activeServiceId];

  if (phase === BOOKING_PHASE.AWAITING_CONFIRMATION) {
    if (declineFromAwait || reopenFromCorrection || invalidFields.length > 0) {
      const recoveryPrompt =
        invalidFields.length > 0
          ? buildInvalidFieldRecoveryMessage(
              invalidFields[0],
              memory[invalidFields[0]]
            )
          : nextMissing != null
            ? getBookingFieldQuestion(nextMissing, context, {
                bookingMemory: memory,
                bookingValidation,
                lastDetectedIntent: session?.lastIntent || null,
              })
            : "What would you like to change?";
      return buildLines([
        `${config.name}: You're in the right place, and we handle that.`,
        config.summary,
        `More details: ${joinUrl(config.route)}`,
        recoveryPrompt,
      ]);
    }

    const snap = session.confirmationSnapshot || memory;
    const banner = buildConfirmationBannerText(snap);
    
    if (!normalizedUser.trim()) {
      return buildLines([
        `${config.name}: You're in the right place, and we handle that.`,
        banner,
        `More details: ${joinUrl(config.route)}`,
      ]);
    }

    const correction =
      hasBookingCorrectionIntentNormalized(normalizedUser) || fieldCorrection;
    const affirm = hasBookingFinalizeYesNormalized(normalizedUser);

    let tail;
    if (correction) {
      tail =
        "What would you like to change? Share the corrected detail (for example date, venue, scope, phone, email, or name).";
    } else if (affirm && canFinalize) {
      tail =
        "Reply YES to confirm\n\nor tell me what to change.";
    } else if (affirm) {
      tail =
        nextMissing != null
          ? getBookingFieldQuestion(nextMissing, context, {
              bookingMemory: memory,
              bookingValidation,
              lastDetectedIntent: session?.lastIntent || null,
            })
          : "I still need one more valid detail before I can confirm this booking.";
    } else {
      tail =
        "Please reply YES to confirm your booking summary, or tell me specifically what you would like to change.";
    }

    return buildLines([
      `${config.name}: You're in the right place, and we handle that.`,
      banner,
      `More details: ${joinUrl(config.route)}`,
      tail,
    ]);
  }

  if (phase === BOOKING_PHASE.FINALIZED) {
    return buildLines([
      `${config.name}: You're in the right place, and we handle that.`,
      "Your booking is already finalized.",
      `More details: ${joinUrl(config.route)}`,
      "To make changes, please start over with a new booking request.",
    ]);
  }

  const stage = session?.conversationStage || "discovery";
  const intentName = intent?.intent || "general_inquiry";
  let question = pickQuestion(config, stage, intentName, confidence);

  // BLOCK A4: Invalid-field recovery - prioritize over missing-field prompting
  let clarificationApplied = false;
  if (invalidFields.length > 0) {
    const firstInvalid = invalidFields[0];
    question = buildInvalidFieldRecoveryMessage(firstInvalid, memory[firstInvalid]);
  } else if (nextMissing != null) {
    // Phase 3: Conversational clarification — if the user's latest message
    // is vague/incomplete for the field we're collecting, swap the adaptive
    // prompt for a soft, targeted clarification. Detection only — no state
    // mutation, no validation bypass.
    const ambiguity = detectFieldAmbiguity(normalizedUser, nextMissing);
    if (ambiguity) {
      question = ambiguity.prompt;
      clarificationApplied = true;
    } else {
      const adaptive = buildAdaptivePrompt(nextMissing, context, {
        bookingMemory: memory,
        bookingValidation,
        lastDetectedIntent: session?.lastIntent || null,
      });
      question = adaptive.prompt;
    }
  }

  const captured = [];

  if (memory.date) captured.push(`date: ${memory.date}`);
  if (memory.location) captured.push(`location: ${memory.location}`);
  if (memory.scope) captured.push(`scope: ${memory.scope}`);
  if (memory.customerName) captured.push(`name: ${memory.customerName}`);
  if (memory.customerPhone) captured.push(`phone: ${memory.customerPhone}`);
  if (memory.customerEmail) captured.push(`email: ${memory.customerEmail}`);

  const summaryLine =
    intentName === "pricing" ? config.pricing : config.summary;
  // Suppress the verbose "So far I have ..." dump when the adaptive prompt
  // already echoes the most recent confirmed field naturally — avoids
  // re-stating information the user just provided.
  const suppressMemoryLine =
    clarificationApplied ||
    (invalidFields.length === 0 &&
      nextMissing != null &&
      hasReferenceableContext(memory, bookingValidation));
  const memoryLine =
    captured.length && !suppressMemoryLine
      ? `So far I have ${captured.join(", ")}.`
      : null;

  let ctaLine = question;
  const suppressWaTeaserCollectComplete =
    phase === BOOKING_PHASE.COLLECTING &&
    readinessScore >= BOOKING_CONFIRMATION_SCORE_THRESHOLD &&
    missingBookingFields.length === 0;
  if (
    readinessScore >= BOOKING_CONFIRMATION_SCORE_THRESHOLD &&
    !suppressWaTeaserCollectComplete &&
    (phase !== BOOKING_PHASE.FINALIZED || session.ctaIssued)
  ) {
    ctaLine = `If you'd like to move faster, message us on WhatsApp at ${WHATSAPP_NUMBER}. ${question}`;
  }

  return buildLines([
    `${config.name}: You're in the right place, and we handle that.`,
    summaryLine,
    memoryLine,
    `More details: ${joinUrl(config.route)}`,
    ctaLine,
  ]);
}

function missingBookingFieldsGenericPlaceholder(memory) {
  const bv = computeBookingValidation(memory || {});
  return getMissingBookingFields(
    memory || {},
    getRequiredBookingFields(null, memory),
    bv
  );
}
