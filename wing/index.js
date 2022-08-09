#!/usr/bin/env node

const path = require("path");
const child_process = require("child_process");

// "bin" directory
function bin() {
  try {
    // we're being accessed through the wrapper
    const native = require.resolve(
      `@monadahq/wing-${process.platform}-${process.arch}`
    );
    return path.join(path.dirname(native), "bin");
  } catch {
    // we're being accessed directly
    return path.join(__dirname, "bin");
  }
}

const binariesPath = bin();
// Add the "bin" directory to LD_LIBRARY_PATH
process.env.LD_LIBRARY_PATH = binariesPath;
process.env.DYLD_LIBRARY_PATH = binariesPath;
process.env.DYLD_FALLBACK_LIBRARY_PATH = binariesPath;

// Spawn "wingr" binary and forward stdio to it
child_process.spawnSync(
  path.join(binariesPath, "wingr"),
  process.argv.slice(2),
  {
    stdio: "inherit",
  }
);
