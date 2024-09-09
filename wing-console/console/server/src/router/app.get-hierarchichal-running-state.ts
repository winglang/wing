import type { ResourceRunningState } from "@winglang/sdk/lib/simulator/simulator.js";

import type { ConstructTreeNodeMap } from "../utils/constructTreeNodeMap.js";

type RunningState = ResourceRunningState;

const RunningStateOrder = {
  started: 0,
  stopped: 1,
  undefined: 2,
  starting: 3,
  stopping: 4,
  error: 5,
} as const;

const getRunningStateOrder = (
  runningState: RunningState | undefined,
): number => {
  return RunningStateOrder[runningState ?? "undefined"];
};

export const getHierarchichalRunningState = (
  path: string,
  nodeMap: ConstructTreeNodeMap,
): RunningState | undefined => {
  const node = nodeMap.get(path);

  const runningState = node?.runningState;

  if (node?.children?.length && node?.children?.length > 0) {
    const childrenRunningStates = node.children.map((child) =>
      getHierarchichalRunningState(child, nodeMap),
    );

    // eslint-disable-next-line unicorn/no-array-reduce
    const highestRunningState = childrenRunningStates.reduce<
      RunningState | undefined
    >((highest, current) => {
      return getRunningStateOrder(current) > getRunningStateOrder(highest)
        ? current
        : highest;
    }, "started");

    return getRunningStateOrder(highestRunningState) >
      getRunningStateOrder(runningState)
      ? highestRunningState
      : runningState;
  }

  return runningState;
};
