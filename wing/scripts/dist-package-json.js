#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const pJson = require("../package.json");

pJson.version = `v${process.env.GITHUB_RUN_ATTEMPT || 1}-${process.env.GITHUB_RUN_ID || "local"}`;
pJson.name = `${pJson.name}-${process.argv[2] || "unknown"}-${process.argv[3] || "unknown"}`;

fs.writeFileSync(path.join(__dirname, "../package.json"), JSON.stringify(pJson, null, 2), "utf8");
