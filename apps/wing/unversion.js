const fs = require("fs");
const assert = require("assert");
const pJson = require("./package.json");

// assign the same version as CLI to the wingsdk
assert(
  typeof pJson.dependencies["@winglang/wingsdk"] === "string",
  "wingsdk dependency key not found"
);
pJson.version = "0.0.0";
pJson.dependencies["@winglang/wingsdk"] = "file:../../libs/wingsdk";
fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
