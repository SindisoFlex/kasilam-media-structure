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
export const BOOKING_VALIDATION_ESCALATION_THRESHOLD = 3;

export function cloneBookingSnapshot(memory) {
  return { ...(memory || {}) };
}

export function formatFrozenBookingLines(snapshot) {
  const m = snapshot || {};
  const lines = [];
  if (m.service) lines.push(`Service type: ${m.service}`);
  if (m.packageTier) lines.push(`Package tier: ${m.packageTier}`);
  if (m.coverageType) lines.push(`Coverage type: ${m.coverageType}`);
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

export function hasBookingDeclineNoNormalized(normalizedLower) {
  const n = String(normalizedLower || "").trim();
  if (!n) return false;
  if (hasBookingFinalizeYesNormalized(n)) return false;
  if (/^(no|nope|nah)([!.,]*)$/i.test(n)) return true;
  if (/^no[,.\s]/i.test(n)) return true;
  if (/^(don't|dont|do not)\s+(confirm|proceed)/i.test(n)) return true;
  if (/\b(not correct|not right|incorrect)\b/i.test(n)) return true;
  return false;
}

export function hasExplicitBookingResetIntentNormalized(normalizedLower) {
  const n = String(normalizedLower || "").trim();
  if (!n) return false;

  return (
    /\bstart over\b/.test(n) ||
    /\bcancel booking\b/.test(n) ||
    /\bnew booking\b/.test(n) ||
    /\breset booking\b/.test(n)
  );
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

/**
 * Normalizes South African phone numbers to +27XXXXXXXXX format.
 *
 * Conversions:
 * - 0821234567 → +27821234567
 * - 27821234567 → +27821234567
 * - +27821234567 → +27821234567
 *
 * Removes spaces, dashes, parentheses.
 * Preserves leading +.
 * Rejects malformed prefixes.
 *
 * @param {string} value - Raw phone number
 * @returns {string|null} Normalized phone number or null if invalid
 */
export function normalizeCustomerPhone(value) {
  if (!value || typeof value !== "string") return null;

  const trimmed = value.trim();
  const cleaned = trimmed.replace(/[^\d+]/g, "");

  const alphaCheck = trimmed.replace(/[+0-9\s\-\(\)]/g, "");
  if (alphaCheck.length > 0) return null;

  if (cleaned.startsWith("00")) {
    const digits = cleaned.substring(2);
    if (/^\d{8,15}$/.test(digits)) {
      return `+${digits}`;
    }
    return null;
  }

  if (cleaned.startsWith("+")) {
    const digits = cleaned.substring(1);
    if (/^\d{8,15}$/.test(digits)) {
      return `+${digits}`;
    }
    return null;
  }

  if (cleaned.startsWith("27") && /^\d{11}$/.test(cleaned)) {
    return `+${cleaned}`;
  }

  if (cleaned.startsWith("0") && /^\d{10}$/.test(cleaned)) {
    return `+27${cleaned.substring(1)}`;
  }

  return null;
}

/**
 * Validates phone numbers using strict format checking.
 *
 * Rules:
 * - Must normalize first
 * - Supports South African and international E.164 formatted numbers
 * - Rejects short numbers, repeated fake digits, alphabetic contamination, malformed prefixes
 *
 * Valid formats:
 * - +27XXXXXXXXX
 * - +44XXXXXXXXXX
 * - +1XXXXXXXXXX
 * - 00-prefixed international numbers
 *
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone number
 */
export function validateCustomerPhone(phone) {
  if (!phone || typeof phone !== "string") return false;

  const normalized = normalizeCustomerPhone(phone);
  if (!normalized) return false;

  const genericPattern = /^\+\d{8,15}$/;
  if (!genericPattern.test(normalized)) return false;

  const digits = normalized.substring(1);
  if (/^(\d)\1+$/.test(digits)) return false;

  if (normalized.startsWith("+27")) {
    const southAfricanDigits = normalized.substring(3);
    if (!/^\d{9}$/.test(southAfricanDigits)) return false;
  }

  return true;
}

/**
 * Validates email addresses using strict deterministic validation.
 *
 * Rules:
 * - Must normalize successfully
 * - Must contain exactly one @
 * - Must have valid local part
 * - Must have valid domain
 * - Must have valid TLD
 * - Reject: malformed domains, double dots, spaces, missing TLD, invalid symbols, consecutive separators
 * - Reject obvious placeholders: test@test.com, example@example.com, fake@email.com, none@none.com
 *
 * @param {string} email - Email string to validate
 * @returns {boolean} True if valid email
 */
export function validateCustomerEmail(email) {
  if (!email || typeof email !== "string") return false;

  const normalized = normalizeCustomerEmail(email);
  if (!normalized) return false;

  // Must contain exactly one @
  const atCount = (normalized.match(/@/g) || []).length;
  if (atCount !== 1) return false;

  // Split into local and domain parts
  const [localPart, domain] = normalized.split("@");
  if (!localPart || !domain) return false;

  // Local part validation
  // Allow: alphanumeric, dots, hyphens, underscores
  // Reject: consecutive dots, starting/ending with dot
  if (localPart.length === 0 || localPart.length > 64) return false;
  if (/\.\.|\.$|^\.|\.$/.test(localPart)) return false;
  if (!/^[a-zA-Z0-9._-]+$/.test(localPart)) return false;

  // Domain validation
  // Must have at least one dot for TLD
  if (!domain.includes(".")) return false;
  if (/\.\.|\.$|^\.|\.$/.test(domain)) return false;

  // Domain parts validation
  const domainParts = domain.split(".");
  if (domainParts.length < 2) return false;

  // Each domain part must be valid
  for (const part of domainParts) {
    if (part.length === 0 || part.length > 63) return false;
    if (!/^[a-zA-Z0-9-]+$/.test(part)) return false;
    if (/^-|-$/.test(part)) return false;
  }

  // TLD must be at least 2 characters
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) return false;

  // Reject obvious placeholder emails
  const placeholderPatterns = [
    /^(test@|example@|fake@|none@|dummy@|temp@|noreply@)/i,
    /^(test\.com|example\.com|fake\.com|none\.com|dummy\.com|temp\.com)$/i,
  ];
  for (const pattern of placeholderPatterns) {
    if (pattern.test(normalized)) return false;
  }

  return true;
}

/**
 * Normalizes booking dates to ISO format (YYYY-MM-DD).
 *
 * Accepts:
 * - ISO format: "2026-01-12"
 * - Common conversational formats: "12 Jan", "12 January 2026"
 * - Relative dates: "tomorrow", "next friday"
 *
 * Returns normalized YYYY-MM-DD or null for invalid/unrecognized dates.
 * Uses deterministic parsing only - no AI/NLP.
 *
 * @param {string} value - Raw date string
 * @returns {string|null} Normalized date in YYYY-MM-DD format or null
 */
export function normalizeBookingDate(value) {
  if (!value || typeof value !== "string") return null;

  const trimmed = value.trim().toLowerCase();

  // Reject vague placeholders
  const vaguePatterns = /\b(someday|later|next time|soon|tbd|to be determined|asap|whenever)\b/;
  if (vaguePatterns.test(trimmed)) return null;

  // Handle relative dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (trimmed === "tomorrow") {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDateToISO(tomorrow);
  }

  if (trimmed === "today") {
    return formatDateToISO(today);
  }

  // Handle "next [day]" pattern
  const nextDayMatch = trimmed.match(/^next\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/);
  if (nextDayMatch) {
    const dayName = nextDayMatch[1];
    const targetDay = getDayOfWeek(dayName);
    const nextDate = getNextDayOfWeek(today, targetDay);
    return formatDateToISO(nextDate);
  }

  // Try ISO format first (YYYY-MM-DD)
  const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (isValidDate(date) && date.getFullYear() === parseInt(year)) {
      return formatDateToISO(date);
    }
    return null;
  }

  // Try common conversational formats: "12 Jan", "12 January 2026"
  const monthNames = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11,
  };

  // Pattern: "12 Jan" or "12 January 2026"
  const conversationalMatch = trimmed.match(/^(\d{1,2})\s+([a-z]+)(?:\s+(\d{4}))?$/);
  if (conversationalMatch) {
    const [, day, monthStr, yearStr] = conversationalMatch;
    const month = monthNames[monthStr];
    if (month === undefined) return null;

    const year = yearStr ? parseInt(yearStr) : today.getFullYear();
    const date = new Date(year, month, parseInt(day));

    if (isValidDate(date)) {
      return formatDateToISO(date);
    }
    return null;
  }

  // Pattern: "DD/MM/YYYY" or "DD-MM-YYYY" or "YYYY/MM/DD" or "YYYY-MM-DD"
  const slashMatch = trimmed.match(/^(\d{1,4})[\/\-](\d{1,2})[\/\-](\d{1,4})$/);
  if (slashMatch) {
    let first = parseInt(slashMatch[1], 10);
    const second = parseInt(slashMatch[2], 10);
    let third = parseInt(slashMatch[3], 10);
    let year = third;
    let month = second - 1;
    let day = first;

    if (first > 31) {
      year = first;
      month = second - 1;
      day = third;
    }

    if (year < 100) {
      year += 2000;
    }

    const date = new Date(year, month, day);
    if (isValidDate(date)) {
      return formatDateToISO(date);
    }
  }

  return null;
}

