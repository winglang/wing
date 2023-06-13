import { execSync, spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

import standardVersion from "standard-version";

import { filterPackages } from "./filter-packages.js";
import { getLatestTag } from "./get-latest-tag.js";

export interface BumpFilesOptions {
  /**
   * @example "...[HEAD^1]"
   */
  filter: string;
  /**
   * @example `dist/package.json`
   */
  versionFile: string;
  /**
   * @example `dist/releasetag.txt`
   */
  releaseFile: string;
  /**
   * @example `dist/changelog.md`
   */
  changelogFile: string;
  /**
   * Whether to perform a dry run.
   */
  dryRun: boolean;
}

/**
 * Bumps the version of the packages filtered by `filter`, and creates the `versionFile` and `changelogFile` files.
 *
 * Returns the new version.
 */
export const bumpFiles = async ({
  filter,
  versionFile,
  releaseFile,
  changelogFile,
  dryRun,
}: BumpFilesOptions) => {
  const { latestVersion } = getLatestTag();

  await mkdir(path.dirname(versionFile), { recursive: true });
  await writeFile(
    versionFile,
    JSON.stringify({ version: latestVersion }, undefined, 2),
  );
  await standardVersion({
    dryRun,
    packageFiles: [versionFile],
    bumpFiles: [
      versionFile,
      ...filterPackages({ filter: undefined }).map((package_) =>
        path.relative(process.cwd(), `${package_.path}/package.json`),
      ),
    ],
    commitAll: false,
    infile: changelogFile,
    header: "",
    skip: {
      commit: true,
      tag: true,
    },
  });

  const releaseVersion = JSON.parse(
    await readFile(versionFile, { encoding: "utf8" }),
  ).version as string;
  const releaseTag = `v${releaseVersion}`;

  await writeFile(releaseFile, releaseTag);

  return {
    releaseVersion,
    releaseTag,
  };
};
