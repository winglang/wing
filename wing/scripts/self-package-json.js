#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const pJson = require("../package.json");

pJson.version = `${pJson.version}-dev.${process.env.GITHUB_RUN_ATTEMPT || 0}${process.env.GITHUB_RUN_ID || ""}`;

fs.writeFileSync(path.join(__dirname, "../package.json"), JSON.stringify(pJson, null, 2), "utf8");
