import { execSync } from "node:child_process";
import fs from "fs-extra";
import { Project, findWorkspacePackages } from "@pnpm/workspace.find-packages";
import path from "node:path";
import { tmpdir } from "node:os";
import { setPackageVersion } from "./bump";

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
    const packageData = (await findWorkspacePackages(packageDir)).find(
      (p) => p.dir === packageDir
    );
    if (!packageData) {
      throw new Error(`Could not find package data for ${packageDir}`);
    }

    // create a working copy of the entire directory so we can apply changes
    // to the package.json and bundled dependencies without affecting the
    // original package
    const tmpDir = await fs.mkdtemp(path.join(tmpdir(), "bump-pack-"));
    console.log(`Packing "${packageData.manifest.name}" in ${tmpDir}`);
    await fs.ensureDir(tmpDir);
    await fs.copy(packageDir, tmpDir, {
      dereference: true,
      overwrite: true,
    });

    await setPackageVersion({
      packageDir: tmpDir,
      dryRun,
      version: process.env.PROJEN_BUMP_VERSION,
    });

    await preparePackageJson(packageData, tmpDir);
    await prepareBundledDeps(packageData, tmpDir);

    execSync(`pnpm pack --pack-destination ${packageDir}`, {
      cwd: tmpDir,
      stdio: "inherit",
    });
  }
}

// https://github.com/npm/npm-packlist/issues/101
async function prepareBundledDeps(
  _packageData: Project,
  tmpPackageDir: string
) {
  const packageDirNodeModules = `${tmpPackageDir}/node_modules`;

  // for each dir in node_modules, check if it's a symlink
  for (const dep of await fs.readdir(packageDirNodeModules)) {
    const depPath = path.join(packageDirNodeModules, dep);
    const stat = await fs.lstat(depPath);
    if (stat.isSymbolicLink()) {
      const realPath = await fs.realpath(depPath);
      await fs.unlink(depPath);
      await fs.copy(realPath, depPath);
    }
  }
}

/**
 * Transforms the package.json at `packageDir` to use the publishConfig field and remove other unnecessary fields such as devDependencies.
 * @param packageData The package data for the package to prepare.
 * @param tmpPackageDir The temporary directory to prepare the package in.
 */
async function preparePackageJson(packageData: Project, tmpPackageDir: string) {
  const packageJsonPath = `${tmpPackageDir}/package.json`;
  const packageJson = packageData.manifest;
  await fs.writeFile(
    packageJsonPath,
    `${JSON.stringify(
      {
        ...packageJson,
        ...packageJson.publishConfig,
        publishConfig: undefined,
        devDependencies: undefined,
        volta: undefined,
      },
      undefined,
      2
    )}\n`
  );
}
