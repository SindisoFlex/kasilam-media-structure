## Phase 6 — Canonical Registry Stabilization

### Reality Check

The prompt assumes a canonical registry (`services.js`, `packages.js`, `pricing.js`, `mappings.js`) already exists. **It does not.** No `api/registry/`, `api/canonical/`, or equivalent folder is present. Today the same domain knowledge is redeclared in at least four places:

| Concern | Backend duplicate | Frontend duplicate |
|---|---|---|
| Package names & exact ZAR prices | `api/ai-chat.js` (lines 72–200, multi-tier price strings) | `src/pages/visual/*.tsx`, `AudioProduction.tsx`, `DigitalMarketing.tsx` — each page hard-codes its own `openBooking({ package, price })` |
| Fallback pricing copy | `api/chat-fallbacks.js` (lines 42–146, per-service `pricing:` blurbs) | Same numbers restated in service page hero/pricing cards |
| Add-ons | — | `src/components/BookingFlow.tsx` lines 20–35 |
| Service / intent vocab | `api/chat-intents.js`, `api/ai-chat.js` keyword lists | Page copy + nav |
| KMP knowledge base | — | `public/data/kmp_knowledge.json` (third copy of services) |

This means the plan is not "wire existing registry through"; it is **create the registry, then additively redirect the duplicates to read from it** without changing UX or runtime behavior.

### Constraints (per request)

- No frontend redesign, no chatbot rewrite, no state-machine changes.
- Freeze zones stay frozen: `BOOKING_PHASE` machine, `canBookingBeFinalized`, snapshot logic, persistence lifecycle, validation, retry escalation, `BookingContext` transitions.
- All changes additive and reversible. Every migrated call site keeps its current behavior byte-for-byte on first cutover (registry values are seeded from existing strings).

### Target Architecture

```text
shared/registry/                  ← new, single source of truth (ESM, no deps)
  services.ts                     ← canonical service codes + display labels
  packages.ts                     ← canonical package tiers per service
  pricing.ts                      ← exact prices + pricingType (exact|tailored|hybrid)
  addons.ts                       ← booking add-ons (lifted from BookingFlow)
  mappings.ts                     ← label → canonical code resolver
  index.ts                        ← barrel + lookup helpers (getService, getPackage, getPrice, resolveLabel)
```

Why `shared/` (not `api/registry/` or `src/registry/`):
- Vite resolves it for the frontend bundle.
- Vercel serverless functions (`api/*.js`) import the compiled `.js` via a tiny `shared/registry/dist` build step **or** we author the registry as plain `.js` + a `.d.ts` to skip the build entirely. **Recommendation: plain `.js` + `.d.ts`** — zero build pipeline risk, works in both runtimes today.

### Canonical Shape (illustrative)

```js
// shared/registry/services.js
export const SERVICES = {
  FUNERAL: { code: "FUNERAL", label: "Funeral Coverage", category: "visual" },
  WEDDING: { code: "WEDDING", label: "Wedding Production", category: "visual" },
  COMMUNITY: { code: "COMMUNITY", label: "Community & Cultural Events", category: "visual" },
  CORPORATE: { code: "CORPORATE", label: "Business & Corporate", category: "visual" },
  CREATORS: { code: "CREATORS", label: "Creators & Artists", category: "visual" },
  AUDIO: { code: "AUDIO", label: "Audio Production", category: "audio" },
  WEB: { code: "WEB", label: "Web & App Development", category: "digital" },
  DIGITAL: { code: "DIGITAL", label: "Digital Marketing", category: "digital" },
};

// shared/registry/packages.js
export const PACKAGES = {
  FUNERAL: [
    { code: "FUNERAL_BASIC",    tier: "Basic",    prices: { photo: 1500, video: 2000, both: 3500 } },
    { code: "FUNERAL_STANDARD", tier: "Standard", prices: { photo: 2200, video: 2800, both: 4200 } },
    { code: "FUNERAL_COMPLETE", tier: "Complete", prices: { photo: 3000, video: 3500, both: 5200 } },
  ],
  // ...wedding, web, audio, etc. — seeded verbatim from ai-chat.js
};
```

### Stabilization Steps (small, reviewable, reversible)

