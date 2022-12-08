import wingcURL from './wingc.wasm?url'
import { init, WASI } from '@wasmer/wasi';
import { env } from 'process';

const wingsdkJSIIContent = await import('@winglang/wingsdk/.jsii?raw').then(i => i.default);
const wingsdkPackageJsonContent = await import('@winglang/wingsdk/package.json?raw').then(i => i.default);

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
      WINGSDK_MANIFEST_ROOT: '/wingsdk',
      RUST_BACKTRACE: "full",
    },
  });

  const instance = await wasi.instantiate(wasm, {});

  try {
    const defaultFilePerms = {read: true, write: true, create: true}

    let file = wasi.fs.open("/code.w", defaultFilePerms);
    file.writeString(event.data);

    wasi.fs.createDir("/wingsdk");
    let wingsdk_packagejson_file = wasi.fs.open("/wingsdk/package.json", defaultFilePerms);
    wingsdk_packagejson_file.writeString(wingsdkPackageJsonContent);
    let wingsdk_jsii_file = wasi.fs.open("/wingsdk/.jsii", defaultFilePerms);
    wingsdk_jsii_file.writeString(wingsdkJSIIContent);

    wasi.start(instance);
    const stdout = wasi.getStdoutString();
    let intermediateJS = "";

    const intermediateFile = wasi.fs.open("/code.w.out/preflight.js", defaultFilePerms);
    intermediateJS += intermediateFile.readString();

    let procRegex = /fromFile\(.+"(.+index\.js)"/g;
    let procMatch;
    while (procMatch = procRegex.exec(intermediateJS)) {
      const proc = procMatch[1];
      const procPath = `/code.w.out/${proc}`;
      let procFile = wasi.fs.open(procPath, defaultFilePerms);
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