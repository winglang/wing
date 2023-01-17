import { test, expect, beforeAll, afterAll, vitest } from "vitest";
import { posix as path } from "path";
import { runServer } from "verdaccio";
import * as walk from "walkdir";
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
  path.join(repoRoot, `apps/wing/winglang-0.0.0.tgz`);
const targetWingSDKTGZ =
  process.env.HANGAR_WINGSDK_TGZ ??
  path.join(repoRoot, `libs/wingsdk/winglang-sdk-0.0.0.tgz`);

const validWingFiles = fs
  .readdirSync(validTestDir)
  .filter((f) => f.endsWith(".w"));

const shellEnv = {
  ...process.env,
  npm_config_registry: registryUrl,
  "npm_config_@winglang:registry": registryUrl,
  npm_config_audit: "false",
  npm_config_progress: "false",
  npm_config_yes: "true",
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
    await $`${npmBin} publish --@winglang:registry=${registryUrl} ${targetWingTGZ}`;
    await $`${npmBin} publish --@winglang:registry=${registryUrl} ${targetWingSDKTGZ}`;

    // ensure version works before bothering with the rest of the tests
    $.cwd = tmpDir;
    await $`cd ${tmpDir}`;
    await $`${yarnBin} init -y`;
    await $`${yarnBin} add winglang --no-lockfile --ignore-engines`;
    let yarnOutput = await $`node_modules/.bin/wing --version`;
    let npxOutput = await $`${npxBin} winglang --version`;

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

enum InvocationType {
	Direct,
	NPX,
}

async function runWingCommand(type: InvocationType, command: string, wingFile: string) {
	const isError = path.dirname(wingFile).endsWith("error");
  const executable = type === InvocationType.Direct
    ? $`${npxBin} winglang ${command} ${wingFile}}`
    : $`../node_modules/.bin/wing ${command} ${wingFile}`;

	const work = async () => {
		const out = await executable;
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
      const command = "compile --target tf-aws";
      const test_dir = path.join(tmpDir, `${wingFile}_cdktf`);
      const targetDir = path.join(test_dir, "target");
      const tf_manifest = path.join(targetDir, "cdktf.out/manifest.json");
      const tf_json = path.join(targetDir, "cdktf.out/stacks/root/cdk.tf.json");

      await enterTestDir(test_dir);

      await runWingCommand(InvocationType.NPX, command, path.join(validTestDir, wingFile));
      const npx_tfManifest = sanitize_json_paths(tf_manifest);
      const npx_tfJson = sanitize_json_paths(tf_json);

      expect(npx_tfManifest).toMatchSnapshot("manifest.json");
      expect(npx_tfJson).toMatchSnapshot("cdk.tf.json");

      // get all files in .wing dir
      const dotWingFiles = await walk.sync(path.join(targetDir, ".wing"), {
        return_object: true,
      });
      for (const irFile in dotWingFiles) {
        if (dotWingFiles[irFile].isFile()) {
          expect(fs.readFileSync(irFile, "utf8")).toMatchSnapshot(
            path.basename(irFile)
          );
        }
      }

      await runWingCommand(InvocationType.Direct, command, path.join(validTestDir, wingFile));

      expect(sanitize_json_paths(tf_manifest)).toStrictEqual(npx_tfManifest);
      expect(sanitize_json_paths(tf_json)).toStrictEqual(npx_tfJson);
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
      const command ="test";
      const test_dir = path.join(tmpDir, `${wingFile}_sim`);
      await enterTestDir(test_dir);

      await runWingCommand(InvocationType.NPX, command, path.join(validTestDir, wingFile));
      await runWingCommand(InvocationType.Direct, command, path.join(validTestDir, wingFile));

      // TODO snapshot .wsim contents
    });
  },
  {
    timeout: 1000 * 30,
  }
);
