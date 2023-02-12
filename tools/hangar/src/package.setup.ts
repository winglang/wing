import { execa } from "execa";
import * as fs from "fs-extra";
import * as path from "path";
import {
  npmBin,
  npmCacheDir,
  targetWingSDKSpec,
  targetWingSpec,
  tmpDir,
  wingBin
} from "./paths";

const basePackageJson = {
  name: "hangar-test",
  description: "",
  version: "0.0.0",
  dependencies: {
    "@winglang/sdk": `${targetWingSDKSpec}`,
    winglang: `${targetWingSpec}`,
  },
  devDependencies: {},
};

const shellEnv = {
  ...process.env,
  npm_config_audit: "false",
  npm_config_progress: "false",
  npm_config_yes: "true",
  npm_config_cache: npmCacheDir,
  FORCE_COLOR: "false",
};

export default async function () {
  Object.assign(process.env, shellEnv);

  // reset tmpDir
  fs.removeSync(tmpDir);
  fs.mkdirpSync(tmpDir);
  fs.writeJsonSync(path.join(tmpDir, "package.json"), basePackageJson);

  // use execSync to install npm deps in tmpDir
  console.debug(`Installing npm deps into ${tmpDir}...`);
  await execa(npmBin, ["install", "--no-package-lock", "--ignore-engines", "--install-links=false"], {
    cwd: tmpDir,
  });
  console.debug(`Done!`);

  const versionOutput = await execa(wingBin, ["--version"], {
    cwd: tmpDir,
  });

  if (versionOutput.exitCode !== 0) {
    throw new Error(`Failed to get wing version: ${versionOutput.stderr}`);
  }

  // expect(versionOutput.stdout).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)(-.+)?/);
  if (!versionOutput.stdout.match(/^(\d+\.)?(\d+\.)?(\*|\d+)(-.+)?/)) {
    throw new Error(`Wing version invalid: ${versionOutput.stderr}`);
  }
}
