const vm = require("vm");
const assert = require("assert");
const fs = require("fs/promises");
const path = require("path");
const { Module } = require("module");
const debug = require("debug")("wing:execute");

async function intermediate(directory) {
  directory = path.resolve(directory);
  debug("Executing in directory '%s'", directory);

  const WINGC_INTERMEDIATE = path.join(directory, "intermediate.js");
  debug("WINGC_INTERMEDIATE: %s", WINGC_INTERMEDIATE);

  const intermediate = await fs.readFile(WINGC_INTERMEDIATE, "utf8");
  assert(typeof Module._initPaths === "function", "invalid Module object.");
  const oldPath = process.env.NODE_PATH;
  debug("process.env.NODE_PATH: %s", oldPath);

  try {
    process.env.NODE_PATH = `${directory}/node_modules`;
    Module._initPaths();
    const context = vm.createContext({
      require,
      console,
      process,
      __dirname: directory,
      __filename: WINGC_INTERMEDIATE,
    });
    vm.runInContext(intermediate, context);
  } finally {
    process.env.NODE_PATH = oldPath;
  }
}

module.exports = { intermediate };
