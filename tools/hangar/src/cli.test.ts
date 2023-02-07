import { test, expect, beforeAll } from "vitest";
import { posix as path, basename } from "path";
import * as fs from "fs-extra";
import * as walk from "walkdir";

const { $, within } = await import("zx");

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
  .filter((f) => f.endsWith(".w"));

const shellEnv = {
  ...process.env,
  npm_config_audit: "false",
  npm_config_progress: "false",
  npm_config_yes: "true",
  npm_config_cache: npmCacheDir,
};

beforeAll(async () => {
  await within(async () => {
    $.env = shellEnv;
    $.cwd = hangarDir;

    $.verbose = true;
    await $`cd ${hangarDir}`;

    // setup temp dir
    await $`rm -rf ${tmpDir}`;
    await $`mkdir -p ${tmpDir}`;
    fs.writeJsonSync(path.join(tmpDir, "package.json"), basePackageJson);

    // ensure npx cache is primed and `version` works before bothering with the rest of the tests
    $.cwd = tmpDir;
    await $`cd ${tmpDir}`;
    await $`${npmBin} install --no-package-lock --ignore-engines`;
    let versionOutput = await $`${wingBin} --version`;

    expect(versionOutput.stdout).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)(-.+)?/);
  });
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

async function enterTestDir(testDir: string) {
  $.env = shellEnv;
  await $`mkdir -p ${testDir}`;
  await $`cd ${testDir}`;
  $.cwd = testDir;
}

async function runWingCommand(command: string[], wingFile: string) {
  const isError = path.dirname(wingFile).endsWith("error");

  const cmd: string[] = [wingBin, ...command, wingFile];

  const work = async () => {
    const out = await $`${cmd}`;
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
    await within(async () => {
      const command = ["compile", "--target", "tf-aws"];
      const test_dir = path.join(tmpDir, `${wingFile}_cdktf`);
      const targetDir = path.join(
        test_dir,
        "target",
        `${basename(wingFile, ".w")}.tfaws`
      );
      const tf_json = path.join(targetDir, "main.tf.json");

      await enterTestDir(test_dir);

      await runWingCommand(command, path.join(validTestDir, wingFile));
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
    });
  },
  {
    timeout: 1000 * 30,
  }
);

test.each(validWingFiles)(
  "wing test %s (--target sim)",
  async (wingFile) => {
    await within(async () => {
      const command = ["test"];
      const test_dir = path.join(tmpDir, `${wingFile}_sim`);
      await enterTestDir(test_dir);

      await runWingCommand(command, path.join(validTestDir, wingFile));

      // TODO snapshot .wsim contents
    });
  },
  {
    timeout: 1000 * 30,
  }
);
