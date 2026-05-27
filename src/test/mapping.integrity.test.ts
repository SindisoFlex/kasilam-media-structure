import { describe, it, expect } from "vitest";
import { FRONTEND_TO_PRODUCT } from "../../core/service-registry/mappings.js";
import { PACKAGES } from "../../core/service-registry/packages.js";
import fs from "fs";
import path from "path";

function collectFiles(dir: string, exts: string[] = [".ts", ".tsx", ".js", ".jsx"]) {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...collectFiles(full, exts));
    } else {
      if (exts.includes(path.extname(e.name))) results.push(full);
    }
  }
  return results;
}

function extractPackageLiterals(fileContent: string) {
  const labels = new Set<string>();
  const reDouble = /package:\s*\"([^\"]+)\"/g;
  const reSingle = /package:\s*\'([^\']+)\'/g;
  let m;
  while ((m = reDouble.exec(fileContent))) labels.add(m[1].trim());
  while ((m = reSingle.exec(fileContent))) labels.add(m[1].trim());
  return Array.from(labels);
}

describe("mapping integrity — frontend package labels", () => {
  it("all frontend `package:` literals map to a canonical product or inquiry code", () => {
    const pagesDir = path.resolve(process.cwd(), "src/pages");
    const files = collectFiles(pagesDir);
    const foundLabels = new Set<string>();
    for (const f of files) {
      const content = fs.readFileSync(f, "utf8");
      const labels = extractPackageLiterals(content);
      for (const l of labels) foundLabels.add(l);
    }

    const pkgFrontendLabels = new Set<string>();
    for (const p of PACKAGES) {
      (p.frontendLabels || []).forEach((lbl: string) => pkgFrontendLabels.add(lbl));
    }

    const unmapped: string[] = [];
    for (const lbl of Array.from(foundLabels).sort()) {
      const mapped = FRONTEND_TO_PRODUCT && FRONTEND_TO_PRODUCT[lbl];
      const inPackages = pkgFrontendLabels.has(lbl);
      if (!mapped && !inPackages) unmapped.push(lbl);
    }

    if (unmapped.length > 0) {
      // provide a helpful assertion message listing unmapped labels
      expect(unmapped).toEqual([]);
    } else {
      expect(unmapped.length).toBe(0);
    }
  });
});