/**
 * Formats a Date object to ISO string (YYYY-MM-DD).
 */
function formatDateToISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Checks if a Date object represents a valid calendar date.
 */
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Gets the day of week number (0=Sunday, 6=Saturday).
 */
function getDayOfWeek(dayName) {
  const days = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  return days[dayName];
}

/**
 * Gets the next occurrence of a specific day of week.
 */
function getNextDayOfWeek(date, targetDay) {
  const currentDay = date.getDay();
  const daysUntilTarget = (targetDay - currentDay + 7) % 7;
  if (daysUntilTarget === 0) {
    // Same day, go to next week
    const nextWeek = new Date(date);
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek;
  }
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + daysUntilTarget);
  return nextDate;
}

/**
 * Validates booking dates using strict logical validation.
 *
 * Rules:
 * - Date must normalize successfully
 * - Date must be a real calendar date
 * - Date must NOT be in the past
 * - Reject impossible dates (32 January, 2025-13-99, February 30)
 * - Reject vague placeholders
 *
 * @param {string} date - Date string to validate
 * @returns {boolean} True if valid future date
 */
export function validateBookingDate(date) {
  if (!date || typeof date !== "string") return false;

  const normalized = normalizeBookingDate(date);
  if (!normalized) return false;

  const isoMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!isoMatch) return false;

  const [, year, month, day] = isoMatch;
  const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  if (!isValidDate(parsedDate)) return false;
  if (parsedDate.getFullYear() !== parseInt(year)) return false;
  if (parsedDate.getMonth() + 1 !== parseInt(month)) return false;
  if (parsedDate.getDate() !== parseInt(day)) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsedDate.setHours(0, 0, 0, 0);

  if (parsedDate < today) return false;

  return true;
}

