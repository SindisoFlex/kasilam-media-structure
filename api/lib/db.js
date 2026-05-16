import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.PG_CONNECTION_STRING ||
  process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required for server persistence.");
}

const pool = new Pool({ connectionString });
let schemaInitialized = false;

async function ensureSchema() {
  if (schemaInitialized) {
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

  schemaInitialized = true;
}

async function query(text, params) {
  await ensureSchema();
  return pool.query(text, params);
}

const sessions = {
  async findUnique({ where }) {
    await ensureSchema();
    const sessionId = where?.sessionId;
    if (!sessionId || typeof sessionId !== "string") {
      return null;
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
    const result = await pool.query(
      `SELECT ref_number FROM bookings WHERE ref_number = $1 LIMIT 1`,
      [refNumber]
    );
    return result.rows[0] || null;
  },
  async insert(booking) {
    await ensureSchema();
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

export const db = {
  query,
  sessions,
  contacts,
  bookings,
};
