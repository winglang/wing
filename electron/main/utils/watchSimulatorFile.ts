import { Simulator } from "@winglang/sdk/lib/testing";

import { ConsoleLogger } from "../consoleLogger.js";
import { Status } from "../types.js";

// Chokidar is a CJS-only module and doesn't play well with ESM imports.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const chokidar = require("chokidar");

export interface WatchSimulatorFileProps {
  simulatorFile: string;
  simulator: Simulator;
  consoleLogger: ConsoleLogger;
  onSimulatorStatusChange: (status: Status, data?: unknown) => void;
  onSimulatorReloaded: () => void;
  compilationStatus: () => Status;
}
export const watchSimulatorFile = ({
  simulatorFile,
  simulator,
  onSimulatorReloaded,
  consoleLogger,
  onSimulatorStatusChange,
  compilationStatus,
}: WatchSimulatorFileProps): any => {
  // Watch and handle changes in the simulator file.
  const watcher = chokidar
    .watch(simulatorFile, {
      persistent: true,
    })
    .on("change", async () => {
      consoleLogger.verbose(`File ${simulatorFile} has been changed`);
      if (compilationStatus() === "error") {
        consoleLogger.verbose(`Compilation failed, not reloading simulator`);
        return;
      }
      try {
        onSimulatorStatusChange("loading");
        await simulator.reload();
      } catch (error) {
        onSimulatorStatusChange("error", error);
        consoleLogger.error(error);
        return;
      }
      consoleLogger.verbose("Simulator was reloaded");
      onSimulatorReloaded();
      onSimulatorStatusChange("success");
    })
    .on("unlink", async () => {
      consoleLogger.error(
        `File ${simulatorFile} has been removed, stopping the simulator`,
      );
      onSimulatorStatusChange("error", "Simulator file was removed");
      await simulator.stop();
      // TODO: [sa] handle file deletion, what should we do?
    });

  return watcher;
};
