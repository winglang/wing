import * as fs from "fs-extra";
import * as path from "path";
import { describe, test } from "vitest";
import { invalidWingFiles, tmpDir } from "./paths";
import { runWingCommand } from "./utils";

describe.each(invalidWingFiles)("%s", (wingFile) => {
  test.concurrent("wing test (--target sim) - invalid", async ({ expect }) => {
    const args = ["test"];
    const testDir = path.join(tmpDir, `invalid_${path.basename(wingFile)}_sim`);
    fs.mkdirpSync(testDir);

    const out = await runWingCommand(testDir, wingFile, args, false);

    const stderr = out.stderr;

    const stderrSanitized = stderr
      // Remove absolute paths
      .replaceAll(wingFile, wingFile.replaceAll("\\", "/"))
      // Normalize line endings
      .replaceAll("\r\n", "\n");

    expect(stderrSanitized).toMatchSnapshot("stderr");
  });
});
