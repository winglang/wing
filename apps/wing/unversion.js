const fs = require("fs");
const pJson = require("./package.json");

// revert package to 0.0.0 and direct wingsdk & wingcompiler dependencies
const newVersion = "0.0.0";
pJson.version = newVersion;
pJson.dependencies["@winglang/sdk"] = "file:../../libs/wingsdk";
pJson.dependencies["@winglang/compiler"] = "file:../../libs/wingcompiler";
fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
