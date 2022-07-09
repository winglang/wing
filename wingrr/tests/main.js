async function main() {
  console.log("-- testing JS:");
  console.log("Hello From JavaScript!");
  console.log("-- testing TS:");
  require("./main.ts");
  const fs = require("fs");
  console.log("-- testing Ruby:");
  const { DefaultRubyVM } = require("ruby-head-wasm-wasi/dist/node.cjs");
  const binary = fs.readFileSync("./node_modules/ruby-head-wasm-wasi/dist/ruby.wasm");
  const module = await WebAssembly.compile(binary);
  const { vm } = await DefaultRubyVM(module);
  vm.eval(fs.readFileSync("./tests/main.rb", "utf8"));
  console.log("-- testing Python:");
  const loadPyodide = require("../dist/pyodide");
  const pyodide = await loadPyodide({ indexURL: "./dist/pyodide" });
  await pyodide.runPythonAsync(fs.readFileSync("./tests/main.py", "utf8"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
