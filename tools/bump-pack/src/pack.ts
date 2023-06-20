import { execSync } from "node:child_process";

export interface PackOptions {
  packageDir: string;
  dryRun?: boolean;
}

export async function pack(options: PackOptions) {
  const { packageDir, dryRun } = options;

  if (dryRun) {
    console.log(`Would have run "npm pack" in ${packageDir}`);
  } else {
    execSync("npm pack", { cwd: packageDir, stdio: "inherit" });
  }
}
