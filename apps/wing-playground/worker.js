import { load, invoke } from "winglang";
import wingcURL from "winglang/wingc.wasm?url";
import { Volume, createFsFromVolume } from "@cowasm/memfs";

const wingsdkJSIIContent = await import("@winglang/sdk/.jsii?raw").then(
  (i) => i.default
);
const wingsdkPackageJsonContent = await import(
  "@winglang/sdk/package.json?raw"
).then((i) => i.default);
const constructsPackageJsonContent = await import(
  "constructs/package.json?raw"
).then((i) => i.default);
const constructsJSIIContent = await import("constructs/.jsii?raw").then(
  (i) => i.default
);

const fs = createFsFromVolume(
  Volume.fromJSON({
    "/node_modules/wingsdk/package.json": wingsdkPackageJsonContent,
    "/node_modules/wingsdk/.jsii": wingsdkJSIIContent,
    "/node_modules/wingsdk/node_modules/constructs/package.json":
      constructsPackageJsonContent,
    "/node_modules/wingsdk/node_modules/constructs/.jsii":
      constructsJSIIContent,
    "/node_modules/wingsdk/node_modules/constructs/lib/index.js": "",
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
  wingsdkManifestRoot: "/node_modules/wingsdk",
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
