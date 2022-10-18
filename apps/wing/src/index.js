const { dirname, resolve } = require("path");
const { bootstrap } = require("./bootstrap");
const { Command } = require("commander");
const { argv } = require("process");
const { readFile, mkdir } = require("fs/promises");

// Note: it is important that these variables are defined as exactly
// they are defined here. These are in the form of "hints" for "pkg"
// see: https://github.com/vercel/pkg#snapshot-filesystem
const WINGC_WASM_PATH = resolve(__dirname, "../wingc.wasm");
const WINGC_CURR_WDIR = resolve(process.cwd(), ".wing");

async function main() {
  const { WASI } = require("wasi");

  const program = new Command();

  program.name("wing");

  program
    .command("bootstrap")
    .description("Bootstraps the given directory for Wing")
    .argument("<directory>", "The directory to bootstrap (e.g. .wing)")
    .action(async (directory) => {
      await bootstrap(directory);
    });

  program
    .command("compile")
    .description("Compile a wing file")
    .argument("<input-file>", "input file")
    .option("-o, --out-dir <out-dir>", "Output directory", WINGC_CURR_WDIR)
    .option("-t, --target <target>", "Target platform", "aws-tfe")
    .option("-s, --skip-bootstrap", "Skip automatic bootstrapping")
    .action(async (inputFile, options) => {
      if (!options.skipBootstrap) {
        await bootstrap(WINGC_CURR_WDIR);
      }
      const wingFile = inputFile;
      const wingDir = dirname(wingFile);

      const args = [argv[0], wingFile];

      // create all intermediate files in a .wing directory
      const workdir = ".wing/";
      await mkdir(workdir, { recursive: true });
      args.push(workdir);

      const wasi = new WASI({
        args,
        env: {
          ...process.env,
          RUST_BACKTRACE: "full",
        },
        preopens: {
          [wingDir]: wingDir,
          [workdir]: workdir,
        },
      });

      // Some WASI binaries require:
      const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

      const wasm = await WebAssembly.compile(await readFile(WINGC_WASM_PATH));
      const instance = await WebAssembly.instantiate(wasm, importObject);
      wasi.start(instance);
    });

  program.parse();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
