/// <reference lib="dom" />
import { dirname, resolve } from "path";

import { Command } from "commander";
import { WASI } from "wasi";
import { argv } from "process";
import { mkdirSync } from "fs";
import { readFile } from "fs/promises";
import { spawnSync } from "child_process";

const WINGC_WASM_PATH = resolve(__dirname, "../wingc.wasm");

async function main() {
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

      const wasm = await WebAssembly.compile(await readFile(WINGC_WASM_PATH));
      const instance = await WebAssembly.instantiate(wasm, importObject);
      wasi.start(instance);

      const outdir = options.outDir ?? ".";

      // TODO: compiler should return the path to intermediate.js so we can use it here
      spawnSync(process.execPath, ["intermediate.js"], {
        env: {
          ...process.env,
          WINGSDK_SYNTH_DIR: resolve(outdir),
        },
        stdio: "inherit",
        cwd: workdir,
      });
    });

  program.parse();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
