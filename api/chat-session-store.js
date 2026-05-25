import { db } from "./lib/db.js";

const SESSION_TTL_MS = 30 * 60 * 1000;

const sessionStore = new Map();

// FIX #4: Track in-flight session load promises to deduplicate concurrent requests
// Prevents race condition where two concurrent getSession() calls both create sessions
const sessionInflightPromises = new Map();

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
    conversationHistory: [],
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

export async function getSession(sessionId) {
  cleanupExpiredSessions();

  if (typeof sessionId !== "string" || !sessionId.trim()) {
    return createDefaultSession(null);
  }

  const normalizedSessionId = sessionId.trim();
  
  // FIX #4: If already loading this session, wait for in-flight promise
  // This prevents race condition where two concurrent requests both load from DB
  if (sessionInflightPromises.has(normalizedSessionId)) {
    return await sessionInflightPromises.get(normalizedSessionId);
  }
  
  // Check memory cache first (fast path)
  const existingSession = sessionStore.get(normalizedSessionId);
  if (existingSession && !isExpiredSession(existingSession)) {
    return existingSession;
  }

  // Create promise before starting async work
  const loadPromise = (async () => {
    try {
      // Remove from cache if expired
      if (existingSession) {
        sessionStore.delete(normalizedSessionId);
      }

      // Fetch session from database if not in memory
      const dbSession = await db.sessions.findUnique({ 
        where: { sessionId: normalizedSessionId } 
      });
      
      if (dbSession) {
        sessionStore.set(normalizedSessionId, dbSession);
        return dbSession;
      }

      return createDefaultSession(normalizedSessionId);
    } finally {
      // Remove promise from tracking to allow future loads
      sessionInflightPromises.delete(normalizedSessionId);
    }
  })();
  
  // Track this in-flight load so concurrent requests wait for it
  sessionInflightPromises.set(normalizedSessionId, loadPromise);
  
  return await loadPromise;
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
    conversationHistory: Array.isArray(session.conversationHistory)
      ? [...session.conversationHistory]
      : [],
    events: Array.isArray(session.events) ? [...session.events] : [],
    updatedAt: Date.now(),
  };

  // FIX #1: Database persistence is CRITICAL PATH (must succeed before memory cache)
  // This ensures sessions survive server restart
  try {
    const dbSession = await db.sessions.upsert({
      where: { sessionId: normalizedSessionId },
      update: nextSession,
      create: nextSession,
    });
    
    // Only update memory cache AFTER successful DB persist
    sessionStore.set(normalizedSessionId, dbSession);
    
    return {
      ...dbSession,
      bookingMemory: { ...dbSession.bookingMemory },
      events: [...dbSession.events],
    };
  } catch (err) {
    // Critical error: Database persistence failed
    // DO NOT fall back to memory-only
    console.error("[SessionPersistence] CRITICAL: Database upsert failed", {
      sessionId: normalizedSessionId,
      error: err.message,
      timestamp: new Date().toISOString(),
    });
    
    throw new Error(`Session persistence failed: ${err.message}`);
  }
}

export async function clearSession(sessionId) {
  if (typeof sessionId !== "string" || !sessionId.trim()) {
    return false;
  }

  return sessionStore.delete(sessionId.trim());
}

export { SESSION_TTL_MS };
