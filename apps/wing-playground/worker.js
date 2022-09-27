import wingcURL from '../../target/wasm32-wasi/debug/wingc.wasm?url'
import { init, WASI } from '@wasmer/wasi';
import { env } from 'process';

await init();

const wasm = await WebAssembly.compileStreaming(fetch(wingcURL));

self.onmessage = async event => {
  if(event.data === '') {
    self.postMessage(undefined);
    return;
  }

  let wasi = new WASI({
    args: ['wingc', 'code.w'],
    env: {
      ...env,
      RUST_BACKTRACE: "full",
    },
  });

  const instance = await wasi.instantiate(wasm, {});

  try {
    let file = wasi.fs.open("/code.w", {read: true, write: true, create: true});
    file.writeString(event.data);
    file.seek(0);

    wasi.start(instance);
    let stdout = wasi.getStdoutString();

    let procRegex = /fromFile\("(.+index\.js)"/g;
    let procMatch;
    while (procMatch = procRegex.exec(stdout)) {
      const proc = procMatch[1];
      let procFile = wasi.fs.open("/code.w.out/" + proc, {read: true, write: false, create: false});
      stdout += `\n\n// ${proc}\n// START\n${procFile.readString()}\n// END`
    }
    
    self.postMessage(stdout);
  } catch (error) {
    console.error(error);
    self.postMessage(wasi.getStderrString());
  }
};

self.postMessage("WORKER_READY");