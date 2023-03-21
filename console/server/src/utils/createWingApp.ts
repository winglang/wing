import { ConsoleLogger } from "../consoleLogger.js";

import { AppEvent } from "./cloudAppState.js";
import { createSimulator } from "./createSimulator.js";
import { LogInterface } from "./LogInterface.js";
import { runCompile } from "./runCompile.js";

export interface CreateWingAppProps {
  inputFile: string;
  consoleLogger: ConsoleLogger;
  sendCloudAppStateEvent: (event: AppEvent) => void;
  log: LogInterface;
}

export const createWingApp = async ({
  inputFile,
  sendCloudAppStateEvent,
  consoleLogger,
  log,
}: CreateWingAppProps): Promise<ReturnType<typeof createSimulator>> => {
  return new Promise<ReturnType<typeof createSimulator>>(
    async (resolve, reject) => {
      let simulator: ReturnType<typeof createSimulator>;
      await runCompile({
        wingSrcFile: inputFile,
        onCompilerStatusChange: (state, data) => {
          if (state === "loading") {
            sendCloudAppStateEvent("COMPILER_LOADING");
          }
          if (state === "error") {
            sendCloudAppStateEvent("COMPILER_ERROR");
          }
          if (state === "success") {
            sendCloudAppStateEvent("COMPILER_SUCCESS");
            if (simulator) {
              void simulator.reload();
              return;
            }
            simulator = createSimulator({
              simulatorProps: { simfile: data as string },
              sendCloudAppStateEvent,
            });
            resolve(simulator);
          }
        },
        consoleLogger,
        log,
      });
    },
  );
};
