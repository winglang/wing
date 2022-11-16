const fs = require("fs");
const assert = require("assert");
const pJson = require("./package.json");

// revert package to 0.0.0 and direct wingsdk dependency
const newVersion = "0.0.0";
assert(
  typeof pJson.dependencies["@winglang/wingsdk"] === "string",
  "wingsdk dependency key not found"
);
pJson.version = newVersion;
pJson.dependencies["@winglang/wingsdk"] = "file:../../libs/wingsdk";
fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
