import { useTheme, Loader } from "@wingconsole/design-system";
import { State } from "@wingconsole/server";
import classNames from "classnames";

import { AutoUpdater } from "../features/auto-updater.js";
import { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export interface StatusBarProps {
  wingVersion?: string;
  cloudAppState: State;
  isError?: boolean;
}

export const StatusBar = ({
  wingVersion = "",
  cloudAppState,
  isError = false,
}: StatusBarProps) => {
  const { theme } = useTheme();
  const loading =
    cloudAppState === "loadingSimulator" || cloudAppState === "compiling";
  const cloudAppStateString = {
    compiling: "compiling",
    loadingSimulator: "loading simulator",
    success: "success",
    error: "error",
  };

  const [mode, setMode] = useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  const onToggle = () => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <footer
      className={classNames(
        theme.bg3,
        theme.text1,
        theme.border3,
        "py-1 px-4 flex text-2xs w-full relative border-t",
      )}
    >
      {/*left side*/}
      <div className="w-full flex space-x-6">
        <div className="flex space-x-1 items-center">
          <button
            className={classNames(
              theme.textInput,
              "rounded-3xl font-medium flex focus:outline-none",
              "hover:bg-slate-200 hover:dark:bg-slate-700",
              "transition-color duration-300",
            )}
            onClick={onToggle}
          >
            {mode === "light" && <SunIcon className="h-4" />}
            {mode === "dark" && <MoonIcon className="h-4" />}
          </button>
        </div>
        <div title={wingVersion} className="truncate space-x-1 min-w-[7rem]">
          {wingVersion && (
            <>
              <span>Wing</span>
              <span className={classNames(theme.text2)}>v{wingVersion}</span>
            </>
          )}
        </div>

        <div className="flex space-x-1">
          <span>Status:</span>
          <span className={classNames(theme.text2)}>
            <span
              className={classNames([
                isError ? "text-red-500" : theme.text2,
                "flex",
              ])}
            >
              {loading && <Loader size="1rem" />}
              {cloudAppStateString[cloudAppState]}
            </span>
          </span>
        </div>
      </div>
      {/*right side*/}
      <div className="w-full flex space-x-0 justify-end">
        <AutoUpdater />
      </div>
    </footer>
  );
};
