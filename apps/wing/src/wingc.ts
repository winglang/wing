import debug from "debug";
import { normalPath } from "./util";
import WASI from "wasi-js";
import { resolve } from "path";
import wasiBindings from "wasi-js/dist/bindings/node";
import { exec } from "child_process";
import { promisify } from "util";

const log = debug("wing:compile");

export type WingCompilerFunction =
  | "wingc_compile"
  | "wingc_on_did_open_text_document"
  | "wingc_on_did_change_text_document"
  | "wingc_on_completion"
  | "wingc_on_goto_definition"
  | "wingc_on_document_symbol"
  | "wingc_on_semantic_tokens"
  | "wingc_on_hover";

export interface WingCompilerLoadOptions {
  /**
   * Additional imports to pass to the WASI instance. Imports objects/functions that WASM code can invoke.
   *
   * @default `{ wasi_snapshot_preview1: wasi.wasiImport, env: { send_notification: () => {} }`
   */
  imports?: Record<string, any>;

  /**
   * Preopen directories for the WASI instance.
   * These are directories that the sandboxed WASI instance can access.
   * The also represent mappings from the WASI instance's filesystem to the host filesystem. (map key -> value)
   *
   * The following directories are always preopened:
   * - The `@winglang/sdk` module directory
   * - All local and global node_modules directories (module.paths)
   *
   * @default - No additional preopens are added other than the above
   */
  preopens?: Record<string, string>;

  /**
   * Environment variables to pass to the WASI instance.
   *
   * The following variables are always set:
   *
   * - Current process environment variables
   * - `RUST_BACKTRACE`=`full`
   * - `WINGSDK_MANIFEST_ROOT`=The path to the `@winglang/sdk` module
   *
   *
   * @default - No additional envs are added other than the above
   */
  env?: Record<string, string>;

  /**
   * A filesystem for the WASI instance to use.
   *
   * @default - The `fs` module from Node.js
   */
  fs?: typeof import("fs");

  /**
   * The bytes of the `wingc.wasm` data loaded into memory.
   *
   * @default - The wingc.wasm bundled with this package is read from disk.
   */
  wingcWASMData?: Uint8Array;

  /**
   * The path to a directory containing the `@winglang/sdk` module
   *
   * @default - The `@winglang/sdk` module is resolved via `require.resolve()`.
   */
  wingsdkManifestRoot?: string;
}

export async function load(options: WingCompilerLoadOptions) {
  const fs: typeof import("fs") = options.fs ?? require("fs");
  const WINGSDK_MANIFEST_ROOT =
    options.wingsdkManifestRoot ??
    // using resolve.call so webpack will ignore the sdk package
    resolve(require.resolve.call(null, "@winglang/sdk"), "../..");

  let preopens: Record<string, string> = {};

  // preopen everything
  preopens["/"] = "/";
  preopens["."] = resolve(".");

  if (process.platform === "win32") {
    const wmicCommand = await promisify(exec)("wmic logicaldisk get name");
    if (wmicCommand.stderr) {
      throw new Error(
        `Unable to get available system drives to run WASM compiler: ${wmicCommand.stderr}`
      );
    }

    const drives = wmicCommand.stdout
      .split("\r\r\n")
      .filter((value) => /[A-Za-z]:/.test(value))
      .map((value) => value.trim());

    for (const drive of drives) {
      preopens[normalPath(drive)] = drive;
    }
  } else {
    // mapping the root is not sufficient on linux/mac
    // we need to also map all directories in the root
    const rootFiles = await fs.promises.readdir("/");
    for (const file of rootFiles) {
      // skip files and dot dirs
      const fullPath = `/${file}`;
      if (
        !file.startsWith(".") &&
        (await fs.promises.lstat(fullPath)).isDirectory()
      ) {
        try {
          await fs.promises.access(fullPath, fs.constants.R_OK | fs.constants.F_OK);
          preopens[fullPath] = fullPath;
        } catch {
          // can't access the file, don't bother preopening it
        }
      }
    }
  }

  // Ensure all relative paths are preopened
  // crawl up to the root and add .. for each
  let dirI = 1;
  while (true) {
    const dir = "../".repeat(dirI++);
    const resolvedDir = resolve(dir);
    preopens[dir.slice(0, -1)] = resolvedDir;
    if (resolvedDir === "/" || resolvedDir.match(/^[A-Z]:\\$/i)) {
      break;
    } else if (dirI > 100) {
      throw new Error(
        `Unable to find root directory to preopen for WASM compiler`
      );
    }
  }

  // add provided preopens
  preopens = {
    ...preopens,
    ...(options.preopens ?? {}),
  };

  // check if running in browser
  const bindings = {
    ...wasiBindings,
    fs,
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
    new Uint8Array(
      await fs.promises.readFile(resolve(__dirname, "../wingc.wasm"))
    );
  const mod = new WebAssembly.Module(binary);

  log("instantiating wingc WASM module with importObject: %o", importObject);
  const instance = new WebAssembly.Instance(mod, importObject);

  log("starting wingc WASM module");
  wasi.start(instance);

  return instance;
}

// When WASM stuff returns a value, we need both a pointer and a length,
// We are using 32 bits for each, so we can combine them into a single 64 bit value.
// This is a bit mask to extract the low order 32 bits.
// https://stackoverflow.com/questions/5971645/extracting-high-and-low-order-bytes-of-a-64-bit-integer
const LOW_MASK = 2n ** 32n - 1n;
const HIGH_MASK = BigInt(32);

// From diagnostic.rs
export interface WingDiagnostic {
  message: string;
  span: {
    start: {
      line: number;
      col: number;
    };
    end: {
      line: number;
      col: number;
    };
    file_id: string;
  };
  level: "Error" | "Warning" | "Note";
}

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
