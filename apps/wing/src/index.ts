import { Command } from "commander";
import { ensureWASISupport } from "./init_node";
import { argv, cwd } from "process";
import { readFile } from "fs/promises";
import { dirname } from "path";

// @ts-ignore esbuild handles this
import wingcPath from "../wingc.wasm";

(async () => {
  const WASI = await ensureWASISupport();

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

      if (options.outDir) {
        args.push(options.outDir);
      } 

      const wasi = new WASI({
        args,
        env: {
          ...process.env,
          RUST_BACKTRACE: "full",
        },
        preopens: {
          // TODO This implies out the output directory is the same as the input directory
          [wingDir]: wingDir,
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
})();
