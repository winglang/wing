import { Simulator } from "@monadahq/wingsdk/lib/testing/index.js";
import { FSWatcher } from "chokidar";
import log from "electron-log";

import { createSimulator } from "./wingsdk.js";

/* eslint-disable @typescript-eslint/no-require-imports */
const chokidar = require("chokidar");

let watcher: FSWatcher | undefined;

export const initWXFileWatcher = (options: {
  appPath: string;
  onAppChange: () => void;
}): Simulator => {
  const { appPath, onAppChange } = options;

  if (watcher) {
    log.error("wing console wx file watcher can be only initialized once");
    throw new Error(
      "wing console wx file watcher can be only initialized once",
    );
  }

  const simulator: Simulator = createSimulator({ simfile: appPath });

  if (!simulator) {
    log.error("failed to create wing local simulator");
    throw new Error("failed to create wing local simulator");
  }

  watcher = chokidar.watch(appPath, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100,
    },
  });

  if (!watcher) {
    log.error("failed to initialize wx file watcher");
    throw new Error("failed to initialize wx file watcher");
  }

  watcher
    .on("add", async (path: string) => {
      log.info(`File ${path} has been added`);
      try {
        await simulator.start();
        onAppChange();
      } catch (error) {
        log.error(`failed to start simulator`, error);
        throw new Error(JSON.stringify(error));
      }
    })
    .on("change", async (path: string) => {
      log.info(`File ${path} has been changed`);
      try {
        await simulator.reload();
        onAppChange();
      } catch (error) {
        log.error("failed to reload simulator", error);
        throw new Error(JSON.stringify(error));
      }
    })
    .on("unlink", (path: string) => {
      log.info(`File ${path} has been removed`);
      simulator.stop().catch((error: Error) => {
        log.error(error);
        throw new Error(error.message);
      });
      // todo [sa] handle file deletion
    });

  return simulator;
};
