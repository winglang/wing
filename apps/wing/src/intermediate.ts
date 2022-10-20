import { Module } from "module";
import assert from "assert";
import debug from "debug";
import fs from "fs/promises";
import path from "path";
import vm from "vm";

const log = debug("wing:execute");

export async function intermediate(directory: string) {
  directory = path.resolve(directory);
  log("Executing in directory '%s'", directory);

  const WINGC_INTERMEDIATE = path.join(directory, "intermediate.js");
  log("WINGC_INTERMEDIATE: %s", WINGC_INTERMEDIATE);

  const intermediate = await fs.readFile(WINGC_INTERMEDIATE, "utf8");
  // @ts-ignore
  assert(typeof Module._initPaths === "function", "invalid Module object.");
  const oldPath = process.env.NODE_PATH;
  log("process.env.NODE_PATH: %s", oldPath);

  try {
    process.env.NODE_PATH = `${directory}/node_modules`;
    // @ts-ignore
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
