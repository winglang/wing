#! /usr/bin/env node

const { promises: fs } = require("fs");
const path = require("path");

async function install() {
  const OUT_DIR = path.join(__dirname, "..", "out");
  const INC_DIR = path.join(OUT_DIR, "include");
  const LIB_DIR = path.join(OUT_DIR, "lib");

  await fs.rm(INC_DIR, { recursive: true }).catch(() => {});
  await fs.mkdir(INC_DIR, { recursive: true });
  await fs.cp("../../include/node", INC_DIR, { recursive: true });

  await fs.rm(LIB_DIR, { recursive: true }).catch(() => {});
  await fs.mkdir(LIB_DIR, { recursive: true });
  await fs.copyFile(path.join("../..", "lib/libnode.so"), path.join(LIB_DIR, "libnode.so"));
}

install().catch((err) => {
  console.error(err);
  process.exit(1);
});
