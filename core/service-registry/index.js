import SERVICES from "./services.js";
import PACKAGES from "./packages.js";
import PRICING from "./pricing.js";
import MAPPINGS from "./mappings.js";

export { SERVICES, PACKAGES, PRICING, MAPPINGS };

export function getServiceById(id) {
  return SERVICES[id] || null;
}

export function findPackageByFrontendLabel(label) {
  const p = PACKAGES.find((pkg) => (pkg.frontendLabels || []).includes(label));
  return p || null;
}

export function getPricingForProduct(code) {
  return PRICING[code] || null;
}

export default { getServiceById, findPackageByFrontendLabel, getPricingForProduct };
