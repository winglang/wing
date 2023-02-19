import wingcURL from "./wingc.wasm?url";
import { init, WASI } from "@wasmer/wasi";
import { env } from "process";

const WINGC_COMPILE = "wingc_compile";

const wingsdkJSIIContent = await import("@winglang/sdk/.jsii?raw").then(
  (i) => i.default
);
const wingsdkPackageJsonContent = await import(
  "@winglang/sdk/package.json?raw"
).then((i) => i.default);

await init();

const wasm = await WebAssembly.compileStreaming(fetch(wingcURL));

let wasi = new WASI({
  env: {
    ...env,
    WINGSDK_MANIFEST_ROOT: "/wingsdk",
    RUST_BACKTRACE: "full",
  },
});

const instance = wasi.instantiate(wasm, {
  env: {
    // This function is used by the language server, which is not used in the playground
    send_notification: () => {},
  }
});

const defaultFilePerms = { read: true, write: true, create: true };
wasi.fs.createDir("/wingsdk");
let wingsdk_packagejson_file = wasi.fs.open(
  "/wingsdk/package.json",
  defaultFilePerms
);
wingsdk_packagejson_file.writeString(wingsdkPackageJsonContent);
let wingsdk_jsii_file = wasi.fs.open("/wingsdk/.jsii", defaultFilePerms);
wingsdk_jsii_file.writeString(wingsdkJSIIContent);

self.onmessage = async (event) => {
  if (event.data === "") {
    self.postMessage(undefined);
    return;
  }

  try {
    let file = wasi.fs.open("/code.w", defaultFilePerms);
    file.writeString(event.data);

    const compileResult = wingcInvoke(instance, WINGC_COMPILE, "code.w");
    const stderr = wasi.getStderrString();
    if (stderr) {
      throw stderr;
    }
    if (compileResult !== 0) {
      throw compileResult;
    }

    const stdout = wasi.getStdoutString();
    let intermediateJS = "";

    const intermediatePath = "/code.w.out/preflight.js";
    const intermediateFile = wasi.fs.open(intermediatePath, defaultFilePerms);
    intermediateJS += intermediateFile.readString();
    wasi.fs.removeFile(intermediatePath);

    let procRegex = /fromFile\(.+"(.+index\.js)"/g;
    let procMatch;
    while ((procMatch = procRegex.exec(intermediateJS))) {
      const proc = procMatch[1];
      const procPath = `/code.w.out/${proc}`;
      let procFile = wasi.fs.open(procPath, defaultFilePerms);
      intermediateJS += `\n\n// ${proc}\n// START\n${procFile.readString()}\n// END`;
      wasi.fs.removeFile(procPath);
    }

    self.postMessage({
      stdout,
      stderr: wasi.getStderrString(),
      intermediateJS,
    });
  } catch (error) {
    console.error(error);
    self.postMessage({
      stderr: error,
      stdout: wasi.getStdoutString(),
      intermediateJS: null,
    });
  } finally {
    try {
      wasi.fs.removeFile("/code.w");
    } catch (error) {}
  }
};

self.postMessage("WORKER_READY");

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
export function wingcInvoke(
  instance,
  func,
  arg
) {
  const exports = instance.exports;

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
