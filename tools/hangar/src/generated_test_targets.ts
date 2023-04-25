import { mkdir, readFile } from "fs-extra";
import { tmpDir, validTestDir, walkdir } from "./paths";
import { basename, join, relative } from "path";
import {
  createMarkdownSnapshot,
  runWingCommand,
  sanitize_json_paths,
} from "./utils";

export async function compileTest(wingFile: string) {
  const fileMap: Record<string, string> = {};
  const wingBasename = basename(wingFile);
  const args = ["compile", "--target", "tf-aws"];
  const targetDir = join(
    validTestDir,
    "target",
    `${wingBasename.replace(".w", "")}.tfaws`
  );
  
  await runWingCommand({
    cwd: validTestDir,
    wingFile: join(validTestDir, wingBasename),
    args,
    shouldSucceed: true,
  });
  
  const tf_json = sanitize_json_paths(join(targetDir, "main.tf.json"));
  fileMap["main.tf.json"] = JSON.stringify(tf_json, null, 2);

  const tree_json = sanitize_json_paths(join(targetDir, "tree.json"));
  fileMap["tree.json"] = JSON.stringify(tree_json, null, 2);

  // which files to include from the .wing directory
  const dotWing = join(targetDir, ".wing");
  const include = ["preflight.js", "clients/", "extern/", "proc"];

  for await (const dotFile of walkdir(dotWing)) {
    const subpath = relative(dotWing, dotFile).replace(/\\/g, "/");
    if (!include.find((f) => subpath.startsWith(f))) {
      continue;
    }
    let fileContents = await readFile(dotFile, "utf8");

    // remove requires with absolute paths
    fileContents = fileContents.replace(
      /require\("(\/|\w:).*\/(.+)"\)/g,
      'require("<ABSOLUTE_PATH>/$2")'
    );

    fileMap[subpath] = fileContents;
  }

  await createMarkdownSnapshot(fileMap, wingFile, "compile", "tf-aws");
}

export async function testTest(wingFile: string) {
  const fileMap: Record<string, string> = {};
  const args = ["test", "-t", "sim"];
  const testDir = join(tmpDir, `${wingFile}_sim`);
  await mkdir(testDir, { recursive: true });

  const out = await runWingCommand({
    cwd: testDir,
    wingFile: join(validTestDir, wingFile),
    args,
    shouldSucceed: true,
  });

  fileMap["stdout.log"] = out.stdout;

  await createMarkdownSnapshot(fileMap, wingFile, "test", "sim");
}
