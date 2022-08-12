(() => {
  // when the NodeJS is first spun up, a global "require" needs to be created
  // with a defined initial context for module / package resolution.
  // see: https://nodejs.org/api/embedding.html
  globalThis.require = require("module").createRequire(process.execPath);
  // this is the module that is linked into our special NodeJS in C++
  // this call caches the linked module in the process, ready for "entry.js"
  process._linkedBinding("__wing");
  const fs = require("fs");
  const path = require("path");
  const assert = require("assert");
  // make a `WingCompiler` global class available for future scripts
  globalThis.WingCompiler = class {
    static compile(program, context = ".") {
      assert.ok(fs.existsSync(program), "file not found");
      context = path.resolve(context);
      return process._linkedBinding("__wing").compile(program, context);
    }
  };
})();
