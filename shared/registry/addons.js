// Canonical booking add-ons by service category.
// Lifted verbatim from src/components/BookingFlow.tsx (lines 18-37) — values unchanged.

export const ADDONS = Object.freeze({
  audio: [
    { id: "extra-hour", name: "Extra Recording Hour", price: 350 },
    { id: "mixing", name: "Mixing", price: 600 },
    { id: "mastering", name: "Mastering", price: 400 },
    { id: "podcast-edit", name: "Podcast Editing", price: 500 },
  ],
  visual: [
    { id: "extra-camera", name: "Extra Camera", price: 1000 },
    { id: "drone", name: "Drone Footage", price: 1500 },
    { id: "photography", name: "Photography Coverage", price: 800 },
    { id: "extended-edit", name: "Extended Editing", price: 1200 },
  ],
  digital: [
    { id: "add-platform", name: "Additional Social Platform", price: 1000 },
    { id: "extra-posts", name: "Extra Content Posts", price: 500 },
    { id: "ads-mgmt", name: "Paid Advertising Management", price: 1500 },
    { id: "analytics", name: "Analytics Reporting", price: 800 },
  ],
});
