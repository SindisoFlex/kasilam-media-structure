import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs/promises";
import path from "path";

const schemaNames = [
  "service.schema.json",
  "package.schema.json",
  "mapping.schema.json",
  "registry.schema.json",
  "inquiry.schema.json",
  "pricing.schema.json",
  "audit.schema.json",
  "canonicalBooking.schema.json"
];

const schemaDirectory = path.resolve(process.cwd(), "schemas");

async function loadJsonSchema(fileName) {
  const filePath = path.join(schemaDirectory, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function validateRegistryPackages() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  const schemas = await Promise.all(schemaNames.map(loadJsonSchema));
  for (const schema of schemas) {
    if (!ajv.validateSchema(schema)) {
      throw new Error(
        `Schema validation failed for ${schema.$id || "unknown schema"}: ${JSON.stringify(ajv.errors, null, 2)}`
      );
    }

    if (schema.$id) {
      ajv.addSchema(schema, schema.$id);
    }
  }

  const registrySchema = schemas.find((schema) => schema.$id === "registry.schema.json");
  if (!registrySchema) {
    throw new Error("Missing registry.schema.json in schema bundle.");
  }

  const validate = ajv.compile(registrySchema);

  const servicesModule = await import("../core/service-registry/services.js");
  const packagesModule = await import("../core/service-registry/packages.js");
  const mappingsModule = await import("../core/service-registry/mappings.js");

  const data = {
    services: servicesModule.SERVICES ?? servicesModule.default,
    packages: packagesModule.PACKAGES ?? packagesModule.default,
    mappings: mappingsModule.FRONTEND_TO_PRODUCT ?? mappingsModule.default?.FRONTEND_TO_PRODUCT,
  };

  const valid = validate(data);
  if (!valid) {
    throw new Error(`Registry metadata validation failed: ${JSON.stringify(validate.errors, null, 2)}`);
  }

  const packageCodes = new Set(data.packages.map((pkg) => pkg.productCode));
  const missingTargets = Object.entries(data.mappings).filter(([, targetCode]) => !packageCodes.has(targetCode));
  if (missingTargets.length > 0) {
    const formatted = missingTargets
      .map(([label, code]) => `- ${label} -> ${code}`)
      .join("\n");
    throw new Error(`Frontend mappings contain undefined product codes:\n${formatted}`);
  }

  console.log("Registry validation succeeded. All schema files and canonical metadata are consistent.");
}

validateRegistryPackages().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
