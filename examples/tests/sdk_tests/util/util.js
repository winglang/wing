const os = require("os");

exports.platformPreflight = exports.platformInflight = function () {
  return os.platform();
};
