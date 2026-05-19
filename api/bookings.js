import { z } from "zod";
import { db } from "./lib/db.js";

const BookingSchema = z.object({
  refNumber: z.string().min(1),
  sourceSessionId: z.string().optional(),
  bookingInfo: z.object({
    service: z.string().min(1),
    package: z.string().min(1),
    price: z.number().nonnegative(),
    hours: z.number().optional(),
    format: z.string().optional(),
  }),
  selectedAddOns: z.array(z.string()),
  location: z.string().optional(),
  mapsLink: z.string().optional(),
  date: z.string().nullable(),
  time: z.string().optional(),
  clientName: z.string().min(2),
  clientPhone: z.string().min(5),
  clientEmail: z.string().email().optional(),
  subtotal: z.number().nonnegative(),
  vat: z.number().nonnegative(),
  total: z.number().nonnegative(),
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

  // Backward-compatible normalization for chatbot-originated payloads.
  if (body && typeof body === "object") {
    if (!body.clientName && typeof body.customerName === "string") {
      body.clientName = body.customerName;
    }
    if (!body.clientPhone && typeof body.customerPhone === "string") {
      body.clientPhone = body.customerPhone;
    }
    if (!body.clientEmail && typeof body.customerEmail === "string") {
      body.clientEmail = body.customerEmail;
    }
  }

  const parseResult = BookingSchema.safeParse(body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Invalid booking payload.",
      issues: parseResult.error.format(),
    });
  }

  const booking = parseResult.data;

  try {
    const existing = await db.bookings.findByRefNumber(booking.refNumber);
    if (existing) {
      return res.status(200).json({
        success: true,
        refNumber: booking.refNumber,
        message: "Booking already persisted.",
      });
    }

    const saved = await db.bookings.insert(booking);
    return res.status(201).json({
      success: true,
      refNumber: saved.ref_number,
    });
  } catch (error) {
    console.error("[bookings] save failed", error);
    return res.status(500).json({
      error: "Unable to save your booking. Please try again later.",
    });
  }
}
