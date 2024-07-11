import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { simulator } from "@winglang/sdk";

import type { Simulator } from "../../wingsdk.js";
import { createCompiler } from "../compiler.js";

const createSimulatorInstance = async ({
  simfile,
  start = true,
}: {
  simfile: string;
  start?: boolean;
}) => {
  const stateDir = await mkdtemp(join(tmpdir(), "wing-console-test"));

  const instance = new simulator.Simulator({
    simfile,
    stateDir,
  });

  if (start) {
    await instance.start();
  }

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
  let simfilePath: string | undefined;

  const testCompiler = createCompiler({
    wingfile,
    platform,
    watchGlobs,
    testing: true,
  });
  testCompiler.on("compiled", async ({ simfile }) => {
    simfilePath = simfile;
  });

  const getSimulator = async ({
    simfile,
    start = true,
  }: {
    simfile?: string;
    start?: boolean;
  } = {}) => {
    const path = simfile || simfilePath;
    if (path) {
      return await createSimulatorInstance({ simfile: path, start });
    }

    return new Promise<Simulator>(async (resolve) => {
      testCompiler.on("compiled", async ({ simfile }) => {
        simfilePath = simfile;
        resolve(
          await getSimulator({
            simfile,
            start,
          }),
        );
      });
    });
  };

  // Run a callback with a simulator instance.
  const useSimulatorInstance = async <T>(
    callback: (simulator: Simulator) => Promise<T>,
  ): Promise<T> => {
    const simulator = await getSimulator({
      simfile: simfilePath,
    });
    try {
      const result = await callback(simulator);
      simulator.stop();
      return result;
    } catch (error) {
      simulator.stop();
      throw error;
    }
  };

  const forceStop = () => {
    testCompiler?.stop();
  };

  return {
    getSimulator,
    useSimulatorInstance,
    forceStop,
  };
};
