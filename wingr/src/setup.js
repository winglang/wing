(() => {
  globalThis.require = require("module").createRequire(process.execPath);
  process._linkedBinding("__wing"); // caches the linked module in the process
  const fs = require("fs");
  const path = require("path");
  const assert = require("assert");
  globalThis.WingCompiler = class {
    static compile(program, context = ".") {
      assert.ok(fs.existsSync(program), "file not found");
      context = path.resolve(context);
      return process._linkedBinding("__wing").compile(program, context);
    }
  };
})();
