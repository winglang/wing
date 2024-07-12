import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { simulator } from "@winglang/sdk";

import type { Simulator } from "../../wingsdk.js";
import { createCompiler } from "../compiler.js";
import type { ConstructTreeNode } from "../construct-tree.js";

const getTestPaths = (node: ConstructTreeNode) => {
  let tests: string[] = [];
  if (node.constructInfo?.fqn === "@winglang/sdk.std.Test") {
    for (const child of Object.values(node.children ?? {})) {
      if (child.id === "Handler") {
        tests.push(node.path);
        break;
      }
    }
  }
  if (node.children) {
    for (const child of Object.values(node.children)) {
      tests.push(...getTestPaths(child));
    }
  }
  return tests;
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
  const testCompiler = createCompiler({
    wingfile,
    platform,
    watchGlobs,
    testing: true,
  });

  const simfilePath = new Promise<string>((resolve) => {
    testCompiler.on("compiled", async ({ simfile }) => {
      resolve(simfile);
    });
  });

  const createSimulatorInstance = async () => {
    const stateDir = await mkdtemp(join(tmpdir(), "wing-console-test"));

    return new simulator.Simulator({
      simfile: await simfilePath,
      stateDir,
    });
  };

  // Run a callback with a simulator instance.
  const useSimulatorInstance = async <T>(
    callback: (simulator: Simulator) => Promise<T>,
  ): Promise<T> => {
    const simulator = await createSimulatorInstance();

    try {
      await simulator.start();
      return await callback(simulator);
    } finally {
      simulator.stop();
    }
  };

  const getTests = async () => {
    const simulator = await createSimulatorInstance();

    const { tree } = simulator.tree().rawData();

    return getTestPaths(tree);
  };

  const forceStop = () => {
    testCompiler?.stop();
  };

  return {
    getTests,
    useSimulatorInstance,
    forceStop,
  };
};
