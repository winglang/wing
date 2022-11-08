// for WebAssembly typings:
/// <reference lib="dom" />

import { compile, update } from "./commands";

import { Command } from "commander";
import debug from "debug";
import open from "open";
import { resolve } from "path";

const DEFAULT_UPDATE_RATE = "daily";
const PACKAGE_VERSION = require("../package.json").version as string;
const log = debug("wing:cli");

async function main() {
  const program = new Command();

  program.name("wing");
  program.version(PACKAGE_VERSION);

  await update({ force: false, rate: DEFAULT_UPDATE_RATE });

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
    .option("-o, --out-dir <out-dir>", "Output directory", process.cwd())
    .option(
      "-t, --target <target>",
      "Target platform (options: 'tf-aws', 'sim')",
      "tf-aws"
    )
    .action(compile);

  program
    .command("update")
    .description("Updates Wing toolchain")
    .action(() => update({ force: true, rate: DEFAULT_UPDATE_RATE }));

  program.parse();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
