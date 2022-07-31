#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

// Add the "bin" directory to LD_LIBRARY_PATH
process.env.LD_LIBRARY_PATH = path.join(__dirname, "bin");
process.env.DYLD_LIBRARY_PATH = path.join(__dirname, "bin");
process.env.DYLD_FALLBACK_LIBRARY_PATH = path.join(__dirname, "bin");

// Ensure ts-node is available
child_process.execSync("npm list ts-node || npm i --no-save ts-node");

// Spawn "wingc" binary and forward stdio to it
child_process.spawnSync(path.join(__dirname, "bin/wingc"), process.argv.slice(2), {
  stdio: "inherit",
});
