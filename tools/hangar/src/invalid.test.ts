import * as path from "path";
import { test } from "vitest";
import {
  invalidDocExampleWingFiles,
  invalidTestDir,
  invalidWingFiles,
  tmpDir,
} from "./paths";
import { runWingCommand } from "./utils";
import { parseMetaCommentFromPath } from "./meta_comment";

invalidWingFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    const platforms = ["sim"];
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

    expect(out.stdout).toMatchSnapshot();
    // when this env var is on, we allow the on-demand-panic-char (😱), right now panic writes to stderr (will be changed in the future)
    if (metaComment?.env?.WINGC_DEBUG_PANIC) {
      expect(out.stderr).toMatchSnapshot();
    }
  });
});

invalidDocExampleWingFiles.forEach((wingFile) => {
  test(wingFile, async ({ expect }) => {
    const platforms = ["sim"];
    const args = ["test"];

    const absoluteWingFile = path.join(invalidTestDir, wingFile);
    const relativeWingFile = path.relative(tmpDir, absoluteWingFile);

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

const invalidLibDir = path.join(invalidTestDir, "lib");
test("invalid compile directory", async ({ expect }) => {
  const platforms = ["sim"];
  const args = ["compile"];

  const out = await runWingCommand({
    cwd: tmpDir,
    wingFile: invalidLibDir,
    platforms,
    args,
    expectFailure: true,
  });

  expect(out.stderr).toMatchSnapshot();
});
