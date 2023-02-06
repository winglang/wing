// for WebAssembly typings:
/// <reference lib="dom" />

import * as vm from "vm";

import { basename, dirname, join, resolve } from "path/posix";
import { mkdir, readFile } from "fs/promises";

import { WASI } from "wasi";
import debug from "debug";
import * as chalk from "chalk";

const log = debug("wing:compile");
const WINGC_COMPILE = "wingc_compile";

const WINGC_WASM_PATH = normalPath(resolve(__dirname, "../../wingc.wasm"));
log("wasm path: %s", WINGC_WASM_PATH);
const WINGSDK_RESOLVED_PATH = normalPath(require.resolve("@winglang/sdk"));
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
  TF_GCP = "tf-gcp",
  SIM = "sim",
}

const DEFAULT_SYNTH_DIR_SUFFIX: Record<Target, string | undefined> = {
  [Target.TF_AWS]: "tfaws",
  [Target.TF_AZURE]: "tfazure",
  [Target.TF_GCP]: "tfgcp",
  [Target.SIM]: undefined,
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
 * Normalizes paths from windows to posix.
 */
function normalPath(path: string) {
  return path.replace(/\\/g, "/");
}

/**
 * Determines the synth directory for a given target. This is the directory
 * within the output directory where the SDK app will synthesize its artifacts
 * for the given target.
 */
function resolveSynthDir(outDir: string, entrypoint: string, target: Target) {
  const targetDirSuffix = DEFAULT_SYNTH_DIR_SUFFIX[target];
  if (targetDirSuffix === undefined) {
    // this target produces a single artifact, so we don't need a subdirectory
    return outDir;
  }
  const entrypointName = basename(entrypoint, ".w");
  return join(outDir, `${entrypointName}.${targetDirSuffix}`);
}

/**
 * Compiles a Wing program.
 * @param entrypoint The program .w entrypoint.
 * @param options Compile options.
 */
export async function compile(entrypoint: string, options: ICompileOptions) {
  const wingFile = normalPath(entrypoint);
  log("wing file: %s", wingFile);
  const wingDir = dirname(wingFile);
  log("wing dir: %s", wingDir);
  const synthDir = resolveSynthDir(options.outDir, wingFile, options.target);
  log("synth dir: %s", synthDir);
  const workDir = resolve(synthDir, ".wing");
  log("work dir: %s", workDir);

  await Promise.all([
    mkdir(workDir, { recursive: true }),
    mkdir(synthDir, { recursive: true }),
  ]);

  const wasi = new WASI({
    env: {
      ...process.env,
      RUST_BACKTRACE: "full",
      WINGSDK_MANIFEST_ROOT,
      WINGSDK_SYNTH_DIR: synthDir,
      WINGC_PREFLIGHT,
    },
    preopens: {
      [wingDir]: wingDir, // for Rust's access to the source file
      [workDir]: workDir, // for Rust's access to the work directory
      [WINGSDK_MANIFEST_ROOT]: WINGSDK_MANIFEST_ROOT, // .jsii access
      [synthDir]: synthDir, // for Rust's access to the synth directory
    },
  });

  const importObject = { wasi_snapshot_preview1: wasi.wasiImport };
  log("compiling wingc WASM module");
  const wasm = await WebAssembly.compile(await readFile(WINGC_WASM_PATH));
  log("instantiating wingc WASM module");
  const instance = await WebAssembly.instantiate(wasm, importObject);
  log("invoking wingc with importObject: %o", importObject);
  wasi.initialize(instance);

  const arg = `${wingFile};${workDir}`;
  log(`invoking %s with: "%s"`, WINGC_COMPILE, arg);
  await wingcInvoke(instance, WINGC_COMPILE, arg);

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
        WINGSDK_SYNTH_DIR: synthDir,
        WING_TARGET: options.target
      },
    },
    __dirname: workDir,
    __filename: artifactPath,

    // since the SDK is loaded in the outer VM, we need these to be the same class instance,
    // otherwise "instanceof" won't work between preflight code and the SDK. this is needed e.g. in
    // `serializeImmutableData` which has special cases for serializing these types.
    Map,
    Set,
    Array,
    Promise,
    Object,
    RegExp,
    String,
    Date,
    Function,
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

/**
 * Assumptions:
 * 1. The called WASM function is expecting a pointer and a length representing a string
 * 2. The string will be UTF-8 encoded
 * 3. The string will be less than 2^32 bytes long  (4GB)
 * 4. the WASI instance has already been started
 */
async function wingcInvoke(
  instance: WebAssembly.Instance,
  func: string,
  arg: string
) {
  const exports = instance.exports as any;

  const bytes = new TextEncoder().encode(arg);
  const argPointer = exports.wingc_malloc(bytes.byteLength);

  try {
    const argMemoryBuffer = new Uint8Array(
      exports.memory.buffer,
      argPointer,
      bytes.byteLength
    );
    argMemoryBuffer.set(bytes);
  
    exports[func](argPointer, bytes.byteLength);
  } finally {
    exports.wingc_free(argPointer, bytes.byteLength);
  }
}
