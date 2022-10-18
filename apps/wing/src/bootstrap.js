const fs = require("fs/promises");
const NPM = require("../node_modules/npm/lib/npm.js");
const debug = require("debug")("wing:bootstrap");

// Note: this is hint for "pkg" to include the file in the binary
require("../node_modules/npm/lib/commands/install.js");

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

  const deps = ["cdktf-cli", "cdktf", "constructs"];
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
}

module.exports = { bootstrap };
