import { SERVICES } from "../../core/service-registry/services.js";
import { PACKAGES } from "../../core/service-registry/packages.js";
import { FRONTEND_TO_PRODUCT } from "../../core/service-registry/mappings.js";
import { normalizeWithAudit } from "./normalization-engine.js";
import {
  createTelemetryContext,
  emitFeatureFlagUsage,
  emitTelemetryEvent,
  telemetryFlags,
} from "./telemetry-engine.js";

const FLAGS = {
  mapping: "ENABLE_MAPPING_ENGINE",
  fuzzy: "ENABLE_FUZZY_MAPPING",
  aiPlaceholder: "ENABLE_AI_MAPPING_PLACEHOLDER",
};

const CONFIDENCE_BY_METHOD = Object.freeze({
  exact: 0.98,
  normalized: 0.93,
  frontend_label: 0.9,
  synonym: 0.85,
  fuzzy: 0.72,
  ai_assisted: 0.6,
  fallback: 0.45,
  unresolved: 0,
});

const PRECEDENCE = Object.freeze([
  "exact",
  "normalized",
  "frontend_label",
  "synonym",
  "fuzzy",
  "ai_assisted",
  "fallback",
]);

const SERVICE_SYNONYMS = Object.freeze({
  website: "web_development",
  web: "web_development",
  wedding: "wedding_coverage",
  funeral: "funeral_photography",
  memorial: "funeral_photography",
  audio: "audio_production",
  recording: "audio_production",
  marketing: "branding_marketing",
  branding: "branding_marketing",
  birthday: "birthday_photography",
  party: "birthday_photography",
  event: "birthday_photography",
});

function isEnabled(flagName) {
  return process.env[flagName] === "true";
}

function normalizeLookupValue(value) {
  const normalized = normalizeWithAudit(value, { context: "mapping_lookup" }).normalizedText;
  return String(normalized || "").trim();
}

