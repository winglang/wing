import * as path from "path";
import { test } from "vitest";
import { errorTestDir, errorWingFiles, tmpDir } from "./paths";
import { runWingCommand } from "./utils";

errorWingFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    const args = ["test", "-t", "sim"];

    const relativeWingFile = path.relative(
      tmpDir,
      path.join(errorTestDir, wingFile)
    );

    const out = await runWingCommand({
      cwd: tmpDir,
      wingFile: relativeWingFile,
      args,
      shouldSucceed: false,
    });

    const stderr = out.stderr;

    const stderrSanitized = stderr
      // Remove absolute paths
      .replaceAll(relativeWingFile, relativeWingFile.replaceAll("\\", "/"))
      // Normalize line endings
      .replaceAll("\r\n", "\n")
      // Remove random numbers from generated test artifact folder
      // e.g. "{...}.wsim.927822.tmp/{...}" => "{...}.wsim.XXXXXX.tmp/{...}"
      .replaceAll(/\.wsim\.\d+\.tmp/g, ".wsim.XXXXXX.tmp");

    expect(stderrSanitized).toMatchSnapshot("stderr");
  });
});
