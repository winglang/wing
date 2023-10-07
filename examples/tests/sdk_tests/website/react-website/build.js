const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");
const buildDir = path.join(__dirname, "build");
const buildPublicDir =path.join(buildDir, "public");

fs.rmSync(buildDir, { recursive: true, force: true });
fs.mkdirSync(buildDir, { recursive: true });
fs.cpSync(publicDir, buildPublicDir, { recursive: true });
