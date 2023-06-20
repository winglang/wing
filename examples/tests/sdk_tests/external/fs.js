const fs = require("fs");
const path = require("path");

exports.readFile = function (filePath) {
  // reading file from sdk_tests root
  return fs.readFileSync(path.join(path.resolve(__dirname), "../", filePath), "utf-8");
};
