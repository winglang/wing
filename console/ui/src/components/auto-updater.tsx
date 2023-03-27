import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ProgressBar } from "@wingconsole/design-system";
import classNames from "classnames";
import { useEffect, useState } from "react";

import { trpc } from "../utils/trpc.js";

export const AutoUpdater = () => {
  const enabled = trpc["updater.enabled"].useQuery();
  const { data: currentStatus } = trpc["updater.currentStatus"].useQuery(
    undefined,
    {
      enabled: enabled.data?.enabled,
    },
  );
  const checkForUpdates = trpc["updater.checkForUpdates"].useMutation();
  const quitAndInstall = trpc["updater.quitAndInstall"].useMutation();

  const [nextVersion, setNextVersion] = useState<string>("");

  useEffect(() => {
    if (enabled?.data?.enabled) {
      checkForUpdates.mutate();
    }
  }, [enabled?.data?.enabled]);

  useEffect(() => {
    if (currentStatus?.status?.version) {
      setNextVersion(currentStatus?.status.version);
    }
  }, [currentStatus?.status?.version]);

  const getText = () => {
    switch (currentStatus?.status?.status) {
      case "checking-for-update":
      case "update-available": {
        return "Checking for updates...";
      }
      case "download-progress": {
        return "Downloading V" + nextVersion + ":";
      }
      case "error": {
        return "Failed to update Wing Console";
      }
      case "update-downloaded": {
        return "V" + nextVersion + " is available";
      }
      default: {
        return "";
      }
    }
  };

  // updater is not available
  if (!enabled.data?.enabled) {
    return <></>;
  }

  return (
    <div className="flex space-x-1 min-w-[3rem] text-slate-600">
      <span
        className={classNames([
          currentStatus?.status?.status === "error"
            ? "text-red-500"
            : "text-slate-600",
          "flex",
        ])}
      >
        {getText()}
        {currentStatus?.status?.status === "update-downloaded" && (
          <button
            className={
              "text-sky-500 background-transparent text-xs outline-none focus:outline-none hover:text-sky-700 ml-1"
            }
            onClick={() => {
              quitAndInstall.mutate();
            }}
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
        )}
      </span>
      {currentStatus?.status?.progress &&
      currentStatus?.status?.status === "download-progress" ? (
        <div className={classNames(["self-center text-slate-600 flex w-24"])}>
          <ProgressBar
            progress={currentStatus?.status?.progress || 0}
            size="sm"
          />
        </div>
      ) : undefined}
    </div>
  );
};
