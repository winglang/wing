import { Updater, UpdaterStatus } from "@wingconsole/server";
import log from "electron-log";
import { autoUpdater } from "electron-updater";

autoUpdater.logger = log;

let status: UpdaterStatus = {
  status: "initial",
};

autoUpdater.addListener("checking-for-update", () => {
  log.info("auto-updater: checking-for-update");
  status = {
    status: "checking-for-update",
  };
});
autoUpdater.addListener("update-not-available", () => {
  log.info("auto-updater: update-not-available");
  status = {
    status: "update-not-available",
  };
});
autoUpdater.addListener("update-available", (info) => {
  log.info("auto-updater: update-available", info);
  status = {
    status: "update-available",
    version: info.version,
    progress: 0,
  };
});
autoUpdater.addListener("download-progress", (info) => {
  status = {
    status: "download-progress",
    progress: info.percent,
  };
});
autoUpdater.addListener("update-downloaded", () => {
  log.info("auto-updater: update-downloaded");
  status = {
    status: "update-downloaded",
    progress: 100,
  };
});
autoUpdater.addListener("error", () => {
  log.info("auto-updater: error");
  status = {
    progress: 0,
    status: "error",
  };
});

export const updater: Updater = {
  status() {
    return status;
  },
  async checkForUpdates() {
    await autoUpdater.checkForUpdatesAndNotify();
  },
  addEventListener(event, listener) {
    log.info("auto-updater: addEventListener", event, listener);
    autoUpdater.addListener("checking-for-update", listener);
    autoUpdater.addListener("update-not-available", listener);
    autoUpdater.addListener("update-available", listener);
    autoUpdater.addListener("download-progress", listener);
    autoUpdater.addListener("update-downloaded", listener);
    autoUpdater.addListener("error", listener);
  },
  removeEventListener(event, listener) {
    log.info("auto-updater: removeEventListener", event, listener);
    autoUpdater.removeListener("checking-for-update", listener);
    autoUpdater.removeListener("update-not-available", listener);
    autoUpdater.removeListener("update-available", listener);
    autoUpdater.removeListener("download-progress", listener);
    autoUpdater.removeListener("update-downloaded", listener);
    autoUpdater.removeListener("error", listener);
  },
  quitAndInstall() {
    autoUpdater.quitAndInstall(true, true);
  },
};
