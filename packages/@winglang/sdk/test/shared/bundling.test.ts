import { execFileSync } from "child_process";
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
  packageNameOf,
  prepareEsmEntrypoint,
} from "../../src/shared/bundling";
import { createProjectWithNativePackages } from "../native-packages";

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

describe("createBundle ESM", () => {
  it("emits index.mjs with createRequire banner by default", () => {
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
    const bundle = createBundle(wrapped);

    expect(bundle.outfilePath.endsWith("index.mjs")).toBe(true);
    expect(existsSync(bundle.outfilePath)).toBe(true);
    const out = readFileSync(bundle.outfilePath, "utf-8");
    expect(out).toContain("createRequire");
    expect(out).toMatch(/export\s*\{?\s*handler|\bhandler\b/);
  });

  it("bundles an entrypoint that imports a top-level-await extern", () => {
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

    const wrapped = prepareEsmEntrypoint(entry, { exportStyle: "handler" });
    const bundle = createBundle(wrapped);
    expect(bundle.outfilePath.endsWith("index.mjs")).toBe(true);
    const out = readFileSync(bundle.outfilePath, "utf-8");
    // Bundled successfully — file is non-trivial ESM
    expect(out.length).toBeGreaterThan(50);
    expect(out).toContain("createRequire");
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
    const bundle = createBundle(wrapped);
    const out = readFileSync(bundle.outfilePath, "utf-8");
    expect(out).toMatch(/export\s*\{?\s*default|\bdefault\b/);
  });
});

describe("packageNameOf", () => {
  it.each([
    ["vite", "vite"],
    ["vite/client", "vite"],
    ["@aws-sdk/client-s3", "@aws-sdk/client-s3"],
    ["@aws-sdk/client-s3/dist/foo.js", "@aws-sdk/client-s3"],
    ["lodash.merge", "lodash.merge"],
  ])("%s -> %s", (specifier, name) => {
    expect(packageNameOf(specifier)).toBe(name);
  });

  it.each([
    "./foo",
    "../foo",
    "/abs/foo",
    "#internal",
    "node:fs",
    "fs",
    "fs/promises",
    "file:///foo.js",
    "@scope",
  ])("%s is not a package", (specifier) => {
    expect(packageNameOf(specifier)).toBeUndefined();
  });
});

// https://github.com/winglang/wing/issues/4965
describe("createBundle externalizeInstalledPackages", () => {
  const run = (bundlePath: string) =>
    execFileSync(process.execPath, [bundlePath], { encoding: "utf-8" }).trim();

  it("fails to bundle packages esbuild can't bundle by default", () => {
    const root = createProjectWithNativePackages();
    const entry = join(root, "entry.cjs");
    writeFileSync(entry, `console.log(require("fake-native").hello("wing"));`);

    expect(() => createBundle(entry)).toThrow(
      /Could not resolve "\.\/binding\.node"/,
    );
  });

  it("loads installed packages natively instead of bundling them", () => {
    const root = createProjectWithNativePackages();
    const entry = join(root, "entry.cjs");
    writeFileSync(
      entry,
      `
const { hello } = require("fake-native");
const { whereAmI } = require("dirname-pkg");
console.log(hello("wing") + " " + whereAmI());
`,
    );

    const bundle = createBundle(entry, [], undefined, {
      externalizeInstalledPackages: true,
    });

    const code = readFileSync(bundle.outfilePath, "utf-8");
    expect(code).toContain('__require("fake-native")');
    expect(code).toContain('__require("dirname-pkg")');
    expect(code).not.toContain("binding.node");
    expect(bundle.inputFiles.some((f) => f.includes("node_modules"))).toBe(
      false,
    );

    // `__dirname` works because the package isn't bundled
    expect(run(bundle.outfilePath)).toBe(
      "hello wing from fake-native dirname-pkg",
    );
  });

  it("supports ESM imports of installed packages", () => {
    const root = createProjectWithNativePackages();
    writeFileSync(
      join(root, "extern.mjs"),
      `
import { hello } from "fake-native";
import { esmValue } from "esm-pkg";
export const value = () => hello("esm") + " " + esmValue();
`,
    );
    const entry = join(root, "entry.cjs");
    writeFileSync(entry, `console.log(require("./extern.mjs").value());`);

    const bundle = createBundle(entry, [], undefined, {
      externalizeInstalledPackages: true,
    });

    const code = readFileSync(bundle.outfilePath, "utf-8");
    expect(code).toMatch(/from "fake-native"/);
    expect(code).toMatch(/from "esm-pkg"/);
    expect(run(bundle.outfilePath)).toBe(
      "hello esm from fake-native esm value",
    );
  });

  it("keeps bundling packages whose default import would change", () => {
    const root = createProjectWithNativePackages();
    // .ts files get Babel-style interop from esbuild: the default import is
    // `exports.default`, while Node's native ESM loader would return
    // `module.exports`. Keep bundling to preserve behavior.
    writeFileSync(
      join(root, "extern.ts"),
      `
import greet from "esmodule-flag-cjs";
export const value = (): string => greet();
`,
    );
    const entry = join(root, "entry.cjs");
    writeFileSync(entry, `console.log(require("./extern.ts").value());`);

    const bundle = createBundle(entry, [], undefined, {
      externalizeInstalledPackages: true,
    });

    const code = readFileSync(bundle.outfilePath, "utf-8");
    expect(code).not.toMatch(/from "esmodule-flag-cjs"/);
    expect(code).toContain("default export");
    expect(run(bundle.outfilePath)).toBe("default export");
  });

  it("keeps bundling packages that can't be resolved from the output directory", () => {
    const root = createProjectWithNativePackages();
    const entry = join(root, "entry.cjs");
    writeFileSync(entry, `console.log(require("dirname-pkg").whereAmI());`);

    // the output directory is outside of the project, so `node_modules` isn't
    // reachable from it at runtime
    const outdir = mkdtempSync(join(tmpdir(), "wingsdk-outdir."));
    const bundle = createBundle(entry, [], outdir, {
      externalizeInstalledPackages: true,
    });

    const code = readFileSync(bundle.outfilePath, "utf-8");
    expect(code).not.toContain('__require("dirname-pkg")');
    expect(code).toContain("whereAmI");
  });

  it("can be disabled with WING_SIM_BUNDLE_ALL_PACKAGES", () => {
    const root = createProjectWithNativePackages();
    const entry = join(root, "entry.cjs");
    writeFileSync(entry, `console.log(require("dirname-pkg").whereAmI());`);

    process.env.WING_SIM_BUNDLE_ALL_PACKAGES = "1";
    try {
      const bundle = createBundle(entry, [], undefined, {
        externalizeInstalledPackages: true,
      });
      const code = readFileSync(bundle.outfilePath, "utf-8");
      expect(code).not.toContain('__require("dirname-pkg")');
    } finally {
      delete process.env.WING_SIM_BUNDLE_ALL_PACKAGES;
    }
  });
});
