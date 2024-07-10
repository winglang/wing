import uniqueid from "lodash.uniqueid";

import type { Simulator } from "../../wingsdk.js";
import { createCompiler, type Compiler } from "../compiler.js";
import { createSimulator } from "../simulator.js";

const createSimulatorInstance = async (simfile: string) => {
  const stateDir = `/tmp/wing-test-${uniqueid()}`;
  const testSimulator = createSimulator({
    stateDir,
  });
  await testSimulator.start(simfile);

  return await testSimulator.waitForInstance();
};

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
  let testSimulator: Simulator;

  let simfilePath = "";

  const getSimulator = async () => {
    if (testCompiler && simfilePath) {
      testSimulator = await createSimulatorInstance(simfilePath);
      return testSimulator;
    }

    testCompiler = createCompiler({
      wingfile,
      platform,
      watchGlobs,
      testing: true,
    });

    return new Promise<Simulator>(async (resolve) => {
      testCompiler.on("compiled", async ({ simfile }) => {
        simfilePath = simfile;
        testSimulator = await createSimulatorInstance(simfile);
        resolve(testSimulator);
      });
    });
  };

  const stop = () => {
    testCompiler?.stop();
    testSimulator?.stop();
  };

  return {
    getSimulator,
    stop,
  };
};
