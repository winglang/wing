import assert from "node:assert";
import { execa } from "execa";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { npmBin, npmCacheDir, tmpDir, wingBin } from "./paths";

// Tell the Wing Compiler to not use colors. See the following crate for more info:
// https://docs.rs/crate/colored/latest
process.env.NO_COLOR = "1";

const shellEnv = {
  ...process.env,
  npm_config_audit: "false",
  npm_config_progress: "false",
  npm_config_yes: "true",
  npm_config_cache: npmCacheDir,
  npm_config_color: "false",
  npm_config_foreground_scripts: "true",
};

const getInstallArgs = async () => {
  if (process.env.HANGAR_WINGLANG_PACKAGE) {
    return [
      "install",
      "--no-package-lock",
      "--install-links=false",
      process.env.HANGAR_WINGLANG_PACKAGE!,
    ];
  }

  if (process.env.CI) {
    const tarballsDir = path.resolve(`${__dirname}/../../../dist`);
    const tarballs = (await fs.readdir(tarballsDir))
      .filter((filename) => /^.+-\d+\.\d+\.\d+\.tgz$/.test(filename))
      .map((tarball) => `file:${tarballsDir}/${tarball}`);
    return [
      "install",
      "--no-package-lock",
      "--install-links=false",
      ...tarballs,
    ];
  }

  return [
    "install",
    "--no-package-lock",
    "--install-links=false",
    "file:../../../packages/winglang",
    "file:../../../packages/@winglang/sdk",
    "file:../../../packages/@winglang/platform-awscdk",
    "file:../../../packages/@winglang/compatibility-spy",
    "file:../../../packages/@wingcloud/framework",
  ];
};

export default async function () {
  Object.assign(process.env, shellEnv);

  // reset tmpDir
  await fs.rm(tmpDir, { recursive: true, force: true });
  await fs.mkdir(tmpDir, { recursive: true });
  await execa(npmBin, ["init", "-y"], {
    cwd: tmpDir,
  });

  // use execSync to install npm deps in tmpDir
  const installArgs = await getInstallArgs();
  console.debug(`Installing npm deps into ${tmpDir}...`);
  const installResult = await execa(npmBin, installArgs, {
    cwd: tmpDir,
  });

  const installHooks =
    installResult.stdout
      .match(/^> .+ \w+$/g)
      ?.map((line) => line.toString().trim()) ?? [];

  // trusted install hooks we are expecting to expose to users
  const allowedInstallHooks = ["> esbuild@0.19.12 postinstall"];
  const badInstallHooks = installHooks.filter(
    (hook) => !allowedInstallHooks.includes(hook)
  );

  assert.equal(
    badInstallHooks.length,
    0,
    `Install contains unexpected script hooks: \n${badInstallHooks
      .map((h) => `"${h}"`)
      .join("\n")}`
  );
  assert.equal(
    installResult.exitCode,
    0,
    `Failed to install npm deps: \n${installResult.stderr}`
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
