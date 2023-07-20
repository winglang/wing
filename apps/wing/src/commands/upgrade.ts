import debug from "debug";
import { currentPackage } from "../util";

const log = debug("wing:update");
const DEFAULT_UPDATE_RATE = 1000 * 60 * 60 * 24; // 1 day

/** Handles checking for toolchain updates */
export async function checkForUpdates() {
  if (!process.stdout.isTTY || process.env.CI || currentPackage.version === "0.0.0") {
    log("skipping update check");
    return;
  }

  log("checking for updates...");

  // Why eval? `winglang` targets CJS, but `tiny-updater` targets ESM.
  // Technically CJS is allowed to dynamically import ESM,
  // but tsc converts dynamic imports into a require call (in a promise).
  // Wrapping the import in eval forces tsc to leave it alone.
  const updateNotifier = await eval('import("tiny-updater")');
  await updateNotifier.default({
    name: currentPackage.name,
    version: currentPackage.version,
    ttl: DEFAULT_UPDATE_RATE,
  });
}
