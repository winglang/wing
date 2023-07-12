import debug from "debug";
import { currentPackage } from "../util";

const log = debug("wing:update");
const DEFAULT_UPDATE_RATE = 1000 * 60 * 60 * 24; // 1 day

/** Handles checking for toolchain updates */
export async function checkForUpdates() {
  if (!process.stdout.isTTY || process.env.CI === "true" || currentPackage.version === "0.0.0") {
    log("skipping update check");
    return;
  }

  log("checking for updates...");
  // eval is because "tiny-updater" is an ESM package and we're CommonJS.
  const updateNotifier = await eval('import("tiny-updater")');
  await updateNotifier.default({
    name: currentPackage.name,
    version: currentPackage.version,
    ttl: DEFAULT_UPDATE_RATE,
  });
}
