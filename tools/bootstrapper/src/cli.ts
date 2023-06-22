import assert from "node:assert";
import { execSync } from "node:child_process";
import { mkdirSync, rmSync, symlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { parseArgs } from "node:util";

let currentDir = dirname(new URL(import.meta.url).pathname);
if (process.platform === "win32") {
  // for some reason, dirname returns a path with a leading slash on windows
  currentDir = currentDir.slice(1);
}
currentDir = join(currentDir, "..");

let targetWingSDKSpec = join(currentDir, "..", "..", "libs", "wingsdk");
let targetWingCompilerSpec = join(currentDir, "..", "..", "libs", "wingcompiler");
let targetWingSpec = join(currentDir, "..", "..", "apps", "wing");

let {
  values: { alias, version, sdk, cli, help, output, global, compiler },
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
    compiler: {
      type: "string",
    },
    help: {
      type: "boolean",
      short: "h",
    },
    output: {
      type: "string",
      short: "o",
    },
    global: {
      type: "boolean",
      short: "g",
      default: false,
    },
  },
});

if (help) {
  console.log(`\
Usage: bootstrapper [options]
Options:
  -a, --alias <alias>     Alias for the installation (default: "dev", or version if specified)
  -v, --version <version> Version of wing to install via NPM registry. Cannot be used with --sdk or --cli
  -c, --cli <path>        Local path to wing cli to install. May be tarball or directory. Must be used with --sdk and --compiler
  -s, --sdk <path>        Local path to wing sdk to install. May be tarball or directory. Must be used with --cli and --compiler
      --compiler <path>   Local path to wing compiler to install. May be tarball or directory. Must be used with --cli and --sdk
  -o, --output <path>     Path to symlink to the Wing CLI binary. (default: "scripts/_wing<alias>")
  -g, --global            Install the wing cli globally (default: false)
`);
  process.exit(0);
}

if (version !== undefined) {
  alias = alias ?? version;
  targetWingSpec = `winglang@${version}`;
  targetWingSDKSpec = `@winglang/sdk@${version}`;
  targetWingCompilerSpec = `@winglang/compiler@${version}`;

  if (sdk !== undefined) {
    throw new Error("Cannot specify both version and sdk");
  }
  if (cli !== undefined) {
    throw new Error("Cannot specify both version and cli");
  }
}

if (cli !== undefined) {
  targetWingSpec = cli;
}
if (sdk !== undefined) {
  targetWingSDKSpec = sdk;
}
if (compiler !== undefined) {
  targetWingCompilerSpec = compiler;
}

alias = alias ?? "dev";

const installDir = join(currentDir, "__wing_installs", alias);
const newWingName = `_wing${alias}`;
const wingCliBin = join(installDir, "node_modules", ".bin");
const wingCliLinkFolder = output ?? join(currentDir, "__wing_bin");
const wingCliLink = output ?? join(wingCliLinkFolder, newWingName);
const wingCliLinkFinalFile = join(wingCliLink, "wing");

rmSync(installDir, { recursive: true, force: true });
rmSync(wingCliLink, { force: true });
mkdirSync(installDir, { recursive: true });
mkdirSync(wingCliLinkFolder, { recursive: true });
console.log(`CLI: "${targetWingSpec}"`);
console.log(`SDK: "${targetWingSDKSpec}"`);
console.log(`Compiler: "${targetWingCompilerSpec}"`);

console.log("Installing...");
execSync(`npm init -y`, {
  cwd: installDir,
  stdio: "ignore",
});
const installArgs = [
  "install",
  "--no-audit",
  "--no-progress",
  "--no-fund",
  "--no-package-lock",
  "--install-links=false",
];

if (global) {
  installArgs.push("--global");
}

if (version !== undefined) {
  installArgs.push(targetWingSpec);
} else {
  installArgs.push(targetWingSpec, targetWingSDKSpec, targetWingCompilerSpec);
}

const installOutput = execSync(`npm ${installArgs.join(" ")}`, {
  cwd: installDir,
  stdio: "pipe",
  encoding: "utf-8",
});
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

if (global) {
  console.log(`"wing" installed globally`);
} else {
  symlinkSync(wingCliBin, wingCliLink);

  console.log(wingCliLinkFinalFile);
  console.log();
  console.log(`export PATH="${wingCliLink}:$PATH"`);
}
