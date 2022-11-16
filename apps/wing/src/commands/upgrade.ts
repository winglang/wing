import debug from "debug";
import isInstalledGlobally from "is-installed-globally";
import { spawnSync } from "child_process";

const log = debug("wing:update");
const PJSON = require("../../package.json");
const DEFAULT_UPDATE_RATE = 1000 * 60 * 60 * 24; // 1 day

/** Update options passed to CLI */
export interface IUpdateOptions {
  /** Force update install */
  readonly force?: boolean;
}

/** Handles updating the toolchain */
export async function upgrade(options: IUpdateOptions) {
  const { force } = options;

  if (!force && !isInstalledGlobally) {
    log("package not installed globally and 'force' is not set, skipping.");
    return;
  }

  log("checking for updates...");
  // eval is because "update-notifier" is an ESM package and we're CommonJS.
  const updateNotifier = await eval('import("update-notifier")');
  const notifier = updateNotifier.default({
    updateCheckInterval: DEFAULT_UPDATE_RATE,
    pkg: PJSON,
  });

  if (force) {
    log("forcing update info...");
    await notifier.fetchInfo();
  }

  log("notifying the user of any updates...");
  await notifier.notify({ defer: false, isGlobal: isInstalledGlobally });

  log("notifier: %o", notifier);
  if (force && notifier.update) {
    log("update available:", notifier.update);
    const result = spawnSync(
      "npm",
      [
        "install",
        ...[isInstalledGlobally ? "-g" : ""],
        "--loglevel",
        "info",
        PJSON.name,
      ],
      {
        stdio: "inherit",
        timeout: 1000 * 60, // 1 minute execution timeout
      }
    );
    log("update result: %o", result);
    if (result.status !== 0) {
      throw new Error("failed to update wing");
    }
  }
}
