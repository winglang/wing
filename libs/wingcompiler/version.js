const fs = require("fs");
const pJson = require("./package.json");

const defaultVersion = "0.0.0";
const newVersion = process.env.PROJEN_BUMP_VERSION ?? defaultVersion;

pJson.version = newVersion;

// for dev builds, assume the user will provide an installation of the sdk
if (newVersion === defaultVersion) {
  // remove the dependency on the sdk
  // @ts-ignore
  delete pJson.dependencies["@winglang/sdk"];
} else {
  pJson.dependencies["@winglang/sdk"] = newVersion;
}

fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
