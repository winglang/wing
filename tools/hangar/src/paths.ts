import * as path from "path";
import * as fs from "fs";

export const repoRoot = path.resolve(__dirname, "../../..");
export const testDir = path.join(repoRoot, "tests");
export const validTestDir = path.join(testDir, "valid");
export const appWithParamsDir = path.join(validTestDir, "parameters");
export const sdkTestsDir = path.join(testDir, "sdk_tests");
export const compatibilityTestsDir = path.join(testDir, "sdk_tests/counter");
export const platformsDir = path.join(validTestDir, "platforms");
export const sdkTests = path.join(testDir, "sdk_tests");
export const invalidTestDir = path.join(testDir, "invalid");
export const benchmarksTestDir = path.join(validTestDir, "benchmarks");
export const errorTestDir = path.join(testDir, "error");
export const hangarDir = path.join(repoRoot, "tools", "hangar");
export const resultsDir = path.join(hangarDir, "results");
export const tmpDir = path.join(hangarDir, "tmp");
export const npmCacheDir = path.join(tmpDir, ".npm");
export const tmpNodeModulesDir = path.join(tmpDir, "node_modules");
export const wingSdkDir = path.join(tmpNodeModulesDir, "@winglang/sdk");
export const docsRoot = path.join(repoRoot, "docs");
export const docsExamplesDir = path.join(testDir, "doc_examples");
export const invalidDocExamplesDir = path.join(docsExamplesDir, "invalid");
export const validDocExamplesDir = path.join(docsExamplesDir, "valid");

export const npmBin = path.join(hangarDir, "node_modules/.bin/npm");
export const wingBin = path.join(tmpNodeModulesDir, ".bin/wing");

export const snapshotDir = path.join(hangarDir, "__snapshots__");

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

export const compatibilityTestFiles = fs
  .readdirSync(compatibilityTestsDir)
  .filter((f) => f.endsWith(".w"))
  .filter((f) => !f.endsWith("skip.w"));

export const invalidDocExampleWingFiles = fs
  .readdirSync(invalidDocExamplesDir)
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
