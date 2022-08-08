#!/usr/bin/env node

// this script prepares the package.json file for publishing sub "wing-X-Y"
// packages for different architectures to npm and other relevant release
// holders. Currently it makes sure development version is stamped properly on
// Github Workflows. It also removes "scripts" and "devDependencies" from the
// package.json file. It also adds arch/platform tags to the package.json file.

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const pJson = require("../package.json");

const osMap = {
  "macos-latest": "darwin",
  "ubuntu-latest": "linux",
  "windows-latest": "win32",
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

pJson.description = `Wing Programming Language binaries for ${os}/${arch} platform`;
pJson.version = `${pJson.version}-dev.${process.env.GITHUB_RUN_ATTEMPT || 0}${process.env.GITHUB_RUN_ID || ""}`;
pJson.name = `${pJson.name}-${os}-${arch}`;
pJson.cpu = [arch];
pJson.os = [os];

delete pJson.scripts;
delete pJson.dependencies;
delete pJson.devDependencies;
delete pJson.optionalDependencies;

fs.writeFileSync(path.join(__dirname, "../package.json"), JSON.stringify(pJson, null, 2), "utf8");
