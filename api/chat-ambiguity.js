/**
 * Conversational clarification & ambiguity-handling layer.
 *
 * PURPOSE
 *   Detect vague / uncertain / partial human responses and produce
 *   targeted, natural follow-up prompts — instead of letting the
 *   deterministic validator return a hard rejection like
 *   "Invalid date." or silently re-asking the same question.
 *
 * STRICT BOUNDARIES — this module is PRESENTATION + DETECTION ONLY:
 *   - MUST NOT mutate booking memory, session, validation, or phase
 *   - MUST NOT bypass finalize guards or snapshot protections
 *   - MUST NOT decide which field comes next
 *   - MAY only inspect user text + the next missing field, and return
 *     a clarification prompt string (or null if no ambiguity detected)
 *
 * The deterministic engine remains the source of truth. Detectors here
 * are pure functions over user text — they never touch state.
 */

function norm(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// ---------- Deterministic ambiguity detectors ----------

/**
 * Vague / unresolved date phrasing.
 * Examples: "next friday", "soon", "later", "around christmas",
 * "sometime in june", "tbd", "not sure yet".
 *
 * NB: "next friday" is technically resolvable by normalizeBookingDate,
 * but conversationally it benefits from a confirmation ("which Friday
 * exactly?") before locking it in — the validator will still accept it
 * if the user re-affirms.
 */
export function isVagueDate(text) {
  const n = norm(text);
  if (!n) return false;
  if (
    /\b(soon|later|someday|sometime|whenever|tbd|to be (?:determined|confirmed)|asap|not sure|unsure|maybe|might be|possibly|around|roughly|approx(?:imately)?)\b/.test(
      n,
    )
  ) {
    return true;
  }
  if (/\bnext\s+(week|month|weekend)\b/.test(n)) return true;
  if (/^(early|mid|late|end of|start of|beginning of)\s+\w+/.test(n)) return true;
  if (/\bnext\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/.test(n)) {
    // Resolvable but conversationally worth confirming.
    return true;
  }
  return false;
}

/**
 * Vague location phrasing.
 * Examples: "somewhere in PE", "around motherwell", "not sure yet",
 * "tbd", "anywhere", "we'll decide later".
 */
export function isVagueLocation(text) {
  const n = norm(text);
  if (!n) return false;
  if (
    /\b(somewhere|anywhere|around|near|close to|by the|not sure|unsure|tbd|we['’]?ll decide|to be (?:decided|determined|confirmed)|maybe|possibly)\b/.test(
      n,
    )
  ) {
    return true;
  }
  // A bare city name with no venue (e.g. "PE", "port elizabeth", "gqeberha")
  // is fine — only flag when paired with a vagueness marker handled above.
  return false;
}

/**
 * Vague scope phrasing for visual / audio / digital work.
 * Examples: "small one", "just video maybe", "the usual", "not sure",
 * "something simple", "something basic", "you decide".
 */
export function isVagueScope(text) {
  const n = norm(text);
  if (!n) return false;
  if (
    /\b(not sure|unsure|maybe|something|anything|whatever|the usual|basic|simple|small|big|standard|you decide|up to you|your call)\b/.test(
      n,
    )
  ) {
    // Allow "just photo" / "just video" — those are concrete enough.
    if (/^just\s+(photo|video|both|audio)$/.test(n)) return false;
    return true;
  }
  return false;
}

/**
 * Incomplete / partial phone input — too short, contains digits but not
 * obviously a full SA mobile, or includes filler ("call me on my cell").
 */
export function isIncompletePhone(text) {
  const n = norm(text);
  if (!n) return false;
  // "later", "tbd", "not sure", "i'll send it" etc — flag regardless of digits
  if (/\b(later|tbd|not sure|i['’]?ll send|send it later|will share)\b/.test(n)) {
    return true;
  }
  const digits = n.replace(/\D/g, "");
  if (digits.length === 0) return false;
  if (digits.length < 9) return true; // short
  return false;
}

/**
 * Incomplete / partial email input — has fragments but not a full address.
 */
export function isIncompleteEmail(text) {
  const n = norm(text);
  if (!n) return false;
  if (/\b(later|tbd|not sure|i['’]?ll send|send it later|will share|don['’]?t have)\b/.test(n)) {
    return true;
  }
  // Looks like the user is *trying* to give an email but missed @ or TLD.
  const looksLikeAttempt = /[a-z0-9._-]+/.test(n) && n.length <= 80;
  if (looksLikeAttempt && !n.includes("@")) {
    // Only flag if they typed something email-shaped (e.g. "john gmail com")
    if (/(gmail|yahoo|outlook|hotmail|icloud|webmail|domain|\.com|\.co\.za|\.org)/.test(n)) {
      return true;
    }
  }
  if (n.includes("@")) {
    const [, domain = ""] = n.split("@");
    if (!domain.includes(".")) return true;
  }
  return false;
}

/**
 * Uncertain / hedged confirmation — neither a clean YES nor a clean NO.
 * Examples: "i think so", "probably", "let me check", "my cousin will
 * confirm", "give me a moment".
 */
export function isUncertainConfirmation(text) {
  const n = norm(text);
  if (!n) return false;
  if (
    /\b(i think so|probably|likely|maybe|might|let me check|let me ask|hold on|give me a (?:moment|sec|minute)|will (?:get|come) back|i['’]?ll confirm later|my (?:cousin|wife|husband|partner|family|friend|brother|sister) will (?:confirm|decide))\b/.test(
      n,
    )
  ) {
    return true;
  }
  return false;
}

/**
 * Uncertain customer-name input. e.g. "not sure yet", "my cousin's name".
 */
export function isVagueName(text) {
  const n = norm(text);
  if (!n) return false;
  if (/\b(not sure|tbd|will share|later|i['’]?ll send)\b/.test(n)) return true;
  return false;
}

// ---------- Field → detector map ----------

const FIELD_DETECTORS = {
  date: isVagueDate,
  location: isVagueLocation,
  scope: isVagueScope,
  coverageType: isVagueScope,
  customerPhone: isIncompletePhone,
  customerEmail: isIncompleteEmail,
  customerName: isVagueName,
};

// ---------- Clarification prompts (natural, non-rejecting) ----------

const CLARIFICATION_PROMPTS = {
  date: [
    "Got you — which date exactly are you working with? (a specific day + month helps me lock it in)",
    "Totally fine — could you pin it to a specific date so I can hold the slot?",
  ],
  location: [
    "Which area or venue should we note for this? Even a suburb in Port Elizabeth helps me plan.",
    "No problem — which neighbourhood or venue are we looking at?",
  ],
  scope: [
    "Quick check — what project scope should we note for this service?",
    "To shape the right quote, which project type should I note?",
  ],
  coverageType: [
    "Quick check — would you like photo only, video only, or both?",
    "To shape the right quote, are you after photo, video, or both?",
  ],
  customerPhone: [
    "Could you share the full number (with country code or leading 0)? I want to make sure we can reach you.",
    "Mind sending the complete mobile number so we don't miss you?",
  ],
  customerEmail: [
    "Could you send the full email address (including the @ and the .co.za / .com part)?",
    "Just need the complete email so I can send confirmation through.",
  ],
  customerName: [
    "Whose name should we put on the booking? First and last is perfect.",
    "Which name should we use for the booking?",
  ],
};

const CONFIRMATION_CLARIFICATION =
  "No rush — should I hold this booking summary while you check, or would you like to lock it in now? Reply YES to confirm, or tell me what to change.";

function pickStable(arr, seed) {
  if (!arr || !arr.length) return null;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return arr[hash % arr.length];
}

/**
 * Detect ambiguity for the field the engine is currently asking about.
 * Returns a clarification descriptor or null if the input is concrete.
 *
 * @param {string} userText - Raw user message
 * @param {string} nextField - Field name the engine wants next
 * @returns {{ field: string, kind: "vague"|"incomplete", prompt: string }|null}
 */
export function detectFieldAmbiguity(userText, nextField) {
  if (!nextField) return null;
  const detector = FIELD_DETECTORS[nextField];
  if (!detector) return null;
  if (!detector(userText)) return null;

  const pool = CLARIFICATION_PROMPTS[nextField];
  const prompt = pickStable(pool, `${nextField}|${norm(userText)}`) || pool?.[0];
  if (!prompt) return null;

  const kind =
    nextField === "customerPhone" || nextField === "customerEmail"
      ? "incomplete"
      : "vague";

  return { field: nextField, kind, prompt };
}

/**
 * Detect uncertain confirmation while AWAITING_CONFIRMATION.
 * Returns a soft clarification prompt or null.
 */
export function detectConfirmationAmbiguity(userText) {
  if (!isUncertainConfirmation(userText)) return null;
  return { field: "confirmation", kind: "uncertain", prompt: CONFIRMATION_CLARIFICATION };
}

/**
 * Lightweight clarification context — purely informational, never persisted
 * back to booking memory. Callers may stash this on the in-memory session
 * for the next turn (separate namespace from bookingMemory).
 */
export function buildClarificationContext(ambiguity) {
  if (!ambiguity) return null;
  return {
    pendingField: ambiguity.field,
    kind: ambiguity.kind,
    issuedAt: Date.now(),
  };
}
