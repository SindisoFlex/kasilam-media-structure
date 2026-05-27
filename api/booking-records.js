import { db } from "./lib/db.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    const { ref, sessionId } = req.query || {};
    try {
      if (ref) {
        const rec = await db.bookingRecords.findByRef(ref);
        return res.status(200).json({ ok: true, record: rec });
      }
      if (sessionId) {
        // fallback: search booking_records by session_id in JSON fallback
        // For PG, a simple query
        if (!db.query) return res.status(200).json({ ok: true, record: null });
        const r = await db.query(`SELECT * FROM booking_records WHERE session_id = $1 LIMIT 1`, [sessionId]);
        return res.status(200).json({ ok: true, record: r.rows[0] || null });
      }
      return res.status(400).json({ error: "ref or sessionId required" });
    } catch (err) {
      console.error("[booking-records] GET failed", err);
      return res.status(500).json({ error: "failed" });
    }
  }

  if (req.method === "POST") {
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { body = {}; }
    }
    try {
      const rec = await db.bookingRecords.upsert(body);
      return res.status(200).json({ ok: true, record: rec });
    } catch (err) {
      console.error("[booking-records] upsert failed", err);
      return res.status(500).json({ error: "failed to save booking record" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
