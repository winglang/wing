const { dirname, resolve } = require("path");

const { Command } = require("commander");
const { argv } = require("process");
const { readFile, mkdir } = require("fs/promises");

const wingcPath = resolve(__dirname, "../wingc.wasm");

async function main() {
  const { WASI } = require("wasi");

  const program = new Command();

  program.name("wing");

  program
    .command("compile")
    .description("Compile a wing file")
    .argument("<input-file>", "input file")
    .option("-o, --out-dir <out-dir>", "Output directory")
    .option("-t, --target <target>", "Target platform")
    .action(async (inputFile, options) => {
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

      const wasm = await WebAssembly.compile(await readFile(wingcPath));
      const instance = await WebAssembly.instantiate(wasm, importObject);
      wasi.start(instance);
    });

  program.parse();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
