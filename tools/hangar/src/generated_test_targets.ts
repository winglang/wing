import { mkdir, readFile } from "fs-extra";
import { tmpDir, walkdir } from "./paths";
import { basename, join, relative } from "path";
import {
  createMarkdownSnapshot,
  runWingCommand,
  sanitize_json_paths,
} from "./utils";

export async function compileTest(sourceDir: string, wingFile: string) {
  const fileMap: Record<string, string> = {};
  const wingBasename = basename(wingFile);
  const args = ["compile", "--target", "tf-aws"];
  const targetDir = join(
    sourceDir,
    "target",
    `${wingBasename.replace(".w", "")}.tfaws`
  );
  const tf_json = join(targetDir, "main.tf.json");

  const filePath = join(sourceDir, wingBasename);
  await runWingCommand({
    cwd: sourceDir,
    wingFile: filePath,
    args,
    shouldSucceed: true,
  });

  const npx_tfJson = sanitize_json_paths(tf_json);

  fileMap["main.tf.json"] = JSON.stringify(npx_tfJson, null, 2);

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

  await createMarkdownSnapshot(fileMap, filePath, "compile", "tf-aws");
}

export async function testTest(sourceDir: string, wingFile: string) {
  const fileMap: Record<string, string> = {};
  const args = ["test", "-t", "sim"];
  const testDir = join(tmpDir, `${wingFile}_sim`);
  await mkdir(testDir, { recursive: true });

  const filePath = join(sourceDir, wingFile);
  const out = await runWingCommand({
    cwd: testDir,
    wingFile: filePath,
    args,
    shouldSucceed: true,
  });

  fileMap["stdout.log"] = out.stdout;

  await createMarkdownSnapshot(fileMap, filePath, "test", "sim");
}
