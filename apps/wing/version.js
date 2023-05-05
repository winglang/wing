const fs = require("fs");
const assert = require("assert");
const pJson = require("./package.json");

const defaultVersion = "0.0.0";
const newVersion = process.env.PROJEN_BUMP_VERSION ?? defaultVersion;

const newSdkVersion = newVersion === defaultVersion ? `file:winglang-sdk-${newVersion}.tgz` : newVersion;

assert(
  typeof pJson.dependencies["@winglang/sdk"] === "string",
  "wingsdk dependency key not found"
);
pJson.version = newVersion;
pJson.dependencies["@winglang/sdk"] = newSdkVersion;
fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
