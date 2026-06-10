const MAX_REPORT_FIELD_LENGTH = 1500;
const MAX_SERIALIZED_SIZE = 65536;

function clip(value) {
  const text = String(value ?? "");
  if (text.length <= MAX_REPORT_FIELD_LENGTH) return text;
  return `${text.slice(0, MAX_REPORT_FIELD_LENGTH)}...`;
}

function sanitizeObject(input) {
  if (!input || typeof input !== "object") return {};
  return JSON.parse(JSON.stringify(input));
}

export function renderCopyReadyReport(input = {}) {
  const data = sanitizeObject(input);
  const sections = [
    {
      title: "Session",
      content: `sessionId: ${clip(data.sessionId || "n/a")}\nsourceSessionId: ${clip(
        data.sourceSessionId || "n/a"
      )}\ncorrelationId: ${clip(data.correlationId || "n/a")}\nduration: ${data.durationMs || 0}ms`,
    },
    {
      title: "Runtime",
      content: `conversationStage: ${clip(data.conversationStage || "n/a")}\nbookingPhase: ${clip(
        data.bookingPhase || "n/a"
      )}\nactiveServiceId: ${clip(data.activeServiceId || "n/a")}`,
    },
    {
      title: "Mapping",
      content: `method: ${clip(data.mappingMethod || "n/a")}\nconfidenceScore: ${clip(
        data.mappingConfidence ?? "n/a"
      )}\nambiguity: ${clip(Boolean(data.mappingAmbiguity))}\ncollision: ${clip(
        Boolean(data.mappingCollision)
      )}`,
    },
    {
      title: "Observability",
      content: `drift: ${clip(JSON.stringify(data.drift || {}))}\nhealth: ${clip(
        JSON.stringify(data.health || {})
      )}`,
    },
  ];

  // Step 5: Serialization Safety for Report Logic
  const serialize = (obj) => {
    const cache = new Set();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) return '[Circular]';
        cache.add(value);
      }
      return value;
    }, 2);
  };

  const rendered = sections
    .map(
      (section) =>
        `[[COPY_START:${section.title}]]\n${section.content}\n[[COPY_END:${section.title}]]`
    )
    .join("\n\n");

  const fullJson = serialize(data);

  return {
    type: "copy_ready_report",
    generatedAt: new Date().toISOString(),
    sections,
    rendered,
    raw: fullJson.length > MAX_SERIALIZED_SIZE ? clip(fullJson) : fullJson
  };
}
