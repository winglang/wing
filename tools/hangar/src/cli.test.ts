import { test, expect, beforeAll } from "vitest";
import { posix as path, basename } from "path";
import { execa } from "execa";
import * as fs from "fs-extra";
import * as walk from "walkdir";

const repoRoot = path.resolve(__dirname, "../../..");
const testDir = path.join(repoRoot, "examples/tests");
const validTestDir = path.join(testDir, "valid");
const hangarDir = path.join(repoRoot, "tools/hangar");
const tmpDir = path.join(hangarDir, "tmp");
const npmCacheDir = path.join(tmpDir, ".npm");

const npmBin = path.join(hangarDir, "node_modules/.bin/npm");
const wingBin = path.join(tmpDir, "node_modules/.bin/wing");

const targetWingTGZ =
  process.env.HANGAR_WING_TGZ ??
  path.join(repoRoot, `apps/wing/winglang-0.0.0.tgz`);
const targetWingSDKTGZ =
  process.env.HANGAR_WINGSDK_TGZ ??
  path.join(repoRoot, `libs/wingsdk/winglang-sdk-0.0.0.tgz`);

const basePackageJson = {
  name: "hangar-test",
  description: "",
  version: "0.0.0",
  dependencies: {
    "@winglang/sdk": `file:${targetWingSDKTGZ}`,
    winglang: `file:${targetWingTGZ}`,
  },
  devDependencies: {},
};

const validWingFiles = fs
  .readdirSync(validTestDir)
  //TODO DEBUG PLS CHANGE BACK
  .filter((f) => f.endsWith("test_bucket.w"));

const shellEnv = {
  ...process.env,
  npm_config_audit: "false",
  npm_config_progress: "false",
  npm_config_yes: "true",
  npm_config_cache: npmCacheDir,
};

beforeAll(async () => {
  Object.assign(process.env, shellEnv);

  // reset tmpDir
  fs.removeSync(tmpDir);
  fs.mkdirpSync(tmpDir);
  fs.writeJsonSync(path.join(tmpDir, "package.json"), basePackageJson);

  // use execSync to install npm deps in tmpDir
  console.debug(`Installing npm deps into ${tmpDir}...`);
  await execa(npmBin, ["install", "--no-package-lock", "--ignore-engines"], {
    cwd: tmpDir,
  });
  console.debug(`Done!`);

  const versionOutput = await execa(wingBin, ["--version"], {
    cwd: tmpDir,
  });
  expect(versionOutput.stdout).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)(-.+)?/);
}, 1000 * 200);

function sanitize_json_paths(path: string) {
  const assetKeyRegex = /"asset\..+"/g;
  const assetSourceRegex = /"assets\/.+"/g;
  const json = fs.readJsonSync(path);

  const jsonText = JSON.stringify(json);
  const sanitizedJsonText = jsonText
    .replace(assetKeyRegex, '"<ASSET_KEY>"')
    .replace(assetSourceRegex, '"<ASSET_SOURCE>"');

  const finalObj = JSON.parse(sanitizedJsonText);
  delete finalObj.terraform;

  return finalObj;
}

async function runWingCommand(
  command: string[],
  wingFile: string,
  cwd: string
) {
  const isError = path.dirname(wingFile).endsWith("error");

  const args: string[] = [...command, wingFile];

  const work = async () => {
    console.debug(`Running: "${args.join(" ")}"...`);
    const out = await execa(wingBin, args, {
      cwd,
      stdout: "inherit",
    });
    console.debug(out.stdout);
    console.debug(out.stderr);
    return out.exitCode;
  };

  if (isError) {
    await expect(work()).rejects.toThrow();
  } else {
    await expect(work()).resolves.toBe(0);
  }
}

test.each(validWingFiles)(
  "wing compile --target tf-aws %s",
  async (wingFile) => {
    const command = ["compile", "--target", "tf-aws"];
    const testDir = path.join(tmpDir, `${wingFile}_cdktf`);
    const targetDir = path.join(
      testDir,
      "target",
      `${basename(wingFile, ".w")}.tfaws`
    );
    const tf_json = path.join(targetDir, "main.tf.json");

    fs.mkdirpSync(testDir);

    await runWingCommand(command, path.join(validTestDir, wingFile), testDir);
    const npx_tfJson = sanitize_json_paths(tf_json);

    expect(npx_tfJson).toMatchSnapshot("main.tf.json");

    // get all files in .wing dir
    const dotWingFiles = walk.sync(path.join(targetDir, ".wing"), {
      return_object: true,
    });
    for (const irFile in dotWingFiles) {
      if (dotWingFiles[irFile].isFile()) {
        expect(fs.readFileSync(irFile, "utf8")).toMatchSnapshot(
          path.basename(irFile)
        );
      }
    }
  },
  {
    timeout: 1000 * 30,
  }
);

test.each(validWingFiles)(
  "wing test %s (--target sim)",
  async (wingFile) => {
    const command = ["test"];
    const testDir = path.join(tmpDir, `${wingFile}_sim`);
    fs.mkdirpSync(testDir);

    await runWingCommand(command, path.join(validTestDir, wingFile), testDir);

    // TODO snapshot .wsim contents
  },
  {
    timeout: 1000 * 30,
  }
);
