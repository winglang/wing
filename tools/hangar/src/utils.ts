import { execa } from "execa";
import * as fs from "fs";
import { expect } from "vitest";
import { snapshotDir, testDir, wingBin } from "./paths";
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
  const platformOptions: string[] = [];
  options.platforms?.forEach((p) => platformOptions.push(...["-t", `${p}`])) ??
    [];
  const out = await execa(
    wingBin,
    [
      "--no-update-check",
      "--no-analytics",
      ...options.args,
      options.wingFile ?? "",
      ...platformOptions,
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

export function sanitizeOutput(output: string) {
  return (
    output
      // Normalize line endings
      .replaceAll("\r\n", "\n")
      // Normalize windows slashes
      .replace(/\\+([a-zA-Z0-9\.@]{1})/g, "/$1")
      // Remove line/column numbers from rust sources
      .replace(/(src\/.+\.rs):\d+:\d+/g, "$1:LINE:COL")
      // Remove absolute stacktraces
      .replace(/\(\/.+:\d+:\d+\)/g, "(<ABSOLUTE>:LINE:COL)")
      // Remove absolute paths
      .replace(/(?<=[\s"])(\/|\w:)\S+\/(\S+)/g, "<ABSOLUTE>/$2")
      // remove references to random state files
      .replace(/\/.state\/[^ '"]+/g, "/.state/<STATE_FILE>")
      // Remove duration from test results
      .replace(/Duration \d+m[\d.]+s/g, "Duration <DURATION>")
      // Remove changing ports
      .replace(/port \d+/g, "port <PORT>")
      // Remove IP addresses with a port
      .replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+/g, "<IP>:<PORT>")
      // Remove timestamps
      .replace(/\b\d{2}:\d{2}:\d{2}.\d{3}\b/g, "<TIMESTAMP>")
      .replace(/\b\d{4}-\d{2}-\d{2}\b/g, "<TIMESTAMP>")
      .replace(
        /\b(?:(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Oct|Nov|Dec)\w* )?(\d{1,2})(?:st|nd|th)?[,]? (?:(?:(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Oct|Nov|Dec)\w*)?[,]? )?(\d{2,4})\b/g,
        "<TIMESTAMP>"
      )
  );
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
  // Remove cdktf version
  delete finalObj["//"]["metadata"]["version"];

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
  filePath: string,
  testCase: string,
  target: string
) {
  const relativePath = relative(resolve(testDir), filePath).replace(
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
    testDir
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
