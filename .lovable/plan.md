
# Fix: Flexible Cards & Missing Mobile Menu Links

## Two Issues Identified

### 1. Mobile Hamburger Menu: Only "HOME" visible
**Root cause:** The mobile slide-in panel clips navigation links. Based on screenshot, only "HOME" and the theme toggle are visible; 7 other links are cut off.

**Problem in `Navbar.tsx`:**
- The nav links container (`div.flex-1.flex-col`) scrolls, but the menu itself lacks proper height constraints
- The animation (`animate-fade-in` with staggered delays) may cause initial opacity:0 that never resolves visually

**Fix:**
- Ensure menu panel has `h-screen` or `min-h-screen` and inner scroll container allows full overflow
- Remove `animate-fade-in` from mobile links (CSS animation may conflict with visibility on mobile Safari/some browsers)
- Add explicit `opacity-100` to links to override any animation issues

### 2. Cards: Universal Flexibility & Containment
**Requirements:**
- Equal-height cards in grids
- Content always stays inside (no overflow)
- Mobile-friendly spacing
- Universal defaults

**Changes:**

**A. Update `.premium-card` in `index.css`:**
- Add `flex flex-col` for internal content flow
- Add `min-h-0` and `overflow-hidden` to prevent blowout
- Reduce padding on mobile (`p-6 md:p-10`)

**B. Create utility class `.flexible-card`:**
- For use with shadcn `<Card>` component
- Same flex + overflow rules

**C. Update `CardContent` in `card.tsx`:**
- Add `flex-1 min-h-0 overflow-hidden` defaults
- Ensure children don't break card boundaries

---

## File Changes

| File | Change |
|------|--------|
| `src/index.css` | Update `.premium-card` with flex, overflow, responsive padding |
| `src/components/ui/card.tsx` | Add `flex flex-col h-full min-h-0 overflow-hidden` to Card defaults |
| `src/components/Navbar.tsx` | Remove `animate-fade-in` from mobile links, fix height/scroll on menu panel |

---

## Technical Details

### Card CSS Update (`index.css`)
```css
.premium-card {
  @apply relative overflow-hidden bg-card border border-white/5 rounded-[2rem] 
         p-6 md:p-10  /* responsive padding */
         flex flex-col min-h-0  /* flexbox + prevent overflow */
         transition-all duration-700 ...;
}
```

### Card Component Update (`card.tsx`)
```tsx
<div className={cn("rounded-lg ... flex flex-col h-full min-h-0 overflow-hidden", className)} />
```

### Navbar Mobile Fix
- Remove `animate-fade-in` class from `mobileLinks.map()` 
- Add `min-h-0 overflow-y-auto` to the links container
- Ensure panel has `h-full` (already present)
