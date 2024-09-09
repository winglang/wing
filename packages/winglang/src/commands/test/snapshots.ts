import * as cp from "child_process";
import * as fs from "fs/promises";
import { join, extname, basename } from "path";
import { BuiltinPlatform } from "@winglang/compiler";
import * as glob from "glob";
import { SNAPSHOTS_ERROR_HELP, SNAPSHOT_ERROR_PREFIX } from "./snapshots-help";
import { TestOptions } from "./test";
import { renderTestName } from "./util";
import { withSpinner } from "../../util";
import { compile } from "../compile";

export enum SnapshotMode {
  /**
   * Auto-detect. If CI=1, SnapshotMode.ASSERT otherwise SnapshotMode.DEPLOY.
   */
  AUTO = "auto",

  /**
   * Snapshots are disabled.
   */
  NEVER = "never",

  /**
   * Deploy and test in the cloud and update the snapshot only if all tests passed.
   */
  DEPLOY = "deploy",

  /**
   * Update the snapshots without deploying (dry run).
   */
  UPDATE = "update",

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
      return SnapshotMode.DEPLOY;
    }
  }

  return options.snapshots;
}

export enum SnapshotResult {
  SKIPPED = "skipped",
  NEW = "new",
  UPDATED = "updated",
  MISMATCH = "mismatched",
  VERIFIED = "verified",
}

export async function captureSnapshot(
  entrypoint: string,
  target: string,
  options: TestOptions
): Promise<SnapshotResult> {
  const snapshotMode = determineSnapshotMode(target, options);

  // skip if snapshots are disabled
  if (snapshotMode === SnapshotMode.NEVER) {
    return SnapshotResult.SKIPPED;
  }

  const snapshotFile = `${entrypoint}.${target}.snap.md`;
  const oldSnapshot = await tryReadFile(snapshotFile);

  return withSpinner(`Snapshot ${renderTestName(snapshotFile)}...`, async () => {
    // we need to compile again in order for snapshots because we can't afford the snapshot to be
    // based on a random root id (which is the default for tests)
    const snapshotDir = await compile(entrypoint, options);

    // take a snapshot of the synthesis output
    const newSnapshot = await createMarkdownSnapshot(basename(snapshotFile), snapshotDir);

    // if the snapshot is the same, we're done
    if (oldSnapshot === newSnapshot) {
      return SnapshotResult.VERIFIED;
    }

    // snapshot are mismatched, decide if we want to update or assert based on the mode
    switch (snapshotMode) {
      case SnapshotMode.DEPLOY:
      case SnapshotMode.UPDATE:
        await fs.writeFile(snapshotFile, newSnapshot);
        return !oldSnapshot ? SnapshotResult.NEW : SnapshotResult.UPDATED;

      case SnapshotMode.ASSERT:
        if (!oldSnapshot) {
          throw new Error(
            [
              SNAPSHOT_ERROR_PREFIX,
              `Snapshot file does not exist: ${snapshotFile}`,
              "",
              SNAPSHOTS_ERROR_HELP,
            ].join("\n")
          );
        }

        const actualFile = `${snapshotFile}.actual`;
        await fs.writeFile(actualFile, newSnapshot);

        const diff =
          tryRenderDiff(snapshotFile, actualFile) ??
          [` - Expected: ${snapshotFile}`, ` - Actual: ${actualFile}`].join("\n");

        // don't keep the actual file around
        await fs.rm(actualFile);

        throw new Error([SNAPSHOT_ERROR_PREFIX, "", diff, "", SNAPSHOTS_ERROR_HELP].join("\n"));
    }

    throw new Error(`Unexpected snapshot mode: ${snapshotMode}`);
  });
}

/**
 * Uses the "diff" command to render a diff between two files. Returns `undefined` if the diff command
 * is not available or if there was an error.
 *
 * @param expectedFile A snapshot file with the expected content
 * @param actualFile The actual snapshot content
 * @returns The diff output or `undefined`
 */
function tryRenderDiff(expectedFile: string, actualFile: string) {
  const color = process.env.CI ? "never" : "always";
  const out = cp.spawnSync("diff", ["-u", expectedFile, actualFile, `--color=${color}`]);
  if (out.error) {
    return undefined;
  }

  return out.stdout?.toString();
}

async function tryReadFile(file: string): Promise<string | undefined> {
  try {
    return await fs.readFile(file, "utf-8");
  } catch {
    return undefined;
  }
}

/**
 * Creates a markdown snapshot of the synthesis output.
 *
 * @param baseName The base name of the test
 * @param synthDir The directory containing the synthesis output
 * @returns The snapshot content in markdown format
 */
async function createMarkdownSnapshot(baseName: string, synthDir: string) {
  const fileMap: Record<string, string> = {};
  const exclude = ["connections.json", "tree.json", "**/*.zip", "**/*.map"];
  const include = ["**/*.js", "**/*.json", "**/*.tf", "**/*.ts", "**/*.yaml", "**/*.yml"];
  for await (const subpath of glob.iterate(include, {
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

function createMarkdown(baseName: string, fileMap: Record<string, string>) {
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
