import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const { message } = req.body || {};

    // 1. Load knowledge
    const filePath = path.join(process.cwd(), "public", "data", "kmp_knowledge.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const knowledge = JSON.parse(fileData);

    // 2. Build prompt
    const prompt = `
You are an assistant for a media company.

Use this knowledge:
${JSON.stringify(knowledge)}

User question:
${message}

Give a helpful, clear answer and guide the user to the right service.
`;

    // 3. Call Gemini
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({
      error: "AI request failed",
      details: error.message
    });
  }
}