import { db } from "@/lib/db";

const SESSION_TTL_MS = 30 * 60 * 1000;

const sessionStore = new Map();

function createDefaultSession(sessionId) {
  return {
    version: 1,
    sessionId,
    activeServiceId: null,
    activeCategoryId: null,
    serviceConfidence: 0,
    lockedService: false,
    lastIntent: null,
    conversationStage: "discovery",
    bookingReadinessScore: 0,
    bookingMemory: {
      service: null,
      date: null,
      location: null,
      scope: null,
      customerName: null,
      customerPhone: null,
      customerEmail: null,
    },
    bookingValidation: {
      service: false,
      date: false,
      location: false,
      scope: false,
      customerName: false,
      customerPhone: false,
      customerEmail: false
    },
    bookingPhase: "collecting",
    confirmationSnapshot: null,
    ctaIssued: false,
    bookingPersisted: false,
    nextMissingBookingField: null,
    lastAssistantQuestion: null,
    events: [],
    updatedAt: Date.now(),
  };
}

function isExpiredSession(session) {
  if (!session || typeof session.updatedAt !== "number") return true;
  return Date.now() - session.updatedAt > SESSION_TTL_MS;
}

export function cleanupExpiredSessions() {
  for (const [sessionId, session] of sessionStore.entries()) {
    if (isExpiredSession(session)) {
      sessionStore.delete(sessionId);
    }
  }
}

export function getSession(sessionId) {
  cleanupExpiredSessions();

  if (typeof sessionId !== "string" || !sessionId.trim()) {
    return createDefaultSession(null);
  }

  const normalizedSessionId = sessionId.trim();
  const existingSession = sessionStore.get(normalizedSessionId);

  if (!existingSession || isExpiredSession(existingSession)) {
    if (existingSession) {
      sessionStore.delete(normalizedSessionId);
    }

    // Fetch session from database if not in memory
    const dbSession = await db.sessions.findUnique({ where: { sessionId: normalizedSessionId } });
    if (dbSession) {
      sessionStore.set(normalizedSessionId, dbSession);
      return dbSession;
    }

    return createDefaultSession(normalizedSessionId);
  }

  return existingSession;
}

export async function saveSession(session) {
  cleanupExpiredSessions();

  if (!session || typeof session.sessionId !== "string" || !session.sessionId.trim()) {
    throw new Error("saveSession requires a valid session.sessionId");
  }

  const normalizedSessionId = session.sessionId.trim();
  const nextSession = {
    ...createDefaultSession(normalizedSessionId),
    ...session,
    sessionId: normalizedSessionId,
    bookingMemory: {
      ...createDefaultSession(normalizedSessionId).bookingMemory,
      ...(session.bookingMemory || {}),
    },
    bookingValidation: {
      ...createDefaultSession(normalizedSessionId).bookingValidation,
      ...(session.bookingValidation || {}),
    },
    bookingPhase: session.bookingPhase || "collecting",
    confirmationSnapshot: session.confirmationSnapshot ?? null,
    ctaIssued: Boolean(session.ctaIssued),
    bookingPersisted: Boolean(session.bookingPersisted),
    events: Array.isArray(session.events) ? [...session.events] : [],
    updatedAt: Date.now(),
  };

  sessionStore.set(normalizedSessionId, nextSession);

  // Persist session to database
  await db.sessions.upsert({
    where: { sessionId: normalizedSessionId },
    update: nextSession,
    create: nextSession,
  });

  return {
    ...nextSession,
    bookingMemory: { ...nextSession.bookingMemory },
    events: [...nextSession.events],
  };
}

export async function clearSession(sessionId) {
  if (typeof sessionId !== "string" || !sessionId.trim()) {
    return false;
  }

  return sessionStore.delete(sessionId.trim());
}

export { SESSION_TTL_MS };
