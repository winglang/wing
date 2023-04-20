import { execa } from "execa";
import * as fs from "fs-extra";
import { expect } from "vitest";
import { snapshotDir, wingBin } from "./paths";
import { join, extname } from "path";

export interface RunWingCommandOptions {
  cwd: string;
  wingFile: string;
  args: string[];
  shouldSucceed: boolean;
  plugins?: string[];
  env?: Record<string, string>;
}

export async function runWingCommand(options: RunWingCommandOptions) {
  const plugins = options.plugins ? ["--plugins", ...options.plugins] : [];
  const out = await execa(
    wingBin,
    [...options.args, options.wingFile, ...plugins],
    {
      cwd: options.cwd,
      reject: false,
      stdin: "ignore",
      env: options.env,
    }
  );
  if (options.shouldSucceed) {
    if (out.exitCode !== 0 || out.stderr !== "") {
      expect.fail(out.stderr);
    }
  } else {
    expect(out.exitCode).not.toBe(0);
    expect(out.stderr).not.toBe("");
  }
  return out;
}

export function sanitize_json_paths(path: string) {
  const assetKeyRegex = /"asset\..+?"/g;
  const assetSourceRegex = /"assets\/.+?"/g;
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

export async function createMarkdownSnapshot(
  fileMap: Record<string, string>,
  wingFile: string,
  testCase: string,
  target: string
) {
  const snapPath = join(
    snapshotDir,
    "test_corpus",
    `${wingFile}_${testCase}_${target}.md`
  );

  let md = `# [${wingFile}](../../../../examples/tests/valid/${wingFile}) | ${testCase} | ${target}\n\n`;

  for (const [path, content] of Object.entries(fileMap)) {
    const extension = extname(path).replace(".", "");
    md += `## ${path}\n\`\`\`${extension}\n${content}\n\`\`\`\n\n`;
  }

  await expect(md).toMatchFileSnapshot(snapPath);
}
