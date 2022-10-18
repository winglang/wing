const path = require("path");
const fs = require("fs/promises");
const NPM = require("../node_modules/npm/lib/npm.js");
const debug = require("debug")("wing:bootstrap");

// Note: these are hints for "pkg" to include the files in the binary
require("../node_modules/npm/lib/commands/install.js");
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

  debug("Copying wingsdk.tgz to '%s'", directory);
  await fs.copyFile(WINGSDK_TGZ_PATH, path.join(directory, "wingsdk.tgz"));

  // NOTE: constructs and cdktf should be here as well, but we have some sort of
  // a conundrum here. wingsdk needs to have these as bundled deps so JSII works
  // in other languages, but also installing them here causes NPM warnings about
  // conflicting peer dependencies. This works for now though, so whatever.
  const deps = [".wing/wingsdk.tgz", "cdktf-cli"];
  const cmd = `install --prefix ${directory} ${deps.join(" ")}`;
  debug("NPM command '%s'", cmd);

  debug("Loading npm");
  const npm = new NPM();
  await npm.load();

  debug("Executing npm command '%s'", cmd);
  // this is the equivalent of passing --prefix to npm binary
  // taken from npm tests: https://github.com/npm/cli/blob/latest/lib/commands/install.js
  npm.prefix = directory;
  await npm.exec("i", deps);
  debug("NPM command '%s' completed", cmd);

  debug("Bootstrapping complete");
}

module.exports = { bootstrap };
