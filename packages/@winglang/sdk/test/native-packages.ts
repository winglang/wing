import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

/**
 * Creates a fake project directory with a `node_modules` containing packages
 * that esbuild can't bundle (or can bundle, but that break once bundled), to
 * reproduce https://github.com/winglang/wing/issues/4965 and
 * https://github.com/winglang/wing/issues/2084 without installing real
 * native packages.
 *
 * @returns the project directory
 */
export function createProjectWithNativePackages(): string {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "wingsdk-native.")));

  const pkg = (name: string, files: Record<string, string>, extra = {}) => {
    const dir = join(root, "node_modules", name);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({ name, version: "1.0.0", main: "index.js", ...extra }),
    );
    for (const [file, contents] of Object.entries(files)) {
      writeFileSync(join(dir, file), contents);
    }
  };

  // Like `fsevents` / `lightningcss` users: loads a native addon and an
  // optional dependency that isn't installed. esbuild fails to bundle it.
  pkg("fake-native", {
    "index.js": `
let addon = null;
if (process.env.FAKE_NATIVE_USE_ADDON) {
  addon = require("./binding.node");
}
if (process.env.FAKE_NATIVE_USE_OPTIONAL) {
  require("optional-dep-that-is-not-installed");
}
exports.hello = (name) => "hello " + name + " from " + require("path").basename(__dirname);
`,
  });

  // Like `ngrok`: bundles fine, but relies on `__dirname` at runtime (which
  // doesn't exist in an ESM bundle).
  pkg("dirname-pkg", {
    "index.js": `exports.whereAmI = () => require("path").basename(__dirname);`,
  });

  // A CommonJS package compiled from ESM (uses the `__esModule` marker), for
  // which bundled and native default imports differ.
  pkg("esmodule-flag-cjs", {
    "index.js": `
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function greet() { return "default export"; };
`,
  });

  // A plain ES module package.
  pkg(
    "esm-pkg",
    { "index.js": `export const esmValue = () => "esm value";` },
    { type: "module" },
  );

  return root;
}
