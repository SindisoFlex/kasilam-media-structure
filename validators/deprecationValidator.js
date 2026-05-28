import path from "path";

const registryRoot = path.resolve(process.cwd());
const packagesPath = path.join(registryRoot, "core/service-registry/packages.js");
const mappingsPath = path.join(registryRoot, "core/service-registry/mappings.js");

async function loadModule(filePath) {
  const module = await import(filePath);
  return module;
}

export function validateDeprecationRulesForData(PACKAGES, FRONTEND_TO_PRODUCT) {
  const errors = [];
  const seenCodes = new Map();
  const deprecatedCodes = new Set();

  for (const pkg of PACKAGES) {
    if (seenCodes.has(pkg.productCode)) {
      errors.push(`Duplicate productCode found: ${pkg.productCode}`);
    }
    seenCodes.set(pkg.productCode, pkg);

    if (pkg.deprecated === true) {
      deprecatedCodes.add(pkg.productCode);
      if (!pkg.deprecatedReason) {
        errors.push(`Deprecated package ${pkg.productCode} must include deprecatedReason.`);
      }
    }
  }

  for (const [label, mappedCode] of Object.entries(FRONTEND_TO_PRODUCT || {})) {
    if (!seenCodes.has(mappedCode)) {
      errors.push(`Mapping label ${label} references unknown product code ${mappedCode}.`);
      continue;
    }
    if (deprecatedCodes.has(mappedCode)) {
      errors.push(`Mapping label ${label} points to deprecated product code ${mappedCode}.`);
    }
  }

  const labelMap = new Map();
  for (const pkg of PACKAGES) {
    for (const label of pkg.frontendLabels || []) {
      const existing = labelMap.get(label);
      if (existing && existing !== pkg.productCode) {
        errors.push(`Frontend label ${label} is assigned to multiple product codes: ${existing} and ${pkg.productCode}`);
      }
      labelMap.set(label, pkg.productCode);
    }
  }

  return errors;
}

export async function validateDeprecationRules() {
  const packagesModule = await loadModule(`file://${packagesPath}`);
  const mappingsModule = await loadModule(`file://${mappingsPath}`);

  const PACKAGES = packagesModule.PACKAGES ?? packagesModule.default;
  const FRONTEND_TO_PRODUCT = mappingsModule.FRONTEND_TO_PRODUCT ?? mappingsModule.default?.FRONTEND_TO_PRODUCT;

  const errors = validateDeprecationRulesForData(PACKAGES, FRONTEND_TO_PRODUCT);

  if (errors.length) {
    const report = errors.map((err) => `- ${err}`).join("\n");
    throw new Error(`Deprecation validation failed:\n${report}`);
  }
  return true;
}

if (process.argv[1].endsWith("deprecationValidator.js")) {
  validateDeprecationRules()
    .then(() => console.log("Deprecation validation passed."))
    .catch((error) => {
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    });
}
