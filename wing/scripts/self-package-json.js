#!/usr/bin/env node

// this script prepares the package.json file for publishing "wing" package
// itself to npm and other relevant release holders. Currently it makes sure
// development version is stamped properly on Github Workflows.

const fs = require("fs");
const path = require("path");
const pJson = require("../package.json");

pJson.version = `${pJson.version}-dev.${process.env.GITHUB_RUN_ATTEMPT || 0}${process.env.GITHUB_RUN_ID || ""}`;

fs.writeFileSync(path.join(__dirname, "../package.json"), JSON.stringify(pJson, null, 2), "utf8");
