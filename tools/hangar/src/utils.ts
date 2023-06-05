import { execa } from "execa";
import * as fs from "fs-extra";
import { expect } from "vitest";
import { snapshotDir, wingBin } from "./paths";
import { join, extname, relative, resolve, dirname, basename } from "path";

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
    ["--no-update-check", ...options.args, options.wingFile, ...plugins],
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
  out.stderr = sanitizeOutput(out.stderr);
  out.stdout = sanitizeOutput(out.stdout);
  return out;
}

function sanitizeOutput(output: string) {
  return output.replace(/\d+m[\d.]+s/g, "<DURATION>");
}

export function sanitize_json_paths(path: string) {
  const assetKeyRegex = /"asset\..+?"/g;
  const assetSourceRegex = /"assets\/.+?"/g;
  const sourceRegex = /(?<=\"source\"\:)\"([A-Z]:|\/|\\)[\/\\\-\w\.]+\"/g;
  const json = fs.readJsonSync(path);

  const jsonText = JSON.stringify(json);
  const sanitizedJsonText = jsonText
    .replace(assetKeyRegex, '"<ASSET_KEY>"')
    .replace(assetSourceRegex, '"<ASSET_SOURCE>"')
    .replace(sourceRegex, '"<SOURCE>"');
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

const testsRoot = join(__dirname, "..", "..", "..", "examples", "tests");

export async function createMarkdownSnapshot(
  fileMap: Record<string, string>,
  filePath: string,
  testCase: string,
  target: string
) {
  const relativePath = relative(resolve(testsRoot), filePath).replace(/\\/g, "/");
  const wingFile = basename(filePath);

  const snapPath = join(
    snapshotDir,
    "test_corpus",
    dirname(relativePath),
    `${wingFile}_${testCase}_${target}.md`
  );

  const testDirRelativeToSnapshot = relative(dirname(snapPath), testsRoot).replace(/\\/g, "/");

  let md = `# [${wingFile}](${testDirRelativeToSnapshot}/${dirname(relativePath)}/${wingFile}) | ${testCase} | ${target}\n\n`;

  const files = Object.keys(fileMap);
  files.sort();

  for (const file of files) {
    const extension = extname(file).replace(".", "");
    md += `## ${file}\n\`\`\`${extension}\n${fileMap[file]}\n\`\`\`\n\n`;
  }

  await expect(md).toMatchFileSnapshot(snapPath);
}
