import fs from "fs";
import path from "path";

// Use a current, supported Gemini model on the v1beta endpoint.
// "gemini-pro" on v1 has been deprecated and returns empty candidates.
const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const MAX_HISTORY_MESSAGES = 20;
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);

let cachedKnowledge = null;
function loadKnowledge() {
  if (cachedKnowledge) return cachedKnowledge;
  const filePath = path.join(process.cwd(), "public", "data", "kmp_knowledge.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  cachedKnowledge = JSON.parse(fileData);
  return cachedKnowledge;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeMessages(body) {
  const rawMessages = Array.isArray(body?.messages)
    ? body.messages
    : typeof body?.message === "string"
      ? [{ role: "user", content: body.message }]
      : [];

  return rawMessages
    .filter((message) => {
      return (
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim()
      );
    })
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }));
}

function buildGeminiContents(messages) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

function isRetryableGeminiError(status, data) {
  if (RETRYABLE_STATUSES.has(status)) return true;

  const message = data?.error?.message;
  if (typeof message !== "string") return false;

  const lowered = message.toLowerCase();
  return (
    lowered.includes("overloaded") ||
    lowered.includes("high demand") ||
    lowered.includes("rate limit") ||
    lowered.includes("temporarily unavailable") ||
    lowered.includes("resource exhausted")
  );
}

async function callGeminiWithRetry(url, payload) {
  let lastStatus = 502;
  let lastData = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const raw = await geminiRes.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("[ai-chat] Non-JSON Gemini response:", raw.slice(0, 500));
      return {
        ok: false,
        status: 502,
        data: { error: { message: "Invalid response from Gemini" }, raw: raw.slice(0, 1000) },
      };
    }

    if (geminiRes.ok) {
      return { ok: true, status: geminiRes.status, data };
    }

    lastStatus = geminiRes.status;
    lastData = data;
    const shouldRetry = attempt === 0 && isRetryableGeminiError(geminiRes.status, data);
    console.error("[ai-chat] Gemini error", geminiRes.status, data, shouldRetry ? "(retrying once)" : "");

    if (!shouldRetry) {
      return { ok: false, status: geminiRes.status, data };
    }

    await sleep(1200);
  }

  return { ok: false, status: lastStatus, data: lastData };
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Body may arrive as string depending on runtime
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    const messages = normalizeMessages(body);

    if (!messages.length) {
      return res.status(400).json({ error: "Missing 'messages' array or legacy 'message' string in body" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[ai-chat] GEMINI_API_KEY is not set");
      return res.status(500).json({ error: "Server misconfigured: GEMINI_API_KEY not set" });
    }

    let knowledge;
    try {
      knowledge = loadKnowledge();
    } catch (e) {
      console.error("[ai-chat] Failed to load knowledge file:", e);
      return res.status(500).json({ error: "Failed to load knowledge file", details: e.message });
    }

    const systemInstruction = `You are the AI assistant for Kasilam Media Productions (KMP).
Base factual claims only on the JSON knowledge below.
Be warm, consultative, and concise, like a professional booking consultant.
Treat the full conversation as one continuous booking discussion and carry context forward naturally.
When a user gives partial information, infer the likely topic from prior messages and ask the next most helpful follow-up question.
Help qualify the lead by understanding the service type, occasion, date, venue/location, coverage needs, deliverables, and any relevant budget or package fit.
Guide users toward booking via WhatsApp (+27659704101) once you have enough information or when they ask how to proceed.
Do not invent prices, packages, policies, or availability that are not in the knowledge.
If something is unknown, say so clearly and offer WhatsApp as the next step.
Prefer short conversational replies. Usually ask one focused follow-up question at a time.

KNOWLEDGE:
${JSON.stringify(knowledge)}`;

    const payload = {
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: buildGeminiContents(messages),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    };

    const geminiResult = await callGeminiWithRetry(`${GEMINI_URL}?key=${apiKey}`, payload);
    const data = geminiResult.data;

    if (!geminiResult.ok) {
      return res.status(geminiResult.status).json({
        error: data?.error?.message || "Gemini API error",
        status: geminiResult.status,
        details: data?.error || data,
      });
    }

    const candidate = data?.candidates?.[0];
    const finishReason = candidate?.finishReason;
    const parts = candidate?.content?.parts;
    const reply = Array.isArray(parts)
      ? parts.map((p) => p?.text || "").join("").trim()
      : "";

    if (!reply) {
      console.error("[ai-chat] Empty reply. finishReason=", finishReason, "data=", JSON.stringify(data).slice(0, 1000));
      return res.status(502).json({
        error: "Gemini returned no text",
        finishReason,
        promptFeedback: data?.promptFeedback,
        raw: data,
      });
    }

    return res.status(200).json({ reply, finishReason, model: GEMINI_MODEL });
  } catch (error) {
    console.error("[ai-chat] Unhandled error:", error);
    return res.status(500).json({ error: "AI request failed", details: error.message, stack: error.stack });
  }
}
