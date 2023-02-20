import assert from "assert";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
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
  npm_config_color: "false",
  npm_config_foreground_scripts: "true",
  FORCE_COLOR: "true",
};

export default async function () {
  Object.assign(process.env, shellEnv);

  // reset tmpDir
  fs.removeSync(tmpDir);
  fs.mkdirpSync(tmpDir);
  fs.writeJsonSync(path.join(tmpDir, "package.json"), basePackageJson);

  // use execSync to install npm deps in tmpDir
  console.debug(`Installing npm deps into ${tmpDir}...`);
  const installResult = await execa(
    npmBin,
    [
      "install",
      "--no-package-lock",
      "--ignore-engines",
      "--install-links=false",
    ],
    {
      cwd: tmpDir,
    }
  );

  assert.equal(
    installResult.exitCode,
    0,
    `Failed to install npm deps: \n${installResult.stderr}`
  );
  assert.doesNotMatch(
    installResult.stdout,
    />/,
    `Install contains unexpected script hook: \n${installResult.stdout}`
  );
  assert.doesNotMatch(
    installResult.stdout,
    / warn /,
    `Install contains unexpected warning: \n${installResult.stdout}`
  );

  console.debug(`Done!`);

  const versionOutput = await execa(wingBin, ["--version"], {
    cwd: tmpDir,
  });

  assert.equal(
    versionOutput.exitCode,
    0,
    `Failed to get wing version: ${versionOutput.stderr}`
  );

  assert.match(
    versionOutput.stdout,
    /^(\d+\.)?(\d+\.)?(\*|\d+)(-.+)?/,
    `Wing version invalid: ${versionOutput.stderr}`
  );
}
