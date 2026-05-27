import { Pool } from "pg";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.PG_CONNECTION_STRING ||
  process.env.POSTGRES_URL;

const isProd = process.env.NODE_ENV === "production";
const useJsonFallback = !connectionString && !isProd;

let pool;
let schemaInitialized = false;

if (!connectionString && isProd) {
  throw new Error("DATABASE_URL is required for server persistence.");
}

if (!useJsonFallback) {
  pool = new Pool({ connectionString });
}

async function ensureSchema() {
  if (schemaInitialized) {
    return;
  }

  if (useJsonFallback) {
    // JSON fallback: ensure data directory exists
    const dataDir = path.resolve(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const sessionsFile = path.join(dataDir, "sessions.json");
    const bookingsFile = path.join(dataDir, "booking_records.json");
    if (!fs.existsSync(sessionsFile)) fs.writeFileSync(sessionsFile, JSON.stringify({}));
    if (!fs.existsSync(bookingsFile)) fs.writeFileSync(bookingsFile, JSON.stringify({}));
    schemaInitialized = true;
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      session_id TEXT PRIMARY KEY,
      session_data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      contact_id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      business_name TEXT NOT NULL,
      service_needed TEXT NOT NULL,
      budget_range TEXT NOT NULL,
      project_description TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      booking_id BIGSERIAL PRIMARY KEY,
      ref_number TEXT NOT NULL UNIQUE,
      source_session_id TEXT,
      booking_info JSONB NOT NULL,
      selected_add_ons JSONB NOT NULL,
      location TEXT,
      maps_link TEXT,
      date TIMESTAMPTZ,
      time TEXT,
      client_name TEXT NOT NULL,
      client_phone TEXT NOT NULL,
      client_email TEXT,
      subtotal NUMERIC NOT NULL,
      vat NUMERIC NOT NULL,
      total NUMERIC NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  // New booking_records table for structured booking persistence
  await pool.query(`
    CREATE TABLE IF NOT EXISTS booking_records (
      booking_id BIGSERIAL PRIMARY KEY,
      booking_uuid TEXT UNIQUE,
      ref_number TEXT UNIQUE,
      session_id TEXT,
      customer_name TEXT,
      phone TEXT,
      email TEXT,
      service_type TEXT,
      package_tier TEXT,
      event_date TIMESTAMPTZ,
      location_address TEXT,
      gps_coordinates JSONB,
      notes TEXT,
      booking_status TEXT DEFAULT 'draft',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  schemaInitialized = true;
}

async function query(text, params) {
  await ensureSchema();
  if (useJsonFallback) {
    throw new Error("Query is not supported in JSON fallback");
  }
  return pool.query(text, params);
}

// Helpers for JSON fallback storage
function jsonFilePath(name) {
  return path.resolve(process.cwd(), `data/${name}.json`);
}

function readJson(name) {
  const p = jsonFilePath(name);
  try {
    const raw = fs.readFileSync(p, "utf8");
    return JSON.parse(raw || "{}");
  } catch (e) {
    return {};
  }
}

function writeJson(name, obj) {
  const p = jsonFilePath(name);
  fs.writeFileSync(p, JSON.stringify(obj, null, 2));
}

const sessions = {
  async findUnique({ where }) {
    await ensureSchema();
    const sessionId = where?.sessionId;
    if (!sessionId || typeof sessionId !== "string") {
      return null;
    }
    if (useJsonFallback) {
      const all = readJson("sessions");
      return all[sessionId] || null;
    }
    const result = await pool.query(
      `SELECT session_data FROM sessions WHERE session_id = $1 LIMIT 1`,
      [sessionId]
    );
    return result.rows[0]?.session_data || null;
  },
  async upsert({ where, update, create }) {
    await ensureSchema();
    const sessionId = where?.sessionId;
    if (!sessionId || typeof sessionId !== "string") {
      throw new Error("sessionId is required for session upsert");
    }
    if (useJsonFallback) {
      const all = readJson("sessions");
      all[sessionId] = update || create;
      writeJson("sessions", all);
      return all[sessionId];
    }
    const existing = await pool.query(
      `SELECT session_id FROM sessions WHERE session_id = $1 LIMIT 1`,
      [sessionId]
    );
    if (existing.rowCount > 0) {
      await pool.query(
        `UPDATE sessions SET session_data = $1, updated_at = NOW() WHERE session_id = $2`,
        [update, sessionId]
      );
      return update;
    }
    await pool.query(
      `INSERT INTO sessions (session_id, session_data, updated_at) VALUES ($1, $2, NOW())`,
      [sessionId, create]
    );
    return create;
  },
};

const contacts = {
  async insert(contact) {
    await ensureSchema();
    if (useJsonFallback) {
      const all = readJson("contacts");
      const id = Object.keys(all).length + 1;
      all[id] = { contact_id: id, created_at: new Date().toISOString(), ...contact };
      writeJson("contacts", all);
      return all[id];
    }
    const result = await pool.query(
      `INSERT INTO contacts (name, email, business_name, service_needed, budget_range, project_description)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING contact_id, created_at`,
      [
        contact.name,
        contact.email,
        contact.businessName,
        contact.serviceNeeded,
        contact.budgetRange,
        contact.projectDescription,
      ]
    );
    return result.rows[0];
  },
};

const bookings = {
  async findByRefNumber(refNumber) {
    await ensureSchema();
    if (useJsonFallback) {
      const all = readJson("bookings");
      const match = Object.values(all).find((b) => b.ref_number === refNumber);
      return match || null;
    }
    const result = await pool.query(
      `SELECT ref_number FROM bookings WHERE ref_number = $1 LIMIT 1`,
      [refNumber]
    );
    return result.rows[0] || null;
  },
  async insert(booking) {
    await ensureSchema();
    if (useJsonFallback) {
      const all = readJson("bookings");
      const id = Object.keys(all).length + 1;
      all[id] = { booking_id: id, created_at: new Date().toISOString(), ...booking };
      writeJson("bookings", all);
      return all[id];
    }
    const result = await pool.query(
      `INSERT INTO bookings (
         ref_number,
         source_session_id,
         booking_info,
         selected_add_ons,
         location,
         maps_link,
         date,
         time,
         client_name,
         client_phone,
         client_email,
         subtotal,
         vat,
         total
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING ref_number`,
      [
        booking.refNumber,
        booking.sourceSessionId || null,
        booking.bookingInfo,
        booking.selectedAddOns,
        booking.location || null,
        booking.mapsLink || null,
        booking.date ? new Date(booking.date).toISOString() : null,
        booking.time || null,
        booking.clientName,
        booking.clientPhone,
        booking.clientEmail || null,
        booking.subtotal,
        booking.vat,
        booking.total,
      ]
    );
    return result.rows[0];
  },
};

// New structured booking_records helper
const bookingRecords = {
  async findByRef(ref) {
    await ensureSchema();
    if (useJsonFallback) {
      const all = readJson("booking_records");
      return Object.values(all).find((b) => b.ref_number === ref) || null;
    }
    const res = await pool.query(`SELECT * FROM booking_records WHERE ref_number = $1 LIMIT 1`, [ref]);
    return res.rows[0] || null;
  },
  async upsert(record) {
    await ensureSchema();
    if (useJsonFallback) {
      const all = readJson("booking_records");
      // Use ref_number as unique key if provided, else generate one
      const key = record.ref_number || record.refNumber || `r_${Object.keys(all).length + 1}`;
      const existingKey = Object.keys(all).find((k) => all[k].ref_number === key) || null;
      const now = new Date().toISOString();
      if (existingKey) {
        const existing = all[existingKey];
        const merged = { ...existing, ...record, updated_at: now };
        all[existingKey] = merged;
        writeJson("booking_records", all);
        return merged;
      }
      const id = Object.keys(all).length + 1;
      all[id] = { booking_id: id, ref_number: key, created_at: now, updated_at: now, ...record };
      writeJson("booking_records", all);
      return all[id];
    }

    // Postgres upsert by ref_number
    const ref = record.ref_number || record.refNumber;
    if (!ref) {
      // insert new by session_id if no ref_number provided
      const bookingUuid = record.booking_uuid || record.session_id || `booking_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
      const res = await pool.query(
        `INSERT INTO booking_records (booking_uuid, ref_number, session_id, customer_name, phone, email, service_type, package_tier, event_date, location_address, gps_coordinates, notes, booking_status, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,NOW(),NOW()) RETURNING *`,
        [bookingUuid, record.session_id || null, record.session_id || null, record.customer_name || null, record.phone || null, record.email || null, record.service_type || null, record.package_tier || null, record.event_date || null, record.location_address || null, record.gps_coordinates || null, record.notes || null, record.booking_status || 'draft']
      );
      return res.rows[0];
    }

    let existing = await pool.query(`SELECT * FROM booking_records WHERE ref_number = $1 LIMIT 1`, [ref]);
    if (existing.rowCount === 0 && record.session_id) {
      existing = await pool.query(`SELECT * FROM booking_records WHERE session_id = $1 LIMIT 1`, [record.session_id]);
    }

    if (existing.rowCount > 0) {
      const existingRow = existing.rows[0];
      const updates = [];
      const values = [];
      let idx = 1;
      for (const k of ["ref_number","session_id","customer_name","phone","email","service_type","package_tier","event_date","location_address","gps_coordinates","notes","booking_status"]) {
        if (record[k] !== undefined) {
          updates.push(`${k} = $${idx}`);
          values.push(record[k]);
          idx += 1;
        }
      }
      if (updates.length === 0) {
        return existingRow;
      }
      values.push(existingRow.ref_number);
      const q = `UPDATE booking_records SET ${updates.join(', ')}, updated_at = NOW() WHERE ref_number = $${idx} RETURNING *`;
      const res = await pool.query(q, values);
      return res.rows[0];
    }

    const bookingUuid = record.booking_uuid || record.session_id || `booking_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
    const res = await pool.query(
      `INSERT INTO booking_records (booking_uuid, ref_number, session_id, customer_name, phone, email, service_type, package_tier, event_date, location_address, gps_coordinates, notes, booking_status, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,NOW(),NOW()) RETURNING *`,
      [bookingUuid, record.refNumber || ref, record.session_id || null, record.customer_name || null, record.phone || null, record.email || null, record.service_type || null, record.package_tier || null, record.event_date || null, record.location_address || null, record.gps_coordinates || null, record.notes || null, record.booking_status || 'draft']
    );
    return res.rows[0];
  },
};

export const db = {
  query,
  sessions,
  contacts,
  bookings,
  bookingRecords,
};
