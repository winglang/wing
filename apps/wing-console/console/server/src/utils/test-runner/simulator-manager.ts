import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { simulator } from "@winglang/sdk";

import type { Simulator } from "../../wingsdk.js";
import type { Compiler } from "../compiler.js";

/**
 * Create a simulator manager that can be used to run tests.
 */
export const createSimulatorManager = ({
  compiler,
}: {
  compiler: Compiler;
}) => {
  const createSimulator = async () => {
    const stateDir = await mkdtemp(join(tmpdir(), "wing-console-test"));

    return new simulator.Simulator({
      simfile: await compiler.getSimfile(),
      stateDir,
    });
  };

  // Run a callback with a simulator instance.
  const useSimulatorInstance = async <T>(
    callback: (simulator: Simulator) => Promise<T>,
  ): Promise<T> => {
    const simulator = await createSimulator();

    try {
      await simulator.start();
      return await callback(simulator);
    } finally {
      simulator.stop();
    }
  };

  const getTests = async () => {
    const simulator = await createSimulator();

    return simulator.tree().listTests();
  };

  return {
    getTests,
    useSimulatorInstance,
  };
};
