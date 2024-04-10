import * as fs from "fs/promises";
import { tmpDir, walkdir } from "./paths";
import { basename, join, relative } from "path";
import {
  createMarkdownSnapshot,
  runWingCommand,
  sanitize_json_paths,
} from "./utils";

const TERRAFORM_JSON_FILENAME = "main.tf.json";

export async function compileTest(
  sourceDir: string,
  wingFile: string,
  env?: Record<string, string>,
  includeJavaScriptInSnapshots: boolean = true
) {
  const fileMap: Record<string, string> = {};
  const wingBasename = basename(wingFile);
  const platforms = ["tf-aws"];
  const args = ["compile"];
  const targetDir = join(
    sourceDir,
    "target",
    `${wingBasename.replace(".w", "")}.tfaws`
  );
  await fs.rm(targetDir, { recursive: true, force: true });

  await runWingCommand({
    cwd: sourceDir,
    platforms,
    wingFile,
    args,
    expectFailure: false,
    env,
  });

  const absoluteWingPath = join(sourceDir, wingBasename);
  if (isEntrypointFile(absoluteWingPath)) {
    const tf_json = join(targetDir, TERRAFORM_JSON_FILENAME);
    const npx_tfJson = sanitize_json_paths(tf_json);
    fileMap[TERRAFORM_JSON_FILENAME] = JSON.stringify(npx_tfJson, null, 2);
  }

  // which files to include from the .wing directory
  const dotWing = join(targetDir, ".wing");
  const include = ["preflight.", "inflight.", "extern/", "proc", ".Struct.js"];

  for await (const dotFile of walkdir(dotWing)) {
    if (dotFile.endsWith(".map")) {
      // exclude sourcemaps
      continue;
    }
    const subpath = relative(dotWing, dotFile).replace(/\\/g, "/");
    if (!include.find((f) => subpath.includes(f))) {
      continue;
    }
    if (subpath.endsWith(".js") && !includeJavaScriptInSnapshots) {
      continue;
    }
    let fileContents = await fs.readFile(dotFile, "utf8");

    // ensure no absolute requires are included in the snapshot
    if (/require\("(\/|\w:).*\/(.+)"\)/g.test(fileContents)) {
      throw new Error(`Found absolute path in ${dotFile}`);
    }

    fileMap[subpath] = fileContents;
  }

  await createMarkdownSnapshot(fileMap, absoluteWingPath, "compile", "tf-aws");
}

export async function testTest(
  sourceDir: string,
  wingFile: string,
  env?: Record<string, string>
) {
  const fileMap: Record<string, string> = {};
  const platforms = ["sim"];
  const args = ["test", "--no-stream"];
  const testDir = join(tmpDir, `${wingFile}_sim`);

  // only entrypoint files have tests (for now)
  if (!isEntrypointFile(wingFile)) {
    return;
  }

  await fs.mkdir(testDir, { recursive: true });

  const absoluteWingPath = join(sourceDir, wingFile);
  const out = await runWingCommand({
    cwd: sourceDir,
    platforms,
    wingFile,
    args,
    expectFailure: false,
    env,
  });

  if (out.stderr) fileMap["stderr.log"] = out.stderr;
  if (out.stdout) fileMap["stdout.log"] = out.stdout;

  await createMarkdownSnapshot(fileMap, absoluteWingPath, "test", "sim");
}

function isEntrypointFile(path: string) {
  return (
    path.endsWith(".main.w") ||
    path.endsWith(".test.w") ||
    path.endsWith("/main.w") ||
    path.endsWith("\\main.w") ||
    path === "main.w"
  );
}
