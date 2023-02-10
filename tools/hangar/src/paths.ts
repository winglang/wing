import * as path from "path";
import * as fs from "fs-extra";

export const repoRoot = path.resolve(__dirname, "../../..");
export const testDir = path.join(repoRoot, "examples/tests");
export const validTestDir = path.join(testDir, "valid");
export const invalidTestDir = path.join(testDir, "invalid");
export const hangarDir = path.join(repoRoot, "tools/hangar");
export const tmpDir = path.join(hangarDir, "tmp");
export const npmCacheDir = path.join(tmpDir, ".npm");

export const npmBin = path.join(hangarDir, "node_modules/.bin/npm");
export const wingBin = path.join(tmpDir, "node_modules/.bin/wing");

export const targetWingSpec =
  process.env.HANGAR_WING_SPEC ?? `file:${path.join(repoRoot, `apps/wing`)}`;
export const targetWingSDKSpec =
  process.env.HANGAR_WINGSDK_SPEC ??
  `file:${path.join(repoRoot, `libs/wingsdk`)}`;

export const validWingFiles = fs
  .readdirSync(validTestDir)
  .filter((f) => f.endsWith(".w"));
export const invalidWingFiles = fs
  .readdirSync(invalidTestDir)
  .filter((f) => f.endsWith(".w"));
