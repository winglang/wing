import { execa } from "execa";
import * as fs from "fs";
import { expect } from "vitest";
import { snapshotDir, wingBin } from "./paths";
import { join, extname, relative, resolve, dirname, basename } from "path";

export interface RunWingCommandOptions {
  cwd: string;
  wingFile?: string;
  args: string[];
  expectFailure: boolean;
  platforms?: string[];
  env?: Record<string, string>;
}

export async function runWingCommand(options: RunWingCommandOptions) {
  const out = await execa(
    wingBin,
    [
      "--no-update-check",
      "--no-analytics",
      ...options.args,
      options.wingFile ?? "",
      "--platform",
      ...options.platforms ?? []
    ],
    {
      cwd: options.cwd,
      reject: false,
      stdin: "ignore",
      env: options.env,
    }
  );

  const output = [out.stdout, out.stderr].join("\n");

  if (options.expectFailure) {
    if (out.exitCode == 0) {
      expect.fail(output);
    }
  } else {
    if (out.exitCode != 0) {
      expect.fail(output);
    }
  }

  return {
    stderr: sanitizeOutput(out.stderr),
    stdout: sanitizeOutput(out.stdout),
  };
}

function sanitizeOutput(output: string) {
  return output
    .replace(/\d+m[\d.]+s/g, "<DURATION>")
    .replace(/(?<=wsim.)\d+(?=.tmp)/g, "[REDACTED]");
}

export function sanitize_json_paths(path: string) {
  const assetKeyRegex = /"asset\..+?"/g;
  const assetSourceRegex = /"assets\/.+?"/g;
  const sourceRegex = /(?<=\"source\"\:)\"([A-Z]:|\/|\\)[\/\\\-\w\.]+\"/g;
  const sourceHashRegex =
    /(?<=\"source_hash\"\:)\"\${filemd5\(\\\"([A-Z]:|\/|\\)[\/\\\-\w\.]+\\\"\)}\"/g;
  const json = JSON.parse(fs.readFileSync(path, "utf-8"));

  const jsonText = JSON.stringify(json);
  const sanitizedJsonText = jsonText
    .replace(assetKeyRegex, '"<ASSET_KEY>"')
    .replace(assetSourceRegex, '"<ASSET_SOURCE>"')
    .replace(sourceRegex, '"<SOURCE>"')
    .replace(sourceHashRegex, '"${filemd5(<SOURCE>)}"');
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
  const relativePath = relative(resolve(testsRoot), filePath).replace(
    /\\/g,
    "/"
  );
  const wingFile = basename(filePath);

  const snapPath = join(
    snapshotDir,
    "test_corpus",
    dirname(relativePath),
    `${wingFile}_${testCase}_${target}.md`
  );

  const testDirRelativeToSnapshot = relative(
    dirname(snapPath),
    testsRoot
  ).replace(/\\/g, "/");

  let md = `# [${wingFile}](${testDirRelativeToSnapshot}/${dirname(
    relativePath
  )}/${wingFile}) | ${testCase} | ${target}\n\n`;

  const files = Object.keys(fileMap);
  files.sort();

  for (const file of files) {
    const extension = extname(file).replace(".", "");
    md += `## ${file}\n\`\`\`${extension}\n${fileMap[file]}\n\`\`\`\n\n`;
  }

  await expect(md).toMatchFileSnapshot(snapPath);
}
