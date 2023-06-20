import { execSync } from "node:child_process";

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
 * Runs `npm pack` in the given package directory.
 */
export async function pack(options: PackOptions) {
  const { packageDir, dryRun } = options;

  if (dryRun) {
    console.log(`Would have run "npm pack" in ${packageDir}`);
  } else {
    execSync("npm pack", { cwd: packageDir, stdio: "inherit" });
  }
}
