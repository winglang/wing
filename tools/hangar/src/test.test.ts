import * as fs from "fs-extra";
import * as path from "path";
import { test } from "vitest";
import { tmpDir, validTestDir, validWingFiles } from "./paths";
import { runWingCommand } from "./utils";

validWingFiles.forEach((wingFile) => {
  test.concurrent(wingFile, async ({ expect }) => {
    const args = ["test"];
    const testDir = path.join(tmpDir, `${wingFile}_sim`);
    fs.mkdirpSync(testDir);

    const out = await runWingCommand(
      testDir,
      path.join(validTestDir, wingFile),
      args,
      true
    );

    expect(out.stdout).toMatchSnapshot("stdout");

    // TODO snapshot .wsim contents
  });
});