1. **Create the registry skeleton** under `shared/registry/` and seed it from the literals already in `api/ai-chat.js`. No call sites change yet — pure addition.
2. **Add lookup helpers**: `getServiceByCode`, `getServiceByLabel`, `getPackagesFor`, `formatPriceLine`, `resolveLabel(rawText)`. Helpers preserve current formatting so output strings remain identical.
3. **Backend cutover — read-only first**:
   - `api/ai-chat.js` SERVICE_INTELLIGENCE pricing blocks → derive from `PACKAGES`/`formatPriceLine`. Keep the surrounding object shape; only the price strings come from the registry.
   - `api/chat-fallbacks.js` per-service `pricing:` blurbs → built from the same helpers.
   - Add a unit assertion: registry-derived strings === current hardcoded strings (snapshot test in `api/tests/registry-parity.test.js`). This guarantees zero behavior drift on cutover.
4. **Booking memory canonical ID propagation** (additive only):
   - In `api/chat-booking-shared.js`, when `bookingMemory.service` is set, also stamp `bookingMemory.serviceCode` via `resolveLabel`. Existing readers keep working; new readers can prefer the canonical code.
   - Same for `packageTier` → `packageCode`.
   - Persistence (`chat-booking-persistence.js`) writes both fields. Old archive rows remain valid because new fields are optional.
5. **Frontend cutover — additive**:
   - `src/components/BookingFlow.tsx` add-ons array → imported from `shared/registry/addons.js` (values unchanged).
   - Each `openBooking({ service, package, price })` call site keeps its current call but the literal strings move to a `bookingPresets` map sourced from the registry (e.g. `openBooking(presetFor("FUNERAL_BASIC", "both"))`). No UI changes, no flow changes.
6. **Chatbot orchestration alignment** (no new flows):
   - The chatbot already collects service → package → details. Today it picks package names from free text; after this phase it resolves them through `resolveLabel` so the codes it stores match what `BookingFlow` would store for the same selection. Confirmation/finalization logic untouched.
7. **Telemetry / records**:
   - `api/booking-records.js` and `data/booking_records.json` writes gain optional `serviceCode` + `packageCode` columns. Reads are tolerant of missing fields.
8. **Cleanup pass (last, optional)**: once parity tests have been green for one release cycle, the original hardcoded price strings in `ai-chat.js` and `chat-fallbacks.js` become dead literals and can be removed in a separate PR. Not part of this phase.

### Freeze Zones — explicitly NOT touched

- `BOOKING_PHASE` enum and transitions in `api/chat-booking-shared.js` and `src/contexts/BookingContext.tsx`.
- `canBookingBeFinalized`, `prepareConfirmation`, `finalizeBooking`, `resetBookingPhase`.
- `confirmationSnapshot` shape and `Object.freeze` behavior.
- Session store, retry escalation, validation rules, WhatsApp handoff payload format.
- BookingFlow step ordering, copy, styling, summary/PDF layout.

### Regression Risk

- **Low** for steps 1–3 (parity test gates string equality).
- **Low–medium** for step 4: adding a second field to `bookingMemory` is read-tolerant, but persistence consumers should be re-tested. Tests: extend `api/tests/booking-validation-escalation.test.js`.
- **Low** for step 5: registry seeded from existing per-page literals; visual diff = none.
- **Zero** for freeze zones.

### Success Criteria

- One file owns each price (`shared/registry/packages.js`).
- `rg "R[0-9],?[0-9]{3}" api src` returns only registry + tests.
- Chatbot and BookingFlow, given the same selection, emit identical `serviceCode` + `packageCode` into persistence.
- All existing tests pass; new `registry-parity.test.js` and a `mapping-roundtrip.test.js` pass.
- No change to BookingFlow UX, no change to AI chat phase machine.

### Deliverables for the implementation phase

- `shared/registry/{services,packages,pricing,addons,mappings,index}.js` + `.d.ts`
- `api/tests/registry-parity.test.js`, `api/tests/mapping-roundtrip.test.js`
- Edits (read-from-registry only) in: `api/ai-chat.js`, `api/chat-fallbacks.js`, `api/chat-booking-shared.js`, `api/chat-booking-persistence.js`, `api/booking-records.js`, `src/components/BookingFlow.tsx`, and each `openBooking` caller under `src/pages/`.
- Short `shared/registry/README.md` documenting the "registry is the only place prices live" rule.

### Open Questions Before Implementation

1. Confirm `shared/registry/` location (alternative: `src/shared/registry/` with a `vercel.json` include for the API). I recommend top-level `shared/`.
2. Should `kmp_knowledge.json` (public/data) be regenerated from the registry at build time, or left as an independent marketing copy source? Recommend: leave it, add a follow-up phase.
3. Cleanup of dead hardcoded literals — do it in this phase or defer to Phase 6.1? Recommend defer.