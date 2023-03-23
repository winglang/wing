import { execa } from "execa";
import * as fs from "fs-extra";
import { expect } from "vitest";
import { wingBin } from "./paths";

export interface RunWingCommandOptions {
  cwd: string;
  wingFile: string;
  args: string[];
  shouldSucceed: boolean;
  plugins?: string[];
  env?: Record<string, string>;
}

export async function runWingCommand(options: RunWingCommandOptions) {
  // TODO: plugins cant easily be combined with args because the plugin option is a variadic option which will consume
  // the name of the wing file. So they must be passed in as the last option. 
  const plugins = options.plugins? ['--plugins', ...options.plugins] : '';
  const out = await execa(wingBin, [...options.args, options.wingFile, ...plugins], {
    cwd: options.cwd,
    reject: false,
    stdin: "ignore",
    env: options.env,
  });
  if (options.shouldSucceed) {
    if (out.exitCode !== 0) {
      expect.fail(out.stderr);
    }
  } else {
    expect(out.exitCode).not.toBe(0);
    expect(out.stderr).not.toBe("");
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

export function tfResourcesOf(templateStr: string): string[] {
  return Object.keys(JSON.parse(templateStr).resource).sort();
}

export function tfResourcesOfCount(
  templateStr: string,
  resourceId: string
): number {
  return Object.values(JSON.parse(templateStr).resource[resourceId]).length;
}