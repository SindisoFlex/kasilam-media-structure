import { createTelemetryContext, emitFeatureFlagUsage, emitTelemetryEvent, telemetryFlags } from "./telemetry-engine.js";
const NORMALIZATION_FLAG = "ENABLE_NORMALIZATION_ENGINE";

const SYNONYM_PATTERNS = [
  { find: /\b(web\s*site|web-site|website)\b/gi, replace: "website" },
  { find: /\b(funeral\s*photography|funeral\s*coverage)\b/gi, replace: "funeral photo" },
  { find: /\b(wedding\s*coverage|wedding\s*photography|wedding\s*videography)\b/gi, replace: "wedding" },
  { find: /\b(audio\s*production|studio\s*recording|music\s*production)\b/gi, replace: "audio" },
  { find: /\b(digital\s*marketing|paid\s*advertising|social\s*media)\b/gi, replace: "marketing" },
  { find: /\b(photography|photographer)\b/gi, replace: "photo" },
  { find: /\b(videography|videographer)\b/gi, replace: "video" },
  { find: /\b(ads|advertising|adverts?)\b/gi, replace: "advertising" },
  { find: /\b(package\s*tier|tier)\b/gi, replace: "tier" },
  { find: /\b(quote|pricing|price|cost)\b/gi, replace: "price" },
  { find: /\b(book\s*me|can\s*i\s*book|reserve|go\s*ahead)\b/gi, replace: "book" },
];

const TOKEN_SYNONYMS = new Map([
  ["photography", "photo"],
  ["photographer", "photo"],
  ["videography", "video"],
  ["videographer", "video"],
  ["marketing", "marketing"],
  ["advertising", "advertising"],
  ["ads", "advertising"],
  ["web", "web"],
  ["site", "web"],
  ["rand", ""],
  ["zar", ""],
  ["usd", ""],
  ["eur", ""],
  ["gbp", ""],
]);

const AMBIGUOUS_TERMS = new Set([
  "photo",
  "video",
  "web",
  "site",
  "marketing",
  "audio",
  "business",
  "package",
  "price",
  "service",
]);

function isNormalizationEnabled() {
  return process.env[NORMALIZATION_FLAG] === "true";
}

function normalizeUnicode(text) {
  return String(text || "").normalize("NFKC");
}

function stripCurrency(text) {
  return String(text || "")
    .replace(/\b(?:zar|rand|usd|eur|gbp|pound|dollar|euro)\b/gi, " ")
    .replace(/([Rr$€£])(?=\d)/g, " ")
    .replace(/(?<=\d),(?=\d{3}\b)/g, "")
    .replace(/[\u00A3\u00A5\u20AC\u20A9\u00A2\u00A4\u20AA\u20B4\u20BD\u20B1]/g, " ");
}

function stripPunctuation(text) {
  return String(text || "").replace(/[\p{P}\p{S}]/gu, " ");
}

