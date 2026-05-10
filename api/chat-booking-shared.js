/**
 * Shared booking field requirements, validation, scoring, and question copy.
 * Used by ai-chat.js and chat-fallbacks.js to stay in sync.
 */

export const BOOKING_PHASE = Object.freeze({
  COLLECTING: "collecting",
  AWAITING_CONFIRMATION: "awaiting_confirmation",
  FINALIZED: "finalized",
});

export const BOOKING_CONFIRMATION_SCORE_THRESHOLD = 70;

export function cloneBookingSnapshot(memory) {
  return { ...(memory || {}) };
}

export function formatFrozenBookingLines(snapshot) {
  const m = snapshot || {};
  const lines = [];
  if (m.service) lines.push(`Service type: ${m.service}`);
  if (m.date) lines.push(`Date: ${m.date}`);
  if (m.location) lines.push(`Location: ${m.location}`);
  if (m.scope) lines.push(`Scope: ${m.scope}`);
  if (m.customerName) lines.push(`Name: ${m.customerName}`);
  if (m.customerPhone) lines.push(`Phone: ${m.customerPhone}`);
  if (m.customerEmail) lines.push(`Email: ${m.customerEmail}`);
  return lines.join("\n");
}

export function buildConfirmationBannerText(snapshot) {
  const detail = formatFrozenBookingLines(snapshot);
  return [
    "Here is your booking summary.",
    detail || "(details captured)",
    "",
    "Reply YES to confirm",
    "",
    "or tell me what to change.",
  ].join("\n");
}

/** Normalized (lowercase) user text for finalize / correction routers */
export function hasBookingCorrectionIntentNormalized(normalizedLower) {
  const n = normalizedLower;
  if (/\b(change|actually|update|correction|wrong)\b/.test(n)) return true;
  if (/\bnot\b/.test(n) && !/\bnothing\b/.test(n)) return true;
  return false;
}

