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

  const parseResult = BookingSchema.safeParse(body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Invalid booking payload.",
      issues: parseResult.error.format(),
    });
  }

  const booking = parseResult.data;

  try {
    // ensure old-style booking store doesn't duplicate
    const existing = await db.bookings.findByRefNumber(booking.refNumber);
    if (existing) {
      // ensure booking_records is synced/updated as well
      try {
        await db.bookingRecords.upsert({
          ref_number: booking.refNumber,
          session_id: booking.sourceSessionId || null,
          customer_name: booking.clientName,
          phone: booking.clientPhone,
          email: booking.clientEmail || null,
          service_type: booking.bookingInfo?.service || null,
          package_tier: booking.bookingInfo?.package || null,
          event_date: booking.date || null,
          location_address: booking.location || booking.mapsLink || null,
          gps_coordinates: null,
          notes: booking.bookingInfo?.format || null,
          booking_status: "confirmed",
        });
      } catch (e) {
        console.error("[bookings] sync booking_records failed", e);
      }

      return res.status(200).json({
        success: true,
        refNumber: booking.refNumber,
        message: "Booking already persisted.",
      });
    }

    const saved = await db.bookings.insert(booking);

    // Create/update structured booking record for conversational memory
    try {
      // attempt to extract simple gps coords from mapsLink if present (q=lat,lng)
      let gps = null;
      if (booking.mapsLink && booking.mapsLink.includes("q=")) {
        try {
          const q = new URL(booking.mapsLink).searchParams.get("q");
          if (q && q.includes(",")) {
            const [lat, lng] = q.split(",").map((v) => parseFloat(v));
            if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
              gps = { lat, lng };
            }
          }
        } catch (e) {
          // ignore parse errors
        }
      }

      const rec = await db.bookingRecords.upsert({
        ref_number: saved.ref_number || booking.refNumber,
        session_id: booking.sourceSessionId || null,
        customer_name: booking.clientName,
        phone: booking.clientPhone,
        email: booking.clientEmail || null,
        service_type: booking.bookingInfo?.service || null,
        package_tier: booking.bookingInfo?.package || null,
        event_date: booking.date || null,
        location_address: booking.location || booking.mapsLink || null,
        gps_coordinates: gps,
        notes: booking.bookingInfo?.format || null,
        booking_status: "confirmed",
      });
      // respond with both references
      return res.status(201).json({
        success: true,
        refNumber: saved.ref_number,
        bookingRecord: rec,
      });
    } catch (err) {
      console.error("[bookings] booking_records upsert failed", err);
      return res.status(201).json({
        success: true,
        refNumber: saved.ref_number,
      });
    }
  } catch (error) {
    console.error("[bookings] save failed", error);
    return res.status(500).json({
      error: "Unable to save your booking. Please try again later.",
    });
  }
}
