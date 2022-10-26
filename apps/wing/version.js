const fs = require("fs");
const pJson = require("./package.json");
// assign the same version as CLI to the wingsdk
pJson.dependencies["@monadahq/wingsdk"] = pJson.version;
fs.writeFileSync("./package.json", JSON.stringify(pJson, undefined, 2));
