import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { execSync } from "child_process";
import { SERVICE_CATEGORIES, PACKAGE_TIERS, PRICING_CURRENCIES } from "../registry/enums.js";

const schemaDirectory = path.resolve(process.cwd(), "schemas");
const schemaNames = [
  "service.schema.json",
  "package.schema.json",
  "mapping.schema.json",
  "registry.schema.json",
  "inquiry.schema.json",
  "pricing.schema.json",
  "audit.schema.json",
  "canonicalBooking.schema.json",
];
const baselineRef = process.env.BASELINE_REF || "HEAD~1";

async function loadSchema(fileName) {
  const content = await fsPromises.readFile(path.join(schemaDirectory, fileName), "utf8");
  return JSON.parse(content);
}

function loadBaselineSchema(fileName) {
  try {
    const raw = execSync(`git show ${baselineRef}:schemas/${fileName}`, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function normalizeType(type) {
  if (Array.isArray(type)) return type;
  return [type];
}

function typeIncludes(baseType, currentType) {
  const currentTypes = new Set(normalizeType(currentType));
  return normalizeType(baseType).every((type) => currentTypes.has(type));
}

function compareEnumValues(baseEnum, currentEnum) {
  const missing = baseEnum.filter((value) => !currentEnum.includes(value));
  return missing;
}

function compareSchema(base, current, pathPrefix = "") {
  const errors = [];
  if (!base || !current) {
    return errors;
  }
  if (base.schemaVersion && current.schemaVersion) {
    const [baseMajor] = base.schemaVersion.split(".");
    const [currentMajor] = current.schemaVersion.split(".");
    if (baseMajor !== currentMajor) {
      errors.push(`${pathPrefix} major schemaVersion changed from ${base.schemaVersion} to ${current.schemaVersion}`);
    }
  }
  if (base.required) {
    const missingRequired = base.required.filter((key) => !current.required?.includes(key));
    if (missingRequired.length) {
      errors.push(`${pathPrefix} removed required properties: ${missingRequired.join(", ")}`);
    }
  }
  if (base.properties) {
    for (const [propName, baseProp] of Object.entries(base.properties)) {
      const currentProp = current.properties?.[propName];
      if (!currentProp) {
        errors.push(`${pathPrefix} removed property ${propName}`);
        continue;
      }
      if (baseProp.enum && currentProp.enum) {
        const removed = compareEnumValues(baseProp.enum, currentProp.enum);
        if (removed.length) {
          errors.push(`${pathPrefix}.${propName} removed enum values: ${removed.join(", ")}`);
        }
      }
      if (baseProp.type && currentProp.type && !typeIncludes(baseProp.type, currentProp.type)) {
        errors.push(`${pathPrefix}.${propName} type changed from ${JSON.stringify(baseProp.type)} to ${JSON.stringify(currentProp.type)}`);
      }
    }
  }
  if (base.enum && current.enum) {
    const removed = compareEnumValues(base.enum, current.enum);
    if (removed.length) {
      errors.push(`${pathPrefix} top-level enum removed values: ${removed.join(", ")}`);
    }
  }
  return errors;
}

function validateEnumConsistency() {
  const errors = [];
  try {
    const serviceSchema = JSON.parse(fs.readFileSync(path.join(schemaDirectory, "service.schema.json"), "utf8"));
    const packageSchema = JSON.parse(fs.readFileSync(path.join(schemaDirectory, "package.schema.json"), "utf8"));
    const pricingSchema = JSON.parse(fs.readFileSync(path.join(schemaDirectory, "pricing.schema.json"), "utf8"));

    const serviceCategories = serviceSchema.properties.category.enum;
    const packageTiers = packageSchema.properties.packageTier.enum.filter((value) => value !== null);
    const pricingCurrencies = pricingSchema.properties.currency.enum;

    const serviceCategoryDiff = compareEnumValues(SERVICE_CATEGORIES, serviceCategories);
    const packageTierDiff = compareEnumValues(PACKAGE_TIERS, packageTiers);
    const pricingCurrencyDiff = compareEnumValues(PRICING_CURRENCIES, pricingCurrencies);

    if (serviceCategoryDiff.length) {
      errors.push(`SERVICE_CATEGORIES enum divergence: ${serviceCategoryDiff.join(", ")}`);
    }
    if (packageTierDiff.length) {
      errors.push(`PACKAGE_TIERS enum divergence: ${packageTierDiff.join(", ")}`);
    }
    if (pricingCurrencyDiff.length) {
      errors.push(`PRICING_CURRENCIES enum divergence: ${pricingCurrencyDiff.join(", ")}`);
    }
  } catch (error) {
    errors.push(`Enum consistency validation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
  return errors;
}

export function compareSchemaObjects(base, current, pathPrefix = "") {
  return compareSchema(base, current, pathPrefix);
}

export async function validateSchemaEvolution() {
  const errors = [];
  for (const name of schemaNames) {
    const current = await loadSchema(name);
    const baseline = loadBaselineSchema(name);
    if (!baseline) {
      continue;
    }
    const schemaErrors = compareSchema(baseline, current, name);
    errors.push(...schemaErrors);
  }
  errors.push(...validateEnumConsistency());
  if (errors.length) {
    const report = errors.map((err) => `- ${err}`).join("\n");
    throw new Error(`Schema compatibility validation failed:\n${report}`);
  }
  return true;
}

if (process.argv[1].endsWith("schemaCompatibility.js")) {
  validateSchemaEvolution()
    .then(() => {
      console.log("Schema compatibility validation passed.");
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    });
}