export function scoreBookingFieldConfidence(field, value, message = "", context = null) {
  if (!field || !value || typeof value !== "string") return 0;
  const text = String(message || value).toLowerCase();
  const trimmedValue = value.trim();

  const containsPhoneHint = /\b(phone|number|call|sms|whatsapp|contact)\b/i.test(text);
  const containsEmailHint = /\b(email|e-mail|mail|address)\b/i.test(text);
  const containsDateHint = /\b(date|when|tomorrow|today|next|monday|tuesday|wednesday|thursday|friday|saturday|sunday|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i.test(text);
  const containsLocationHint = /\b(location|venue|address|at|in|near|site|place)\b/i.test(text);
  const containsNameHint = /\b(my name is|i'm|i am|this is)\b/i.test(text);

  switch (field) {
    case "customerName": {
      if (containsNameHint) return 100;
      if (/^[a-zA-Z][a-zA-Z'\-]+(?:\s+[a-zA-Z'\-]+){0,3}$/.test(trimmedValue) && !/\b(price|cost|how much|quote|rates|book)\b/i.test(text)) {
        return 80;
      }
      return 0;
    }
    case "customerPhone": {
      if (!validateCustomerPhone(trimmedValue)) return 0;
      if (containsPhoneHint) return 100;
      return 80;
    }
    case "customerEmail": {
      if (!validateCustomerEmail(trimmedValue)) return 0;
      if (containsEmailHint) return 100;
      return 80;
    }
    case "date": {
      if (!validateBookingDate(trimmedValue)) return 0;
      if (containsDateHint) return 100;
      return 90;
    }
    case "location": {
      if (!validateBookingLocation(trimmedValue)) return 0;
      if (containsLocationHint) return 100;
      if (trimmedValue.split(/\s+/).length <= 6 && !/\b(price|cost|how much|quote|rates|book|available)\b/i.test(text)) {
        return 80;
      }
      return 60;
    }
    default:
      return 0;
  }
}

export function isBookingFieldConfidenceAcceptable(score) {
  return typeof score === "number" && score >= 80;
}

export function validateBookingLocation(location) {
  if (!location || typeof location !== "string") return false;
  const trimmed = location.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}

/**
 * Normalizes email addresses to consistent format.
 *
 * - Trims whitespace
 * - Converts to lowercase
 * - Removes surrounding punctuation safely
 *
 * Examples:
 * - " JOHN@GMAIL.COM " → "john@gmail.com"
 * - "john@gmail.com" → "john@gmail.com"
 *
 * @param {string} value - Raw email string
 * @returns {string|null} Normalized email or null if invalid
 */
export function normalizeCustomerEmail(value) {
  if (!value || typeof value !== "string") return null;

  const trimmed = value.trim();

  // Remove surrounding punctuation (but preserve internal dots, hyphens, etc.)
  const cleaned = trimmed.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]$/g, "");

  // Convert to lowercase
  const normalized = cleaned.toLowerCase();

  // Basic structure check - must contain @
  if (!normalized.includes("@")) return null;

  return normalized;
}

