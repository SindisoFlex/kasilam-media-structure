export function resolveCanonicalBookingRef(identity = {}) {
  if (!identity || typeof identity !== "object") return null;
  const candidates = [
    identity.canonicalBookingRef,
    identity.bookingRef,
    identity.refNumber,
    identity.sessionId,
    identity.bookingId,
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

export function buildIdentityTrace(identity = {}) {
  const canonicalBookingRef = resolveCanonicalBookingRef(identity);
  return {
    canonicalBookingRef,
    bookingRef:
      typeof identity.bookingRef === "string" && identity.bookingRef.trim()
        ? identity.bookingRef.trim()
        : null,
    refNumber:
      typeof identity.refNumber === "string" && identity.refNumber.trim()
        ? identity.refNumber.trim()
        : null,
    sessionId:
      typeof identity.sessionId === "string" && identity.sessionId.trim()
        ? identity.sessionId.trim()
        : null,
    bookingId:
      typeof identity.bookingId === "string" && identity.bookingId.trim()
        ? identity.bookingId.trim()
        : null,
  };
}
