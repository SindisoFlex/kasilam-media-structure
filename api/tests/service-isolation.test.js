// @vitest-environment node

import { describe, expect, it } from "vitest";

import { resolveServiceTransition } from "../chat-state.js";

describe("service workflow isolation", () => {
  it("requires confirmation before switching a locked workflow", () => {
    const transition = resolveServiceTransition(
      {
        activeServiceId: "funeral_photography",
        lockedService: true,
        serviceConfidence: 0.95,
      },
      "Actually I need a website instead"
    );

    expect(transition.serviceId).toBe("funeral_photography");
    expect(transition.lockedService).toBe(true);
    expect(transition.pendingServiceSwitch).toEqual(
      expect.objectContaining({
        from: "funeral_photography",
        to: "web_development",
      })
    );
  });

  it("switches only after the pending workflow change is confirmed", () => {
    const transition = resolveServiceTransition(
      {
        activeServiceId: "funeral_photography",
        lockedService: true,
        serviceConfidence: 0.95,
        pendingServiceSwitch: {
          from: "funeral_photography",
          to: "web_development",
          confidence: 0.85,
        },
      },
      "yes"
    );

    expect(transition.serviceId).toBe("web_development");
    expect(transition.lockedService).toBe(true);
    expect(transition.pendingServiceSwitch).toBeNull();
    expect(transition.serviceSwitchConfirmed).toBe(true);
  });
});
