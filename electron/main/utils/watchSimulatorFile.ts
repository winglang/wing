import { Simulator } from "@winglang/sdk/lib/testing";

import { ConsoleLogger } from "../consoleLogger.js";

// Chokidar is a CJS-only module and doesn't play well with ESM imports.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const chokidar = require("chokidar");

export interface WatchSimulatorFileProps {
  simulatorFile: string;
  simulator: Simulator;
  consoleLogger: ConsoleLogger;
  onLoading: (loading: boolean) => void;
  onError: (error: unknown) => void;
  notifyChange: () => void;
}
export const watchSimulatorFile = ({
  simulatorFile,
  simulator,
  notifyChange,
  onLoading,
  consoleLogger,
  onError,
}: WatchSimulatorFileProps): any => {
  // Watch and handle changes in the simulator file.
  const watcher = chokidar
    .watch(simulatorFile, {
      persistent: true,
    })
    .on("change", async () => {
      consoleLogger.verbose(`File ${simulatorFile} has been changed`);
      try {
        onLoading(true);
        await simulator.reload();
      } catch (error) {
        onError(error);
        consoleLogger.error(error);
        onLoading(false);
        return;
      }
      consoleLogger.verbose("Simulator was reloaded");
      notifyChange();
      onLoading(false);
    })
    .on("unlink", async () => {
      consoleLogger.error(
        `File ${simulatorFile} has been removed, stopping the simulator`,
      );
      onError("Simulator file was removed");
      await simulator.stop();
      onLoading(false);
      // TODO: [sa] handle file deletion, what should we do?
    });

  return watcher;
};
