import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { linkBundledTransitiveDeps } from "./bundle-link";

export interface PackOptions {
  /**
   * The directory of an npm package to pack. Must contain a package.json file.
   */
  packageDir: string;

  /**
   * Whether or not to run in dry run mode. If true, the command will not actually run.
   * @default false
   */
  dryRun?: boolean;
}

/**
 * Runs `pnpm pack` in the given package directory.
 */
export async function pack(options: PackOptions) {
  const { packageDir, dryRun } = options;

  if (dryRun) {
    console.log(`Would have run "pnpm pack" in ${packageDir}`);
  } else {
    preparePackageJsonAndRun(packageDir, () => {
      execSync("pnpm pack", { cwd: packageDir, stdio: "inherit" });
    });
  }
}

/**
 * Transforms the package.json at `packageDir` to use the publishConfig field and remove other unnecessary fields such as devDependencies.
 * @param packageDir The directory that contains the package.json to transform.
 * @param callback The function called after the transformation, before reverting the package.json back to its original state.
 */
function preparePackageJsonAndRun(packageDir: string, callback: () => void) {
  const packageJsonPath = `${packageDir}/package.json`;
  const packageJsonString = readFileSync(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonString);
  try {
    writeFileSync(
      packageJsonPath,
      `${JSON.stringify(
        {
          ...packageJson,
          ...packageJson.publishConfig,
          publishConfig: undefined,
          devDependencies: undefined,
        },
        undefined,
        2
      )}\n`
    );

    callback();
  } finally {
    writeFileSync(packageJsonPath, packageJsonString);
  }
}
