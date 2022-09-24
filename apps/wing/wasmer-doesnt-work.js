#!/usr/bin/env node

// wasmer-js doesn't seem to use the proper fs implementation

import { init, WASI } from '@wasmer/wasi';
import * as fs from 'fs';
import { argv, env } from 'process';

await init();

let wasi = new WASI({
  args: argv,
  env: {
    ...env,
    RUST_BACKTRACE: "full",
  },
});
const wasm = await WebAssembly.compile(
  fs.readFileSync('../../target/wasm32-wasi/debug/wingc.wasm')
);

const instance = await wasi.instantiate(wasm, {});

try {
  let exitCode = wasi.start(instance);
  let stdout = wasi.getStdoutString();
  
  console.log(exitCode, stdout);
} catch (error) {
  console.error(wasi.getStderrString());
}
