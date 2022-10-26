const fs = require("fs");
const assert = require("assert");
const VERSION = process.env.PROJEN_BUMP_VERSION;
assert(VERSION, "PROJEN_BUMP_VERSION is not set");

const pJson = require("./package.json");
pJson.version = VERSION;
pJson.dependencies["@monadahq/wingsdk"] = VERSION;
fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
