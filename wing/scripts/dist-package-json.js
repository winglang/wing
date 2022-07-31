#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const pJson = require("../package.json");

const osMap = {
  macos: "darwin",
  ubuntu: "linux",
  windows: "win32",
};

const archMap = {
  arm64: "arm64",
  x86: "ia32",
  x64: "x64",
};

assert.ok(process.argv[2], "Must specify a target OS");
assert.ok(process.argv[3], "Must specify a target architecture");

const os = osMap[process.argv[2]];
const arch = archMap[process.argv[3]];

assert.ok(os, `Unknown OS: ${process.argv[2]}`);
assert.ok(arch, `Unknown architecture: ${process.argv[3]}`);

pJson.version = `v${process.env.GITHUB_RUN_ATTEMPT || 0}-${process.env.GITHUB_RUN_ID || "local"}`;
pJson.name = `${pJson.name}-${os}-${arch}`;
pJson.cpu = [arch];
pJson.os = [os];

fs.writeFileSync(path.join(__dirname, "../package.json"), JSON.stringify(pJson, null, 2), "utf8");
