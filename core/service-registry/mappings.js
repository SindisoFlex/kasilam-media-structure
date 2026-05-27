// Mapping adapters between frontend labels, bookingMemory, and canonical product codes
export const FRONTEND_TO_PRODUCT = {
  // Visual
  "General Shoot": "VIS-2H",
  "2-Hour Coverage": "VIS-2H",
  "4-Hour Coverage": "VIS-4H",
  "6-Hour Coverage": "VIS-6H",
  // Web
  "Landing Page": "WEB-LP",
  "Business Website": "WEB-BIZ",
  "Custom / Web App": "WEB-CUST",
  "Website Project": "WEB-CUST",
  // NOTE: canonicalized to WEB-CUST in PACKAGES for custom web projects
  // Audio
  "General Session": "AUD-GEN",
  // Inquiry / intake mappings (Phase 1B)
  "General Inquiry": "INQ-GEN",
  "Digital Inquiry": "INQ-GEN",
  "General Project": "INQ-GEN",
  "Strategy Session": "INQ-STRAT",
  "Strategic Consultation": "INQ-STRAT",
  "Project Kickoff": "INQ-KICKOFF",
  "Initial Consultation": "INQ-KICKOFF",
  "Data Audit": "INQ-AUDIT",
  "General Audit": "INQ-AUDIT",
  "Production Inquiry": "INQ-PROD",
  "Management Inquiry": "INQ-MGMT",
  "Management Project": "INQ-MGMT",
  // (duplicates removed)
};

// Booking memory service -> canonical context id mapping
export const BOOKING_SERVICE_TO_CONTEXT = {
  funeral: "funeral_photography",
  visual: "birthday_photography",
  audio: "audio_production",
  digital: "branding_marketing",
};

export default { FRONTEND_TO_PRODUCT, BOOKING_SERVICE_TO_CONTEXT };
