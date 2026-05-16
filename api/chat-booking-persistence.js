/**
 * Booking Persistence Layer
 * 
 * Safely persists finalized bookings to permanent storage.
 * Triggered ONLY after bookingPhase === FINALIZED
 * 
 * Schema: {
 *   bookingId,
 *   status,
 *   service,
 *   customerName,
 *   customerPhone,
 *   customerEmail,
 *   date,
 *   location,
 *   scope,
 *   createdAt,
 *   finalizedAt,
 *   sourceSessionId,
 *   bookingPhase
 * }
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import { db } from "./lib/db.js";
import {
  computeBookingValidation,
  getRequiredBookingFields,
  getMissingBookingFields,
  BOOKING_CONFIRMATION_SCORE_THRESHOLD,
} from "./chat-booking-shared.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BOOKING_ARCHIVE_PATH = path.join(__dirname, "..", "booking_archive.json");

/**
 * Generates a deterministic, collision-resistant booking ID.
 * Format: booking_<timestamp>_<randomSuffix>
 * 
 * @returns {string} Unique booking ID
 */
export function generateBookingId() {
  const timestamp = Date.now();
  const random = crypto.randomBytes(4).toString("hex");
  return `booking_${timestamp}_${random}`;
}

/**
 * Loads the current booking archive from disk.
 * Returns empty object if file doesn't exist.
 * 
 * @returns {Object} Archive with bookingId -> booking record mapping
 */
function loadBookingArchive() {
  try {
    if (fs.existsSync(BOOKING_ARCHIVE_PATH)) {
      const content = fs.readFileSync(BOOKING_ARCHIVE_PATH, "utf-8");
      const parsed = JSON.parse(content);
      return typeof parsed === "object" && parsed !== null ? parsed : {};
    }
  } catch (err) {
    console.error(
      `[Persistence] Error loading booking archive: ${err.message}`
    );
  }
  return {};
}

/**
 * Saves the booking archive atomically to disk.
 * Writes to temp file first, then renames (atomic on most systems).
 * 
 * @param {Object} archive - Archive object to persist
 */
function saveBookingArchive(archive) {
  try {
    const tmpPath = `${BOOKING_ARCHIVE_PATH}.tmp`;
    fs.writeFileSync(tmpPath, JSON.stringify(archive, null, 2), "utf-8");
    fs.renameSync(tmpPath, BOOKING_ARCHIVE_PATH);
  } catch (err) {
    throw new Error(`Failed to save booking archive: ${err.message}`);
  }
}

/**
 * Validates booking data before persistence.
 * 
 * Rules:
 * - Required fields must be present
 * - Validation must pass for all required fields
 * - Booking must have finalizedAt timestamp
 * - bookingPhase must be FINALIZED
 * 
 * @param {Object} bookingMemory - Booking memory snapshot
 * @param {Object} activeContext - Service context
 * @param {string} bookingPhase - Current booking phase
 * @returns {Object} { isValid: boolean, error?: string }
 */
function validateBookingForPersistence(
  bookingMemory,
  activeContext,
  bookingPhase
) {
  if (bookingPhase !== "finalized") {
    return {
      isValid: false,
      error: "Cannot persist non-finalized booking",
    };
  }

  if (!bookingMemory) {
    return {
      isValid: false,
      error: "Booking memory is empty",
    };
  }

  const bookingValidation = computeBookingValidation(bookingMemory);
  const requiredFields = getRequiredBookingFields(activeContext, bookingMemory);
  const missingFields = getMissingBookingFields(
    bookingMemory,
    requiredFields,
    bookingValidation
  );

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    };
  }

  // Verify all required fields pass validation
  for (const field of requiredFields) {
    if (!bookingValidation[field]) {
      return {
        isValid: false,
        error: `Field validation failed for: ${field}`,
      };
    }
  }

  return { isValid: true };
}

/**
 * Checks if a booking has already been persisted by source session ID.
 * Prevents duplicate persistence on retry or session reconnect.
 * 
 * @param {string} sourceSessionId - Session ID that created the booking
 * @returns {Object|null} Existing booking record if found, null otherwise
 */