export function hasBookingFinalizeYesNormalized(normalizedLower) {
  const n = String(normalizedLower || "").trim();
  if (!n) return false;
  const reject = /\b(no|nope|don't|dont|do not)\b/;
  if (reject.test(n) && !/\b(yes|confirm|proceed)\b/.test(n)) return false;
  if (/^(yes|yep|yeah|sure|okay|ok)([!.,]*)$/i.test(n)) return true;
  if (/^yes[,.\s]/i.test(n)) return true;
  if (/^confirm(ed)?[!.,]*$/i.test(n.trim())) return true;
  if (/\bi confirm\b/i.test(n)) return true;
  if (/^go ahead/i.test(n)) return true;
  if (/\bproceed\b/.test(n)) return true;
  if (/\bconfirm\b/.test(n)) return true;
  return false;
}

export function validateCustomerName(name) {
  if (!name || typeof name !== "string") return false;
  const trimmed = name.trim();
  return (
    trimmed.length >= 2 &&
    trimmed.length <= 50 &&
    !/\d/.test(trimmed) &&
    trimmed.split(/\s+/).length <= 4
  );
}

export function validateCustomerPhone(phone) {
  if (!phone || typeof phone !== "string") return false;
  const cleaned = phone.replace(/\D/g, "");
  return /^[1-9]\d{8,14}$/.test(cleaned);
}

export function validateCustomerEmail(email) {
  if (!email || typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateBookingDate(date) {
  if (!date || typeof date !== "string") return false;
  const trimmed = date.trim();
  return trimmed.length >= 4 && trimmed.length <= 30;
}

export function validateBookingLocation(location) {
  if (!location || typeof location !== "string") return false;
  const trimmed = location.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}

export function computeBookingValidation(bookingMemory) {
  const m = bookingMemory || {};
  const hasScope = Boolean(m.scope);

  return {
    service: Boolean(m.service),
    date: m.date ? validateBookingDate(m.date) : false,
    location: m.location ? validateBookingLocation(m.location) : false,
    scope: hasScope,
    customerName: validateCustomerName(m.customerName),
    customerPhone: validateCustomerPhone(m.customerPhone),
    customerEmail: m.customerEmail ? validateCustomerEmail(m.customerEmail) : false,
  };
}

export function getRequiredBookingFields(context, bookingMemory) {
  const contactTail = ["customerName", "customerPhone", "customerEmail"];

  if (context?.id === "funeral_photography") {
    return ["service", "date", "location", "scope", ...contactTail];
  }

  if (
    context?.id === "birthday_photography" ||
    context?.id === "wedding_coverage"
  ) {
    return ["service", "date", "location", "scope", ...contactTail];
  }

  if (context?.id === "audio_production") {
    return ["service", "date", "scope", ...contactTail];
  }

  if (
    context?.id === "web_development" ||
    context?.id === "branding_marketing"
  ) {
    return ["service", "scope", ...contactTail];
  }

  if (bookingMemory?.service === "funeral" || bookingMemory?.service === "visual") {
    return ["service", "date", "location", "scope", ...contactTail];
  }

  if (bookingMemory?.service === "audio") {
    return ["service", "date", "scope", ...contactTail];
  }

  if (bookingMemory?.service === "digital") {
    return ["service", "scope", ...contactTail];
  }

  return ["service", ...contactTail];
}

export function getMissingBookingFields(bookingMemory, requiredFields, bookingValidation = {}) {
  return requiredFields.filter((field) => {
    const hasValue = Boolean(bookingMemory?.[field]);
    if (!hasValue) return true;
    const isValid = bookingValidation[field];
    return !isValid;
  });
}

export function getBookingReadinessScore(state) {
  const memory = state?.bookingMemory || {};
  const validation = state?.bookingValidation || {};
  let score = 0;

  if (memory.service && validation.service) score += 30;
  if (memory.date && validation.date) score += 25;
  if (memory.location && validation.location) score += 25;
  if (memory.scope && validation.scope) score += 20;
  if (memory.customerName && validation.customerName) score += 20;
  if (memory.customerPhone && validation.customerPhone) score += 20;
  if (memory.customerEmail && validation.customerEmail) score += 15;

  return score;
}

/**
 * Correction-first prompt when memory has invalid value for field; otherwise collection prompt.
 */
export function getBookingFieldQuestion(nextField, context, state) {
  const memory = state?.bookingMemory || {};
  const v = state?.bookingValidation || {};
  const bookingService = memory.service;
  const lastIntent = state?.lastDetectedIntent;

  function hasInvalid(field) {
    return Boolean(memory[field]) && !v[field];
  }

  if (nextField === "service") {
    if (hasInvalid("service")) {
      return "I couldn’t confirm the service from that — which KMP offering is this for (funeral, wedding, events, audio, web, or marketing)?";
    }
    if (lastIntent === "pricing" || lastIntent === "price") {
      return "Which service can I give you specific pricing for? (e.g., Photography, Web Design, or Audio)";
    }
    if (lastIntent === "page_reference" || lastIntent === "navigation") {
      return "Which service page would you like to see?";
    }
    return "What kind of service do you need help with?";
  }

  if (nextField === "date") {
    if (hasInvalid("date")) {
      return "That date wasn’t quite clear — please share it again (e.g. day + month + year or YYYY-MM-DD).";
    }
    if (context?.id === "funeral_photography" || bookingService === "funeral") {
      return "What date is the service on?";
    }
    if (context?.id === "audio_production" || bookingService === "audio") {
      return "When would you like to start?";
    }
    return "What date do you have in mind?";
  }

  if (nextField === "location") {
    if (hasInvalid("location")) {
      return "Please share the venue name or street address clearly (avoid single letters or guesses).";
    }
    if (context?.id === "funeral_photography" || bookingService === "funeral") {
      return "What venue or exact address is the service at?";
    }
    return "What venue or exact address should I note?";
  }

  if (nextField === "scope") {
    if (hasInvalid("scope")) {
      return "Could you clarify the scope (e.g. photo only, video only, photo + video, or the type of site/project)?";
    }
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

  if (nextField === "customerName") {
    if (hasInvalid("customerName")) {
      return "Please share your full name (letters only, up to four words — no digits).";
    }
    return "What name should we use for your booking?";
  }

  if (nextField === "customerPhone") {
    if (hasInvalid("customerPhone")) {
      return "That number doesn’t look valid — please share a reachable phone (with country code or leading 0, 9–15 digits).";
    }
    return "What’s the best phone number to reach you on?";
  }

  if (nextField === "customerEmail") {
    if (hasInvalid("customerEmail")) {
      return "That email doesn’t look valid — please double-check it (e.g. name@domain.co.za).";
    }
    return "What email should we send booking details to?";
  }

  return "Would you like me to help you move this booking forward on WhatsApp?";
}
