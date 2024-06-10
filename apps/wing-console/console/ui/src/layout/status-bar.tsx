import { useTheme, Loader } from "@wingconsole/design-system";
import type { State } from "@wingconsole/server";
import classNames from "classnames";

import { AutoUpdater } from "../features/auto-updater.js";

import { ThemeToggle } from "./theme-toggle.js";

export interface StatusBarProps {
  wingVersion?: string;
  cloudAppState: State;
  isError?: boolean;
  showThemeToggle?: boolean;
  onRestart?: () => void;
}

export const StatusBar = ({
  wingVersion = "",
  cloudAppState,
  isError = false,
  showThemeToggle = false,
  onRestart,
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
  return (
    <footer
      className={classNames(
        theme.bg1,
        theme.text1,
        theme.border3,
        "py-1 px-4 flex text-2xs w-full relative z-10",
      )}
    >
      {/*left side*/}
      <div className="w-full flex space-x-6">
        <div title={wingVersion} className="truncate space-x-1">
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
              data-testid="app-state"
              className={classNames([
                isError ? "text-red-500" : theme.text2,
                "flex",
              ])}
            >
              {loading && <Loader size="xs" className={"mr-1"} />}
              {cloudAppStateString[cloudAppState]}
            </span>
          </span>
        </div>
      </div>
      {/*center*/}
      <div className="w-full flex justify-center items-center"></div>
      {/*right side*/}
      <div className="w-full flex space-x-4 justify-end">
        <AutoUpdater />
        {showThemeToggle && <ThemeToggle />}
      </div>
    </footer>
  );
};
