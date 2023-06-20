import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

export interface SetPackageVersionOptions {
  packageDir: string;
  version?: string | Record<string, string>;
  dryRun?: boolean;
}

export async function setPackageVersion(options: SetPackageVersionOptions) {
  const packageJsonPath = path.join(options.packageDir, "package.json");
  const packageJson = await readFile(packageJsonPath, "utf8").then(JSON.parse);
  const deleteVersion = options.version === undefined;

  const originals: Record<string, string> = {};

  if (typeof options.version === "string") {
    if (options.dryRun) {
      console.log(
        `DRYRUN: Set version to ${options.version} in ${packageJsonPath}`
      );
    } else {
      packageJson.version = options.version;
    }
  } else {
    if (options.dryRun) {
      console.log(
        `DRYRUN: Set version to 0.0.0 (default) in ${packageJsonPath}`
      );
    } else {
      packageJson.version = "0.0.0";
    }
  }

  for (const [packageName, packageVersion] of Object.entries(
    packageJson.dependencies ?? {}
  )) {
    if (typeof packageVersion !== "string") {
      throw new Error(
        `Expected ${packageName} to be a string, but got ${packageVersion}`
      );
    }

    if (packageVersion === "0.0.0" || packageVersion.startsWith("file:")) {
      originals[packageName] = packageVersion;
      if (deleteVersion) {
        if (options.dryRun) {
          console.log(
            `DRYRUN: Remove "${packageName}" from ${packageJsonPath} dependencies`
          );
        } else {
          delete packageJson.dependencies[packageName];
        }
      } else {
        const newVersion =
          typeof options.version === "string"
            ? options.version
            : options.version![packageName];

        if (options.dryRun) {
          console.log(
            `DRYRUN: Set "${packageName}" version to ${newVersion} in ${packageJsonPath}`
          );
        } else {
          packageJson.dependencies[packageName] = newVersion;
        }
      }
    }
  }

  await writeFile(packageJsonPath, JSON.stringify(packageJson, undefined, 2));

  return originals;
}
