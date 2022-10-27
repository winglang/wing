const fs = require("fs");
const assert = require("assert");
const pJson = require("./package.json");
// assign the same version as CLI to the wingsdk
assert(
  typeof pJson.dependencies["@monadahq/wingsdk"] === "string",
  "wingsdk dependency key not found"
);
pJson.dependencies["@monadahq/wingsdk"] = pJson.version;
fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
