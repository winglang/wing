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

    const metaComment = parseMetaCommentFromPath(path.join(invalidTestDir, wingFile));

    const out = await runWingCommand({
      cwd: tmpDir,
      wingFile: relativeWingFile,
      args,
      shouldSucceed: false,
      env: metaComment?.env,
    });

    const stderr = out.stderr;

    const stderrSanitized = stderr
      // Remove absolute paths
      .replaceAll(relativeWingFile, relativeWingFile.replaceAll("\\", "/"))
      // Normalize line endings
      .replaceAll("\r\n", "\n");

    expect(stderrSanitized).toMatchSnapshot("stderr");
  });
});
