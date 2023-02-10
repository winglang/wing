import * as fs from "fs-extra";
import * as path from "path";
import { expect, test } from "vitest";
import { invalidTestDir, invalidWingFiles, tmpDir } from "./paths";
import { runWingCommand } from "./utils";

test.each(invalidWingFiles)(
  "wing test %s (--target sim) - invalid",
  async (wingFile) => {
    const args = ["test"];
    const testDir = path.join(tmpDir, `invalid_${wingFile}_sim`);
    fs.mkdirpSync(testDir);

    const relativeWingFile = path.relative(
      testDir,
      path.join(invalidTestDir, wingFile)
    );

    const out = await runWingCommand(testDir, relativeWingFile, args, false);

    const stderr = out.stderr;

    const stderrSanitized = stderr
      // Remove absolute paths
      .replaceAll(relativeWingFile, relativeWingFile.replaceAll("\\", "/"))
      // Normalize line endings
      .replaceAll("\r\n", "\n")
      // For the error about a missing semicolon, remove the char number
      // because it's usually the last char of the line which is
      // different due to windows line endings (`\r\n`)
      .replace(/:\d+ \| ';' expected./g, ":0 | ';' expected.");

    expect(stderrSanitized).toMatchSnapshot("stderr");
  },
  {
    timeout: 1000 * 30,
  }
);
