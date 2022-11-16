import { test, expect, beforeAll, afterAll, vitest } from "vitest";
import { posix as path } from "path";
import { runServer } from "verdaccio";
import "zx/globals";

require("dotenv").config();
const registryServer = await runServer("./verdaccio.config.yaml");

const repoRoot = path.resolve(__dirname, "../../..");
const testDir = path.join(repoRoot, "examples/tests");
const validTestDir = path.join(testDir, "valid");
const hangarDir = path.join(repoRoot, "tools/hangar");
const tmpDir = path.join(hangarDir, "tmp");
const npmCacheDir = path.join(tmpDir, ".npm");
const registryDir = path.join(tmpDir, "registry");

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
  npm_config_yes: "true",
  npm_config_registry: "http://localhost:4873/",
  npm_config_cache: npmCacheDir,
  npm_config__auth: "hunter2",
  npm_config_userconfig: path.join(hangarDir, "test.npmrc"),
  npm_config_audit: "false",
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

    registryServer.listen(4873, () => {});
    await $`npm run publish-local-tgz -- ${targetWingTGZ}`;
    await $`npm run publish-local-tgz -- ${targetWingSDKTGZ}`;

    // ensure version works before bothering with the rest of the tests
    await $`cd ${tmpDir}`;
    let output = await $`npx @winglang/wing --version`;

    expect(output.stdout).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)(-.+)?/);
  });
}, 1000 * 180);

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

      await $`npx @winglang/wing compile ${path.join(validTestDir, wingFile)}`;

      expect(sanitize_json_paths(tf_manifest)).toMatchSnapshot("manifest.json");
      expect(sanitize_json_paths(tf_json)).toMatchSnapshot("cdk.tf.json");

      await $`yarn init -y`;
      await $`yarn add @winglang/wing`;
      await $`node_modules/.bin/wing compile ${path.join(validTestDir, wingFile)}`;

      expect(sanitize_json_paths(tf_manifest)).toMatchSnapshot("manifest.json");
      expect(sanitize_json_paths(tf_json)).toMatchSnapshot("cdk.tf.json");
    });
  },
  {
    timeout: 1000 * 20,
  }
);

test.each(validWingFiles)(
  "wing compile --target sim %s",
  async (wingFile) => {
    await within(async () => {
      const test_dir = path.join(tmpDir, `${wingFile}_sim`);
      await enterTestDir(test_dir);

      await $`npx @winglang/wing compile --target sim ${path.join(
        validTestDir,
        wingFile
      )}`;

      await $`yarn init -y`;
      await $`yarn add @winglang/wing`;
      await $`node_modules/.bin/wing compile --target sim ${path.join(
        validTestDir,
        wingFile
      )}`;

      // TODO snapshot app.wx contents
    });
  },
  {
    timeout: 1000 * 20,
  }
);
