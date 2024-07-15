import type { ResourceRunningState } from "@winglang/sdk/lib/simulator/simulator.js";
import classNames from "classnames";
import { useMemo, type FunctionComponent } from "react";

export interface RunningStateIndicatorProps {
  runningState: ResourceRunningState | undefined;
  className?: string;
}

export const RunningStateIndicator: FunctionComponent<
  RunningStateIndicatorProps
> = ({ runningState, className }) => {
  const color = useMemo(() => {
    if (runningState === "error") {
      return "bg-red-500";
    }
    if (runningState === "starting" || runningState === "stopping") {
      return "bg-yellow-500";
    }
    if (runningState === "stopped") {
      return "bg-gray-400";
    }
  }, [runningState]);

  const ping = useMemo(() => {
    return runningState === "starting" || runningState === "stopping";
  }, [runningState]);

  if (!color) {
    return <></>;
  }

  return (
    <div className={classNames("relative", "rounded-full", className)}>
      {ping && (
        <div
          className={classNames(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            color,
          )}
        />
      )}
      <div className={classNames("rounded-full", color, "w-full h-full")}></div>
    </div>
  );
};
