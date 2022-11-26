// for WebAssembly typings:
/// <reference lib="dom" />

import { compile, upgrade } from "./commands";
import { join, resolve } from "path";
import {compare} from 'compare-versions';

import { Command } from "commander";
import debug from "debug";
import open = require("open");

const PACKAGE_VERSION = require("../package.json").version as string;
const log = debug("wing:cli");

async function main() {
  const program = new Command();

  program.name("wing");
  program.version(PACKAGE_VERSION);

  await upgrade({ force: false }).catch(log);

  program
    .command("run")
    .description("Runs a Wing executable in the Wing Console")
    .hook('preAction', checkNodeVersion)
    .argument("<executable>", "executable .wx file")
    .action(async (executable: string) => {
      executable = resolve(executable);
      debug("calling wing console protocol with:" + executable);
      open("wing-console://" + executable).catch(log);
    });

  program
    .command("compile")
    .description("Compiles a Wing program")
    .hook('preAction', checkNodeVersion)
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
    .hook('preAction', checkNodeVersion)
    .action(() => upgrade({ force: true }));

  program.parse();
}

function checkNodeVersion(){
  const minVer = "18.0.0"

  if(compare(process.version, minVer, "<"))
    console.log("WARN: You are running node " + process.version + " please update to >=" + minVer)
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