function tokenize(value) {
  return String(value || "")
    .toLowerCase()
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function confidenceLabel(method) {
  if (method === "frontend_label") return "normalized";
  if (method === "ai_assisted") return "ai-assisted";
  return method.replace("_", "-");
}

function normalizeMethodLabel(method) {
  if (method === "frontend_label") return "frontend label";
  if (method === "ai_assisted") return "ai-assisted";
  return method;
}

function buildRegistry() {
  const serviceValues = Object.values(SERVICES || {});
  const packageValues = Array.isArray(PACKAGES) ? PACKAGES : [];
  const frontendMap = FRONTEND_TO_PRODUCT || {};

  const servicesByExact = new Map();
  const servicesByNormalized = new Map();
  const productsByExact = new Map();
  const productsByNormalized = new Map();
  const frontendByExact = new Map();
  const frontendByNormalized = new Map();

  for (const service of serviceValues) {
    const exactCandidates = [service.serviceId, service.displayName, service.bookingService];
    for (const candidate of exactCandidates) {
      if (!candidate) continue;
      const key = String(candidate).toLowerCase();
      if (!servicesByExact.has(key)) servicesByExact.set(key, []);
      servicesByExact.get(key).push(service.serviceId);
    }

    const normalizedCandidates = [service.serviceId, service.displayName];
    for (const candidate of normalizedCandidates) {
      if (!candidate) continue;
      const key = normalizeLookupValue(candidate);
      if (!servicesByNormalized.has(key)) servicesByNormalized.set(key, []);
      servicesByNormalized.get(key).push(service.serviceId);
    }
  }

  for (const pkg of packageValues) {
    const exactCandidates = [pkg.productCode, pkg.displayName, ...(pkg.frontendLabels || [])];
    for (const candidate of exactCandidates) {
      if (!candidate) continue;
      const key = String(candidate).toLowerCase();
      if (!productsByExact.has(key)) productsByExact.set(key, []);
      productsByExact.get(key).push(pkg.productCode);
    }

    const normalizedCandidates = [pkg.productCode, pkg.displayName, ...(pkg.frontendLabels || [])];
    for (const candidate of normalizedCandidates) {
      if (!candidate) continue;
      const key = normalizeLookupValue(candidate);
      if (!productsByNormalized.has(key)) productsByNormalized.set(key, []);
      productsByNormalized.get(key).push(pkg.productCode);
    }
  }

  for (const [label, productCode] of Object.entries(frontendMap)) {
    const exactKey = String(label).toLowerCase();
    if (!frontendByExact.has(exactKey)) frontendByExact.set(exactKey, []);
    frontendByExact.get(exactKey).push(productCode);

    const normalizedKey = normalizeLookupValue(label);
    if (!frontendByNormalized.has(normalizedKey)) frontendByNormalized.set(normalizedKey, []);
    frontendByNormalized.get(normalizedKey).push(productCode);
  }

  return {
    serviceValues,
    packageValues,
    servicesByExact,
    servicesByNormalized,
    productsByExact,
    productsByNormalized,
    frontendByExact,
    frontendByNormalized,
  };
}

function uniqueSorted(values) {
  return [...new Set(values || [])].sort((a, b) => String(a).localeCompare(String(b)));
}

function createBaseResult({ input, normalizedInput, stageTrace, flags, normalizationAudit }) {
  return {
    input,
    normalizedInput,
    canonicalServiceId: null,
    canonicalProductCode: null,
    mappingEntityType: "unresolved",
    mappingMethod: "unresolved",
    mappingStageUsed: "fallback",
    confidenceScore: CONFIDENCE_BY_METHOD.unresolved,
    confidenceLabel: "unresolved",
    ambiguityDetected: false,
    ambiguityCandidates: [],
    ambiguityReason: null,
    collisionDetected: false,
    collisionType: null,
    collisionCandidates: [],
    fallbackUsed: false,
    timestamp: new Date().toISOString(),
    mappingTrace: stageTrace,
    featureFlags: flags,
    normalizationAudit,
  };
}

function resolveProductMetadata(productCode, packageValues) {
  const pkg = packageValues.find((item) => item.productCode === productCode) || null;
  if (!pkg) return { serviceId: null, entityType: "product" };
  const entityType = pkg.entityType === "inquiry" ? "inquiry" : "product";
  return { serviceId: pkg.serviceId || null, entityType };
}

function attachMatch(baseResult, method, candidates, selected, registry) {
  const sortedCandidates = uniqueSorted(candidates);
  const productMetadata = selected
    ? resolveProductMetadata(selected.productCode, registry.packageValues)
    : { serviceId: selected?.serviceId || null, entityType: "unresolved" };

  const ambiguous = sortedCandidates.length > 1;
  return {
    ...baseResult,
    canonicalServiceId: selected?.serviceId ?? productMetadata.serviceId,
    canonicalProductCode: selected?.productCode || null,
    mappingEntityType: selected?.entityType || productMetadata.entityType,
    mappingMethod: method,
    mappingStageUsed: method,
    confidenceScore: CONFIDENCE_BY_METHOD[method],
    confidenceLabel: confidenceLabel(method),
    ambiguityDetected: ambiguous,
    ambiguityCandidates: sortedCandidates,
    ambiguityReason: ambiguous ? "multiple canonical candidates detected" : null,
  };
}

function detectCollision(input, normalizedInput, registry) {
  const collisions = [];

  const normalizedFrontendProducts = uniqueSorted(
    registry.frontendByNormalized.get(normalizedInput) || []
  );
  if (normalizedFrontendProducts.length > 1) {
    collisions.push({
      type: "normalized_label_divergence",
      candidates: normalizedFrontendProducts,
    });
  }

  const tokens = tokenize(input);
  const synonymHits = uniqueSorted(
    tokens
      .map((token) => SERVICE_SYNONYMS[token])
      .filter(Boolean)
  );
  if (synonymHits.length > 1) {
    collisions.push({
      type: "synonym_overlap",
      candidates: synonymHits,
    });
  }

  return collisions;
}

function resolveByExact(input, registry) {
  const exactInput = String(input || "").trim().toLowerCase();
  if (!exactInput) return null;

  const productCandidates = uniqueSorted(registry.productsByExact.get(exactInput) || []);
  if (productCandidates.length > 0) {
    const selected = productCandidates[0];
    const { serviceId, entityType } = resolveProductMetadata(selected, registry.packageValues);
    return {
      method: "exact",
      candidates: productCandidates,
      selected: { productCode: selected, serviceId, entityType },
    };
  }

  const serviceCandidates = uniqueSorted(registry.servicesByExact.get(exactInput) || []);
  if (serviceCandidates.length > 0) {
    return {
      method: "exact",
      candidates: serviceCandidates,
      selected: { serviceId: serviceCandidates[0], entityType: "product" },
    };
  }

  return null;
}

function resolveByNormalized(normalizedInput, registry) {
  if (!normalizedInput) return null;

  const productCandidates = uniqueSorted(registry.productsByNormalized.get(normalizedInput) || []);
  if (productCandidates.length > 0) {
    const selected = productCandidates[0];
    const { serviceId, entityType } = resolveProductMetadata(selected, registry.packageValues);
    return {
      method: "normalized",
      candidates: productCandidates,
      selected: { productCode: selected, serviceId, entityType },
    };
  }

  const serviceCandidates = uniqueSorted(registry.servicesByNormalized.get(normalizedInput) || []);
  if (serviceCandidates.length > 0) {
    return {
      method: "normalized",
      candidates: serviceCandidates,
      selected: { serviceId: serviceCandidates[0], entityType: "product" },
    };
  }

  return null;
}

function resolveByFrontendLabel(input, normalizedInput, registry) {
  const exactCandidates = uniqueSorted(
    registry.frontendByExact.get(String(input || "").trim().toLowerCase()) || []
  );
  const normalizedCandidates = uniqueSorted(registry.frontendByNormalized.get(normalizedInput) || []);
  const candidates = uniqueSorted([...exactCandidates, ...normalizedCandidates]);
  if (candidates.length === 0) return null;

  const selectedCode = candidates[0];
  const { serviceId, entityType } = resolveProductMetadata(selectedCode, registry.packageValues);
  return {
    method: "frontend_label",
    candidates,
    selected: { productCode: selectedCode, serviceId, entityType },
  };
}

function resolveBySynonym(input) {
  const tokens = tokenize(input);
  const serviceCandidates = uniqueSorted(tokens.map((token) => SERVICE_SYNONYMS[token]).filter(Boolean));
  if (serviceCandidates.length === 0) return null;

  return {
    method: "synonym",
    candidates: serviceCandidates,
    selected: { serviceId: serviceCandidates[0], entityType: "product" },
  };
}

function scoreFuzzySimilarity(needle, haystack) {
  const needleTokens = new Set(tokenize(needle));
  const haystackTokens = new Set(tokenize(haystack));
  if (needleTokens.size === 0 || haystackTokens.size === 0) return 0;

  let overlap = 0;
  for (const token of needleTokens) {
    if (haystackTokens.has(token)) overlap += 1;
  }

  const union = new Set([...needleTokens, ...haystackTokens]).size;
  return union ? overlap / union : 0;
}

function resolveByFuzzy(input, registry) {
  const scored = [];
  const threshold = 0.3;

  for (const service of registry.serviceValues) {
    const score = Math.max(
      scoreFuzzySimilarity(input, service.serviceId),
      scoreFuzzySimilarity(input, service.displayName)
    );
    if (score >= threshold) {
      scored.push({ type: "service", id: service.serviceId, score });
    }
  }

  for (const pkg of registry.packageValues) {
    const labelScores = (pkg.frontendLabels || []).map((label) =>
      scoreFuzzySimilarity(input, label)
    );
    const score = Math.max(
      scoreFuzzySimilarity(input, pkg.displayName),
      scoreFuzzySimilarity(input, pkg.productCode),
      ...labelScores
    );
    if (score >= threshold) {
      scored.push({ type: "product", id: pkg.productCode, score });
    }
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return String(a.id).localeCompare(String(b.id));
  });

  if (scored.length === 0) return null;
  const topScore = scored[0].score;
  const candidates = uniqueSorted(
    scored.filter((entry) => Math.abs(entry.score - topScore) < 0.01).map((entry) => entry.id)
  );
  const selected = scored[0];

  if (selected.type === "product") {
    const { serviceId, entityType } = resolveProductMetadata(selected.id, registry.packageValues);
    return {
      method: "fuzzy",
      candidates,
      selected: { productCode: selected.id, serviceId, entityType },
      fuzzyCandidates: candidates,
    };
  }

  return {
    method: "fuzzy",
    candidates,
    selected: { serviceId: selected.id, entityType: "product" },
    fuzzyCandidates: candidates,
  };
}

