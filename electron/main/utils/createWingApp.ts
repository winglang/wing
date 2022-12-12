import { ConsoleLogger } from "../consoleLogger.js";

import { createSimulator } from "./createSimulator.js";
import { runCompile } from "./runCompile.js";

export interface CreateWingAppProps {
  inputFile: string;
  consoleLogger: ConsoleLogger;
  onLoading: (loading: boolean) => void;
  onError: (error: unknown) => void;
}

export const createWingApp = async ({
  inputFile,
  onLoading,
  onError,
  consoleLogger,
}: CreateWingAppProps): Promise<ReturnType<typeof createSimulator>> => {
  return new Promise<ReturnType<typeof createSimulator>>(
    async (resolve, reject) => {
      let simulator: ReturnType<typeof createSimulator>;
      if (inputFile.endsWith(".w")) {
        runCompile({
          wingSrcFile: inputFile,
          onLoading,
          onError,
          consoleLogger,
          onSuccess: (simFileName) => {
            if (simulator) {
              return;
            }
            simulator = createSimulator({
              simulator: { simfile: simFileName },
              onError(error) {
                consoleLogger.error(error);
                onError(error);
              },
              onLoading,
            });
            resolve(simulator);
          },
        });
      } else {
        resolve(
          createSimulator({
            simulator: { simfile: inputFile },
            onError(error) {
              consoleLogger.error(error);
              onError(error);
            },
            onLoading,
          }),
        );
      }
    },
  );
};
