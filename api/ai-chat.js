import fs from "fs";
import path from "path";

// Use a current, supported Gemini model on the v1beta endpoint.
// "gemini-pro" on v1 has been deprecated and returns empty candidates.
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

let cachedKnowledge = null;
function loadKnowledge() {
  if (cachedKnowledge) return cachedKnowledge;
  const filePath = path.join(process.cwd(), "public", "data", "kmp_knowledge.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  cachedKnowledge = JSON.parse(fileData);
  return cachedKnowledge;
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
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing 'message' string in body" });
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
Use ONLY the JSON knowledge below to answer client questions.
Be warm, clear, and concise. Guide users to the right service and to book via WhatsApp (+27659704101).
If you don't know, say so and point them to WhatsApp.

KNOWLEDGE:
${JSON.stringify(knowledge)}`;

    const payload = {
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: "user", parts: [{ text: message }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    };

    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const raw = await geminiRes.text();
    let data;
    try { data = JSON.parse(raw); } catch {
      console.error("[ai-chat] Non-JSON Gemini response:", raw.slice(0, 500));
      return res.status(502).json({ error: "Invalid response from Gemini", raw: raw.slice(0, 1000) });
    }

    if (!geminiRes.ok) {
      console.error("[ai-chat] Gemini error", geminiRes.status, data);
      return res.status(geminiRes.status).json({
        error: data?.error?.message || "Gemini API error",
        status: geminiRes.status,
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
