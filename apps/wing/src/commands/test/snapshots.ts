import * as cp from "child_process";
import * as fs from "fs/promises";
import { join, extname, basename } from "path";
import { BuiltinPlatform } from "@winglang/compiler";
import * as glob from "glob";
import { TestOptions } from "./test";
import { withSpinner } from "../../util";
import { readFileSync, writeFileSync } from "fs";
import { compile } from "../compile";
import { renderTestName } from "./util";

export const SNAPSHOTS_HELP = `
Snapshots (s, --snapshots <mode>):
  never  \t Snapshot are never captured
  auto   \t Determines behavior based on the "CI" environment variable: "assert" if CI=1 or "wet" otherwise
  wet    \t Execute tests on the target platform and update snapshots if all tests pass
  assert \t verifies that the snapshot is up-to-date and fails the test is they are not
  dry    \t Only update the snapshots without actually executing the tests on the target platform

  When testing against a cloud target (e.g. -t tf-aws), if all tests pass, the compiler output 
  will be captured under "<entrypoint>.snap.md".
`;

export enum SnapshotMode {
  /**
   * Auto-detect. If CI=1, SnapshotMode.ASSERT otherwise SnapshotMode.WET.
   */
  AUTO = "auto",

  /**
   * Snapshots are disabled.
   */
  NEVER = "never",

  /**
   * Deploy and test in the cloud and update the snapshot only if all tests passed.
   */
  UPDATE_WET = "wet",

  /**
   * Update the snapshots without deploying (dry run).
   */
  UPDATE_DRY = "dry",

  /**
   * Just verify that the snapshots are correct.
   */
  ASSERT = "assert",
}

export function determineSnapshotMode(
  target: string | undefined,
  options: TestOptions
): SnapshotMode {
  // no snapshots for sim, ever!
  if (target === BuiltinPlatform.SIM) {
    return SnapshotMode.NEVER;
  }

  // if AUTO or unset, determine behavior based on CI flag
  if (!options.snapshots || options.snapshots === SnapshotMode.AUTO) {
    // determine behavior based on CI
    if (process.env.CI) {
      return SnapshotMode.ASSERT;
    } else {
      return SnapshotMode.UPDATE_WET;
    }
  }

  return options.snapshots;
}

export async function captureSnapshot(entrypoint: string, target: string, options: TestOptions) {
  const snapshotMode = determineSnapshotMode(target, options);

  // skip if snapshots are disabled
  if (snapshotMode === SnapshotMode.NEVER) {
    return;
  }

  const snapshotFile = `${entrypoint}.${target}.snap.md`;

  await withSpinner(`Snapshot ${renderTestName(snapshotFile)}...`, async () => {
    // we need to compile again in order for snapshots because we can't afford the snapshot to be
    // based on a random root id (which is the default for tests)
    const snapshotDir = await compile(entrypoint, options);

    // take a snapshot of the synthesis output
    const snapshot = await createMarkdownSnapshot(basename(snapshotFile), snapshotDir);

    // update the snapshots if needed
    switch (snapshotMode) {
      case SnapshotMode.UPDATE_WET:
      case SnapshotMode.UPDATE_DRY:
        writeFileSync(snapshotFile, snapshot);
        break;

      case SnapshotMode.ASSERT:
        const expectedSnapshot = readFileSync(snapshotFile, "utf-8");
        if (expectedSnapshot !== snapshot) {
          const actualFile = `${snapshotFile}.actual`;
          writeFileSync(actualFile, snapshot);


          const diff = tryRenderDiff(snapshotFile, actualFile) ?? [
            ` - Expected: ${snapshotFile}`,
            ` - Actual: ${actualFile}`,
          ].join("\n");

          throw new Error(
            [
              "Snapshot mismatch:",
              "",
              diff,
              "",
              "To update, run in a non-CI environment with cloud credentials or with '--snapshots=dry'",
              "To disable this behavior run with '--snapshots=never'",
              "See https://www.winglang.io/docs/tools/cli#cloud-test-snapshots"
            ].join("\n")
          );
        }
        break;
    }
  });
}

function tryRenderDiff(snapshotFile: string, actualFile: string) {
  const color = process.env.CI ? "never" : "always";
  const out = cp.spawnSync("diff", ["-u", snapshotFile, actualFile, `--color=${color}`]);
  if (out.error) {
    return undefined;
  }

  return out.stdout?.toString();
}

async function createMarkdownSnapshot(baseName: string, synthDir: string) {
  const fileMap: Record<string, string> = {};
  const exclude = ["connections.json", "tree.json", "**/*.zip", "**/*.map"];
  for await (const subpath of glob.iterate("**/*", {
    cwd: synthDir,
    nodir: true,
    dot: false, // don't include the `.wing` directory
    ignore: exclude,
  })) {
    const abspath = join(synthDir, subpath);
    const fileContents = await fs.readFile(abspath, "utf8");

    // ensure no absolute requires are included in the snapshot
    if (/require\("(\/|\w:).*\/(.+)"\)/g.test(fileContents)) {
      throw new Error(`Unable to capture snapshot. Found absolute path in ${abspath}`);
    }

    fileMap[subpath] = fileContents;
  }

  return createMarkdown(baseName, fileMap);
}

async function createMarkdown(baseName: string, fileMap: Record<string, string>) {
  const files = Object.keys(fileMap);
  files.sort();

  const lines = [];

  lines.push(`# \`${baseName}\``);
  lines.push("");

  for (const file of files) {
    const extension = extname(file).replace(".", "");
    lines.push(`## ${file}`);
    lines.push("");
    lines.push("```" + extension);
    lines.push(fileMap[file]);
    lines.push("```");
    lines.push("");
  }

  return lines.join("\n");
}
