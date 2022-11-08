import { test, expect, beforeAll, afterAll } from "vitest";
import { posix as path } from "path";
import "zx/globals";
import { runServer } from 'verdaccio';
const registryServer = await runServer('./verdaccio.config.yaml');

const repoRoot = path.resolve(__dirname, "../../..");
const testDir = path.join(repoRoot, "examples/tests");
const validTestDir = path.join(testDir, "valid");
const hangarDir = path.join(repoRoot, "tools/hangar");
const tmpDir = path.join(hangarDir, "tmp");
const npmCacheDir = path.join(tmpDir, ".npm");
const registryDir = path.join(tmpDir, "registry");
const targetWingTGZ =
  process.env.HANGAR_WING_TGZ ??
  path.join(repoRoot, "apps/wing/winglang-wing-0.0.0.tgz");
const targetWingSDKTGZ =
  process.env.HANGAR_WINGSDK_TGZ ??
  path.join(repoRoot, "libs/wingsdk/winglang-wingsdk-0.0.0.tgz");

const validWingFiles = fs
  .readdirSync(validTestDir)
  .filter((f) => f.endsWith(".w"))
  .map((f) => path.join(validTestDir, f));

const shellEnv = {
  ...process.env,
  npm_config_yes: "true",
  npm_config_registry: "http://localhost:4873/",
  npm_config_cache: npmCacheDir,
  npm_config__auth: "hunter2",
  npm_config_userconfig: path.join(hangarDir, "test.npmrc"),
};

afterAll(async () => {
  registryServer.close();
})

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
    $`cd ${tmpDir}`;
    let output =
      await $`npx @winglang/wing --version`;

    expect(output.stdout).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)(-.+)?/);
  });
}, 1000 * 60);

test.each(validWingFiles)(
  "wing compile %s",
  async (wingFile) => {
    await within(async () => {
      $.env = shellEnv;
      $.cwd = tmpDir;
      $`cd ${tmpDir}`;

      let output =
        await $`npx @winglang/wing compile ${wingFile}`;

      console.log(output.stdout);
    });
  },
  {
    timeout: 1000 * 30,
  }
);