import { test, expect, beforeAll, afterAll, vitest } from "vitest";
import { posix as path } from "path";
import { runServer } from "verdaccio";
import "zx/globals";

require("dotenv").config();
const registryServer = await runServer("./verdaccio.config.yaml");
const registryPort = 4873;
const registryUrl = `http://localhost:${registryPort}`;

const repoRoot = path.resolve(__dirname, "../../..");
const testDir = path.join(repoRoot, "examples/tests");
const validTestDir = path.join(testDir, "valid");
const hangarDir = path.join(repoRoot, "tools/hangar");
const tmpDir = path.join(hangarDir, "tmp");
const npmCacheDir = path.join(tmpDir, ".npm");
const registryDir = path.join(tmpDir, "registry");

const yarnBin = path.join(hangarDir, "node_modules/.bin/yarn");
const npmBin = path.join(hangarDir, "node_modules/.bin/npm");
const npxBin = path.join(hangarDir, "node_modules/.bin/npx");

const targetWingTGZ =
  process.env.HANGAR_WING_TGZ ??
  path.join(repoRoot, `apps/wing/winglang-wing-0.0.0.tgz`);
const targetWingSDKTGZ =
  process.env.HANGAR_WINGSDK_TGZ ??
  path.join(repoRoot, `libs/wingsdk/winglang-wingsdk-0.0.0.tgz`);

const validWingFiles = fs
  .readdirSync(validTestDir)
  .filter((f) => f.endsWith(".w"));

const shellEnv = {
  ...process.env,
  npm_config_cache: npmCacheDir,
  npm_config_userconfig: path.join(hangarDir, "test.npmrc"),
};

afterAll(async () => {
  registryServer.close();
});

beforeAll(async () => {
  await within(async () => {
    $.env = shellEnv;
    $.cwd = hangarDir;

    $.verbose = true;
    await $`cd ${hangarDir}`;

    await $`rm -rf ${tmpDir}`;
    await $`mkdir -p ${npmCacheDir}`;
    await $`mkdir -p ${registryDir}`;

    registryServer.listen(registryPort, () => {});
    await $`${npmBin} publish --registry=${registryUrl} ${targetWingTGZ}`;
    await $`${npmBin} publish --registry=${registryUrl} ${targetWingSDKTGZ}`;

    // ensure version works before bothering with the rest of the tests
    $.cwd = tmpDir;
    await $`cd ${tmpDir}`;
    let npxOutput = await $`${npxBin} @winglang/wing --version`;
    await $`${yarnBin} init -y`;
    await $`${yarnBin} add --no-lockfile @winglang/wing`;
    let yarnOutput = await $`node_modules/.bin/wing --version`;

    expect(npxOutput.stdout).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)(-.+)?/);
    expect(yarnOutput.stdout).toStrictEqual(npxOutput.stdout);
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

test.each(validWingFiles)(
  "wing compile %s",
  async (wingFile) => {
    await within(async () => {
      const test_dir = path.join(tmpDir, `${wingFile}_cdktf`);
      const tf_manifest = path.join(test_dir, "target/cdktf.out/manifest.json");
      const tf_json = path.join(
        test_dir,
        "target/cdktf.out/stacks/root/cdk.tf.json"
      );

      await enterTestDir(test_dir);

      await $`${npxBin} @winglang/wing compile ${path.join(
        validTestDir,
        wingFile
      )}`;
      const npx_tfManifest = sanitize_json_paths(tf_manifest);
      const npx_tfJson = sanitize_json_paths(tf_json);

      expect(npx_tfManifest).toMatchSnapshot("manifest.json");
      expect(npx_tfJson).toMatchSnapshot("cdk.tf.json");

      await $`${yarnBin} init -y`;
      await $`${yarnBin} add --no-lockfile @winglang/wing`;
      await $`node_modules/.bin/wing compile ${path.join(
        validTestDir,
        wingFile
      )}`;

      expect(sanitize_json_paths(tf_manifest)).toStrictEqual(npx_tfManifest);
      expect(sanitize_json_paths(tf_json)).toStrictEqual(npx_tfJson);
    });
  },
  {
    timeout: 1000 * 30,
  }
);

test.each(validWingFiles)(
  "wing compile --target sim %s",
  async (wingFile) => {
    await within(async () => {
      const test_dir = path.join(tmpDir, `${wingFile}_sim`);
      await enterTestDir(test_dir);

      await $`${npxBin} @winglang/wing compile --target sim ${path.join(
        validTestDir,
        wingFile
      )}`;

      await $`${yarnBin} init -y`;
      await $`${yarnBin} add --no-lockfile @winglang/wing`;
      await $`node_modules/.bin/wing compile --target sim ${path.join(
        validTestDir,
        wingFile
      )}`;

      // TODO snapshot app.wx contents
    });
  },
  {
    timeout: 1000 * 30,
  }
);
