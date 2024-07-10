import uniqueid from "lodash.uniqueid";

import type { Simulator } from "../../wingsdk.js";
import { createCompiler, type Compiler } from "../compiler.js";
import { createSimulator } from "../simulator.js";

const getSimulatorInstance = async (simfile: string, stateId?: string) => {
  const stateDir = `/tmp/wing-test-${stateId ?? uniqueid()}`;
  const testSimulator = createSimulator({
    stateDir,
  });
  await testSimulator.start(simfile);

  return await testSimulator.waitForInstance();
};

/**
 * Create a simulator manager that can be used to run tests.
 */
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

  const getSimulator = async (stateId?: string) => {
    if (testCompiler && simfilePath) {
      testSimulator = await getSimulatorInstance(simfilePath, stateId);
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
        testSimulator = await getSimulatorInstance(simfile, stateId);
        resolve(testSimulator);
      });
    });
  };

  // Run a callback with a simulator instance.
  const useSimulatorInstance = async <T>(
    callback: (simulator: Simulator) => Promise<T>,
  ): Promise<T> => {
    const simulator = await getSimulator();
    const result = await callback(simulator);
    try {
      simulator.stop();
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  const forceStop = () => {
    testCompiler?.stop();
  };

  return {
    useSimulatorInstance,
    forceStop,
  };
};
