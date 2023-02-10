// for WebAssembly typings:
/// <reference lib="dom" />

import { compile, docs, test, upgrade, run } from "./commands";
import { join } from "path";
import { satisfies } from 'compare-versions';

import { Command, Option } from "commander";
import debug from "debug";
import { run_server } from "./commands/lsp";

const PACKAGE_VERSION = require("../package.json").version as string;
const SUPPORTED_NODE_VERSION = require("../package.json").engines.node as string;
if (!SUPPORTED_NODE_VERSION) {
  throw new Error("couldn't parse engines.node version from package.json");
}
const log = debug("wing:cli");

async function main() {
  checkNodeVersion()

  const program = new Command();

  program.name("wing");
  program.version(PACKAGE_VERSION);

  await upgrade({ force: false }).catch(log);

  program
    .command("run")
    .alias("it")
    .description("Runs a Wing simulator file in the Wing Console")
    .argument("[simfile]", ".wsim simulator file")
    .action(run);

  program
    .command("lsp")
    .description("Run the Wing language server on stdio")
    .action(run_server);

  program
    .command("compile")
    .description("Compiles a Wing program")
    .argument("<entrypoint>", "program .w entrypoint")
    .option(
      "-o, --out-dir <out-dir>",
      "Output directory - where to place all generated artifacts",
      join(process.cwd(), "target")
    )
    .addOption(
      new Option(
        "-t, --target <target>",
        "Target platform"
      )
        .choices(["tf-aws", "tf-azure", "tf-gcp", "sim", "cdk"])
        .makeOptionMandatory()
    )
    .action(compile);

  program
    .command("test")
    .description("Compiles a Wing program and runs all functions with the word 'test' or start with 'test:' in their resource identifiers")
    .argument("<entrypoint...>", "all entrypoints to test")
    .action(test);

  program
    .command("docs")
    .description("Open the Wing documentation")
    .action(docs);

  program.parse();
}

function checkNodeVersion() {
  const supportedVersion = SUPPORTED_NODE_VERSION;

  if (!satisfies(process.version, supportedVersion)) {
    console.warn(`WARNING: You are running an incompatible node.js version ${process.version}. Compatible engine is: ${supportedVersion}.`)
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
