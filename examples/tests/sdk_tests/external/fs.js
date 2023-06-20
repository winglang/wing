const fs = require("fs");
const path = require("path");

exports.readFile = function (filePath) {
  const normalizedDirname = __dirname.replace(/\\/g, "/");
  const finalPath = path.join(path.resolve(normalizedDirname), "../", filePath);
  console.log("finalPath", finalPath);
  // reading file from sdk_tests root
  return fs.readFileSync(finalPath, "utf-8");
};
