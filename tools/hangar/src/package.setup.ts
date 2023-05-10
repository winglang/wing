import assert from "assert";
import { execa } from "execa";
import fs, { realpathSync } from "fs-extra";
import {
  npmBin,
  targetWingSDKSpec,
  targetWingSpec,
  tmpDir,
  wingBin,
  wingSetupScript,
} from "./paths";

export default async function () {
  // Explicitly remove FORCE_COLOR from env, this is because NX sets it to true, so when we run
  // under NX build we get color output in the snapshots, which is not what we want.
  // Might be related to https://github.com/nrwl/nx/issues/8051#issuecomment-1047061889
  delete process.env.FORCE_COLOR;

  // reset tmpDir
  fs.removeSync(tmpDir);
  fs.mkdirpSync(tmpDir);

  await execa(
    wingSetupScript,
    ["--cli", targetWingSpec, "--sdk", targetWingSDKSpec, "--output", wingBin, "--installDir", tmpDir],
    {
      cwd: tmpDir,
      stdio: "inherit",
    }
  );

  const versionOutput = await execa(realpathSync(wingBin), ["--version"], {
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
