/// This serves as the preflight execution entrypoint to set up the following behaviors
/// 1. Override module resolution to force @winglang/sdk to always resolve to the same path
/// 2. Handle communication with parent process to handle errors and load the true entrypoint
///
/// This file has the following expectations:
/// 1. The environment variable WING_PREFLIGHT_ENTRYPOINT is a JSON string of the entrypoint to load
/// 2. Runs in a child process with an IPC channel to the parent process

process.setUncaughtExceptionCaptureCallback((reason) => {
  if (reason instanceof Error) {
    // The Error object does not serialize well over IPC (even with 'advanced' serialization)
    // So we extract the properties we need to recreate most error objects
    reason = {
      message: reason.message,
      stack: reason.stack,
      name: reason.name,
      code: reason.code,
    };
  }
  process.send(reason);
});

if (!process.send) {
  throw new Error(
    "process.send is undefined. This file should only be run in a child process with an IPC connection to the parent."
  );
}

var Module = require("module");
const { join } = require("path");
const original_resolveFilename = Module._resolveFilename;
const WINGSDK = "@winglang/sdk";
const WINGSDK_PATH = require.resolve(WINGSDK);
const WINGSDK_DIR = join(WINGSDK_PATH, "..", "..");

Module._resolveFilename = function () {
  const path = arguments[0];
  if (path === WINGSDK) return WINGSDK_PATH;
  if (path.startsWith(WINGSDK)) {
    arguments[0] = path.replace(WINGSDK, WINGSDK_DIR);
  }
  return original_resolveFilename.apply(this, arguments);
};

if (!process.env.WING_PREFLIGHT_ENTRYPOINT) {
  throw new Error("Missing environment variable WING_PREFLIGHT_ENTRYPOINT");
}
const entrypoint = JSON.parse(process.env.WING_PREFLIGHT_ENTRYPOINT);
delete process.env.WING_PREFLIGHT_ENTRYPOINT;

require(entrypoint);