export function hasBookingAlreadyPersisted(sourceSessionId) {
  if (!sourceSessionId) return null;

  const archive = loadBookingArchive();
  for (const bookingId of Object.keys(archive)) {
    const record = archive[bookingId];
    if (record.sourceSessionId === sourceSessionId) {
      return record;
    }
  }
  return null;
}

/**
 * Saves a finalized booking to the archive.
 * Ensures idempotent persistence and validation safety.
 *
 * @param {Object} bookingMemory - Booking memory snapshot.
 * @param {Object} activeContext - Service context.
 * @param {string} bookingPhase - Current booking phase.
 * @returns {Object} { success: boolean, error?: string }
 */
export function saveFinalizedBooking(
  bookingMemory,
  activeContext,
  bookingPhase
) {
  const validation = validateBookingForPersistence(
    bookingMemory,
    activeContext,
    bookingPhase
  );
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  const archive = loadBookingArchive();
  const bookingId = generateBookingId(bookingMemory);

  if (archive[bookingId]) {
    return { success: false, error: "Booking already persisted" };
  }

  const finalizedBooking = {
    ...bookingMemory,
    bookingId,
    finalizedAt: new Date().toISOString(),
  };

  archive[bookingId] = finalizedBooking;
  saveBookingArchive(archive);

  return { success: true };
}

function buildDbBookingPayload(bookingMemory, sourceSessionId) {
  const timestamp = Date.now();
  return {
    refNumber: `KMP-${timestamp}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`,
    sourceSessionId: sourceSessionId || null,
    bookingInfo: {
      status: "pending",
      service: bookingMemory?.service || null,
      scope: bookingMemory?.scope || null,
      bookingPhase: "finalized",
      finalizedAt: new Date().toISOString(),
    },
    selectedAddOns: [],
    location: bookingMemory?.location || null,
    mapsLink: null,
    date: bookingMemory?.date || null,
    time: null,
    clientName: bookingMemory?.customerName || "Unknown",
    clientPhone: bookingMemory?.customerPhone || "Unknown",
    clientEmail: bookingMemory?.customerEmail || null,
    subtotal: 0,
    vat: 0,
    total: 0,
  };
}

export async function hasBookingAlreadyPersistedPrimary(sourceSessionId) {
  if (!sourceSessionId) return null;
  return db.bookings.findBySourceSessionId(sourceSessionId);
}

export async function persistFinalizedBookingPrimary(
  bookingMemory,
  activeContext,
  bookingPhase,
  sourceSessionId
) {
  const validation = validateBookingForPersistence(
    bookingMemory,
    activeContext,
    bookingPhase
  );
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  const existing = await hasBookingAlreadyPersistedPrimary(sourceSessionId);
  if (existing) {
    return { success: true, duplicate: true, refNumber: existing.ref_number };
  }

  const payload = buildDbBookingPayload(bookingMemory, sourceSessionId);
  const inserted = await db.bookings.insert(payload);

  // Optional archive backup path (non-blocking)
  try {
    saveFinalizedBooking(bookingMemory, activeContext, bookingPhase);
  } catch (err) {
    console.error(`[Persistence Backup] Archive write failed: ${err.message}`);
  }

  return { success: true, refNumber: inserted?.ref_number || payload.refNumber };
}

/**
 * Retrieves a booking by its ID.
 *
 * @param {string} bookingId - The booking ID.
 * @returns {Object|null} - The booking object or null if not found.
 */
export function getBookingById(bookingId) {
  const archive = loadBookingArchive();
  return archive[bookingId] || null;
}

/**
 * Lists all persisted bookings (for admin/debug only).
 * 
 * @returns {Array} Array of booking records
 */
export function listAllBookings() {
  const archive = loadBookingArchive();
  return Object.values(archive);
}

/**
 * Gets statistics about persisted bookings.
 * 
 * @returns {Object} Statistics object
 */
export function getBookingStatistics() {
  const bookings = listAllBookings();
  return {
    totalBookings: bookings.length,
    byStatus: bookings.reduce((acc, b) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    }, {}),
    byService: bookings.reduce((acc, b) => {
      acc[b.service] = (acc[b.service] || 0) + 1;
      return acc;
    }, {}),
  };
}
