import { expect, test } from "vitest";
import * as path from "path";
import { validTestDir } from "./paths";
import { mkdtemp, writeFile, copyFile } from "fs/promises";
import { tmpdir } from "os";
import { runWingCommand } from "./utils";

test("warning is emitted when an unsupported package manager is used", async () => {
  const wingFile = "hello.test.w";
  const tmpDir = await mkdtemp(path.join(tmpdir(), "wing-test-"));
  await copyFile(
    path.join(validTestDir, wingFile),
    path.join(tmpDir, wingFile)
  );
  await writeFile(path.join(tmpDir, "yarn.lock"), "fake lock file");

  const out = await runWingCommand({
    cwd: tmpDir,
    wingFile: wingFile,
    platforms: ["sim"],
    args: ["compile"],
    expectFailure: false,
  });

  expect(out.stdout).toMatchSnapshot();
  expect(out.stderr).toMatchSnapshot();
});
