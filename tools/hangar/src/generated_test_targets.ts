import { mkdir, readFile } from "fs-extra";
import { tmpDir, validTestDir, walkdir } from "./paths";
import { basename, join, relative } from "path";
import { runWingCommand, sanitize_json_paths } from "./utils";

export async function compileTest(expect: Vi.ExpectStatic, wingFile: string) {
  const wingBasename = basename(wingFile);
  const args = ["compile", "--target", "tf-aws"];
  const targetDir = join(
    validTestDir,
    "target",
    `${wingBasename.replace(".w", "")}.tfaws`
  );
  const tf_json = join(targetDir, "main.tf.json");

  await runWingCommand({
    cwd: validTestDir, 
    wingFile: join(validTestDir, wingBasename), 
    args, 
    shouldSucceed: true
  });

  const npx_tfJson = sanitize_json_paths(tf_json);

  expect(npx_tfJson).toMatchSnapshot("main.tf.json");

  // which files to include from the .wing directory
  const dotWing = join(targetDir, ".wing");
  const include = [
    "preflight.js",
    "clients/",
    "extern/",
    "proc.",
  ];

  for await (const dotFile of walkdir(dotWing)) {
    const subpath = relative(dotWing, dotFile).replace(/\\/g, "/");
    if (!include.find((f) => subpath.startsWith(f))) {
      continue;
    }
    let fileContents = await readFile(dotFile, "utf8");

    // remove requires with absolute paths
    fileContents = fileContents.replace(
      /require\("(\/|\w:).*\/(.+)"\)/g,
      'require("<ABSOLUTE_PATH>/$2"'
    );
    
    expect(fileContents).toMatchSnapshot(subpath);
  }
}

export async function testTest(expect: Vi.ExpectStatic, wingFile: string) {
  const args = ["test", "-t", "sim"];
  const testDir = join(tmpDir, `${wingFile}_sim`);
  await mkdir(testDir, { recursive: true });

  const out = await runWingCommand({
    cwd: testDir,
    wingFile: join(validTestDir, wingFile),
    args,
    shouldSucceed: true
  });

  expect(out.stdout).toMatchSnapshot("stdout");
}
