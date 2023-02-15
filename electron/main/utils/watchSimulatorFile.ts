import { Simulator } from "@winglang/sdk/lib/testing";
import { FSWatcher } from "chokidar";
import log from "electron-log";

import { ConsoleLogger } from "../consoleLogger.js";

import { AppEvent } from "./cloudAppState.js";

// Chokidar is a CJS-only module and doesn't play well with ESM imports.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const chokidar = require("chokidar");

export interface WatchSimulatorFileProps {
  simulatorFile: string;
  simulatorStop: () => Promise<Simulator>;
  simulatorReload: () => Promise<Simulator>;
  consoleLogger: ConsoleLogger;
  sendCloudAppStateEvent: (event: AppEvent) => void;
}
export const watchSimulatorFile = ({
  simulatorFile,
  simulatorStop,
  simulatorReload,
  consoleLogger,
  sendCloudAppStateEvent,
}: WatchSimulatorFileProps): FSWatcher => {
  // Watch and handle changes in the simulator file.
  const watcher = chokidar
    .watch(simulatorFile, {
      persistent: true,
    })
    .on("change", async () => {
      log.info(`File ${simulatorFile} has been changed`);
      try {
        log.info(`Reloading simulator`);
        await simulatorReload();
      } catch (error) {
        consoleLogger.error(error);
        return;
      }
      log.info("Simulator was reloaded");
    })
    .on("unlink", async () => {
      consoleLogger.error(
        `File ${simulatorFile} has been removed, stopping the simulator`,
      );
      sendCloudAppStateEvent("SIMULATOR_ERROR");
      try {
        await simulatorStop();
      } catch (error) {
        consoleLogger.error(error);
      }
      // TODO: [sa] handle file deletion, what should we do?
    });

  return watcher;
};
