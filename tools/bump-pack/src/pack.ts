import { execSync } from "node:child_process";
import fs from "fs-extra";
import { findWorkspacePackages } from "@pnpm/workspace.find-packages";
import { findWorkspaceDir } from "@pnpm/find-workspace-dir";

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
      prepareBundledDepsAndRun(packageDir, () => {
        execSync("pnpm pack", { cwd: packageDir, stdio: "inherit" });
      });
    });
  }
}

// https://github.com/npm/npm-packlist/issues/101
async function prepareBundledDepsAndRun(
  packageDir: string,
  callback: () => void
) {
  const packageData = (await findWorkspacePackages(packageDir)).find(
    (p) => p.dir === packageDir
  );
  if (!packageData) {
    throw new Error(`Could not find package data for ${packageDir}`);
  }
  const workspaceDir = await findWorkspaceDir(packageData.dir);
  if (!workspaceDir) {
    throw new Error(
      `Could not find workspace directory for ${packageData.dir}`
    );
  }

  const bundledDeps =
    packageData.manifest.bundledDependencies ??
    packageData.manifest.bundleDependencies ??
    [];
  const packageDirNodeModules = `${packageDir}/node_modules`;
  const depsToCopy = [];

  for (const bundledDepName of bundledDeps) {
    // check if file exists and is a symlink
    const depPath = `${packageDirNodeModules}/${bundledDepName}`;
    if (await fs.exists(depPath)) {
      const bundledDepStats = await fs.lstat(depPath);
      if (bundledDepStats.isSymbolicLink()) {
        depsToCopy.push([await fs.realpath(depPath), depPath]);
      } else {
        // nothing needed, should bundle fine
        continue;
      }
    } else {
      throw new Error(
        `Could not find bundled dep ${bundledDepName} in ${packageDir}`
      );
    }
  }

  // do all the copies first since they take a while
  for (const dep of depsToCopy) {
    await fs.copy(dep[0], `${dep[1]}.copy`, {
      dereference: true,
      overwrite: true,
    });
  }

  for (const dep of depsToCopy) {
    const regPath = dep[1];
    const bak = `${regPath}.bak`;
    const copy = `${regPath}.copy`;
    await fs.move(regPath, bak, { overwrite: true });
    await fs.move(copy, regPath, { overwrite: true });
  }

  try {
    callback();
  } finally {
    // reset the symlinks, or else pnpm will be mad
    for (const dep of depsToCopy) {
      const regPath = dep[1];
      await fs.move(regPath, `${regPath}.copy`, { overwrite: true });
      await fs.move(`${regPath}.bak`, regPath, { overwrite: true });
      await fs.remove(`${regPath}.copy`);
    }
  }
}

/**
 * Transforms the package.json at `packageDir` to use the publishConfig field and remove other unnecessary fields such as devDependencies.
 * @param packageDir The directory that contains the package.json to transform.
 * @param callback The function called after the transformation, before reverting the package.json back to its original state.
 */
function preparePackageJsonAndRun(packageDir: string, callback: () => void) {
  const packageJsonPath = `${packageDir}/package.json`;
  const packageJsonString = fs.readFileSync(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonString);
  try {
    fs.writeFileSync(
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
    fs.writeFileSync(packageJsonPath, packageJsonString);
  }
}
