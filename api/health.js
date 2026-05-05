export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    time: new Date().toISOString(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
}
