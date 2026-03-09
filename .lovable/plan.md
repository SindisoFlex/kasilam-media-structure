

# Universal Booking Flow & Package Card Fix

## Overview

Replace the existing 6-step generic booking page with a unified, context-aware booking system that all service pages feed into. Fix package cards so only buttons trigger navigation, not the card itself.

---

## Two Problems, One Solution

### Problem 1: Card Click Behavior
Currently, Wedding and Funeral pages have package cards where the entire card could be perceived as clickable. The fix is straightforward — ensure only explicit `<Button>` elements trigger booking, and cards have no `onClick` or wrapping `<button>` elements. Most pages already do this correctly (buttons use `<Link>` or `onClick`), but we need to audit and ensure consistency.

### Problem 2: Disconnected Booking Flow
The current `/booking` page has a generic 6-step flow (Service → Package → Add-ons → Travel → Date → Client) that doesn't receive context from service pages. When users click "Photography" or "Combo" on a package card, the booking page doesn't use those URL params.

---

## New Architecture

### A. Shared Booking Dialog Component
Create `src/components/BookingFlow.tsx` — a multi-step dialog/sheet that can be triggered from any service page.

**5 Steps:**
1. **Add-Ons** — Optional extras (rush delivery, raw files, social edits, drone, etc.)
2. **Event Details** — Event type, location, date (calendar), time, client name, WhatsApp number, notes
3. **Price Summary** — Base price + add-ons + tax (15% VAT) = total
4. **Confirmation** — Opens WhatsApp with formatted booking summary

### B. Booking Context
Create `src/contexts/BookingContext.tsx` with:
```text
- serviceName: string (e.g., "Wedding Production")
- packageName: string (e.g., "Classic Coverage")
- mediaType: "photography" | "videography" | "combo"
- basePrice: number
- hours: number
```

Service pages call `openBooking({ serviceName, packageName, mediaType, basePrice, hours })` when a format button is clicked.

### C. Updated Package Cards
On pages with Photography/Videography/Combo pricing (Wedding, Funeral, Family Events):
- Each pricing row gets its own `<Button>` that calls `openBooking()` with the correct media type and price
- Remove any card-level click handlers
- The card remains non-interactive (display only)

On pages without media type selection (Creators/Artists, Business, Studio Recording):
- The single "Select Package" or "Book Now" button calls `openBooking()` with the package info
- No card-level click handlers

---

## File Changes

| File | Change |
|------|--------|
| `src/components/BookingFlow.tsx` | **New** — Multi-step booking dialog (add-ons → details → summary → WhatsApp confirm) |
| `src/contexts/BookingContext.tsx` | **New** — Booking state + `openBooking()` function |
| `src/App.tsx` | Wrap with `BookingProvider`, render `<BookingFlow />` globally |
| `src/pages/visual/WeddingProduction.tsx` | Replace single "Book" button per card with 3 format buttons calling `openBooking()` |
| `src/pages/visual/FuneralCoverage.tsx` | Same — 3 format buttons per card instead of single button |
| `src/pages/visual/CommunityEvents.tsx` | Update tier buttons to call `openBooking()` with selected media + tier price |
| `src/pages/visual/CreatorsArtists.tsx` | Update "Select Package" buttons to call `openBooking()` |
| `src/pages/visual/BusinessCorporate.tsx` | Update buttons to call `openBooking()` |
| `src/pages/audio/StudioRecording.tsx` | Update "Book Now" buttons to call `openBooking()` |
| `src/pages/Booking.tsx` | Keep as fallback for direct `/booking` navigation, but simplified |

---

## BookingFlow Component Design

```text
┌─────────────────────────────────────┐
│  Sheet/Dialog (slides from right)   │
│                                     │
│  Step 1: Add-Ons                    │
│  ┌─ Rush Delivery (R500)     [✓] ─┐│
│  ├─ Raw Files (R400)         [ ] ─┤│
│  ├─ Social Edits (R600)      [ ] ─┤│
│  ├─ Drone Footage (R1500)    [ ] ─┤│
│  └─ Extra Revisions (R300)   [ ] ─┘│
│                    [Skip] [Next →]  │
│                                     │
│  Step 2: Event Details              │
│  Event Type: [________]            │
│  Location:   [________]            │
│  Date:       [📅 Pick date]        │
│  Time:       [10:00 ▼]             │
│  Name:       [________]            │
│  WhatsApp:   [________]            │
│  Notes:      [________]            │
│                    [← Back] [Next]  │
│                                     │
│  Step 3: Summary                    │
│  Wedding - Classic (Combo)  R12,000 │
│  + Rush Delivery              R500  │
│  Subtotal                  R12,500  │
│  VAT (15%)                  R1,875  │
│  Total                    R14,375   │
│              [← Back] [Confirm →]   │
│                                     │
│  Step 4: ✓ Confirmed!              │
│  Ref: KMP-XXXX                      │
│  [Download PDF] [Open WhatsApp]     │
└─────────────────────────────────────┘
```

### WhatsApp Message Format
```
Hi KMP! I'd like to confirm my booking:

Ref: KMP-XXXX
Service: Wedding Production
Package: Classic Coverage (Combo)
Date: March 15, 2026 at 10:00
Location: Port Elizabeth
Total: R14,375

Name: John Doe
WhatsApp: 082 123 4567
Notes: Outdoor ceremony
```

---

## Technical Details

- BookingFlow uses `<Sheet>` from shadcn for slide-in panel
- Calendar uses existing `<Calendar>` with `pointer-events-auto`
- PDF generation reuses existing `jsPDF` logic
- WhatsApp URL: `https://wa.me/27000000000?text=...`
- VAT rate: 15% (South Africa standard)
- All prices in ZAR using `Intl.NumberFormat`
- Add-ons are service-agnostic (same list for all services)

