// for WebAssembly typings:
/// <reference lib="dom" />

import * as vm from "vm";

import { dirname, resolve } from "path";
import { mkdir, readFile } from "fs/promises";

import { WASI } from "wasi";
import { argv } from "process";
import debug from "debug";

const log = debug("wing:compile");

const WINGC_WASM_PATH = resolve(__dirname, "../../wingc.wasm");
log("wasm path: %s", WINGC_WASM_PATH);
const WINGSDK_RESOLVED_PATH = require.resolve("@monadahq/wingsdk");
log("wingsdk module path: %s", WINGSDK_RESOLVED_PATH);
const WINGSDK_MANIFEST_ROOT = resolve(WINGSDK_RESOLVED_PATH, "../..");
log("wingsdk manifest path: %s", WINGSDK_MANIFEST_ROOT);
const WINGC_ARTIFACT_NAME = "intermediate.js";

interface ICompileOptions {
  outDir: string;
  target: string;
}

export async function compile(entrypoint: string, options: ICompileOptions) {
  const wingFile = inputFile;
  log("wing file: %s", wingFile);
  const wingDir = dirname(wingFile);
  log("wing dir: %s", wingDir);
  const outDir = resolve(options.outDir);
  log("out dir: %s", outDir);
  const workDir = resolve(outDir, ".wing");
  log("work dir: %s", workDir);

  await mkdir(workDir, { recursive: true });

  const args = [argv[0], wingFile, workDir];

  const wasi = new WASI({
    args,
    env: {
      ...process.env,
      RUST_BACKTRACE: "full",
      WINGSDK_MANIFEST_ROOT,
      WINGC_ARTIFACT_NAME,
    },
    preopens: {
      [wingDir]: wingDir, // for Rust's access to the source file
      [workDir]: workDir, // for Rust's access to the work directory
      [WINGSDK_MANIFEST_ROOT]: WINGSDK_MANIFEST_ROOT, // .jsii access
    },
  });

  const importObject = { wasi_snapshot_preview1: wasi.wasiImport };
  log("compiling wingc WASM module");
  const wasm = await WebAssembly.compile(await readFile(WINGC_WASM_PATH));
  log("instantiating wingc WASM module");
  const instance = await WebAssembly.instantiate(wasm, importObject);
  log("invoking wingc with importObject: %o", importObject);
  wasi.start(instance);

  const artifactPath = resolve(workDir, WINGC_ARTIFACT_NAME);
  log("reading artifact from %s", artifactPath);
  const artifact = await readFile(artifactPath, "utf-8");
  log("artifact: %s", artifact);

  // If you're wondering how the execution of the artifact works, despite it
  // being in a different directory: it works because at the top of the file
  // require.resolve is called to cache wingsdk in-memory. So by the time VM
  // is starting up, the passed context already has wingsdk in it.
  // "__dirname" is also synthetically changed so nested requires work.
  const context = vm.createContext({
    require,
    process: {
      env: {
        WINGSDK_SYNTH_DIR: outDir,
      },
    },
    __dirname: workDir,
    __filename: artifactPath,
  });
  log("evaluating artifact in context: %o", context);
  vm.runInContext(artifact, context);
}
