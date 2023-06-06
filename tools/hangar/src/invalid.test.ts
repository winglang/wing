import * as path from "path";
import { test } from "vitest";
import { invalidTestDir, invalidWingFiles, tmpDir } from "./paths";
import { runWingCommand } from "./utils";

invalidWingFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    const args = ["test", "-t", "sim"];

    const relativeWingFile = path.relative(
      tmpDir,
      path.join(invalidTestDir, wingFile)
    );

    const out = await runWingCommand({
      cwd: tmpDir,
      wingFile: relativeWingFile,
      args,
      shouldSucceed: true,
    });

    const stdout = out.stdout;

    const stdoutSanitized = stdout
      // Remove absolute paths
      .replaceAll(relativeWingFile, relativeWingFile.replaceAll("\\", "/"))
      // Normalize line endings
      .replaceAll("\r\n", "\n");

    expect(stdoutSanitized).toMatchSnapshot();
  });
});
