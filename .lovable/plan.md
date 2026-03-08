

# Plan: Fix Build Error + UI Refinements

## 1. Fix Build Error (Critical)
Two duplicate files exist with different casing: `VoiceOverProduction.tsx` and `VoiceoverProduction.tsx`. Fix by updating `App.tsx` import to use `VoiceoverProduction` (matching the original file) and delete the duplicate `VoiceOverProduction.tsx`.

## 2. Remove Logo from Hero Section
In `src/pages/Index.tsx`, remove lines 45-49 (the logo container in the hero section).

## 3. Light Mode Card Styling
Update `src/index.css` to ensure light mode uses:
- Black text on foreground elements
- Light gray card/box backgrounds (`bg-muted`)
- Subtle reddish shadow on cards: `shadow-[0_4px_20px_-4px_rgba(220,38,38,0.08)]`

Update the `.premium-card` utility in light mode to have a soft red-tinted shadow instead of no shadow.

## 4. Mobile Hamburger Menu Improvements
In `src/components/Navbar.tsx`, update the mobile menu so:
- All nav links (including Services sub-items) are shown **flat** — no accordion/dropdown for Services. Instead, show all links directly: Home, About, Services (links to /services), Audio Production, Visual Production, Digital Media Solutions, Portfolio, Contact.
- Cleaner spacing and professional typography
- Each link gets consistent styling with proper padding and alignment

## 5. Desktop Nav — Ensure Correct Layout
The current layout already has logo left, nav center-ish, toggle right. Refine by using a proper 3-column flex layout:
- Left: Logo
- Center: Nav links (absolute centered or flex-1 centered)
- Right: Theme toggle

This ensures true centering of nav links regardless of logo/toggle widths.

## Files to Modify
- `src/App.tsx` — Fix import casing to `./pages/audio/VoiceoverProduction`
- `src/pages/Index.tsx` — Remove hero logo block
- `src/components/Navbar.tsx` — Flatten mobile menu, true-center desktop nav
- `src/index.css` — Add light mode card shadows with reddish tint

## File to Delete
- `src/pages/audio/VoiceOverProduction.tsx` (duplicate)

## Note for Memory
No backend. Everything syncs to Facebook (social links point to Facebook).

