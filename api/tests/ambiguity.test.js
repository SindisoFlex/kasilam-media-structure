// @vitest-environment node

import { describe, it, expect } from "vitest";

import {
  isVagueDate,
  isVagueLocation,
  isVagueScope,
  isIncompletePhone,
  isIncompleteEmail,
  isUncertainConfirmation,
  detectFieldAmbiguity,
  detectConfirmationAmbiguity,
  buildClarificationContext,
} from "../chat-ambiguity.js";

describe("chat-ambiguity detectors", () => {
  it("flags vague dates", () => {
    expect(isVagueDate("next friday")).toBe(true);
    expect(isVagueDate("sometime in june")).toBe(true);
    expect(isVagueDate("not sure yet")).toBe(true);
    expect(isVagueDate("around christmas")).toBe(true);
    expect(isVagueDate("2026-06-14")).toBe(false);
    expect(isVagueDate("14 June 2026")).toBe(false);
  });

  it("flags vague locations", () => {
    expect(isVagueLocation("somewhere in PE")).toBe(true);
    expect(isVagueLocation("around motherwell")).toBe(true);
    expect(isVagueLocation("we'll decide later")).toBe(true);
    expect(isVagueLocation("Motherwell Cemetery")).toBe(false);
  });

  it("flags vague scope", () => {
    expect(isVagueScope("not sure")).toBe(true);
    expect(isVagueScope("something simple")).toBe(true);
    expect(isVagueScope("you decide")).toBe(true);
    expect(isVagueScope("photo and video")).toBe(false);
    expect(isVagueScope("just video")).toBe(false);
  });

  it("flags incomplete phones", () => {
    expect(isIncompletePhone("0821234")).toBe(true);
    expect(isIncompletePhone("I'll send it later")).toBe(true);
    expect(isIncompletePhone("0821234567")).toBe(false);
  });

  it("flags incomplete emails", () => {
    expect(isIncompleteEmail("john gmail com")).toBe(true);
    expect(isIncompleteEmail("john@gmail")).toBe(true);
    expect(isIncompleteEmail("not sure yet")).toBe(true);
    expect(isIncompleteEmail("john@gmail.com")).toBe(false);
  });

  it("flags uncertain confirmations", () => {
    expect(isUncertainConfirmation("i think so")).toBe(true);
    expect(isUncertainConfirmation("let me check with my cousin")).toBe(true);
    expect(isUncertainConfirmation("my cousin will confirm")).toBe(true);
    expect(isUncertainConfirmation("yes")).toBe(false);
    expect(isUncertainConfirmation("no")).toBe(false);
  });

  it("returns targeted clarification prompts per field", () => {
    const dateAmb = detectFieldAmbiguity("next friday", "date");
    expect(dateAmb).not.toBeNull();
    expect(dateAmb.field).toBe("date");
    expect(dateAmb.prompt).toMatch(/date/i);

    const locAmb = detectFieldAmbiguity("somewhere in PE", "location");
    expect(locAmb).not.toBeNull();
    expect(locAmb.prompt).toMatch(/area|venue|neighbourhood/i);

    const phoneAmb = detectFieldAmbiguity("0821", "customerPhone");
    expect(phoneAmb).not.toBeNull();
    expect(phoneAmb.kind).toBe("incomplete");

    expect(detectFieldAmbiguity("photo and video", "scope")).toBeNull();
  });

  it("returns null on irrelevant field/text", () => {
    expect(detectFieldAmbiguity("anything", null)).toBeNull();
    expect(detectFieldAmbiguity("Motherwell", "location")).toBeNull();
  });

  it("detects confirmation ambiguity", () => {
    const amb = detectConfirmationAmbiguity("let me check first");
    expect(amb).not.toBeNull();
    expect(amb.field).toBe("confirmation");
    expect(detectConfirmationAmbiguity("yes")).toBeNull();
  });

  it("builds non-persistent clarification context", () => {
    const ctx = buildClarificationContext({ field: "date", kind: "vague" });
    expect(ctx).toEqual(
      expect.objectContaining({ pendingField: "date", kind: "vague" })
    );
    expect(typeof ctx.issuedAt).toBe("number");
    expect(buildClarificationContext(null)).toBeNull();
  });
});
