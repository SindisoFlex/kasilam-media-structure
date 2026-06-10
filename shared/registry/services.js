// Canonical service registry — single source of truth.
// DO NOT duplicate service definitions elsewhere. Read from here.

export const SERVICES = Object.freeze({
  FUNERAL: {
    code: "FUNERAL",
    label: "Funeral & Memorial Coverage",
    category: "visual",
    bookingService: "funeral",
    legacyIds: ["funeral_photography"],
    route: "/services/visual-production/funeral-coverage",
  },
  WEDDING: {
    code: "WEDDING",
    label: "Wedding Production",
    category: "visual",
    bookingService: "visual",
    legacyIds: ["wedding_coverage"],
    route: "/services/visual-production/wedding-production",
  },
  COMMUNITY: {
    code: "COMMUNITY",
    label: "Community & Cultural Events",
    category: "visual",
    bookingService: "visual",
    legacyIds: ["birthday_photography", "community_events"],
    route: "/services/visual-production/community-events",
  },
  CORPORATE: {
    code: "CORPORATE",
    label: "Business & Corporate",
    category: "visual",
    bookingService: "visual",
    legacyIds: ["corporate"],
    route: "/services/visual-production/business-corporate",
  },
  CREATORS: {
    code: "CREATORS",
    label: "Creators & Artists",
    category: "visual",
    bookingService: "visual",
    legacyIds: ["creators_artists"],
    route: "/services/visual-production/creators-artists",
  },
  AUDIO: {
    code: "AUDIO",
    label: "Audio Production",
    category: "audio",
    bookingService: "audio",
    legacyIds: ["audio_production"],
    route: "/services/audio-production",
  },
  WEB: {
    code: "WEB",
    label: "Web & App Development",
    category: "digital",
    bookingService: "digital",
    legacyIds: ["web_development"],
    route: "/services/web-development",
  },
  DIGITAL: {
    code: "DIGITAL",
    label: "Digital Solutions",
    category: "digital",
    bookingService: "digital",
    legacyIds: ["branding_marketing", "digital_marketing"],
    route: "/services/digital-marketing",
  },
});

export const SERVICE_CODES = Object.freeze(Object.keys(SERVICES));
