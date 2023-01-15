// for WebAssembly typings:
/// <reference lib="dom" />

import * as vm from "vm";

import { dirname, resolve } from "path";
import { mkdir, readFile } from "fs/promises";

import { WASI } from "wasi";
import { argv } from "process";
import debug from "debug";
import * as chalk from "chalk";

const log = debug("wing:compile");

const WINGC_WASM_PATH = resolve(__dirname, "../../wingc.wasm");
log("wasm path: %s", WINGC_WASM_PATH);
const WINGSDK_RESOLVED_PATH = require.resolve("@winglang/wingsdk");
log("wingsdk module path: %s", WINGSDK_RESOLVED_PATH);
const WINGSDK_MANIFEST_ROOT = resolve(WINGSDK_RESOLVED_PATH, "../..");
log("wingsdk manifest path: %s", WINGSDK_MANIFEST_ROOT);
const WINGC_PREFLIGHT = "preflight.js";

/**
 * Available targets for compilation.
 * This is passed from Commander to the `compile` function.
 */
export enum Target {
  TF_AWS = "tf-aws",
  TF_AZURE = "tf-azure",
  SIM = "sim",
}

/**
 * Compile options for the `compile` command.
 * This is passed from Commander to the `compile` function.
 */
export interface ICompileOptions {
  readonly outDir: string;
  readonly target: Target;
}

/**
 * Compiles a Wing program.
 * @param entrypoint The program .w entrypoint.
 * @param options Compile options.
 */
export async function compile(entrypoint: string, options: ICompileOptions) {
  const wingFile = entrypoint;
  log("wing file: %s", wingFile);
  const wingDir = dirname(wingFile);
  log("wing dir: %s", wingDir);
  const outDir = resolve(options.outDir);
  log("out dir: %s", outDir);
  const workDir = resolve(outDir, ".wing");
  log("work dir: %s", workDir);

  await Promise.all([
    mkdir(workDir, { recursive: true }),
    mkdir(outDir, { recursive: true }),
  ]);

  const args = [argv[0], wingFile, workDir];

  const wasi = new WASI({
    args,
    env: {
      ...process.env,
      RUST_BACKTRACE: "full",
      WINGSDK_MANIFEST_ROOT,
      WINGSDK_SYNTH_DIR: outDir,
      WINGC_PREFLIGHT,
    },
    preopens: {
      [wingDir]: wingDir, // for Rust's access to the source file
      [workDir]: workDir, // for Rust's access to the work directory
      [WINGSDK_MANIFEST_ROOT]: WINGSDK_MANIFEST_ROOT, // .jsii access
      [outDir]: outDir, // for Rust's access to the output directory
    },
  });

  const importObject = { wasi_snapshot_preview1: wasi.wasiImport };
  log("compiling wingc WASM module");
  const wasm = await WebAssembly.compile(await readFile(WINGC_WASM_PATH));
  log("instantiating wingc WASM module");
  const instance = await WebAssembly.instantiate(wasm, importObject);
  log("invoking wingc with importObject: %o", importObject);
  wasi.start(instance);

  const artifactPath = resolve(workDir, WINGC_PREFLIGHT);
  log("reading artifact from %s", artifactPath);
  const artifact = await readFile(artifactPath, "utf-8");
  log("artifact: %s", artifact);

  // If you're wondering how the execution of the preflight works, despite it
  // being in a different directory: it works because at the top of the file
  // require.resolve is called to cache wingsdk in-memory. So by the time VM
  // is starting up, the passed context already has wingsdk in it.
  // "__dirname" is also synthetically changed so nested requires work.
  const context = vm.createContext({
    require,
    process: {
      env: {
        WINGSDK_SYNTH_DIR: outDir,
        WING_TARGET: options.target,
      },
    },
    __dirname: workDir,
    __filename: artifactPath,
  });
  log("evaluating artifact in context: %o", context);

  try {
    vm.runInContext(artifact, context);
  } catch (e) {
    console.error(chalk.bold.red("preflight error:") + " " + (e as any).message);

    if ((e as any).stack && (e as any).stack.includes("evalmachine.<anonymous>:")) {
      console.log();
      console.log("  " + chalk.bold.white("note:") + " " + chalk.white("intermediate javascript code:"));
      const lineNumber = Number.parseInt((e as any).stack.split("evalmachine.<anonymous>:")[1].split(":")[0]) - 1;
      const lines = artifact.split("\n");
      let startLine = Math.max(lineNumber - 2, 0);
      let finishLine = Math.min(lineNumber + 2, lines.length - 1);

      // print line and its surrounding lines
      for (let i = startLine; i <= finishLine; i++) {
        if (i === lineNumber) {
          console.log(chalk.bold.red(">> ") + chalk.red(lines[i]));
        } else {
          console.log("   " + chalk.dim(lines[i]));
        }
      }
    }

    if (process.env.NODE_STACKTRACE) {
      console.error("--------------------------------- STACK TRACE ---------------------------------")
      console.error((e as any).stack);
    } else {
      console.log("  " + chalk.bold.white("note:") + " " + chalk.white("run with `NODE_STACKTRACE=1` environment variable to display a stack trace"));
    }
  }
}
