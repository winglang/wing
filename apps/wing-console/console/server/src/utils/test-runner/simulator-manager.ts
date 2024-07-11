import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { simulator } from "@winglang/sdk";

import type { Simulator } from "../../wingsdk.js";
import { createCompiler } from "../compiler.js";

const getSimulatorInstance = async (simfile: string) => {
  const stateDir = await mkdtemp(join(tmpdir(), "wing-console-test"));

  const instance = new simulator.Simulator({
    simfile,
    stateDir,
  });

  await instance.start();

  return instance;
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
  let simfilePath: string;

  const testCompiler = createCompiler({
    wingfile,
    platform,
    watchGlobs,
    testing: true,
  });
  testCompiler.on("compiled", async ({ simfile }) => {
    simfilePath = simfile;
  });

  const getSimulator = async (simfile?: string) => {
    if (simfile) {
      return await getSimulatorInstance(simfile);
    }

    return new Promise<Simulator>(async (resolve) => {
      testCompiler.on("compiled", async ({ simfile }) => {
        resolve(await getSimulator(simfile));
      });
    });
  };

  // Run a callback with a simulator instance.
  const useSimulatorInstance = async <T>(
    callback: (simulator: Simulator) => Promise<T>,
  ): Promise<T> => {
    const simulator = await getSimulator(simfilePath);
    const result = await callback(simulator);
    simulator.stop();
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
