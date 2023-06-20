import * as path from "path";
import { test } from "vitest";
import { invalidTestDir, invalidWingFiles, tmpDir } from "./paths";
import { runWingCommand } from "./utils";
import { parseMetaCommentFromPath } from "./meta_comment";

invalidWingFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    const args = ["test", "-t", "sim"];

    const relativeWingFile = path.relative(
      tmpDir,
      path.join(invalidTestDir, wingFile)
    );

    const metaComment = parseMetaCommentFromPath(
      path.join(invalidTestDir, wingFile)
    );

    const out = await runWingCommand({
      cwd: tmpDir,
      wingFile: relativeWingFile,
      args,
      expectStdErr: false,
      env: metaComment?.env,
    });

    const sanitize = (output: string) =>
      output
        // Remove absolute paths to wing files
        .replaceAll(relativeWingFile, relativeWingFile.replaceAll("\\", "/"))
        // Remove absolute paths to source code
        .replaceAll(/(libs\/wingc.+\.rs):\d+:\d+/g, "$1:LINE:COL")
        // Normalize line endings
        .replaceAll("\r\n", "\n");

    expect(sanitize(out.stdout)).toMatchSnapshot();
    // when this env var is on, we allow the on-demand-panic-char (😱), right now panic writes to stderr (will be changed in the future)
    if (metaComment?.env?.WINGC_DEBUG_PANIC) {
      expect(sanitize(out.stderr)).toMatchSnapshot();
    }
  });
});