function resolveAiPlaceholder() {
  return {
    method: "ai_assisted",
    candidates: [],
    selected: { serviceId: null, entityType: "unresolved" },
  };
}

function resolveFallback(options = {}) {
  const fallbackServiceId = options.fallbackServiceId || null;
  if (fallbackServiceId) {
    return {
      method: "fallback",
      candidates: [fallbackServiceId],
      selected: { serviceId: fallbackServiceId, entityType: "product" },
    };
  }
  return null;
}

export function resolveCanonicalMapping(input, options = {}) {
  const rawInput = String(input ?? "");
  const normalized = normalizeWithAudit(rawInput, {
    context: "mapping_runtime",
    session: options.session,
    sessionId: options.sessionId,
    sourceSessionId: options.sourceSessionId,
  });
  const normalizedInput = normalized.normalizedText;
  const registry = buildRegistry();
  const flags = {
    ENABLE_MAPPING_ENGINE: isEnabled(FLAGS.mapping),
    ENABLE_FUZZY_MAPPING: isEnabled(FLAGS.fuzzy),
    ENABLE_AI_MAPPING_PLACEHOLDER: isEnabled(FLAGS.aiPlaceholder),
    ...telemetryFlags(),
  };
  const telemetryContext = createTelemetryContext(options.session, {
    sessionId: options.sessionId,
    sourceSessionId: options.sourceSessionId,
    origin: "mapping-engine",
  });
  emitFeatureFlagUsage(telemetryContext, flags);

  const stageTrace = [];
  const baseResult = createBaseResult({
    input: rawInput,
    normalizedInput,
    stageTrace,
    flags,
    normalizationAudit: normalized.audit,
  });

  if (!flags.ENABLE_MAPPING_ENGINE) {
    const result = {
      ...baseResult,
      mappingMethod: "fallback",
      mappingStageUsed: "fallback",
      confidenceScore: CONFIDENCE_BY_METHOD.fallback,
      confidenceLabel: "fallback",
      fallbackUsed: true,
      mappingTrace: [
        {
          stage: "fallback",
          status: "skipped_engine_disabled",
          note: "mapping engine feature flag disabled",
        },
      ],
    };
    emitTelemetryEvent("mapping_fallback", {
      ...result,
      canonicalId: result.canonicalServiceId || result.canonicalProductCode || null,
      featureFlags: flags,
      metadata: { reason: "mapping_engine_disabled" },
    }, telemetryContext);
    return result;
  }

  const collisionEvents = detectCollision(rawInput, normalizedInput, registry);
  const pushTrace = (stage, status, details = {}) => {
    stageTrace.push({
      stage,
      order: PRECEDENCE.indexOf(stage) + 1,
      status,
      ...details,
    });
  };

  const stageResolvers = [
    () => resolveByExact(rawInput, registry),
    () => resolveByNormalized(normalizedInput, registry),
    () => resolveByFrontendLabel(rawInput, normalizedInput, registry),
    () => resolveBySynonym(rawInput),
    () => (flags.ENABLE_FUZZY_MAPPING ? resolveByFuzzy(rawInput, registry) : null),
    () => (flags.ENABLE_AI_MAPPING_PLACEHOLDER ? resolveAiPlaceholder() : null),
    () => resolveFallback(options),
  ];

  for (let index = 0; index < PRECEDENCE.length; index += 1) {
    const stage = PRECEDENCE[index];
    const resolved = stageResolvers[index]();
    if (!resolved) {
      pushTrace(stage, "miss");
      continue;
    }

    pushTrace(stage, "matched", {
      method: normalizeMethodLabel(resolved.method),
      candidates: uniqueSorted(resolved.candidates),
    });

    const result = attachMatch(baseResult, resolved.method, resolved.candidates, resolved.selected, registry);
    const withCollision = {
      ...result,
      fallbackUsed: resolved.method === "fallback",
      collisionDetected: collisionEvents.length > 0 || Boolean(resolved.fuzzyCandidates?.length > 1),
      collisionType:
        collisionEvents[0]?.type ||
        (resolved.fuzzyCandidates?.length > 1 ? "fuzzy_overlap" : null),
      collisionCandidates:
        collisionEvents[0]?.candidates ||
        (resolved.fuzzyCandidates?.length > 1 ? resolved.fuzzyCandidates : []),
      mappingTrace: stageTrace,
    };
    const canonicalId = withCollision.canonicalServiceId || withCollision.canonicalProductCode || null;
    const payload = {
      ...withCollision,
      canonicalId,
      featureFlags: flags,
      metadata: {
        mappingEntityType: withCollision.mappingEntityType,
        collisionType: withCollision.collisionType,
      },
    };

    if (withCollision.mappingMethod === "fuzzy") {
      emitTelemetryEvent("mapping_fuzzy_match", payload, telemetryContext);
    } else if (withCollision.mappingMethod === "fallback") {
      emitTelemetryEvent("mapping_fallback", payload, telemetryContext);
    } else {
      emitTelemetryEvent("mapping_success", payload, telemetryContext);
    }
    if (withCollision.ambiguityDetected) {
      emitTelemetryEvent("mapping_ambiguity_detected", payload, telemetryContext);
    }
    if (withCollision.collisionDetected) {
      emitTelemetryEvent("mapping_collision_detected", payload, telemetryContext);
    }
    if (withCollision.mappingMethod === "unresolved" || !canonicalId) {
      emitTelemetryEvent("mapping_unresolved", payload, telemetryContext);
    }
    return withCollision;
  }

  pushTrace("fallback", "unresolved");
  const unresolvedResult = {
    ...baseResult,
    mappingMethod: "unresolved",
    mappingStageUsed: "fallback",
    confidenceScore: CONFIDENCE_BY_METHOD.unresolved,
    confidenceLabel: "unresolved",
    fallbackUsed: true,
    collisionDetected: collisionEvents.length > 0,
    collisionType: collisionEvents[0]?.type || null,
    collisionCandidates: collisionEvents[0]?.candidates || [],
    mappingTrace: stageTrace,
  };
  emitTelemetryEvent(
    "mapping_unresolved",
    {
      ...unresolvedResult,
      canonicalId: null,
      featureFlags: flags,
      metadata: { collisionType: unresolvedResult.collisionType },
    },
    telemetryContext
  );
  return unresolvedResult;
}

export function mappingEngineFlags() {
  return {
    ENABLE_MAPPING_ENGINE: isEnabled(FLAGS.mapping),
    ENABLE_FUZZY_MAPPING: isEnabled(FLAGS.fuzzy),
    ENABLE_AI_MAPPING_PLACEHOLDER: isEnabled(FLAGS.aiPlaceholder),
  };
}

export { PRECEDENCE as MAPPING_PRECEDENCE };
