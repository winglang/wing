import uniqueid from "lodash.uniqueid";

import type { Simulator } from "../../wingsdk.js";
import { createCompiler, type Compiler } from "../compiler.js";
import { createSimulator } from "../simulator.js";

export const createSimulatorManager = ({
  wingfile,
  platform,
  watchGlobs,
}: {
  wingfile: string;
  platform?: string[];
  watchGlobs?: string[];
}) => {
  let testCompiler: Compiler;
  let simfilePath = "";

  const createSimulatorInstance = async (simfile?: string) => {
    if (!simfile && !simfilePath) {
      throw new Error("No simfile provided");
    } else if (!simfile) {
      simfile = simfilePath;
    }
    const stateDir = `/tmp/wing-test-${uniqueid()}`;
    const testSimulator = createSimulator({
      stateDir,
    });
    await testSimulator.start(simfile);

    simfilePath = simfile;
    return await testSimulator.waitForInstance();
  };

  const getSimulator = async () => {
    if (testCompiler) {
      return await createSimulatorInstance();
    }

    testCompiler = createCompiler({
      wingfile,
      platform,
      watchGlobs,
      testing: true,
    });

    return new Promise<Simulator>(async (resolve) => {
      testCompiler.on("compiled", async ({ simfile }) => {
        resolve(await createSimulatorInstance(simfile));
      });
    });
  };

  const stop = () => {
    testCompiler?.stop();
  };

  return {
    getSimulator,
    stop,
  };
};
