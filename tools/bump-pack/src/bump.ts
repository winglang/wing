import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

export interface SetPackageVersionOptions {
  packageDir: string;
  version?: string;
  devBuild?: boolean;
  versionMap?: Record<string, string>;
  dryRun?: boolean;
}

export async function setPackageVersion(options: SetPackageVersionOptions) {
  const defaultVersion = "0.0.0";
  const packageJsonPath = path.join(options.packageDir, "package.json");
  const packageJson = await readFile(packageJsonPath, "utf8").then(JSON.parse);
  const devBuild = options.devBuild ?? false;
  const version = options.version ?? defaultVersion;

  const originals: Record<string, string> = {};

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
      packageVersion.startsWith("file:")
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
