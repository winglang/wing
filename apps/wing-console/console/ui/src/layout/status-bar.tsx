import { useTheme, Loader } from "@wingconsole/design-system";
import { State } from "@wingconsole/server";
import classNames from "classnames";

import { AutoUpdater } from "../features/auto-updater.js";
import { useCallback } from "react";
import { ArrowPathIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const AutoThemeIcon = () => {
  const { theme } = useTheme();
  return (
    <div className={"relative h-4 w-4"}>
      <ArrowPathIcon className="h-4 absolute -rotate-[5deg]" />
      <SunIcon
        className={classNames(
          "h-[7.5px] absolute z-10 top-0 -left-[1px]",
          theme.bg3,
          "rounded-xl",
        )}
      />
      <MoonIcon
        className={classNames(
          "h-[7.5px] absolute z-10 bottom-0 -right-[1px]",
          theme.bg3,
          "rounded-xl",
        )}
      />
    </div>
  );
};

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
  const { theme, mode, setThemeMode } = useTheme();
  const loading =
    cloudAppState === "loadingSimulator" || cloudAppState === "compiling";
  const cloudAppStateString = {
    compiling: "compiling",
    loadingSimulator: "loading simulator",
    success: "success",
    error: "error",
  };

  const toggleThemeMode = useCallback(() => {
    const newMode =
      mode === "light" ? "auto" : mode === "auto" ? "dark" : "light";
    setThemeMode?.(newMode);
  }, [setThemeMode, mode]);

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
      <div className="w-full flex space-x-8">
        <div className="flex space-x-1 items-center">
          <button
            className={classNames(
              theme.textInput,
              "rounded-3xl font-medium flex focus:outline-none",
              "hover:bg-slate-200 hover:dark:bg-slate-700",
              "transition-color duration-300",
            )}
            onClick={toggleThemeMode}
          >
            {mode === "light" && <SunIcon className="h-4" />}
            {mode === "dark" && <MoonIcon className="h-4" />}
            {mode === "auto" && <AutoThemeIcon />}
          </button>
        </div>

        <div title={wingVersion} className="truncate space-x-1 min-w-[4rem]">
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
