#!/usr/bin/env -S node
const { execSync } = require("node:child_process");
const { resolve, relative } = require("node:path");

const which = require("npm-which")(__dirname);
const tsx = relative(process.cwd(), which.sync("tsx"));
const cliSource = relative(process.cwd(), resolve(__dirname, "../src/turbo-diff.ts"));
execSync(`${tsx} ${cliSource} ${process.argv.slice(2).join(" ")}`, {
  stdio: "inherit",
});
