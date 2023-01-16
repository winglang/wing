const fs = require("fs");
const assert = require("assert");
const pJson = require("./package.json");

// assign the same version as CLI to the wingsdk
const newVersion = process.env.PROJEN_BUMP_VERSION ?? "0.0.0";
assert(
  typeof pJson.dependencies["@winglang/sdk"] === "string",
  "wingsdk dependency key not found"
);
pJson.version = newVersion;
pJson.dependencies["@winglang/sdk"] = newVersion;
fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
