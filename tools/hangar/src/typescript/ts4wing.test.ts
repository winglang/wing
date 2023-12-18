import { describe, test } from "vitest";
import * as path from "path";
import { tmpDir, examplesDir } from "../paths";
import { runWingCommand } from "../utils";

describe("ts4wing", () => {
  const fixtureDir = path.join(examplesDir, "ts-fixture");
  const tsFile = path.join(fixtureDir, "src", "main.ts");

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
