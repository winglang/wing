const path = require("path");
const fs = require("fs/promises");
const decompress = require("decompress");
const debug = require("debug")("wing:bootstrap");

const WINGSDK_TGZ_PATH = path.resolve(__dirname, "../wingsdk.tgz");

/**
 * Bootstraps the current directory for wingc
 * @param {string} directory The directory to bootstrap
 */
async function bootstrap(directory) {
  debug("Bootstrapping directory '%s'", directory);
  try {
    await fs.access(directory);
  } catch (_) {
    debug("Directory '%s' does not exist, creating it", directory);
    await fs.mkdir(directory, { recursive: true });
  }

  const wingsdkPath = path.join(directory, "wingsdk.tgz");
  debug("wingsdk path: %s", wingsdkPath);
  try {
    await fs.access(wingsdkPath);
  } catch (_) {
    debug("Copying wingsdk.tgz to '%s'", directory);
    await fs.copyFile(WINGSDK_TGZ_PATH, wingsdkPath);
  }

  const nodeModulesPath = path.join(directory, "node_modules");
  try {
    await fs.access(nodeModulesPath);
  } catch (_) {
    debug("Extracting wingsdk.tgz to '%s'", directory);
    await decompress(wingsdkPath, directory);
  }

  debug("Bootstrapping complete");
}

module.exports = { bootstrap };
