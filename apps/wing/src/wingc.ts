import debug from "debug";
import { readFileSync } from "fs";
import { normalPath } from "./util";
import WASI from "wasi-js";
import { resolve } from "path";
import wasiBindings from "wasi-js/dist/bindings/node";

const log = debug("wing:compile");

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
  fs?: any;
  wingcWASMData?: Uint8Array;
  wingsdkManifestRoot?: string;
}

export async function load(options: WingCompilerLoadOptions) {
  const WINGSDK_MANIFEST_ROOT =
    options.wingsdkManifestRoot ??
    resolve(require.resolve("@winglang/sdk"), "../..");

  const preopens = {
    "/": "/",
    // .jsii access
    [WINGSDK_MANIFEST_ROOT]: WINGSDK_MANIFEST_ROOT,
    ...(options.preopens ?? {}),
  } as Record<string, string>;

  if (process.platform === "win32") {
    preopens["C:\\"] = "C:\\";
    for (const [key, value] of Object.entries(preopens)) {
      delete preopens[key];
      preopens[normalPath(value)] = value;
    }
  }

  // check if running in browser
  const bindings = {
    ...wasiBindings,
    fs: options.fs ?? require("fs"),
  };

  const wasi = new WASI({
    bindings,
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
    env: {
      // This function is used only by the lsp
      send_notification: () => {},
    },
    ...(options.imports ?? {}),
  } as any;

  log("compiling wingc WASM module");
  const binary =
    options.wingcWASMData ??
    new Uint8Array(readFileSync(resolve(__dirname, "../wingc.wasm")));
  const mod = new WebAssembly.Module(binary);

  log("instantiating wingc WASM module with importObject: %o", importObject);
  const instance = new WebAssembly.Instance(mod, importObject);

  wasi.start(instance);

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
 * ### IMPORTANT
 * For Windows support, ensure all paths provided by args or env are normalized to use forward slashes.
 *
 * ### Assumptions
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

    if (result === 0 || result === undefined || result === 0n) {
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
