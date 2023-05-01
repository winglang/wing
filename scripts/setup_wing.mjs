#!/usr/bin/env node

/**
 * This script is used to create a temporary installation of the wing toolchain (wing cli and sdk)
 */

import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// parse arg
// [target]
// If version is not specified, the will use the local dev version
const targets = process.argv.slice(2);
let alias = "local";
const currentDir = new URL(import.meta.url).pathname
  .split("/")
  .slice(0, -1)
  .join("/");

let targetWingSDKSpec = join(currentDir, "../libs/wingsdk");
let targetWingSpec = join(currentDir, "../apps/wing");

for (const target in targets) {
  const [name, spec] = target.split("=");

  if (name === "version") {
    targetWingSpec = `winglang@${spec}`;
    targetWingSDKSpec = `@winglang/sdk@${spec}`;
  } else if (name === "file") {
    targetWingSpec = `file:${spec}`;
    targetWingSDKSpec = `file:${spec}`;
  } else if (name === "alias") {
    alias = spec;
  }
}

const basePackageJson = {
  name: "wing-local",
  description: "",
  version: "0.0.0",
  dependencies: {
    "@winglang/sdk": targetWingSDKSpec,
    winglang: targetWingSpec,
  },
  devDependencies: {},
};

const shellEnv = {
  ...process.env,
  npm_config_audit: "false",
  npm_config_progress: "false",
  npm_config_yes: "true",
  npm_config_color: "false",
  npm_config_foreground_scripts: "true",
};

const newWingName = `wing_${alias}`;

const tmpDir = join(currentDir, "tmp");
const localInstallDir = join(tmpDir, `.${newWingName}`);

mkdirSync(localInstallDir, { recursive: true });
writeFileSync(
  join(localInstallDir, "package.json"),
  JSON.stringify(basePackageJson, null, 2)
);

console.log(`Installing wing cli and sdk at ${localInstallDir}...\n\n====================`);
execSync("npm install --no-package-lock --install-links=false", {
  cwd: localInstallDir,
  env: shellEnv,
  stdio: "inherit",
});

console.log("\n====================\n\nDone\n");

// create symlink to point to the local wing cli
const wingCliBin = join(localInstallDir, "node_modules", ".bin", "wing");
const wingCliLink = join(tmpDir, newWingName);
execSync(`ln -sf ${wingCliBin} ${wingCliLink}`);

console.log(`Wing cli installed at ${wingCliLink}`)