function collapseWhitespace(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function applySynonyms(text) {
  let current = String(text || "");
  const replacements = [];

  for (const { find, replace } of SYNONYM_PATTERNS) {
    if (find.test(current)) {
      current = current.replace(find, replace);
      replacements.push({ find: find.source, replace });
    }
  }

  return { text: current, replacements };
}

function tokenize(text) {
  return String(text || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => TOKEN_SYNONYMS.get(token) || token);
}

function computeAmbiguity(tokens) {
  const detected = tokens.filter((token) => AMBIGUOUS_TERMS.has(token));
  return {
    ambiguous: detected.length > 0,
    ambiguousTokens: [...new Set(detected)],
  };
}

function computeConfidence({ collisionDetected, ambiguous, ambiguousTokens }) {
  let score = 1;
  if (collisionDetected) score -= 0.2;
  if (ambiguous) score -= ambiguousTokens.length * 0.1;
  score = Math.max(0.3, Math.min(1, score));
  return Number(score.toFixed(2));
}

export function normalizeText(rawText, options = {}) {
  return normalizeWithAudit(rawText, options).normalizedText;
}

export function normalizeWithAudit(rawText, options = {}) {
  const originalText = String(rawText ?? "");
  const featureEnabled = isNormalizationEnabled();
  const context = options.context || "general";

  const audit = {
    enabled: featureEnabled,
    context,
    originalText,
    stages: [],
    replacements: [],
    tokenOrder: [],
    collisionDetected: false,
    ambiguous: false,
    ambiguousTokens: [],
  };

  if (!featureEnabled) {
    const normalizedText = collapseWhitespace(originalText.toLowerCase());
    const tokens = normalizedText ? normalizedText.split(" ") : [];
    audit.stages.push({ step: "fallback-lowercase", result: normalizedText });
    audit.tokenOrder = tokens;
    const result = {
      normalizedText,
      tokens,
      audit,
      confidence: 1,
      collisionDetected: false,
      ambiguous: false,
    };
    const telemetryContext = createTelemetryContext(options.session, {
      sessionId: options.sessionId,
      sourceSessionId: options.sourceSessionId,
      origin: "normalization-engine",
    });
    const flags = telemetryFlags();
    emitFeatureFlagUsage(telemetryContext, {
      ENABLE_NORMALIZATION_ENGINE: false,
      ...flags,
    });
    emitTelemetryEvent(
      "normalization_transform",
      {
        mappingMethod: "fallback",
        confidenceScore: result.confidence,
        confidenceLabel: "exact",
        normalizedInput: result.normalizedText,
        fallbackUsed: true,
        featureFlags: {
          ENABLE_NORMALIZATION_ENGINE: false,
          ...flags,
        },
        metadata: {
          context,
          collisionDetected: false,
          ambiguous: false,
        },
      },
      telemetryContext
    );
    return result;
  }

  const unicodeNormalized = normalizeUnicode(originalText);
  audit.stages.push({ step: "unicode-normalization", result: unicodeNormalized });

  const lowered = unicodeNormalized.toLowerCase();
  audit.stages.push({ step: "lowercase", result: lowered });

  const currencyStripped = stripCurrency(lowered);
  audit.stages.push({ step: "currency-stripping", result: currencyStripped });

  const punctuationStripped = stripPunctuation(currencyStripped);
  audit.stages.push({ step: "punctuation-stripping", result: punctuationStripped });

  const collapsed = collapseWhitespace(punctuationStripped);
  audit.stages.push({ step: "whitespace-collapse", result: collapsed });

  const synonymResult = applySynonyms(collapsed);
  audit.replacements = synonymResult.replacements;
  audit.stages.push({ step: "synonym-normalization", result: synonymResult.text });

  const tokens = tokenize(synonymResult.text);
  audit.tokenOrder = tokens;
  audit.stages.push({ step: "tokenization", result: tokens.join(" ") });

  const collisionDetected = new Set(tokens).size !== tokens.length;
  audit.collisionDetected = collisionDetected;

  const ambiguity = computeAmbiguity(tokens);
  audit.ambiguous = ambiguity.ambiguous;
  audit.ambiguousTokens = ambiguity.ambiguousTokens;

  const normalizedText = collapseWhitespace(tokens.join(" "));
  audit.stages.push({ step: "final-join", result: normalizedText });

  const confidence = computeConfidence({ collisionDetected, ambiguous: ambiguity.ambiguous, ambiguousTokens: ambiguity.ambiguousTokens });

  const result = {
    normalizedText,
    tokens,
    audit,
    confidence,
    collisionDetected,
    ambiguous: ambiguity.ambiguous,
  };
  const telemetryContext = createTelemetryContext(options.session, {
    sessionId: options.sessionId,
    sourceSessionId: options.sourceSessionId,
    origin: "normalization-engine",
  });
  const flags = telemetryFlags();
  emitFeatureFlagUsage(telemetryContext, {
    ENABLE_NORMALIZATION_ENGINE: true,
    ...flags,
  });
  emitTelemetryEvent(
    "normalization_transform",
    {
      mappingMethod: "normalized",
      confidenceScore: result.confidence,
      confidenceLabel: "normalized",
      normalizedInput: result.normalizedText,
      ambiguityDetected: result.ambiguous,
      collisionDetected: result.collisionDetected,
      fallbackUsed: false,
      featureFlags: {
        ENABLE_NORMALIZATION_ENGINE: true,
        ...flags,
      },
      metadata: {
        context,
        replacements: audit.replacements,
        stageCount: audit.stages.length,
      },
    },
    telemetryContext
  );
  return result;
}

export function isNormalizationActive() {
  return isNormalizationEnabled();
}
