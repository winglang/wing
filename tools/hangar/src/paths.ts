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

export const targetWingTGZ =
  process.env.HANGAR_WING_TGZ ??
  path.join(repoRoot, `apps/wing/winglang-0.0.0.tgz`);
export const targetWingSDKTGZ =
  process.env.HANGAR_WINGSDK_TGZ ??
  path.join(repoRoot, `libs/wingsdk/winglang-sdk-0.0.0.tgz`);

export const validWingFiles = fs
  .readdirSync(validTestDir)
  .filter((f) => f.endsWith(".w"));
export const invalidWingFiles = fs
  .readdirSync(invalidTestDir)
  .filter((f) => f.endsWith(".w"));
