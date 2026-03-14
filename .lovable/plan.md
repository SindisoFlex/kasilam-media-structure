

# Fix Build Errors + Digital Marketing Futuristic Hero Background

## 1. Fix: AboutHero.tsx — Duplicate `className`
Merge the two `className` attributes on lines 58/64 and 68/74 into single attributes:
- Line 57-65: `className="hand-left text-primary"`
- Line 67-75: `className="hand-right text-foreground"`

## 2. Fix: Portfolio.tsx — Missing `disabled` property
Add `disabled: true` to the Videography category object (line 21-27). The other two categories don't need it (falsy by default).

## 3. Digital Marketing Hero — Futuristic Circuit Background
Replace the current plain mesh-bg in `src/pages/DigitalMarketing.tsx` hero section with an inline animated SVG featuring:
- **Circuit board grid** with thin lines forming a network pattern
- **Glowing red nodes** at intersections with pulse animations
- **Floating geometric shapes** (hexagons, data symbols) drifting slowly
- **Connection lines** with animated dash-offset for "data flow" effect
- All using CSS keyframe animations with `prefers-reduced-motion` respect
- Colors: red-600 accent nodes/lines on dark background, subtle opacity

The SVG replaces the `mesh-bg` div inside the existing absolute-positioned background container. The hero text content remains unchanged.

### Files Changed

| File | Change |
|------|--------|
| `src/components/AboutHero.tsx` | Merge duplicate className on 2 path elements |
| `src/pages/Portfolio.tsx` | Add `disabled: true` to Videography category |
| `src/pages/DigitalMarketing.tsx` | Replace hero background with animated circuit SVG |

