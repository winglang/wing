import * as path from "path";
import { test } from "vitest";
import { errorTestDir, errorWingFiles, tmpDir } from "./paths";
import { runWingCommand } from "./utils";

errorWingFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    const platforms = ["tf-aws"];
    const args = ["test"];

    const relativeWingFile = path.relative(
      tmpDir,
      path.join(errorTestDir, wingFile)
    );

    const out = await runWingCommand({
      cwd: tmpDir,
      wingFile: relativeWingFile,
      platforms,
      args,
      expectFailure: true,
    });

    const stdout = out.stdout;

    const stdoutSanitized = stdout
      // Remove absolute paths
      // Normalize paths
      .replaceAll("\\", "/")
      // Normalize line endings
      .replaceAll("\r\n", "\n")
      // Remove random numbers from generated test artifact folder
      // e.g. "{...}.wsim.927822.tmp/{...}" => "{...}.wsim.[REDACTED].tmp/{...}"
      .replaceAll(/\.wsim\.\d+\.tmp/g, ".wsim.[REDACTED].tmp");

    expect(stdoutSanitized).toMatchSnapshot();
  });
});
