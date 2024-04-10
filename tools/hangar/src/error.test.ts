import * as path from "path";
import { test } from "vitest";
import { errorTestDir, errorWingFiles, tmpDir } from "./paths";
import { runWingCommand } from "./utils";

errorWingFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    const platforms = ["sim"];
    const args = ["test", "--no-stream"];

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

    expect(out.stdout).toMatchSnapshot();
  });
});
