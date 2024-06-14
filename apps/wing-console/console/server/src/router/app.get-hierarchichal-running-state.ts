import type { ConstructTreeNodeMap } from "../utils/constructTreeNodeMap.js";

type RunningState = "starting" | "started" | "stopping" | "stopped" | "error";

const RunningStateOrder = {
  started: 0,
  stopped: 1,
  starting: 2,
  stopping: 3,
  error: 4,
} as const;

export const getHierarchichalRunningState = (
  path: string,
  nodeMap: ConstructTreeNodeMap,
): RunningState => {
  const node = nodeMap.get(path);
  if (!node) {
    return "stopped";
  }

  const runningState = (node?.resourceConfig?.attrs?.["runningState"] ??
    "stopped") as RunningState;

  if (node.children?.length > 0) {
    const childrenRunningStates = node.children.map((child) =>
      getHierarchichalRunningState(child, nodeMap),
    );

    // eslint-disable-next-line unicorn/no-array-reduce
    const highestRunningState = childrenRunningStates.reduce<RunningState>(
      (highest, current) => {
        return RunningStateOrder[current] > RunningStateOrder[highest]
          ? current
          : highest;
      },
      "started",
    );

    return RunningStateOrder[highestRunningState] >
      RunningStateOrder[runningState]
      ? highestRunningState
      : runningState;
  }

  return runningState;
};
