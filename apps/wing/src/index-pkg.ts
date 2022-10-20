import { dirname, resolve } from "path";

import { Command } from "commander";
import { argv } from "process";
import { bootstrap } from "./bootstrap";
import { createSpinner } from "nanospinner";
import debug from "debug";
import { intermediate } from "./intermediate";
import { readFile } from "fs/promises";

const log = debug("wing:index:pkg");

// Note: it is important that these variables are defined as exactly
// they are defined here. These are in the form of "hints" for "pkg"
// see: https://github.com/vercel/pkg#snapshot-filesystem
const WINGC_WASM_PATH = resolve(__dirname, "../wingc.wasm");
const WINGC_CWD = resolve(process.cwd(), ".wing");

async function main() {
  const program = new Command();

  program.name("wing");
  program.version("0.0.0"); // TODO

  async function bootstrapWithSpinner(directory) {
    const spinner = createSpinner();
    spinner.start({ text: `Bootstrapping directory '${directory}'` });
    await bootstrap(directory).catch((err) => {
      log("Error bootstrapping directory: %O", err);
      spinner.error({
        text: `Bootstrap failed. Turn on verbose logging for details`,
      });
    });
    spinner.success({ text: `Bootstrapped successfully` });
  }

  async function intermediateWithSpinner(directory) {
    const spinner = createSpinner();
    spinner.start({ text: `Executing in directory '${directory}'` });
    await intermediate(directory).catch((err) => {
      log("Error executing intermediate: %O", err);
      spinner.error({
        text: `Execution failed. Turn on verbose logging for details`,
      });
    });
    spinner.success({ text: `Executed successfully` });
  }

  program
    .command("bootstrap")
    .description("Bootstraps the given directory for Wing")
    .argument("<context>", "The context directory to bootstrap (e.g. .wing)")
    .action(bootstrapWithSpinner);

  program
    .command("compile")
    .description("Compile a wing file")
    .argument("<input-file>", "input file")
    .option("-c, --context <context>", "Context directory", WINGC_CWD)
    .option("-s, --skip-bootstrap", "Skip automatic bootstrapping")
    .action(async (inputFile, options) => {
      const wingFile = inputFile;
      log("Wing file: %s", wingFile);
      const wingDir = dirname(wingFile);
      log("Wing directory: %s", wingDir);
      const workDir = options.context;
      log("Work directory: %s", workDir);
      const args = [argv[0], wingFile, workDir];
      log("Arguments: %s", args);

      if (!options.skipBootstrap) {
        await bootstrapWithSpinner(workDir);
      }

      log("Loading wingc.wasm");
      const { WASI } = require("wasi");
      const wasi = new WASI({
        args,
        env: {
          ...process.env,
          RUST_BACKTRACE: "full",
        },
        preopens: {
          [wingDir]: wingDir,
          [workDir]: workDir,
        },
      });

      log("wingc.wasm loaded, preparing the WASI importObject");
      const importObject = { wasi_snapshot_preview1: wasi.wasiImport };
      log("Compiling wingc.wasm");
      const wasm = await WebAssembly.compile(await readFile(WINGC_WASM_PATH));
      log("wingc.wasm compiled, instantiating");
      const instance = await WebAssembly.instantiate(wasm, importObject);
      log("wingc.wasm instantiated, starting");
      wasi.start(instance);

      log("Executing intermediate.js");
      await intermediateWithSpinner(workDir);
    });

  program.parse();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
