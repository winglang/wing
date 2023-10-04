const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");
const buildDir = path.join(__dirname, "build");
const buildPublicDir =path.join(buildDir, "public");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.cpSync(publicDir, buildPublicDir, { recursive: true });
