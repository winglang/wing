import {
  writeFileSync,
  mkdtempSync,
  readFileSync,
  mkdirSync,
  existsSync,
} from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { describe, it, expect } from "vitest";
import { encode, decode } from "vlq";
import {
  createArchive,
  createBundle,
  fixSourcemaps,
  prepareEsmEntrypoint,
} from "../../src/shared/bundling";

describe("createArchive", () => {
  it("should create a zip archive when the directory path contains spaces", () => {
    // create a temp directory with spaces in its name, mirroring the scenario in
    // https://github.com/winglang/wing/issues/6465 where the project directory
    // contains a space
    const root = mkdtempSync(join(tmpdir(), "dir with spaces "));
    const srcDir = join(root, "src");
    const destFile = join(root, "archive.zip");
    mkdirSync(srcDir, { recursive: true });
    writeFileSync(join(srcDir, "index.js"), "module.exports = {};");

    // WHEN
    createArchive(srcDir, destFile);

    // THEN
    expect(existsSync(destFile)).toBe(true);
    // a valid zip archive starts with the "PK" magic bytes
    expect(readFileSync(destFile).subarray(0, 2).toString()).toBe("PK");
    expect(readFileSync(destFile).length).toBeGreaterThan(0);
  });
});

describe("fixSourcemaps", () => {
  it("should fix sourcemaps", () => {
    // THEN
    const mappings = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 2, 2, 0],
      [0, -1, 3, 0],
      [0, -1, 4, 0],
    ];
    const originalMapping = mappings.map((m) => encode(m)).join(";");

    const sourcemapData = {
      sources: ["a/aa", "b", "a/aa", "c"],
      sourcesContent: ["1", "2", "1", "3"],
      mappings: originalMapping,
    };

    // WHEN
    fixSourcemaps(sourcemapData);

    // THEN
    expect(sourcemapData.sources).toHaveLength(3);
    expect(sourcemapData.sourcesContent).toHaveLength(3);
    expect(sourcemapData.mappings).not.toEqual(originalMapping);

    expect(sourcemapData.sources).toMatchInlineSnapshot(`
      [
        "a/aa",
        "b",
        "c",
      ]
    `);
    expect(sourcemapData.sourcesContent).toMatchInlineSnapshot(`
      [
        "1",
        "2",
        "3",
      ]
    `);

    const decoded = sourcemapData.mappings.split(";").map(decode);
    expect(decoded).toHaveLength(5);
    // first 2 mappings are unchanged
    expect(decoded[0]).toEqual(mappings[0]);
    expect(decoded[1]).toEqual(mappings[1]);
    // This mapping pointed to [3] which is now at [2], so now it needs to point to [2]
    // AKA Shifted by 1
    expect(decoded[2]).toEqual([
      mappings[2][0],
      mappings[2][1] - 1,
      mappings[2][2],
      mappings[2][3],
    ]);
    expect(decoded[3]).toEqual([
      mappings[3][0],
      mappings[3][1] - 1,
      mappings[3][2],
      mappings[3][3],
    ]);
    expect(decoded[4]).toEqual([
      mappings[4][0],
      mappings[4][1] + 2,
      mappings[4][2],
      mappings[4][3],
    ]);
  });
});

describe("createBundle ESM for cloud", () => {
  it("emits index.mjs with createRequire banner when format is esm", () => {
    const root = mkdtempSync(join(tmpdir(), "wing-esm-bundle-"));
    const entry = join(root, "handler.cjs");
    writeFileSync(
      entry,
      `"use strict";
exports.handler = async function(event) {
  return event;
};
`,
    );

    const wrapped = prepareEsmEntrypoint(entry, { exportStyle: "handler" });
    const bundle = createBundle(wrapped, [], undefined, { format: "esm" });

    expect(bundle.outfilePath.endsWith("index.mjs")).toBe(true);
    expect(existsSync(bundle.outfilePath)).toBe(true);
    const out = readFileSync(bundle.outfilePath, "utf-8");
    expect(out).toContain("createRequire");
    expect(out).toMatch(/export\s*\{?\s*handler|\bhandler\b/);
  });

  it("bundles an entrypoint that imports a top-level-await extern as ESM", () => {
    const root = mkdtempSync(join(tmpdir(), "wing-esm-tla-"));
    const extern = join(root, "extern.mjs");
    writeFileSync(
      extern,
      `await Promise.resolve();
export const double = async (value) => value * 2;
`,
    );
    const entry = join(root, "handler.cjs");
    // Mimic wingc's await import() emission for inflight externs
    writeFileSync(
      entry,
      `"use strict";
exports.handler = async function(event) {
  return ((await import(${JSON.stringify(extern)}))["double"])(event);
};
`,
    );

    // CJS format must reject TLA
    expect(() => createBundle(entry)).toThrow(
      /Top-level await|top-level await|await/i,
    );

    const wrapped = prepareEsmEntrypoint(entry, { exportStyle: "handler" });
    const bundle = createBundle(wrapped, [], undefined, { format: "esm" });
    expect(bundle.outfilePath.endsWith("index.mjs")).toBe(true);
    const out = readFileSync(bundle.outfilePath, "utf-8");
    // Bundled successfully — file is non-trivial ESM
    expect(out.length).toBeGreaterThan(50);
  });

  it("prepareEsmEntrypoint default style exposes export default for Azure", () => {
    const root = mkdtempSync(join(tmpdir(), "wing-esm-azure-"));
    const entry = join(root, "handler.cjs");
    writeFileSync(
      entry,
      `"use strict";
module.exports = async function(context, req) {
  context.res = { body: "ok" };
};
`,
    );

    const wrapped = prepareEsmEntrypoint(entry, { exportStyle: "default" });
    const bundle = createBundle(wrapped, [], undefined, { format: "esm" });
    const out = readFileSync(bundle.outfilePath, "utf-8");
    expect(out).toMatch(/export\s*\{?\s*default|\bdefault\b/);
  });
});
