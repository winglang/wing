import debug from "debug";

const log = debug("wing:update");
const PJSON = require("../../package.json");
const DEFAULT_UPDATE_RATE = 1000 * 60 * 60 * 24; // 1 day

/** Handles checking for toolchain updates */
export async function checkForUpdates() {
  if (!process.stdout.isTTY) {
    log("not a TTY, skipping update check");
    return;
  }

  log("checking for updates...");
  // eval is because "update-notifier" is an ESM package and we're CommonJS.
  const updateNotifier = await eval('import("update-notifier")');
  const notifier = updateNotifier.default({
    updateCheckInterval: DEFAULT_UPDATE_RATE,
    pkg: PJSON,
  });

  log("notifying the user of any updates...");
  await notifier.notify();

  log("notifier: %o", notifier);
}
