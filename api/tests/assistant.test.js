// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import handler from "../ai-chat.js";
import { getSession } from "../chat-session-store.js";
import { buildBookingCta } from "../chat-handoff.js";
import { detectIntent } from "../chat-intents.js";

const originalGeminiKey = process.env.GEMINI_API_KEY;

function createMockReq(body) {
  return {
    method: "POST",
    body,
  };
}

function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
    end() {
      return this;
    },
  };
}

async function invokeHandler(body) {
  const req = createMockReq(body);
  const res = createMockRes();
  await handler(req, res);
  return res.body;
}

function makeSessionId(label) {
  return `test-session-${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

describe("KMP assistant", () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = "test-key";
    vi.restoreAllMocks();
  });

  it("keeps funeral context for funeral -> price?", async () => {
    const sessionId = makeSessionId("funeral-price");
    global.fetch = vi.fn().mockRejectedValue(new Error("network down"));

    const firstResponse = await invokeHandler({
      sessionId,
      message: "I need a funeral photographer",
    });
    expect(firstResponse._debug.activeServiceId).toBe("funeral_photography");

    const priceResponse = await invokeHandler({
      sessionId,
      message: "How much does it cost?",
    });
    expect(priceResponse._debug.activeServiceId).toBe("funeral_photography");
  });

  it("keeps funeral context locked through short follow-ups", async () => {
    const sessionId = makeSessionId("funeral-lock");

    global.fetch = vi.fn().mockRejectedValue(new Error("network down"));

    await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "I need funeral photography" }],
    });

    const priceResponse = await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "price?" }],
    });
    const linkResponse = await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "link me" }],
    });
    const bookingResponse = await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "can I book" }],
    });

    expect(priceResponse._debug.activeServiceId).toBe("funeral_photography");
    expect(linkResponse._debug.activeServiceId).toBe("funeral_photography");
    expect(bookingResponse._debug.activeServiceId).toBe("funeral_photography");

    const session = await getSession(sessionId);
    expect(session.lockedService).toBe(true);
    expect(session.events.some((event) => event.type === "service_locked" && event.service === "funeral_photography")).toBe(true);
  });

  it("keeps web context for website -> how much?", async () => {
    const sessionId = makeSessionId("web-price");

    global.fetch = vi.fn().mockRejectedValue(new Error("network down"));

    await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "I need a website for my business" }],
    });

    const response = await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "how much" }],
    });

    expect(response.reply).toContain("Web");
    expect(response.reply).toContain("R4,500");
    expect(response._debug.activeServiceId).toBe("web_development");
  });

  it("uses contextual fallback on Gemini failure", async () => {
    const sessionId = makeSessionId("gemini-failure");

    global.fetch = vi.fn().mockRejectedValue(new Error("socket hang up"));

    const firstResponse = await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "I need funeral coverage" }],
    });

    expect(firstResponse.reply).toContain("Funeral");

    const failureResponse = await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "how much" }],
    });

    expect(failureResponse.reply).toContain("Funeral");
    expect(failureResponse.reply).not.toContain("basic web projects");
    expect(failureResponse.errorType).toBe("network");
  });

  it("restores memory on reload with same sessionId", async () => {
    const sessionId = makeSessionId("reload");

    global.fetch = vi.fn().mockRejectedValue(new Error("network down"));

    await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "I need funeral photography on 14 June in Motherwell" }],
    });

    const restoredSession = await getSession(sessionId);
    expect(restoredSession.activeServiceId).toBe("funeral_photography");
    expect(restoredSession.bookingMemory.date).toBeTruthy();
    expect(restoredSession.bookingMemory.location).toBe("Motherwell");

    const reloadResponse = await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "price?" }],
    });

    expect(reloadResponse._debug.activeServiceId).toBe("funeral_photography");
    const afterReloadSession = await getSession(sessionId);
    expect(afterReloadSession.bookingMemory.location).toBe("Motherwell");
  });

  it("requires confirmation before switching context and clears stale booking memory", async () => {
    const sessionId = makeSessionId("topic-switch");

    global.fetch = vi.fn().mockRejectedValue(new Error("network down"));

    await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "I need funeral photography on 14 June 2026 in Motherwell, photo and video" }],
    });

    const switchedResponse = await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "Actually I need a website instead" }],
    });

    expect(switchedResponse.reply).toContain("currently in the Funeral");
    expect(switchedResponse.reply).toContain("switch this conversation to Web");
    expect(switchedResponse._debug.activeServiceId).toBe("funeral_photography");

    const pendingSession = await getSession(sessionId);
    expect(pendingSession.pendingServiceSwitch).toEqual(
      expect.objectContaining({
        from: "funeral_photography",
        to: "web_development",
      })
    );

    const confirmedResponse = await invokeHandler({
      sessionId,
      messages: [{ role: "user", content: "yes" }],
    });
    const confirmedSession = await getSession(sessionId);

    expect(confirmedResponse._debug.activeServiceId).toBe("web_development");
    expect(confirmedSession.pendingServiceSwitch).toBeNull();
    expect(confirmedSession.bookingMemory.service).toBe("digital");
    expect(confirmedSession.bookingMemory.date).toBeNull();
    expect(confirmedSession.bookingMemory.location).toBeNull();
    expect(confirmedSession.bookingMemory.scope).toBeNull();
  });

  it("returns WhatsApp handoff for completed booking flow", async () => {
    const session = {
      activeServiceId: "funeral_photography",
      bookingReadinessScore: 100,
      bookingMemory: {
        service: "funeral",
        date: "14 June",
        location: "Motherwell",
        scope: "photo and video",
      },
    };

    const cta = buildBookingCta(session);

    expect(cta).toEqual(
      expect.objectContaining({
        type: "whatsapp",
        label: "Continue on WhatsApp",
      })
    );
    expect(cta.summary).toContain("Service: Funeral Photography");
    expect(cta.summary).toContain("Date: 14 June");
    expect(cta.summary).toContain("Location: Motherwell");
    expect(cta.summary).toContain("Scope: Photo + Video");
    expect(cta.url).toContain("wa.me/27659704101");
    expect(cta.servicePageUrl).toContain("/services/visual-production/funeral-coverage");
  });
});

describe("chat intent classifier", () => {
  it("classifies pricing without changing locked service", () => {
    const result = detectIntent("how much", {
      lockedService: true,
      activeServiceId: "funeral_photography",
    });

    expect(result.intent).toBe("pricing");
    expect(result.activeServiceId).toBe("funeral_photography");
    expect(result.serviceContextChanged).toBe(false);
  });
});

afterEach(() => {
  process.env.GEMINI_API_KEY = originalGeminiKey;
});
