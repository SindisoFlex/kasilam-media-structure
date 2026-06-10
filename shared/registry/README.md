# shared/registry

**Single source of truth** for services, packages, pricing, add-ons, and label → canonical-code resolution.

Both the Vite frontend (`src/**`) and the Vercel serverless API (`api/**`) import from here.

## Rules

1. **Prices live here only.** If you find yourself typing `R1,500` in a `.ts` / `.js` file outside `shared/registry/`, stop and import from here instead.
2. **Service vocabulary lives here.** New services / packages are added to `services.js` and `packages.js` and propagate everywhere.
3. **Additive only.** Do not break existing field shapes; add new fields and keep readers tolerant of missing values.
4. **Parity-tested.** `api/tests/registry-parity.test.js` asserts that registry-derived strings match the strings previously hardcoded in `api/ai-chat.js` and `api/chat-fallbacks.js`. Update the registry, not the strings — the test will catch drift.

## Layout

| File | Purpose |
|---|---|
| `services.js` | Canonical service codes, labels, categories, legacy-id aliases |
| `packages.js` | Tier definitions + exact ZAR prices |
| `pricing.js` | Formatters that produce the exact display strings |
| `addons.js` | Booking add-ons by service category |
| `mappings.js` | `resolveServiceCode` / `resolvePackageCode` for free-text → code |
| `index.js` / `index.d.ts` | Barrel + TS types |

## Migration status

- [x] Registry created
- [x] Add-ons consumed by `BookingFlow.tsx`
- [ ] `api/ai-chat.js` reading exact pricing from registry
- [ ] `api/chat-fallbacks.js` reading pricing blurbs from registry
- [ ] `bookingMemory.serviceCode` / `packageCode` stamped on every booking
- [ ] `openBooking({...})` page presets sourced from registry

Tracked in `.lovable/plan.md` (Phase 6).
