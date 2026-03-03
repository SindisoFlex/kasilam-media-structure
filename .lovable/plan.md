

# Audio Production Landing Page — Implementation Plan

## Overview
Create a fully independent, immersive landing page at `/services/audio-production` with its own component file and route. Update the Services overview page to link to it. Establish the architecture pattern for future independent service pages.

## Files to Create

### `src/pages/AudioProduction.tsx`
A standalone page component with 6 sections:

1. **Hero** — Dark `bg-background` section with gradient overlay (`from-primary/10`), studio-themed layout. Bold headline, subheadline, two CTAs ("Book a Recording Session" linking to `/booking`, "View Packages" scrolling to `#packages`).

2. **Who We Are** — "Your Creative Production Partner" section. Honest, confident positioning text about collaborating with engineers and creatives. Clean two-column or centered layout.

3. **Our Process** — 4-step horizontal grid (consultation, recording, collaboration, delivery). Numbered steps with icons, consistent with the site's existing step-card pattern.

4. **Services Included** — Grid of 5 service cards (Studio Recording, Podcast Recording, Voice-over Production, Mixing & Mastering Coordination, Beat Sourcing & Production Management). Cards use `bg-muted` for soft gray background in both themes.

5. **Pricing Tiers** — 3 premium elevated cards with `shadow-lg` and subtle border highlights. Starter Session, Professional Package, Full Production. Price displayed as "R____" placeholder. Feature lists with checkmark icons.

6. **Final CTA** — Dark `bg-card` section. "Ready to Record Something That Sounds Professional?" with booking button.

## Files to Modify

### `src/App.tsx`
- Import `AudioProduction` component
- Add route: `<Route path="/services/audio-production" element={<AudioProduction />} />`

### `src/pages/Services.tsx`
- Convert from detailed service sections into a **navigation hub**
- Each service card becomes a link to its dedicated page (`/services/audio-production`, with `/services/visual-production` and `/services/digital-marketing` as placeholder routes for now)
- Keep brief intro text per service but remove detailed item lists

### `src/components/Navbar.tsx`
- Update the Services dropdown child links to point to the new independent routes (`/services/audio-production`, `/services/visual-production`, `/services/digital-marketing`)

## Design Approach
- Consistent with existing site: Tailwind utilities, `Card` components from shadcn, `Button` component, same animation classes (`animate-fade-in`)
- Soft gray cards: `bg-muted` (maps to the theme's muted color)
- Premium pricing cards: elevated with `shadow-lg border-primary/20`, middle tier highlighted with `border-primary`
- Icons from `lucide-react`: `Mic`, `Headphones`, `Radio`, `Music`, `AudioWaveform`
- All content strictly audio-focused, no cross-service contamination

