import debug from "debug";
import decompress from "decompress";
import fs from "fs/promises";
import path from "path";

const log = debug("wing:bootstrap");
const WINGSDK_TGZ_PATH = path.resolve(__dirname, "../wingsdk.tgz");

export async function bootstrap(directory: string) {
  log("Bootstrapping directory '%s'", directory);
  try {
    await fs.access(directory);
  } catch (_) {
    log("Directory '%s' does not exist, creating it", directory);
    await fs.mkdir(directory, { recursive: true });
  }

  const wingsdkPath = path.join(directory, "wingsdk.tgz");
  log("wingsdk path: %s", wingsdkPath);
  try {
    await fs.access(wingsdkPath);
  } catch (_) {
    log("Copying wingsdk.tgz to '%s'", directory);
    await fs.copyFile(WINGSDK_TGZ_PATH, wingsdkPath);
  }

  const nodeModulesPath = path.join(directory, "node_modules");
  try {
    await fs.access(nodeModulesPath);
  } catch (_) {
    log("Extracting wingsdk.tgz to '%s'", directory);
    await decompress(wingsdkPath, directory);
  }

  log("Bootstrapping complete");
}
