

# KMP | Kasilam Media Productions — Implementation Plan

## Brand Identity
- **Color Palette**: Black, White, and Red — cinematic, bold, premium
- **Dark mode default**, with light mode toggle
- **Logo**: Styled "KMP" text placeholder
- **Typography**: Clean, confident, modern sans-serif hierarchy

---

## 1. Global Layout & Navigation

### Desktop Navigation
- Logo ("KMP") on the left
- Centered links: Home, About, Services (dropdown), Contact
- Dark/Light mode toggle on the right
- Services dropdown: Audio Production, Visual Production, Digital Media Solutions
- Smooth hover animations, red accent on active/hover states

### Mobile Navigation
- Logo left, hamburger icon right
- Slide-in menu from right (80% width, 300ms animation)
- Sequential fade-in menu items
- Services expands as accordion submenu
- Dark/Light toggle inside menu
- Background overlay when open

### Theme System
- Dark mode default
- Preference persisted in localStorage
- Smooth color transitions

### Footer
- Consistent across all pages
- Social links (WhatsApp, Facebook, Instagram)
- Copyright & brand tagline

---

## 2. Home Page

- **Hero Section** — Bold cinematic headline, tagline, CTA button (red accent)
- **About Preview** — Short brand intro with "Learn More" link
- **3 Media Pillars** — Cards for Audio, Visual, Digital with icons
- **Why Choose Us** — 4 key differentiators
- **4-Step Process** — Visual step flow
- **CTA Section** — Strong call to action
- **Footer**

---

## 3. About Page

- **Who We Are** — Brand story section
- **Founder Journey Timeline** — Visual vertical timeline
- **Mission & Vision** — Side-by-side or stacked blocks
- **Core Values** — Icon-based value cards
- **CTA** — Contact or booking prompt

---

## 4. Services Page

Three structured sections, each with:
- Section heading & short description
- Service list with clean formatting
- Individual CTA button

Sections:
- **Audio Production**
- **Visual Production**
- **Digital Media Solutions**

---

## 5. Contact Page

- **Contact Form** — Name, email, message fields
- **WhatsApp Button** — Click-to-chat link
- **Social Links** — Facebook & Instagram
- **Minimal, premium layout**

---

## 6. Booking System Page

A multi-step front-end booking flow (no backend):

### Step 1: Service Selection
- Choose from Audio / Visual / Digital categories

### Step 2: Package Selection
- Packages with predefined pricing per service

### Step 3: Add-ons
- Optional extras with fixed prices

### Step 4: Travel Cost
- Distance input — if >30km, per-km surcharge applied

### Step 5: Date & Time
- Date picker and time selection

### Step 6: Client Details
- Name, email, phone fields

### Live Price Summary Panel
- Desktop: sticky right sidebar showing running total
- Mobile: collapsible summary at top/bottom
- South African Rand (ZAR) formatting

### Confirmation
- Auto-generated reference number
- Downloadable PDF quotation (generated client-side)
- Auto-opens WhatsApp with pre-filled booking summary

---

## Design Principles Throughout
- Black/white/red palette with red as accent color
- 1280px max-width container
- Premium spacing and typography
- Smooth animations and transitions
- Fully responsive — balanced desktop and mobile
- Placeholder content aligned with premium media positioning

