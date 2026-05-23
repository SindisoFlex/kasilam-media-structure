export const BOOKING_IDENTITY_LOOKUP_ORDER = [
  "refNumber",
  "canonicalBookingRef",
  "bookingRef",
  "sessionId",
  "bookingId",
];

function readIdentityField(identity, field) {
  const value = identity?.[field];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function resolveCanonicalBookingRef(identity = {}) {
  if (!identity || typeof identity !== "object") return null;

  for (const field of BOOKING_IDENTITY_LOOKUP_ORDER) {
    const value = readIdentityField(identity, field);
    if (value) {
      return value;
    }
  }

  return null;
}

export function buildIdentityTrace(identity = {}) {
  let resolvedFrom = null;
  for (const field of BOOKING_IDENTITY_LOOKUP_ORDER) {
    if (readIdentityField(identity, field)) {
      resolvedFrom = field;
      break;
    }
  }

  const canonicalBookingRef = resolvedFrom
    ? readIdentityField(identity, resolvedFrom)
    : null;

  return {
    canonicalBookingRef,
    resolvedFrom,
    bookingRef: readIdentityField(identity, "bookingRef"),
    refNumber: readIdentityField(identity, "refNumber"),
    sessionId: readIdentityField(identity, "sessionId"),
    bookingId: readIdentityField(identity, "bookingId"),
  };
}
