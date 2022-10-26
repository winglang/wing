// for WebAssembly typings:
/// <reference lib="dom" />

import * as open from "open";

import { Command } from "commander";
import { compile } from "./commands/compile";

const PACKAGE_VERSION = require("../package.json").version as string;

async function main() {
  const program = new Command();

  program.name("wing");
  program.version(PACKAGE_VERSION);

  program
    .command("run")
    .description("Runs a Wing intermediate file in Wing Simulator")
    .argument("<input-file>", "input file")
    .action(async (inputFile) => {
      open("wing://run?path=" + inputFile, { wait: true });
    });

  program
    .command("compile")
    .description("Compiles a wing file")
    .argument("<input-file>", "input file")
    .option("-o, --out-dir <out-dir>", "Output directory", process.cwd())
    .option("-t, --target <target>", "Target platform", "tf-aws")
    .action(compile);

  program.parse();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
