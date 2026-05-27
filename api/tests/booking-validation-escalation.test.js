// @vitest-environment node

import { describe, expect, it } from "vitest";

import {
  BOOKING_VALIDATION_ESCALATION_THRESHOLD,
  buildInvalidFieldRecoveryMessage,
  isBookingValidationEscalationNeeded,
} from "../chat-booking-shared.js";

describe("booking validation escalation", () => {
  it("keeps normal retry wording before the escalation threshold", () => {
    const message = buildInvalidFieldRecoveryMessage(
      "date",
      "yesterday",
      BOOKING_VALIDATION_ESCALATION_THRESHOLD - 1
    );

    expect(message).toContain("Please reply with just the booking date");
    expect(message).not.toContain("I may still be misunderstanding");
  });

  it("switches to recovery mode after repeated invalid attempts", () => {
    const message = buildInvalidFieldRecoveryMessage(
      "date",
      "yesterday",
      BOOKING_VALIDATION_ESCALATION_THRESHOLD
    );

    expect(isBookingValidationEscalationNeeded(3)).toBe(true);
    expect(message).toContain("I may still be misunderstanding the date format");
    expect(message).toContain("calendar");
    expect(message).toContain("WhatsApp");
    expect(message).not.toContain("Please reply with just");
  });
});
