import * as fs from "node:fs/promises";
import * as path from "node:path";

import { Simulator, SimulatorProps } from "@winglang/wingsdk/lib/testing";

import { BaseResourceSchema } from "../wingsdk.js";

const TREE_FILE_PATH = "tree.json";

/**
 * A node in the construct tree.
 */
export interface ConstructTreeNode {
  readonly id: string;
  readonly path: string;
  readonly children?: { [key: string]: ConstructTreeNode };
  readonly attributes?: { [key: string]: any };

  /**
   * Information on the construct class that led to this node, if available
   */
  readonly constructInfo?: ConstructInfo;
}

/**
 * The construct tree.
 */
export interface ConstructTree {
  readonly version: string;
  readonly tree: ConstructTreeNode;
}

/**
 * Source information on a construct (class fqn and version)
 */
export interface ConstructInfo {
  /**
   * Fully qualified class name.
   */
  readonly fqn: string;

  /**
   * Version of the module.
   */
  readonly version: string;
}

export interface CreateSimulatorProps {
  simulator: SimulatorProps;
  onError?: (error: unknown) => void;
}

// Creates a helper around the simulator that only returns the simulator instance
// when it's ready. The simulator is not ready to be used if it's starting,
// stopping or reloading.
export function createSimulator(props: CreateSimulatorProps) {
  const reportPromise = <T>(callback: () => Promise<T>) => {
    return async () => {
      try {
        return await callback();
      } catch (error) {
        props.onError?.(error);
        throw error;
      }
    };
  };

  const simulator = new Simulator(props.simulator);
  let currentProcess: Promise<void> | undefined;
  const start = reportPromise(async () => {
    await currentProcess;
    currentProcess = simulator.start();
    await currentProcess;
    return simulator;
  });
  const stop = reportPromise(async () => {
    await currentProcess;
    currentProcess = simulator.stop();
    await currentProcess;
    return simulator;
  });
  const reload = reportPromise(async () => {
    await currentProcess;
    currentProcess = simulator.reload();
    await currentProcess;
    return simulator;
  });
  const get = reportPromise(async () => {
    await currentProcess;
    return simulator;
  });

  const treeJsonFilename = path.resolve(
    path.dirname(props.simulator.simfile),
    TREE_FILE_PATH,
  );
  const tree = async () => {
    const json = await fs.readFile(treeJsonFilename, "utf8");
    return JSON.parse(json) as ConstructTree;
  };

  void start();

  return {
    start,
    stop,
    reload,
    get,
    tree,
  };
}
