import { Command } from "commander";
import { ensureWASISupport } from "./init_node";
import { argv } from "process";
import { readFile } from "fs/promises";
import { dirname, join, resolve } from "path";
import { mkdirSync, mkdtempSync } from "fs";
import { tmpdir } from "os";
import { spawnSync } from "child_process";

// @ts-ignore esbuild handles this
import wingcPath from "../wingc.wasm";

async function main() {
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

      const outdir = options.outDir ?? ".";

      // Install Wing SDK
      const wingsdkPath = dirname(
        require.resolve("@monadahq/wingsdk/package.json")
      );
      spawnSync("npm", ["install", `file:${wingsdkPath}`], {
        cwd: workdir,
      });

      // TODO: install any other npm dependencies needed by source code

      // TODO: do not reinstall npm dependencies if they are already installed?

      // TODO: compiler should return the path to intermediate.js so we can use it here
      const outfile = join(workdir, "intermediate.js");
      spawnSync(process.execPath, [outfile], {
        env: {
          ...process.env,
          WINGSDK_SYNTH_DIR: resolve(outdir),
        },
        stdio: "inherit",
      });
    });

  program.parse();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
