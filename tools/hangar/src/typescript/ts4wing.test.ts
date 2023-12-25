import { describe, test } from "vitest";
import * as path from "path";
import { tmpDir, examplesDir, tmpNodeModulesDir } from "../paths";
import { runWingCommand } from "../utils";
import { cp, symlink } from "fs/promises"

describe("ts-fixture", async () => {
  const originalFixtureDir = path.join(examplesDir, "ts-fixture");
  const newFixtureDir = path.join(tmpDir, "ts-fixture");

  // make a temp copy of ts-fixture in tmpDir, excluding node_modules
  await cp(originalFixtureDir, newFixtureDir, { 
    recursive: true,
    filter: (src) => !src.endsWith("node_modules")
  });

  // symlink the tmp node_modules to tmpNodeModulesDir (ensures we have the same node_modules as the rest of the tests)
  await symlink(tmpNodeModulesDir, path.join(newFixtureDir, "node_modules"), "dir");

  const tsFile = path.join(newFixtureDir, "src", "main.ts");

  test("compile", async () => {
    await runWingCommand({
      cwd: tmpDir,
      wingFile: tsFile,
      args: ["compile"],
      expectFailure: false,
    });
  });

  test("test", async () => {
    await runWingCommand({
      cwd: tmpDir,
      wingFile: tsFile,
      args: ["test"],
      expectFailure: false,
    });
  });
});
