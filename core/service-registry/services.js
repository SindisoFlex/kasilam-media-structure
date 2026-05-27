// Central service registry (read-only metadata)
// Phase 1: canonical service definitions extracted from ai-chat and frontend
export const SERVICES = {
  funeral_photography: {
    serviceId: "funeral_photography",
    category: "visual-production",
    displayName: "Funeral & Memorial Coverage",
    bookingService: "funeral",
    route: "/services/visual-production/funeral-coverage",
    pricingType: "exact",
  },
  birthday_photography: {
    serviceId: "birthday_photography",
    category: "visual-production",
    displayName: "Community & Cultural Events",
    bookingService: "visual",
    route: "/services/visual-production/community-events",
    pricingType: "tailored",
  },
  wedding_coverage: {
    serviceId: "wedding_coverage",
    category: "visual-production",
    displayName: "Wedding Production",
    bookingService: "visual",
    route: "/services/visual-production/wedding-production",
    pricingType: "exact",
  },
  web_development: {
    serviceId: "web_development",
    category: "digital-solutions",
    displayName: "Web & App Development",
    bookingService: "digital",
    route: "/services/web-development",
    pricingType: "hybrid",
  },
  audio_production: {
    serviceId: "audio_production",
    category: "audio-production",
    displayName: "Audio Production",
    bookingService: "audio",
    route: "/services/audio-production",
    pricingType: "tailored",
  },
  branding_marketing: {
    serviceId: "branding_marketing",
    category: "digital-solutions",
    displayName: "Digital Solutions",
    bookingService: "digital",
    route: "/services/digital-marketing",
    pricingType: "tailored",
  },
};

export default SERVICES;
