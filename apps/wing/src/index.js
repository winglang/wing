const { dirname, resolve } = require("path");
const { bootstrap } = require("./bootstrap");
const { Command } = require("commander");
const { argv } = require("process");
const { readFile, mkdir } = require("fs/promises");
const { version } = require("../package.json");
const debug = require("debug")("wing:index");

// Note: it is important that these variables are defined as exactly
// they are defined here. These are in the form of "hints" for "pkg"
// see: https://github.com/vercel/pkg#snapshot-filesystem
const WINGC_WASM_PATH = resolve(__dirname, "../wingc.wasm");
const WINGC_CWD = resolve(process.cwd(), ".wing");

async function main() {
  const program = new Command();

  program.name("wing");
  program.version(version);

  program
    .command("bootstrap")
    .description("Bootstraps the given directory for Wing")
    .argument("<context>", "The context directory to bootstrap (e.g. .wing)")
    .action(async (directory) => {
      await bootstrap(directory);
    });

  program
    .command("compile")
    .description("Compile a wing file")
    .argument("<input-file>", "input file")
    .option("-c, --context <context>", "Context directory", WINGC_CURR_WDIR)
    .option("-s, --skip-bootstrap", "Skip automatic bootstrapping")
    .action(async (inputFile, options) => {
      const wingFile = inputFile;
      debug("Wing file: %s", wingFile);
      const wingDir = dirname(wingFile);
      debug("Wing directory: %s", wingDir);
      const workDir = options.context;
      debug("Work directory: %s", workDir);
      const args = [argv[0], wingFile, workDir];
      debug("Arguments: %s", args);

      if (!options.skipBootstrap) {
        await bootstrap(workDir);
      }

      debug("Loading wingc.wasm");
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

      debug("wingc.wasm loaded, preparing the WASI importObject");
      const importObject = { wasi_snapshot_preview1: wasi.wasiImport };
      debug("Compiling wingc.wasm");
      const wasm = await WebAssembly.compile(await readFile(WINGC_WASM_PATH));
      debug("wingc.wasm compiled, instantiating");
      const instance = await WebAssembly.instantiate(wasm, importObject);
      debug("wingc.wasm instantiated, starting");
      wasi.start(instance);
    });

  program.parse();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
