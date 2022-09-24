#!/usr/bin/env node --no-warnings --experimental-wasi-unstable-preview1

import * as fs from "fs";
import * as url from "url";
import { argv, env, exit } from "process";
import { execSync } from "child_process";

let WASI;
try {
  // check if experimental WASI is enabled
  WASI = (await import("wasi")).WASI;
} catch (error) {
  if (error.code === "ERR_MODULE_NOT_FOUND") {
    // run new node process with flag enabled
    execSync(
      `${argv[0]} --no-warnings --experimental-wasi-unstable-preview1 ${argv
        .slice(1)
        .join(" ")}`,
      { stdio: "inherit", env, cwd: process.cwd() }
    );
    exit(0);
  } else {
    throw error;
  }
}

const args = ["wing", "build"]

if(argv.length === 3) {
  const wingFile = url.fileURLToPath(new URL(argv[argv.length - 1], import.meta.url));
  args.push(wingFile)
} else if (argv.length === 4) {
  const wingFile = url.fileURLToPath(new URL(argv[argv.length - 2], import.meta.url));
  const outdir = url.fileURLToPath(new URL(argv[argv.length - 1], import.meta.url));
  args.push(wingFile)
  args.push(outdir)
}

const wasi = new WASI({
  args,
  env: {
    ...env,
    RUST_BACKTRACE: "full",
  },
  preopens: {
    // map the virtual root to the actual root
    "/": "/",
  },
});

// Some WASI binaries require:
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

const wasm = await WebAssembly.compile(
  await fs.promises.readFile(
    url.fileURLToPath(new URL("./wasm/wingc.wasm", import.meta.url))
  )
);
const instance = await WebAssembly.instantiate(wasm, importObject);
wasi.start(instance);