export function computeBookingValidation(bookingMemory) {
  const m = bookingMemory || {};
  const service = m.service || null;
  const isVisualWorkflow = service === "funeral" || service === "visual";
  const hasScope = isVisualWorkflow ? false : validateNonVisualScope(service, m.scope);

  return {
    service: Boolean(m.service),
    date: m.date ? validateBookingDate(m.date) : false,
    location: m.location ? validateBookingLocation(m.location) : false,
    scope: hasScope,
    packageTier: validatePackageTier(m.packageTier),
    coverageType: isVisualWorkflow ? validateCoverageType(m.coverageType) : false,
    customerName: validateCustomerName(m.customerName),
    customerPhone: validateCustomerPhone(m.customerPhone),
    customerEmail: m.customerEmail ? validateCustomerEmail(m.customerEmail) : false,
  };
}

export function validatePackageTier(value) {
  if (!value || typeof value !== "string") return false;
  return ["basic", "standard", "premium"].includes(value.trim().toLowerCase());
}

export function validateCoverageType(value) {
  if (!value || typeof value !== "string") return false;
  return ["photo", "video", "photo and video"].includes(value.trim().toLowerCase());
}

export function validateNonVisualScope(service, value) {
  if (!value || typeof value !== "string") return false;
  const normalized = value.trim().toLowerCase();
  const scopesByService = {
    digital: [
      "landing page",
      "business website",
      "custom web app",
      "new website",
      "redesign",
      "branding",
      "social media",
      "content",
      "paid ads",
    ],
    audio: ["recording", "mixing", "mastering", "voiceover", "podcast"],
  };

  const blockedVisualCoverage = ["photo", "video", "photo and video"];
  if (blockedVisualCoverage.includes(normalized)) return false;

  const allowed = scopesByService[service];
  return Array.isArray(allowed) ? allowed.includes(normalized) : Boolean(normalized);
}

