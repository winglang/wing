import { ConsoleLogger } from "../consoleLogger.js";
import { Status } from "../types.js";

import { createSimulator } from "./createSimulator.js";
import { runCompile } from "./runCompile.js";

export interface CreateWingAppProps {
  inputFile: string;
  consoleLogger: ConsoleLogger;
  onSimulatorStatusChange: (status: Status, data?: unknown) => void;
  onCompilerStatusChange: (status: Status, data?: unknown) => void;
}

export const createWingApp = async ({
  inputFile,
  onSimulatorStatusChange,
  onCompilerStatusChange,
  consoleLogger,
}: CreateWingAppProps): Promise<ReturnType<typeof createSimulator>> => {
  return new Promise<ReturnType<typeof createSimulator>>(
    async (resolve, reject) => {
      let simulator: ReturnType<typeof createSimulator>;
      if (inputFile.endsWith(".w")) {
        runCompile({
          wingSrcFile: inputFile,
          onCompilerStatusChange: (status, data) => {
            onCompilerStatusChange(status, data);
            if (status === "loading") {
              onSimulatorStatusChange("loading");
            }
            if (status === "error") {
              onSimulatorStatusChange("error");
            }
            if (status === "success") {
              if (simulator) {
                return;
              }
              simulator = createSimulator({
                simulatorProps: { simfile: data as string },
                onSimulatorStatusChange,
              });
              resolve(simulator);
            }
          },
          consoleLogger,
        });
      } else {
        resolve(
          createSimulator({
            simulatorProps: { simfile: inputFile },
            onSimulatorStatusChange,
          }),
        );
      }
    },
  );
};
