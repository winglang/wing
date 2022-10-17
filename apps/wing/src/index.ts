import { Command } from "commander";
import { ensureWASISupport } from "./init_node";
import { argv } from "process";
import { readFile } from "fs/promises";
import { dirname, resolve } from "path";
import { mkdirSync } from "fs";
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

      installSdk(wingDir);

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

function installSdk(workdir: string) {
  const toolchainVersion = require("../package.json").version;
  let wingsdkVersion;
  if (toolchainVersion === "0.0.0") {
    const wingsdkPath = dirname(
      require.resolve("@monadahq/wingsdk/package.json")
    );
    wingsdkVersion = `file:${wingsdkPath}`;
  } else {
    wingsdkVersion = `@monadahq/wingsdk@${toolchainVersion}`;
  }

  spawnSync("npm", ["install", wingsdkVersion, "--no-audit"], {
    cwd: workdir,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
