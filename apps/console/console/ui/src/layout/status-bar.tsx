import { useTheme, Loader } from "@wingconsole/design-system";
import { State } from "@wingconsole/server";
import classNames from "classnames";

import { AutoUpdater } from "../features/auto-updater.js";

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
