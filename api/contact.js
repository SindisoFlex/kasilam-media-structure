import { z } from "zod";
import { db } from "./lib/db.js";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  businessName: z.string().min(2),
  serviceNeeded: z.string().min(1),
  budgetRange: z.string().min(1),
  projectDescription: z.string().min(10),
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const parseResult = ContactSchema.safeParse(body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Invalid submission data.",
      issues: parseResult.error.format(),
    });
  }

  const contact = parseResult.data;

  try {
    const saved = await db.contacts.insert(contact);
    return res.status(201).json({
      success: true,
      contactId: saved.contact_id,
    });
  } catch (error) {
    console.error("[contact] save failed", error);
    return res.status(500).json({
      error: "Unable to save contact request. Please try again later.",
    });
  }
}
