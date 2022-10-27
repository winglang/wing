import wingcURL from './wingc.wasm?url'
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
      WINGC_SKIP_JSII: "1",
      RUST_BACKTRACE: "full",
    },
  });

  const instance = await wasi.instantiate(wasm, {});

  try {
    let file = wasi.fs.open("/code.w", {read: true, write: true, create: true});
    file.writeString(event.data);
    file.seek(0);

    wasi.start(instance);
    const stdout = wasi.getStdoutString();
    let intermediateJS = "";

    const intermediateFile = wasi.fs.open("/code.w.out/preflight.js", {read: true});
    intermediateJS += intermediateFile.readString();

    let procRegex = /fromFile\("(.+index\.js)"/g;
    let procMatch;
    while (procMatch = procRegex.exec(intermediateJS)) {
      const proc = procMatch[1];
      const procPath = `/code.w.out/${proc}`;
      let procFile = wasi.fs.open(procPath, {read: true});
      intermediateJS += `\n\n// ${proc}\n// START\n${procFile.readString()}\n// END`
    }
    
    self.postMessage({
      stdout,
      intermediateJS
    });
  } catch (error) {
    console.error(error);
    self.postMessage({
      stdout: wasi.getStdoutString(),
      intermediateJS: wasi.getStderrString(),
    });
  }
};

self.postMessage("WORKER_READY");