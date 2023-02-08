import { ConsoleLogger } from "../consoleLogger.js";

import { AppEvent } from "./cloudAppState.js";
import { createSimulator } from "./createSimulator.js";
import { runCompile } from "./runCompile.js";
import { watchSimulatorFile } from "./watchSimulatorFile.js";

export interface CreateWingAppProps {
  inputFile: string;
  consoleLogger: ConsoleLogger;
  sendCloudAppStateEvent: (event: AppEvent) => void;
}

export const createWingApp = async ({
  inputFile,
  sendCloudAppStateEvent,
  consoleLogger,
}: CreateWingAppProps): Promise<ReturnType<typeof createSimulator>> => {
  return new Promise<ReturnType<typeof createSimulator>>(
    async (resolve, reject) => {
      let simulator: ReturnType<typeof createSimulator>;
      if (inputFile.endsWith(".w")) {
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
        });
      } else {
        // loading wsim file
        const sim = createSimulator({
          simulatorProps: { simfile: inputFile },
          sendCloudAppStateEvent,
        });
        watchSimulatorFile({
          simulatorStop: sim.stop,
          simulatorReload: sim.reload,
          simulatorFile: sim.getSimFile(),
          sendCloudAppStateEvent,
          consoleLogger,
        });
        resolve(sim);
      }
    },
  );
};
