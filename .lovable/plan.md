

# Rebuild Web & App Development Page

## Overview
Rewrite `src/pages/digital/WebDevelopment.tsx` to match the exact 6-section structure provided, removing all extra sections (Technologies We Use, Tech Stack, Development Process, Built for Performance, Websites We've Built, Industry Focus, Project Questions). The result is a clean, conversion-focused page with exactly:

1. **Hero** — New copy, two CTA buttons (Start Your Project opens booking, Talk on WhatsApp links to `wa.me/27659704101`)
2. **Why Businesses Invest** — 5 bullet points, clean card layout
3. **Development Packages** — 3-column grid: Landing Page (R4,500 / R180/mo), Business Website (R12,000 / R400/mo, highlighted as "Most Popular"), Custom/Web App (R25,000+). Button-only booking triggers (not card click)
4. **Hosting & Ongoing Support** — 3-column grid: Starter R99/mo, Business R199/mo (Recommended), Premium R299–R499/mo. Plus a note about hosting requirement
5. **Positioning Block** — Bold statement: "We don't just build websites — we manage your entire digital presence."
6. **Final CTA** — Two buttons: Start Your Project + Contact Us

## Key Changes
- Remove ~8 existing sections (websitesBuilt, industryFocus, techPillars, technologies, developmentProcess, projectQuestions, "Built for Performance")
- Card click no longer triggers booking — only the CTA button inside each card does
- WhatsApp button links to `https://wa.me/27659704101`
- "Business Website" and "Business Hosting" get highlighted border + "Most Popular" / "Recommended" badge
- All copy replaced with the exact text provided
- Maintain existing animation components (FadeInSection, HeroSection, StaggerContainer, StaggerItem)
- Keep premium-card styling and black/white/red palette

## File Changed
`src/pages/digital/WebDevelopment.tsx` — full rewrite (~350 lines, down from 613)

