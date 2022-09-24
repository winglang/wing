#! node --experimental-wasi-unstable-preview1



import * as fs from "fs";
import { argv, env, exit } from "process";
import { execSync } from "child_process"

let WASI
try {
  // check if experimental WASI is enabled
  WASI = (await import("wasi")).WASI;
} catch (error) {
  if(error.code === "ERR_MODULE_NOT_FOUND") {
    // run new node process with flag enabled
    execSync(`${argv[0]} --experimental-wasi-unstable-preview1 ${argv.slice(1).join(" ")}`, { stdio: "inherit", env });
    exit(0);
  } else {
    throw error;
  }
}

const wasi = new WASI({
  args: argv,
  env: {
    ...env,
    RUST_BACKTRACE: "full",
  },
  preopens: {
    "/": "/",
  },
});

// Some WASI binaries require:
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasm = await WebAssembly.compile(
  await fs.promises.readFile("./wasm/wingc.wasm")
);
const instance = await WebAssembly.instantiate(wasm, importObject);
wasi.start(instance);