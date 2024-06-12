import * as path from "path";
import { test } from "vitest";
import { errorTestDir, errorWingFiles, tmpDir } from "./paths";
import { runWingCommand } from "./utils";
import { parseMetaCommentFromPath, shouldSkipTest } from "./meta_comment";

errorWingFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    const platforms = ["sim"];
    const args = ["test"];

    const relativeWingFile = path.relative(
      tmpDir,
      path.join(errorTestDir, wingFile)
    );

    const metaComment = parseMetaCommentFromPath(wingFile);
    if (shouldSkipTest(metaComment)) {
      return;
    }

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
