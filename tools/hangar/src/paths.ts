import * as path from "path";
import * as fs from "fs-extra";

export const repoRoot = path.resolve(__dirname, "../../..");
export const testDir = path.join(repoRoot, "examples/tests");
export const pluginsDir = path.join(repoRoot, "examples/plugins");
export const validTestDir = path.join(testDir, "valid");
export const sdkTests = path.join(testDir, "sdk_tests");
export const invalidTestDir = path.join(testDir, "invalid");
export const benchmarksTestDir = path.join(validTestDir, "benchmarks");
export const errorTestDir = path.join(testDir, "error");
export const hangarDir = path.join(repoRoot, "tools/hangar");
export const tmpDir = path.join(hangarDir, "tmp");
export const npmCacheDir = path.join(tmpDir, ".npm");

export const npmBin = path.join(hangarDir, "node_modules/.bin/npm");
export const scriptsDir = path.join(repoRoot, "scripts");
export const wingBin = path.join(scriptsDir, "_winghangar");
export const wingSetupScript = path.join(scriptsDir, "setup_wing.mjs");

export const snapshotDir = path.join(hangarDir, "__snapshots__");

export const targetWingSpec =
  process.env.HANGAR_WING_SPEC ?? `file:${path.join(repoRoot, `apps/wing`)}`;
export const targetWingSDKSpec =
  process.env.HANGAR_WINGSDK_SPEC ??
  `file:${path.join(repoRoot, `libs/wingsdk`)}`;

export const validWingFiles = fs
  .readdirSync(validTestDir)
  .filter((f) => f.endsWith(".w"))
  .filter((f) => !f.endsWith("skip.w"));
export const invalidWingFiles = fs
  .readdirSync(invalidTestDir)
  .filter((f) => f.endsWith(".w"))
  .filter((f) => !f.endsWith("skip.w"));
export const errorWingFiles = fs
  .readdirSync(errorTestDir)
  .filter((f) => f.endsWith(".w"))
  .filter((f) => !f.endsWith("skip.w"));

/** Recursively walk a directory, yielding each file path. */
export async function* walkdir(dir: string): AsyncGenerator<string> {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walkdir(entry);
    else if (d.isFile()) yield entry;
  }
}
