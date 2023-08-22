import { execSync } from "node:child_process";
import fs from "fs-extra";
import { findWorkspacePackages } from "@pnpm/workspace.find-packages";
import path from "node:path";
import { tmpdir } from "node:os";
import { setPackageVersion } from "./bump";
import { fileURLToPath } from "node:url";

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
      // we'll take care to follow certain symlinks later
      dereference: false,
      overwrite: true,
    });

    await setPackageVersion({
      packageDir: tmpDir,
      dryRun,
      version: process.env.PROJEN_BUMP_VERSION,
    });

    await preparePackageJson(tmpDir);
    await prepareBundledDeps(packageData.dir, tmpDir);

    const distDir = path.resolve(
      fileURLToPath(new URL("../../../dist", import.meta.url))
    );
    await fs.ensureDir(distDir);

    const packageMatcher = `${packageData.manifest.name?.replace("@", "")}-\\d+\\.\\d+\\.\\d+\\.tgz`;
    const existingFiles = fs.readdirSync(distDir);
    for (const file of existingFiles) {
      if (file.match(packageMatcher)) {
        await fs.remove(path.join(distDir, file));
      }
    }

    execSync(`pnpm pack --pack-destination ${distDir}`, {
      cwd: tmpDir,
      stdio: "inherit",
    });

    void fs.remove(tmpDir);
  }
}

async function prepareBundledDeps(
  originalPackageDir: string,
  tmpPackageDir: string
) {
  const packageDirNodeModules = `${tmpPackageDir}/node_modules`;
  const moduleLinks = fs.readJsonSync(
    path.join(packageDirNodeModules, ".modulelinks"),
    { throws: false }
  );
  if (!moduleLinks) {
    // no prep needed
    return;
  }
  console.log(`Preparing bundled dependencies`);

  // resolve all module links to their real paths
  // this ensures the packing process includes them and anything they need
  // See https://github.com/npm/npm-packlist/issues/101
  for (const dep of moduleLinks) {
    const originalDepPath = path.join(originalPackageDir, "node_modules", dep);
    const newPath = path.join(packageDirNodeModules, dep);
    await fs.unlink(newPath);
    await fs.copy(originalDepPath, newPath, { dereference: true });
  }
}

/**
 * Transforms the package.json at `packageDir` to use the publishConfig field and remove other unnecessary fields such as devDependencies.
 * @param packageData The package data for the package to prepare.
 * @param tmpPackageDir The temporary directory to prepare the package in.
 */
async function preparePackageJson(tmpPackageDir: string) {
  const packageJsonPath = `${tmpPackageDir}/package.json`;
  const packageJson = await fs.readJSON(packageJsonPath);

  Object.assign(packageJson, packageJson.publishConfig);

  const bumpPackConfig = packageJson["bump-pack"];
  if (bumpPackConfig) {
    for (const depToRemove of bumpPackConfig.removeBundledDependencies ?? []) {
      console.log(`Removing bundled dependency "${depToRemove}"`);
      delete packageJson.dependencies[depToRemove];
      packageJson.bundledDependencies = packageJson.bundledDependencies?.filter(
        (d: string) => d !== depToRemove
      );
    }
  }

  delete packageJson["bump-pack"];
  delete packageJson.volta;
  delete packageJson.devDependencies;
  delete packageJson.publishConfig;

  await fs.writeJSON(packageJsonPath, packageJson);
}
