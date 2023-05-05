const fs = require("fs");
const assert = require("assert");
const pJson = require("./package.json");

const defaultVersion = "0.0.0";
const newVersion = process.env.PROJEN_BUMP_VERSION ?? defaultVersion;

// for dev builds, assume the user will provide a local at winglang-sdk.tgz
// Note: this can also be a symlink to a local tarball (or even just a directory)
const newSdkVersion =
  newVersion === defaultVersion ? "file:winglang-sdk.tgz" : newVersion;

assert(
  typeof pJson.dependencies["@winglang/sdk"] === "string",
  "wingsdk dependency key not found"
);
pJson.version = newVersion;
pJson.dependencies["@winglang/sdk"] = newSdkVersion;
fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
