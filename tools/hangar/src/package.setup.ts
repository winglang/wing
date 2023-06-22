import assert from "assert";
import { execa } from "execa";
import { targetWingSDKSpec, targetWingSpec, targetWingCompilerSpec, tmpDir, wingBin } from "./paths";
import { mkdirSync, rmSync } from "node:fs";

export default async function () {
  // Explicitly remove FORCE_COLOR from env, this is because NX sets it to true, so when we run
  // under NX build we get color output in the snapshots, which is not what we want.
  // Might be related to https://github.com/nrwl/nx/issues/8051#issuecomment-1047061889
  delete process.env.FORCE_COLOR;

  // reset tmpDir
  rmSync(tmpDir, { force: true, recursive: true });
  mkdirSync(tmpDir, { recursive: true });

  await execa(
    "bootstrapper",
    [
      "--cli",
      targetWingSpec,
      "--sdk",
      targetWingSDKSpec,
      "--compiler",
      targetWingCompilerSpec,
      "--alias",
      "hangar",
    ],
    {
      cwd: tmpDir,
      stdio: "inherit",
    }
  );

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
