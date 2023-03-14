import * as path from "path";
import { test } from "vitest";
import { errorTestDir, errorWingFiles, tmpDir } from "./paths";
import { runWingCommand } from "./utils";

errorWingFiles.forEach((wingFile) => {
  test.concurrent(wingFile, async ({ expect }) => {
    const args = ["test"];

    const relativeWingFile = path.relative(
      tmpDir,
      path.join(errorTestDir, wingFile)
    );

    const out = await runWingCommand(tmpDir, relativeWingFile, args, false);

    const stderr = out.stderr;

    const stderrSanitized = stderr
      // Remove absolute paths
      .replaceAll(relativeWingFile, relativeWingFile.replaceAll("\\", "/"))
      // Normalize line endings
      .replaceAll("\r\n", "\n");

    expect(stderrSanitized).toMatchSnapshot("stderr");
  });
});
