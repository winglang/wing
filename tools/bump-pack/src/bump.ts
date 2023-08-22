import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

export interface SetPackageVersionOptions {
  /**
   * The directory of an npm package to pack. Must contain a package.json file.
   */
  packageDir: string;

  /**
   * The version to set the package to.
   *
   * This will also be used for dependencies that are set to "0.0.0" or "workspace:" if `versionMap` is not provided.
   *
   * @default "0.0.0"
   */
  version?: string;

  /**
   * If true, dependencies will be removed from the package.json file.
   *
   * @default true if `version` is "0.0.0", false otherwise
   */
  devBuild?: boolean;

  /**
   * A map of dependency package names to versions to set them to.
   *
   * @default {} dependencies will be set to `version`
   */
  versionMap?: Record<string, string>;

  /**
   * Whether or not to run in dry run mode. If true, to files will be changed.
   *
   * @default false
   */
  dryRun?: boolean;
}

/**
 * Sets the version of an npm package and its dependencies.
 *
 * @returns A map of dependency package names to their original versions.
 */
export async function setPackageVersion(options: SetPackageVersionOptions) {
  const defaultVersion = "0.0.0";
  const packageJsonPath = path.join(options.packageDir, "package.json");
  const packageJson = await readFile(packageJsonPath, "utf8").then(JSON.parse);
  const version = options.version ?? defaultVersion;
  const devBuild = options.devBuild ?? version === defaultVersion;

  const originals: Record<string, string> = {};

  console.log(`Setting version to ${version}${devBuild ? " (DEV)" : ""}`);

  if (options.dryRun) {
    console.log(`DRYRUN: Set version to ${version} in ${packageJsonPath}`);
  } else {
    packageJson.version = version;
  }

  for (const [packageName, packageVersion] of Object.entries(
    packageJson.dependencies ?? {}
  )) {
    if (typeof packageVersion !== "string") {
      throw new Error(
        `Expected ${packageName} to be a string, but got ${packageVersion}`
      );
    }

    if (
      packageVersion === defaultVersion ||
      packageVersion.startsWith("workspace:")
    ) {
      originals[packageName] = packageVersion;
      if (devBuild) {
        if (options.dryRun) {
          console.log(
            `DRYRUN: Remove "${packageName}" from ${packageJsonPath} dependencies`
          );
        } else {
          delete packageJson.dependencies[packageName];
        }
      } else {
        if (options.dryRun) {
          console.log(
            `DRYRUN: Set "${packageName}" version to ${version} in ${packageJsonPath}`
          );
        } else {
          packageJson.dependencies[packageName] = version;
        }
      }
    }

    if (options.versionMap) {
      Object.assign(packageJson.dependencies, options.versionMap);
    }
  }

  await writeFile(packageJsonPath, JSON.stringify(packageJson, undefined, 2));

  return originals;
}
