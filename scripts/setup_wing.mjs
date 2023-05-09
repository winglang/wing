#!/usr/bin/env node

/**
 * Creates a temporary installation of the wing toolchain (wing cli and sdk)
 *
 * --help to see options
 */

import assert from "node:assert";
import { execSync } from "node:child_process";
import { mkdirSync, rmSync, symlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { parseArgs } from "node:util";

const currentDir = dirname(new URL(import.meta.url).pathname);

let targetWingSDKSpec = join(currentDir, "../libs/wingsdk");
let targetWingSpec = join(currentDir, "../apps/wing");

let {
  values: { alias, version, sdk, cli, help, output },
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
      short: "c",
    },
    help: {
      type: "boolean",
      short: "h",
    },
    output: {
      type: "string",
      short: "o",
    }
  },
});

if (help) {
  console.log(`\
Usage: setup_wing.mjs [options]

Options:
  -a, --alias <alias>     Alias for the installation (default: "dev", or version if specified)
  -v, --version <version> Registry-available version of wing to install. Cannot be used with --sdk or --cli
  -c, --cli <path>        Local path to wing cli to install. May be tarball or directory. Must be used with --sdk
  -s, --sdk <path>        Local path to wing sdk to install. May be tarball or directory. Must be used with --sdk
  -o, --output <path>     Path to symlink to the Wing CLI binary. (default: "scripts/_wing<alias>")
`);
  process.exit(0);
}

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
const wingCliLink = output ?? join(currentDir, newWingName);

rmSync(localInstallDir, { recursive: true, force: true });
rmSync(wingCliLink, { force: true });
mkdirSync(localInstallDir, { recursive: true });
console.log(`CLI: "${targetWingSpec}"`);
console.log(`SDK: "${targetWingSDKSpec}"`);

console.log("Installing...");
execSync(`npm init -y`, {
  cwd: localInstallDir,
  stdio: "ignore",
});
const installOutput = execSync(
  `npm install --no-audit --foreground-scripts --no-progress --no-fund --no-package-lock --install-links=false ${targetWingSpec} ${targetWingSDKSpec}`,
  {
    cwd: localInstallDir,
    stdio: "pipe",
    encoding: "utf-8",
  }
);
console.log(installOutput);

const installHooks = installOutput.match(/>.*/g)?.map((s) => s) ?? [];
assert.equal(
  installHooks.length,
  0,
  `Install contains unexpected script hooks: \n${installHooks}`
);
assert.doesNotMatch(
  installOutput,
  / warn /,
  `Install contains unexpected warning`
);

console.log("===");

symlinkSync(wingCliBin, wingCliLink);

console.log(wingCliLink);
console.log();
console.log(`export PATH="${currentDir}:$PATH"`);
