import { test, beforeAll } from "vitest";
import "zx/globals";

const hangarDir = path.posix.resolve(__dirname, "..");
const tmpDir = path.posix.join(hangarDir, "tmp");
const npmCacheDir = path.posix.join(tmpDir, ".npm");
const packagesDir = path.posix.join(tmpDir, "packages");

const packageJSONPath = path.posix.join(packagesDir, "package", "package.json");
const wingTGZ = path.posix.join(packagesDir, "wing.source.tgz");
const wingTar = path.posix.join(packagesDir, "wing.source.tar");
const wingFinalTGZ = path.posix.join(packagesDir, "wing.tgz");
const wingsdkTGZ = path.posix.join(packagesDir, "wingsdk.source.tgz");

void within(async () => {
  process.env.HANGAR_WING_TGZ = "/Users/markm/Documents/GitHub/winglang/apps/wing/winglang-wing-0.0.0.tgz"
  process.env.HANGAR_WINGSDK_TGZ = "/Users/markm/Documents/GitHub/winglang/libs/wingsdk/monadahq-wingsdk-0.0.0.tgz"
  
  $.verbose = true;
  
  await $`rm -rf ${tmpDir}`;
  await $`mkdir -p ${npmCacheDir}`;
  await $`mkdir -p ${packagesDir}`;

  $.cwd = packagesDir;
  
  await $`cp ${process.env.HANGAR_WING_TGZ} ${wingTGZ}`;
  await $`cp ${process.env.HANGAR_WINGSDK_TGZ} ${wingsdkTGZ}`;
  
  await $`gunzip ${wingTGZ}`;
  await $`tar -xzf ${wingTar} package/package.json`;
  
  const pJson = require(packageJSONPath);
  pJson.dependencies["@winglang/wingsdk"] = `file:${wingsdkTGZ}`;
  fs.writeFileSync(packageJSONPath, JSON.stringify(pJson, undefined, 2));
  
  
  await $`tar -uvf ${wingTar} package/package.json`;
  await $`gzip -vf ${wingTar}`;
  await $`mv ${wingTar}.gz ${wingFinalTGZ}`;
});