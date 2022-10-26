// for WebAssembly typings:
/// <reference lib="dom" />

import * as open from "open";

import { Command } from "commander";
import { compile } from "./commands/compile";
import debug from "debug";
import { stat } from "fs/promises";

const PACKAGE_VERSION = require("../package.json").version as string;
const log = debug("wing:cli");

async function main() {
  const program = new Command();

  program.name("wing");
  program.version(PACKAGE_VERSION);

  program
    .command("run")
    .description("Runs a Wing executable in the Wing Console")
    .argument("<executable>", "executable .wx file")
    .action(async (executable) => {
      if (process.platform === "darwin") {
        debug("looking for wing console");
        const wingConsoleApp = "/Applications/wing-console.app";
        try {
          await stat(wingConsoleApp);
          debug("found wing console");
          await open.openApp(wingConsoleApp, {
            arguments: [`--cloudFile=${executable}`],
          });
          return;
        } catch (e) {
          // ignore
        }
      }
      open("wing://run?path=" + executable).catch(log);
    });

  program
    .command("compile")
    .description("Compiles a Wing program")
    .argument("<entrypoint>", "program .w entrypoint")
    .option("-o, --out-dir <out-dir>", "Output directory", process.cwd())
    .option(
      "-t, --target <target>",
      "Target platform (options: 'tf-aws', 'sim')",
      "tf-aws"
    )
    .action(compile);

  program.parse();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
