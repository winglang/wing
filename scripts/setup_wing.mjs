#!/usr/bin/env node

/**
 * This script is used to create a temporary installation of the wing toolchain (wing cli and sdk)
 */

import { execSync } from "node:child_process";
import { mkdirSync, rmSync, symlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { parseArgs } from "node:util";

const currentDir = dirname(new URL(import.meta.url).pathname);

let targetWingSDKSpec = join(currentDir, "../libs/wingsdk");
let targetWingSpec = join(currentDir, "../apps/wing");

let {
  values: { alias, version, sdk, cli },
} = parseArgs({
  options: {
    alias: {
      type: "string",
      short: "a",
    },
    version: {
      type: "string",
      short: "v",
    },
    sdk: {
      type: "string",
      short: "s",
    },
    cli: {
      type: "string",
      short: "f",
    },
  },
});

if (version !== undefined) {
  alias = alias ?? version;
  targetWingSpec = `winglang@${version}`;
  targetWingSDKSpec = `@winglang/sdk@${version}`;

  if (sdk !== undefined) {
    throw new Error("Cannot specify both version and sdk");
  }
  if (cli !== undefined) {
    throw new Error("Cannot specify both version and cli");
  }
}

if (cli !== undefined) {
  targetWingSpec = `file:${cli}`;
}
if (sdk !== undefined) {
  targetWingSDKSpec = `file:${sdk}`;
}

alias = alias ?? "dev";

const newWingName = `_wing${alias}`;
const installDir = join(currentDir, "__wing_installs");
const localInstallDir = join(installDir, alias);
const wingCliBin = join(localInstallDir, "node_modules", ".bin", "wing");
const wingCliLink = join(currentDir, newWingName);

rmSync(localInstallDir, { recursive: true, force: true });
rmSync(wingCliLink, { force: true });
mkdirSync(localInstallDir, { recursive: true });

console.log(
  `Installing...\n\tWing: "${targetWingSpec}"\n\tSDK: "${targetWingSDKSpec}"\nTo ${localInstallDir}\n\n====================`
);
execSync(`npm init -y`, {
  cwd: localInstallDir,
  stdio: "ignore",
});
execSync(
  `npm install --no-audit --no-fund --no-package-lock --install-links=false ${targetWingSpec} ${targetWingSDKSpec}`,
  {
    cwd: localInstallDir,
    stdio: "inherit",
  }
);

console.log("\n====================\n\n");

// create symlink to point to the local wing cli
symlinkSync(wingCliBin, wingCliLink);

console.log(`Add local wings to path: export PATH="${currentDir}:$PATH"`);
console.log(`Wing CLI "${alias}": ${wingCliLink}`);
