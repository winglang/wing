import { Command } from "commander";
import { argv } from "process";
import { dirname } from "path";
import { mkdirSync } from "fs";
import { readFile } from "fs/promises";
// @ts-ignore esbuild handles this
import wingcPath from "../wingc.wasm";

async function main() {
  const { WASI } = await import("wasi");

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
      mkdirSync(workdir, { recursive: true });
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

      const wasm = await WebAssembly.compile(
        await readFile(require.resolve(wingcPath))
      );
      const instance = await WebAssembly.instantiate(wasm, importObject);
      wasi.start(instance);
    });

  program.parse();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
