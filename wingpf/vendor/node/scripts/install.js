#! /usr/bin/env node

const fs = require("fs");
const path = require("path");

async function findFilesWithExtensionRecursive(dir, ext) {
  const files = await fs.promises.readdir(dir);
  const result = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await fs.promises.stat(filePath);
    if (fileStat.isDirectory()) {
      result.push(...(await findFilesWithExtensionRecursive(filePath, ext)));
    } else if (path.extname(filePath) === ext) {
      result.push(filePath);
    }
  }
  return result;
}

async function findStaticLibraries() {
  const libs = await findFilesWithExtensionRecursive("out", ".a");
  return libs;
}

findStaticLibraries()
  .then(async (libs) => {
    const BIN_DIR = path.join(__dirname, "..", "bin");
    const INC_DIR = path.join(BIN_DIR, "include");
    const LIB_DIR = path.join(BIN_DIR, "lib");

    await fs.promises.mkdir(INC_DIR, { recursive: true });
    await fs.promises.mkdir(LIB_DIR, { recursive: true });

    await Promise.all(
      libs.map(async (lib) => {
        console.log(`-- Installing ${lib}`);
        const libName = path.basename(lib, ".a");
        const libPath = path.join(LIB_DIR, `${libName}.a`);
        await fs.promises.copyFile(lib, libPath);
      })
    );

    fs.promises.copyFile(
      path.join(__dirname, "..", "node_embedding_api.h"),
      path.join(INC_DIR, "node_embedding_api.h")
    );

    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