export function getRequiredBookingFields(context, bookingMemory) {
  const contactTail = ["customerName", "customerPhone", "customerEmail"];

  if (context?.id === "funeral_photography") {
    return ["service", "packageTier", "coverageType", "date", "location", ...contactTail];
  }

  if (
    context?.id === "birthday_photography" ||
    context?.id === "wedding_coverage"
  ) {
    return ["service", "packageTier", "coverageType", "date", "location", ...contactTail];
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
    return ["service", "packageTier", "coverageType", "date", "location", ...contactTail];
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

/**
 * Identifies fields that exist in booking memory but fail validation.
 * This is separate from missing fields - these are fields that have values,
 * but those values are invalid (e.g., malformed phone, past date, fake email).
 *
 * @param {object} bookingMemory - Current booking memory
 * @param {object} bookingValidation - Validation results from computeBookingValidation
 * @returns {string[]} Array of invalid field names
 */
export function getInvalidBookingFields(bookingMemory, bookingValidation) {
  if (!bookingMemory || !bookingValidation) return [];

  const invalidFields = [];

  // Check each field that could be invalid
  const checkableFields = [
    "customerPhone",
    "customerEmail",
    "date",
    "scope",
    "packageTier",
    "coverageType",
  ];

  for (const field of checkableFields) {
    // Field must exist in memory AND fail validation
    const hasValue = bookingMemory[field] !== null && bookingMemory[field] !== undefined && bookingMemory[field] !== "";
    const isValid = bookingValidation[field];

    if (hasValue && !isValid) {
      invalidFields.push(field);
    }
  }

  return invalidFields;
}

/**
 * Generates deterministic recovery messages for invalid booking fields.
 * No AI generation, no Gemini dependency, no generic prompts.
 *
 * @param {string} fieldName - Name of the invalid field
 * @param {string} value - The invalid value (optional, for context)
 * @returns {string} Deterministic recovery message
 */
export function buildInvalidFieldRecoveryMessage(fieldName, value, streak = 1) {
  if (isBookingValidationEscalationNeeded(streak)) {
    return buildBookingValidationEscalationMessage(fieldName);
  }

  const baseMessages = {
    customerPhone: "That phone number looks invalid. Please send a valid South African mobile number.",
    customerEmail: "That email address looks invalid. Please send a valid email address.",
    date: "That booking date looks invalid. Please send a valid future booking date.",
    scope: "That project scope does not match this service. Please send the correct project type for this booking.",
    packageTier: "That package tier looks invalid. Please choose Basic, Standard, or Premium.",
    coverageType: "That coverage type looks invalid. Please choose photo only, video only, or photo + video.",
  };

  const fallback = baseMessages[fieldName] || "That information looks invalid. Please provide a valid value.";

  if (streak >= 2) {
    const retryAdds = {
      customerPhone:
        " Please reply with just the full number, for example +27 82 123 4567.",
      customerEmail:
        " Please reply with just the email address, for example john@example.com.",
      date:
        " Please reply with just the booking date in a clear format like 2026-12-05.",
      packageTier:
        " Please reply with just Basic, Standard, or Premium.",
      coverageType:
        " Please reply with just photo only, video only, or photo + video.",
    };
    return `${fallback}${retryAdds[fieldName] || " Please provide it clearly."}`;
  }

  return fallback;
}

export function isBookingValidationEscalationNeeded(streak) {
  return (
    typeof streak === "number" &&
    streak >= BOOKING_VALIDATION_ESCALATION_THRESHOLD
  );
}

export function buildBookingValidationEscalationMessage(fieldName) {
  const recoveryMessages = {
    customerPhone:
      "I may still be misunderstanding the phone number. You can enter it in the booking form or continue the booking directly on WhatsApp so we can help you faster.",
    customerEmail:
      "I may still be misunderstanding the email address. You can enter it in the booking form or continue the booking directly on WhatsApp so we can help you faster.",
    date:
      "I may still be misunderstanding the date format. You can select the date from the calendar or continue the booking directly on WhatsApp so we can help you faster.",
    packageTier:
      "I may still be misunderstanding the package tier. You can choose Basic, Standard, or Premium in the booking form or continue directly on WhatsApp so we can help you faster.",
    coverageType:
      "I may still be misunderstanding the coverage type. You can choose photo only, video only, or photo + video in the booking form or continue directly on WhatsApp so we can help you faster.",
    scope:
      "I may still be misunderstanding the project scope. You can complete that detail in the booking form or continue directly on WhatsApp so we can help you faster.",
  };

  return (
    recoveryMessages[fieldName] ||
    "I may still be misunderstanding that detail. You can continue the booking directly on WhatsApp so we can help you faster."
  );
}

/**
 * Detects field-specific correction intent in user messages.
 * Deterministic regex/pattern based detection only. No AI/Gemini.
 *
 * Detects patterns like:
 * - "change the date to friday"
 * - "use this email instead"
 * - "my new number is..."
 * - "actually the location is cape town"
 *
 * @param {string} message - User message
 * @param {object} bookingMemory - Current booking memory (for context)
 * @returns {object|null} Correction object { field, value } or null if no correction detected
 */
export function detectBookingFieldCorrection(message, bookingMemory) {
  if (!message || typeof message !== "string") return null;

  const lowered = message.toLowerCase().trim();

  // Date correction patterns
  const datePatterns = [
    /(?:change|update|set|make)\s+(?:the\s+)?(?:booking\s+)?date\s+(?:to\s+)?(.+)/i,
    /(?:use|try)\s+(?:this\s+)?date\s+(?:instead\s*)?(?:of\s+)?(.+)/i,
    /(?:the\s+)?(?:booking\s+)?date\s+(?:should\s+)?(?:be|is)\s+(.+)/i,
    /(?:actually|wait)\s+(?:the\s+)?date\s+(?:is|should\s+be)\s+(.+)/i,
  ];

  for (const pattern of datePatterns) {
    const match = lowered.match(pattern);
    if (match && match[1]) {
      return { field: "date", value: match[1].trim() };
    }
  }

  // Phone correction patterns (must contain phone-related keywords)
  const phonePatterns = [
    /(?:change|update)\s+(?:the\s+)?(?:phone\s*|number\s*)?(?:instead\s*)?(?:to\s*)?(?:.+)/i,
    /(?:use|try)\s+(?:this\s+)?(?:phone\s*|number\s*)(?:instead\s*)?(?:to\s*)?(?:.+)/i,
    /(?:my\s+)?(?:new\s+)?(?:phone\s*|number\s*)(?:is|should\s+be)\s+(.+)/i,
    /(?:actually|wait)\s+(?:the\s+)?(?:phone\s*|number\s*)(?:is|should\s+be)\s+(.+)/i,
  ];

  for (const pattern of phonePatterns) {
    const match = lowered.match(pattern);
    if (match && match[1]) {
      return { field: "customerPhone", value: match[1].trim() };
    }
  }

  // Email correction patterns (must contain email-related keywords)
  const emailPatterns = [
    /(?:change|update)\s+(?:the\s+)?(?:email|address)\s+(?:to\s+)?(.+)/i,
    /(?:use|try)\s+(?:this\s+)?(?:email|address)\s+(?:instead\s+)?(.+)/i,
    /(?:my\s+)?(?:new\s+)?(?:email|address)\s+(?:is|should\s+be)\s+(.+)/i,
    /(?:actually|wait)\s+(?:the\s+)?(?:email|address)\s+(?:is|should\s+be)\s+(.+)/i,
  ];

  for (const pattern of emailPatterns) {
    const match = lowered.match(pattern);
    if (match && match[1]) {
      return { field: "customerEmail", value: match[1].trim() };
    }
  }

  // Location correction patterns (must contain location-related keywords)
  const locationPatterns = [
    /(?:change|update|set|make)\s+(?:the\s+)?(?:booking\s+)?(?:location|venue)\s+(?:to\s+)?(.+)/i,
    /(?:use|try)\s+(?:this\s+)?(?:location|venue)\s+(?:instead\s*)?(?:of\s+)?(.+)/i,
    /(?:the\s+)?(?:booking\s+)?(?:location|venue)\s+(?:should\s+)?(?:be|is)\s+(.+)/i,
    /(?:actually|wait)\s+(?:the\s+)?(?:booking\s+)?(?:location|venue)\s+(?:is|should\s+be)\s+(.+)/i,
  ];

  for (const pattern of locationPatterns) {
    const match = lowered.match(pattern);
    if (match && match[1]) {
      return { field: "location", value: match[1].trim() };
    }
  }

  return null;
}

/**
 * Safely applies a field correction to booking memory.
 * Clones the memory and mutates only the target field, preserving all others.
 *
 * @param {object} memory - Original booking memory
 * @param {object} correction - Correction object { field, value }
 * @returns {object} New booking memory with correction applied
 */
export function applyBookingFieldCorrection(memory, correction) {
  if (!memory || !correction) return memory;

  const { field, value } = correction;

  if (!field || value === undefined) return memory;

  // Clone the memory to avoid mutating the original
  const newMemory = { ...memory };

  // Apply the correction to the target field only
  newMemory[field] = value;

  return newMemory;
}

/**
 * Determines if a booking is currently in the AWAITING_CONFIRMATION phase.
 *
 * @param {object} session - Session object
 * @returns {boolean} True if booking is awaiting confirmation
 */
export function isBookingAwaitingConfirmation(session) {
  if (!session) return false;

  return (
    session.bookingPhase === BOOKING_PHASE.AWAITING_CONFIRMATION &&
    session.confirmationSnapshot !== null &&
    session.confirmationSnapshot !== undefined
  );
}

/**
 * Determines if a booking can be finalized based on validation and readiness.
 *
 * @param {object} validation - Booking validation results
 * @param {number} readinessScore - Booking readiness score
 * @returns {boolean} True if booking can be finalized
 */
export function canBookingBeFinalized(validation, readinessScore) {
  const requiredFields = arguments[2];
  const invalidFields = arguments[3];

  if (!validation || readinessScore === undefined || readinessScore === null) {
    return false;
  }

  if (readinessScore < BOOKING_CONFIRMATION_SCORE_THRESHOLD) return false;

  const requiredList = Array.isArray(requiredFields)
    ? requiredFields
    : Object.keys(validation);
  for (const field of requiredList) {
    if (validation[field] !== true) return false;
  }

  const invalidList = Array.isArray(invalidFields)
    ? invalidFields
    : Object.keys(validation).filter((key) => validation[key] === false);
  if (invalidList.length > 0) return false;

  return true;
}

/**
 * Determines if a booking should be reopened from correction intent.
 *
 * @param {string} message - User message
 * @param {string} currentPhase - Current booking phase
 * @returns {boolean} True if booking should be reopened from correction
 */
export function shouldReopenBookingFromCorrection(message, currentPhase) {
  if (!message || typeof message !== "string") return false;
  if (currentPhase !== BOOKING_PHASE.AWAITING_CONFIRMATION) return false;

  const lowered = message.toLowerCase().trim();

  // Check for general correction intent
  if (hasBookingCorrectionIntentNormalized(lowered)) return true;

  // Check for field-specific correction
  const fieldCorrection = detectBookingFieldCorrection(lowered, {});
  if (fieldCorrection) return true;

  return false;
}

export function getBookingReadinessScore(state) {
  const memory = state?.bookingMemory || {};
  const validation = state?.bookingValidation || {};
  let score = 0;

  if (memory.service && validation.service) score += 30;
  if (memory.date && validation.date) score += 25;
  if (memory.location && validation.location) score += 25;
  if (memory.scope && validation.scope) score += 20;
  if (memory.packageTier && validation.packageTier) score += 15;
  if (memory.coverageType && validation.coverageType) score += 20;
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

  if (nextField === "packageTier") {
    if (hasInvalid("packageTier")) {
      return "Please choose a valid package tier: Basic, Standard, or Premium.";
    }
    return "Which package tier would you like: Basic, Standard, or Premium?";
  }

  if (nextField === "coverageType") {
    if (hasInvalid("coverageType")) {
      return "Please choose the coverage type: photo only, video only, or photo + video.";
    }
    return "Do you want photo only, video only, or photo + video?";
  }

  if (nextField === "scope") {
    if (hasInvalid("scope")) {
      return "Could you clarify the project scope for this service?";
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
