// for WebAssembly typings:
/// <reference lib="dom" />

import { compile, upgrade } from "./commands";
import { join, resolve } from "path";

import { Command } from "commander";
import debug from "debug";
import open = require("open");

const PACKAGE_VERSION = require("../package.json").version as string;
const failure = (reason: any) => {
  console.error(reason);
  process.exit(1);
};

async function main() {
  const program = new Command();

  program.name("wing");
  program.version(PACKAGE_VERSION);

  await upgrade({ force: false }).catch(failure);

  program
    .command("run")
    .description("Runs a Wing executable in the Wing Console")
    .argument("<executable>", "executable .wx file")
    .action(async (executable: string) => {
      executable = resolve(executable);
      debug("calling wing console protocol with:" + executable);
      open("wing-console://" + executable).catch(failure);
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

main().catch(failure);
