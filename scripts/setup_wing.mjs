#!/usr/bin/env node

/**
 * This script is used to create a temporary installation of the wing toolchain (wing cli and sdk)
 */

import { execSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

// parse arg
// [target]
// If version is not specified, the will use the local dev version
const targets = process.argv.slice(2);
let alias = "local";
const currentDir = dirname(new URL(import.meta.url).pathname);

let targetWingSDKSpec = join(currentDir, "../libs/wingsdk");
let targetWingSpec = join(currentDir, "../apps/wing");
let isVersionSpecified = false;

for (const target of targets) {
  const [name, spec] = target.split("=");

  if (name === "version") {
    targetWingSpec = `winglang@${spec}`;
    targetWingSDKSpec = `@winglang/sdk@${spec}`;
    isVersionSpecified = true;
  } else if (name === "file") {
    if(isVersionSpecified) {
      throw new Error("Cannot specify both version and file");
    }
    targetWingSpec = `file:${spec}`;
  } else if (name === "sdk") {
    targetWingSDKSpec = `file:${spec}`;
  } else if (name === "alias") {
    alias = spec;
  }
}

const newWingName = `wing_${alias}`;

const tmpDir = join(currentDir, "tmp");
const localInstallDir = join(tmpDir, `_${newWingName}`);
const wingCliBin = join(localInstallDir, "node_modules", ".bin", "wing");
const wingCliLink = join(tmpDir, newWingName);

rmSync(localInstallDir, { recursive: true, force: true });
rmSync(wingCliLink, { force: true });
mkdirSync(localInstallDir, { recursive: true });

console.log(`Installing...\n\tWing: "${targetWingSpec}"\n\tSDK: "${targetWingSDKSpec}"\nTo ${localInstallDir}\n\n====================`);
execSync(`npm init -y`, {
  cwd: localInstallDir,
  stdio: "ignore",
});
execSync(`npm install --no-audit --no-fund --no-package-lock --install-links=false ${targetWingSpec} ${targetWingSDKSpec}`, {
  cwd: localInstallDir,
  stdio: "inherit",
});

console.log("\n====================\n\n");

// create symlink to point to the local wing cli
execSync(`ln -sf ${wingCliBin} ${wingCliLink}`);


console.log(`Add local wings to path: export PATH="${tmpDir}:$PATH"`)
console.log(`Wing CLI "${alias}": ${wingCliLink}`)
