import { mkdir, readFile } from "fs-extra";
import { tmpDir, validTestDir, walkdir } from "./paths";
import { basename, join, sep } from "path";
import { runWingCommand, sanitize_json_paths } from "./utils";

export async function compileTest(expect: Vi.ExpectStatic, wingFile: string) {
  const wingBasename = basename(wingFile);
  const args = ["compile", "--target", "tf-aws"];
  const testDir = join(tmpDir, `${wingBasename}_cdktf`);
  const targetDir = join(testDir, "target", `${wingBasename.replace(".w", "")}.tfaws`);
  const tf_json = join(targetDir, "main.tf.json");

  await mkdir(testDir);

  await runWingCommand(testDir, join(validTestDir, wingBasename), args, true);

  const npx_tfJson = sanitize_json_paths(tf_json);

  expect(npx_tfJson).toMatchSnapshot("main.tf.json");

  const dotWing = join(targetDir, ".wing");
  for await (const dotFile of walkdir(dotWing)) {
    expect(await readFile(dotFile, "utf8")).toMatchSnapshot(dotFile.replace(dotWing + sep, ""));
  }
}

export async function testTest(expect: Vi.ExpectStatic, wingFile: string) {
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