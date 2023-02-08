import debug from "debug";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { WASI } from "wasi";
import { normalPath } from "./util";

const log = debug("wing:compile");

const WINGSDK_RESOLVED_PATH = require.resolve("@winglang/sdk");
const WINGSDK_MANIFEST_ROOT = resolve(WINGSDK_RESOLVED_PATH, "../..");
const WINGC_WASM_PATH = resolve(__dirname, "../wingc.wasm");

export type WingCompilerFunction =
  | "wingc_compile"
  | "wingc_on_did_open_text_document"
  | "wingc_on_did_change_text_document"
  | "wingc_on_completion"
  | "wingc_on_semantic_tokens";

export interface WingCompilerLoadOptions {
  imports?: Record<string, any>;
  preopens?: Record<string, string>;
  env?: Record<string, string>;
}

export async function load(options: WingCompilerLoadOptions) {
  const preopens = {
    // .jsii access
    [WINGSDK_MANIFEST_ROOT]: WINGSDK_MANIFEST_ROOT,
    ...(options.preopens ?? {}),
  } as Record<string, string>;

  if (process.platform === "win32") {
    for (const [key, value] of Object.entries(preopens)) {
      delete preopens[key];
      preopens[normalPath(value)] = value;
    }
  }

  const wasi = new WASI({
    env: {
      ...process.env,
      RUST_BACKTRACE: "full",
      WINGSDK_MANIFEST_ROOT: normalPath(WINGSDK_MANIFEST_ROOT),
      ...(options.env ?? {}),
    },
    preopens,
  });

  const importObject = {
    wasi_snapshot_preview1: wasi.wasiImport,
    ...(options.imports ?? {}),
  };

  log("compiling wingc WASM module");
  const wasm = await WebAssembly.compile(await readFile(WINGC_WASM_PATH));

  log("instantiating wingc WASM module");

  const instance = await WebAssembly.instantiate(wasm, importObject);
  log("invoking wingc with importObject: %o", importObject);

  wasi.initialize(instance);

  return instance;
}

// When WASM stuff returns a value, we need both a pointer and a length,
// We are using 32 bits for each, so we can combine them into a single 64 bit value.
// This is a bit mask to extract the low order 32 bits.
// https://stackoverflow.com/questions/5971645/extracting-high-and-low-order-bytes-of-a-64-bit-integer
const LOW_MASK = 2n ** 32n - 1n;
const HIGH_MASK = BigInt(32);

/**
 * Runs the given WASM function in the Wing Compiler WASM instance.
 *
 * Assumptions:
 * 1. The called WASM function is expecting a pointer and a length representing a string
 * 2. The string will be UTF-8 encoded
 * 3. The string will be less than 2^32 bytes long  (4GB)
 * 4. The WASI instance has already been initialized
 */
export function invoke(
  instance: WebAssembly.Instance,
  func: WingCompilerFunction,
  arg: string
): number | string {
  const exports = instance.exports as any;

  const bytes = new TextEncoder().encode(arg);
  const argPointer = exports.wingc_malloc(bytes.byteLength);

  // track memory to free after the call
  const toFree = [[argPointer, bytes.byteLength]];

  try {
    const argMemoryBuffer = new Uint8Array(
      exports.memory.buffer,
      argPointer,
      bytes.byteLength
    );
    argMemoryBuffer.set(bytes);

    const result = exports[func](argPointer, bytes.byteLength);

    if (result === 0 || result === undefined) {
      return 0;
    } else {
      const returnPtr = Number(result >> HIGH_MASK);
      const returnLen = Number(result & LOW_MASK);

      const entireMemoryBuffer = new Uint8Array(exports.memory.buffer);
      const extractedBuffer = entireMemoryBuffer.slice(
        returnPtr,
        returnPtr + returnLen
      );

      toFree.push([returnPtr, returnLen]);

      return new TextDecoder().decode(extractedBuffer) + "";
    }
  } finally {
    toFree.forEach(([pointer, length]) => {
      exports.wingc_free(pointer, length);
    });
  }
}
