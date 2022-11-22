import debug from "debug";
import { spawnSync } from "child_process";
import isInstalledGlobally = require("is-installed-globally");

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

  log("checking for updates...");
  // eval is because "update-notifier" is an ESM package and we're CommonJS.
  const updateNotifier = await eval('import("update-notifier")');
  const notifier = updateNotifier.default({
    updateCheckInterval: DEFAULT_UPDATE_RATE,
    pkg: PJSON,
  });

  log("forcing update info...");
  await notifier.fetchInfo();

  const message = [
    "Update available for Wing {currentVersion} >> {latestVersion}",
    `Upgrad${force ? "ing" : "e"} with '{updateCommand}'`,
  ].join("\n");
  log("notifying the user of any updates...");
  await notifier.notify({ defer: false, isGlobal: isInstalledGlobally, message });

  log("notifier: %o", notifier);
  if (force && notifier.update) {
    log("update available:", notifier.update);
    const result = spawnSync(
      "npm",
      ["install", ...[isInstalledGlobally ? "-g" : ""], PJSON.name],
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
