import { mkdirpSync, readFileSync } from "fs-extra";
import { tmpDir, validTestDir, walkdir } from "./paths";
import { basename, join } from "path";
import { runWingCommand, sanitize_json_paths } from "./utils";
import { expect } from "vitest";

export async function compileTest(wingFile: string) {
  const wingBasename = basename(wingFile);
  const args = ["compile", "--target", "tf-aws"];
  const testDir = join(tmpDir, `${wingBasename}_cdktf`);
  const targetDir = join(testDir, "target", `${wingBasename.replace(".w", "")}.tfaws`);
  const tf_json = join(targetDir, "main.tf.json");

  mkdirpSync(testDir);

  await runWingCommand(testDir, join(validTestDir, wingBasename), args, true);

  const npx_tfJson = sanitize_json_paths(tf_json);

  expect(npx_tfJson).toMatchSnapshot("main.tf.json");

  for await (const dotFile of walkdir(join(targetDir, ".wing"))) {
    expect(readFileSync(dotFile, "utf8")).toMatchSnapshot(basename(dotFile));
  }
}

export async function testTest(wingFile: string) {
  const args = ["test"];
  const testDir = join(tmpDir, `${wingFile}_sim`);
  mkdirpSync(testDir);

  const out = await runWingCommand(
    testDir,
    join(validTestDir, wingFile),
    args,
    true
  );

  expect(out.stdout).toMatchSnapshot("stdout");
}