const fs = require("fs");
const pJson = require("./package.json");

// revert package to 0.0.0 and direct wingsdk dependency
const newVersion = "0.0.0";
pJson.version = newVersion;
pJson.dependencies["@winglang/sdk"] = "file:../../libs/wingsdk";
fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
