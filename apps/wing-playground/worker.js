import { load, invoke } from "winglang";
import { createFsFromVolume } from "@cowasm/memfs";
import wingcURL from "./wingc.wasm?url";
import { Volume } from "@cowasm/memfs";

const wingsdkJSIIContent = await import("@winglang/sdk/.jsii?raw").then(
  (i) => i.default
);
const wingsdkPackageJsonContent = await import(
  "@winglang/sdk/package.json?raw"
).then((i) => i.default);

const fs = createFsFromVolume(
  Volume.fromJSON({
    "/wingsdk/package.json": wingsdkPackageJsonContent,
    "/wingsdk/.jsii": wingsdkJSIIContent,
  })
);

let wasmFetchData = await fetch(wingcURL).then((d) => d.arrayBuffer());
const wingcWASMData = new Uint8Array(wasmFetchData);

const wingc = await load({
  env: {
    RUST_BACKTRACE: "full",
  },
  fs: fs,
  wingcWASMData,
  wingsdkManifestRoot: "/wingsdk",
});

self.onmessage = async (event) => {
  if (event.data === "") {
    self.postMessage(undefined);
    return;
  }

  try {
    fs.writeFileSync("/code.w", event.data);

    const compileResult = invoke(wingc, "wingc_compile", "/code.w");

    if (compileResult !== 0) {
      throw compileResult;
    }

    let intermediateJS = "";

    intermediateJS += fs.readFileSync("/code.w.out/preflight.js").toString();

    let procRegex = /fromFile\(.+"(.+index\.js)"/g;
    let procMatch;
    while ((procMatch = procRegex.exec(intermediateJS))) {
      const proc = procMatch[1];
      const procPath = `/code.w.out/${proc}`;
      let procFile = fs.readFileSync(procPath);
      intermediateJS += `\n\n// ${proc}\n// START\n${procFile}\n// END`;
    }

    self.postMessage({
      stdout: "",
      stderr: "",
      intermediateJS,
    });
  } catch (error) {
    self.postMessage({
      stderr: error,
      stdout: "",
      intermediateJS: null,
    });
  }
};

self.postMessage("WORKER_READY");
