import * as path from "path";
import { test } from "vitest";
import { invalidTestDir, invalidWingFiles, tmpDir } from "./paths";
import { runWingCommand } from "./utils";
import { parseMetaCommentFromPath } from "./meta_comment";

invalidWingFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    const platforms = ["tf-aws"];
    const args = ["test"];

    const absoluteWingFile = path.join(invalidTestDir, wingFile);
    const relativeWingFile = path.relative(tmpDir, absoluteWingFile);

    const metaComment = parseMetaCommentFromPath(
      path.join(invalidTestDir, wingFile)
    );

    const out = await runWingCommand({
      cwd: tmpDir,
      wingFile: relativeWingFile,
      platforms,
      args,
      expectFailure: true,
      env: metaComment?.env,
    });

    const sanitize = (output: string) =>
      output
        // Remove absolute paths to wing files
        // .replaceAll(absoluteWingFile, "<")
        .replaceAll(/(?<=[\s"])(\/|\w:)\S+\/(.+)/g, "<ABSOLUTE_PATH>/$2")
        // Remove absolute paths to source code
        .replaceAll(/(src\/.+\.rs):\d+:\d+/g, "$1:LINE:COL")
        // Normalize line endings
        .replaceAll("\r\n", "\n");

    expect(sanitize(out.stdout)).toMatchSnapshot();
    // when this env var is on, we allow the on-demand-panic-char (😱), right now panic writes to stderr (will be changed in the future)
    if (metaComment?.env?.WINGC_DEBUG_PANIC) {
      expect(sanitize(out.stderr)).toMatchSnapshot();
    }
  });
});
