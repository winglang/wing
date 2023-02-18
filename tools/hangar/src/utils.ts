import { execa } from "execa";
import * as fs from "fs-extra";
import { expect } from "vitest";
import { wingBin } from "./paths";

export async function runWingCommand(
  cwd: string,
  wingFile: string,
  args: string[],
  shouldSucceed: boolean
) {
  const out = await execa(wingBin, [...args, wingFile], {
    cwd,
    reject: false,
    stdin: "ignore",
  });
  if (shouldSucceed) {
    if (out.exitCode !== 0) {
      // Note: reading stdout here on windows will fail if it's empty
      throw out.stderr;
    }
  } else {
    expect(out.stderr).not.toBe("");
    expect(out.exitCode).not.toBe(0);
  }
  return out;
}

export function sanitize_json_paths(path: string) {
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
