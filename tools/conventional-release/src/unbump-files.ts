import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

import * as colors from "yoctocolors";

import { filterPackages } from "./filter-packages.js";

export interface UnbumpFilesOptions {
  // /**
  //  * @example "...[HEAD^1]"
  //  */
  // filter: string;
  /**
   * Whether to perform a dry run.
   */
  dryRun: boolean;
}

/**
 * Restores the version of the packages filtered by `filter` to 0.0.0.
 */
export const unbumpFiles = async ({
  // filter,
  dryRun,
}: UnbumpFilesOptions) => {
  for (const { path: packagePath } of filterPackages({ filter: undefined })) {
    const packageJson = path.relative(
      process.cwd(),
      `${packagePath}/package.json`,
    );

    console.log(
      colors.green("✔"),
      `unbumping version in ${packageJson} to`,
      colors.bold("0.0.0"),
    );
    if (dryRun) {
      continue;
    }

    const packageContents = JSON.parse(await readFile(packageJson, "utf8"));
    await writeFile(
      packageJson,
      `${JSON.stringify(
        {
          ...packageContents,
          version: "0.0.0",
        },
        undefined,
        2,
      )}\n`,
    );
  }
};
