import { describe, expect, it } from "vitest";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";
import path from "path";
import { PACKAGES } from "../../core/service-registry/packages.js";
import { FRONTEND_TO_PRODUCT } from "../../core/service-registry/mappings.js";
import { SERVICES } from "../../core/service-registry/services.js";

const schemaDirectory = path.resolve(process.cwd(), "schemas");
const registrySchemaPath = path.join(schemaDirectory, "registry.schema.json");

function loadJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

describe("Phase 1 registry schema", () => {
  it("validates the registry schema and actual canonical metadata", () => {
    const schema = loadJson(registrySchemaPath);
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);

    const serviceSchema = loadJson(path.join(schemaDirectory, "service.schema.json"));
    const packageSchema = loadJson(path.join(schemaDirectory, "package.schema.json"));
    const mappingSchema = loadJson(path.join(schemaDirectory, "mapping.schema.json"));

    ajv.addSchema(serviceSchema, serviceSchema.$id);
    ajv.addSchema(packageSchema, packageSchema.$id);
    ajv.addSchema(mappingSchema, mappingSchema.$id);
    const validate = ajv.compile(schema);

    const registryData = {
      services: SERVICES,
      packages: PACKAGES,
      mappings: FRONTEND_TO_PRODUCT,
    };

    const valid = validate(registryData);
    if (!valid) {
      console.error(JSON.stringify(validate.errors, null, 2));
    }
    expect(valid).toBe(true);

    const packageCodes = new Set(PACKAGES.map((entry) => entry.productCode));
    const unmapped = Object.values(FRONTEND_TO_PRODUCT).filter((code) => !packageCodes.has(code));
    expect(unmapped).toEqual([]);
  });
});
