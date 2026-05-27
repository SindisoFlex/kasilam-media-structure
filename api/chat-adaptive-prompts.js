/**
 * Adaptive conversational prompting layer.
 *
 * PURPOSE
 *   Make next-field questions feel human and contextual by referencing
 *   information the booking engine has already validated, instead of
 *   asking flat, robotic prompts.
 *
 * STRICT BOUNDARIES — this module is PRESENTATION ONLY:
 *   - MUST NOT mutate booking memory, session, validation, or phase
 *   - MUST NOT bypass finalize guards or snapshot protections
 *   - MUST NOT decide which field comes next (deterministic engine does)
 *   - MUST NOT override invalid-field recovery prompts (those stay strict)
 *   - MAY only reformat / prepend a contextual acknowledgement to the
 *     deterministic question already chosen by the engine
 *
 * The deterministic engine remains the source of truth. If anything in
 * this module fails or is uncertain, it falls back to the raw
 * deterministic question verbatim.
 */

import { getBookingFieldQuestion } from "./chat-booking-shared.js";

const FIELD_LABELS = {
  service: "service",
  date: "date",
  location: "location",
  scope: "scope",
  packageTier: "package tier",
  coverageType: "coverage type",
  customerName: "name",
  customerPhone: "phone number",
  customerEmail: "email",
};

// Stable pool of conversational openers. Selection is deterministic
// (hash of memory snapshot) so the same state never produces a
// different opener within a session — keeps interactions coherent.
const ACK_OPENERS = ["Perfect", "Got it", "Great", "Thanks", "Noted"];

// Pre-written natural transitions per next-field. Used only when we
// already have at least one confirmed field to reference, so we can
// avoid the more clinical deterministic phrasing.
const TRANSITIONS_BY_NEXT_FIELD = {
  date: [
    "what date are you working with?",
    "what date should I lock in?",
  ],
  location: [
    "where will it be held?",
    "what's the venue or address?",
  ],
  scope: [
    "what project scope should I note?",
    "which project type should I note?",
  ],
  packageTier: [
    "which package tier should I note: Basic, Standard, or Premium?",
    "which package tier would you like: Basic, Standard, or Premium?",
  ],
  coverageType: [
    "do you want photo only, video only, or photo + video?",
    "what coverage type should I note?",
  ],
  customerName: [
    "what name should we put on the booking?",
    "whose name should we use for the booking?",
  ],
  customerPhone: [
    "what's the best number to reach you on?",
    "what number can we call you on?",
  ],
  customerEmail: [
    "and which email should we send the details to?",
    "what email should we send confirmation to?",
  ],
};

// Newest-to-oldest priority for "what was just confirmed?" lookup.
const RECENT_FIELD_PRIORITY = [
  "customerEmail",
  "customerPhone",
  "customerName",
  "coverageType",
  "packageTier",
  "scope",
  "location",
  "date",
  "service",
];

function stableIndex(seed, length) {
  if (!length) return 0;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash % length;
}

function getMostRecentlyConfirmedField(memory, validation) {
  for (const field of RECENT_FIELD_PRIORITY) {
    if (memory?.[field] && validation?.[field]) return field;
  }
  return null;
}

function buildAcknowledgement(field, memory, opener) {
  const value = memory?.[field];
  if (!value) return null;

  switch (field) {
    case "date":
      return `${opener} — I've got ${value} locked in.`;
    case "location":
      return `${opener} — ${value} noted as the venue.`;
    case "scope":
      return `${opener} — ${value} for the scope.`;
    case "packageTier":
      return `${opener} — ${value} package noted.`;
    case "coverageType":
      return `${opener} — ${value} coverage noted.`;
    case "customerName":
      return `${opener}, ${value}.`;
    case "customerPhone":
      return `${opener} — number saved.`;
    case "customerEmail":
      return `${opener} — email saved.`;
    case "service":
      return `${opener} — ${value} confirmed.`;
    default:
      return `${opener} — ${FIELD_LABELS[field] || field} noted.`;
  }
}

/**
 * Build an adaptive next-question prompt.
 *
 * Always returns the deterministic question as a baseline; only layers a
 * natural acknowledgement on top when we have validated context to draw
 * from and the next field is not in invalid-recovery mode.
 *
 * @param {string} nextField - The next missing field selected by the engine
 * @param {object} context - Service context (e.g. { id: "funeral_photography" })
 * @param {object} state - { bookingMemory, bookingValidation, lastDetectedIntent }
 * @returns {{ prompt: string, deterministicQuestion: string, adapted: boolean }}
 */
export function buildAdaptivePrompt(nextField, context, state) {
  const deterministic = getBookingFieldQuestion(nextField, context, state);
  const result = {
    prompt: deterministic,
    deterministicQuestion: deterministic,
    adapted: false,
  };

  if (!nextField) return result;

  const memory = state?.bookingMemory || {};
  const validation = state?.bookingValidation || {};

  // Invalid-value recovery is strict & deterministic — never paraphrase.
  if (memory[nextField] && validation[nextField] === false) {
    return result;
  }

  const recentField = getMostRecentlyConfirmedField(memory, validation);
  if (!recentField || recentField === nextField) {
    return result;
  }

  const seed = `${nextField}|${recentField}|${JSON.stringify(memory)}`;
  const opener = ACK_OPENERS[stableIndex(seed, ACK_OPENERS.length)];
  const ack = buildAcknowledgement(recentField, memory, opener);
  if (!ack) return result;

  const transitions = TRANSITIONS_BY_NEXT_FIELD[nextField];
  if (transitions && transitions.length) {
    const transition = transitions[stableIndex(seed, transitions.length)];
    return {
      prompt: `${ack} ${transition}`,
      deterministicQuestion: deterministic,
      adapted: true,
    };
  }

  // No tailored transition — append deterministic question after ack.
  return {
    prompt: `${ack} ${deterministic}`,
    deterministicQuestion: deterministic,
    adapted: true,
  };
}

/**
 * Returns true if the given memory has at least one validated field
 * worth referencing in an acknowledgement. Useful for callers that want
 * to suppress the verbose "So far I have …" line when the adaptive
 * prompt already echoes context naturally.
 */
export function hasReferenceableContext(memory, validation) {
  return Boolean(getMostRecentlyConfirmedField(memory || {}, validation || {}));
}
