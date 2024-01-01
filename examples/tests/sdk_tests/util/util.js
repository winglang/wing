const os = require("os");

exports.platform = function () {
  return os.platform();
};