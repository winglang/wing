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
      .replaceAll("\r\n", "\n");

    expect(stderrSanitized).toMatchSnapshot("stderr");
  },
  {
    timeout: 1000 * 60 * 5,
  }
);
