// for WebAssembly typings:
/// <reference lib="dom" />

import { compile, upgrade } from "./commands";
import { join, resolve } from "path";
import { satisfies } from 'compare-versions';

import { Command } from "commander";
import debug from "debug";
import open = require("open");

const PACKAGE_VERSION = require("../package.json").version as string;
const SUPPORTED_NODE_VERSION = require("../package.json").engines.node as string;
const log = debug("wing:cli");

async function main() {
  checkNodeVersion()

  const program = new Command();

  program.name("wing");
  program.version(PACKAGE_VERSION);

  await upgrade({ force: false }).catch(log);

  program
    .command("run")
    .description("Runs a Wing executable in the Wing Console")
    .argument("<executable>", "executable .wx file")
    .action(async (executable: string) => {
      executable = resolve(executable);
      debug("calling wing console protocol with:" + executable);
      open("wing-console://" + executable).catch(log);
    });

  program
    .command("compile")
    .description("Compiles a Wing program")
    .argument("<entrypoint>", "program .w entrypoint")
    .option(
      "-o, --out-dir <out-dir>",
      "Output directory",
      join(process.cwd(), "target")
    )
    .option(
      "-t, --target <target>",
      "Target platform (options: 'tf-aws', 'sim')",
      "tf-aws"
    )
    .action(compile);

  program
    .command("upgrade")
    .description("Upgrades the Wing toolchain to the latest version")
    .action(() => upgrade({ force: true }));

  program.parse();
}

function checkNodeVersion(){
  const supportedVersion = SUPPORTED_NODE_VERSION;

  if(!satisfies(process.version, supportedVersion)){
    console.log(`WARN: You are running node ${process.version} please change to ${supportedVersion}`)
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
