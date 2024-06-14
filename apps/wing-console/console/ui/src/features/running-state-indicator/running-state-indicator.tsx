import type { ResourceRunningState } from "@winglang/sdk/lib/simulator/simulator.js";
import type { FunctionComponent } from "react";

export interface RunningStateIndicatorProps {
  runningState: ResourceRunningState;
}

export const RunningStateIndicator: FunctionComponent<
  RunningStateIndicatorProps
> = ({ runningState }) => {
  if (runningState === "error") {
    return <div className="size-2 rounded-full bg-red-500"></div>;
  }
  if (runningState === "starting" || runningState === "stopping") {
    return (
      <div className="relative">
        <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></div>
        <div className="size-2 rounded-full bg-gray-400"></div>
      </div>
    );
  }
  if (runningState === "stopped") {
    return <div className="size-2 rounded-full bg-gray-400"></div>;
  }
  return <div className="size-2"></div>;
};
