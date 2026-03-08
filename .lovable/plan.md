

# Scroll-Triggered Animations with Framer Motion

## Approach
Create reusable animation wrapper components, then apply them across all service pages. This avoids editing 20+ files with repetitive motion code.

## 1. Install framer-motion
Add `framer-motion` as a dependency.

## 2. Create Animation Components (`src/components/animations.tsx`)
Build 3-4 reusable wrappers:
- **`FadeInSection`** — fades up on scroll (for text blocks, about sections)
- **`StaggerContainer` + `StaggerItem`** — staggers children on scroll (for grids, feature lists, process steps)
- **`ScaleIn`** — scales up on scroll (for pricing cards, CTAs)

All use `framer-motion`'s `motion` + `useInView` with `once: true` and `viewport={{ amount: 0.2 }}`.

## 3. Apply to All Service Pages (20 files)
Wrap sections consistently:
- **Hero**: `FadeInSection` with no delay
- **Process/How It Works grids**: `StaggerContainer` + `StaggerItem`
- **Service cards**: `StaggerContainer` + `StaggerItem`
- **Pricing tiers**: `StaggerContainer` + `ScaleIn`
- **About sections**: `FadeInSection`
- **CTA sections**: `FadeInSection`

### Files to edit:
**Main pages (3):** `AudioProduction.tsx`, `VisualProduction.tsx`, `DigitalMarketing.tsx`

**Audio sub-pages (7):** `StudioRecording.tsx`, `PodcastRecording.tsx`, `VoiceoverProduction.tsx`, `MixingCoordination.tsx`, `MixingMastering.tsx`, `MusicProduction.tsx`, `ProductionManagement.tsx`

**Visual sub-pages (5):** `BusinessCorporate.tsx`, `CommunityEvents.tsx`, `CreatorsArtists.tsx`, `FuneralCoverage.tsx`, `WeddingProduction.tsx`

**Digital sub-pages (5):** `AnalyticsReporting.tsx`, `ContentCreation.tsx`, `PaidAdvertising.tsx`, `SocialMediaManagement.tsx`, `WebDevelopment.tsx`

## 4. Animation Specifications
- Fade-up: `y: 30 → 0`, `opacity: 0 → 1`, duration `0.6s`
- Stagger: `0.1s` delay between children
- Scale: `scale: 0.95 → 1` with `opacity`
- Viewport trigger: `amount: 0.2`, `once: true`
- Hero gets slightly more dramatic motion (`y: 40`)

