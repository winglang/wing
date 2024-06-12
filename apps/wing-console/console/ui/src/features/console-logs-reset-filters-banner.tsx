import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

export interface ConsoleLogsResetFiltersBannerProps {
  shownLogs: number;
  hiddenLogs: number;
  onResetFilters: () => void;
}

export const ConsoleLogsResetFiltersBanner = ({
  shownLogs,
  hiddenLogs,
  onResetFilters,
}: ConsoleLogsResetFiltersBannerProps) => {
  const { theme } = useTheme();

  return (
    <>
      {shownLogs === 0 && hiddenLogs > 0 && (
        <div
          className={classNames(
            "flex justify-between px-2 py-1 text-xs",
            theme.bg4,
          )}
        >
          <div
            className={classNames(
              "text-slate-600 dark:text-slate-300 font-light",
            )}
          >
            All logs entries are hidden by the current filters
            <span className="italic ml-1.5 text-slate-550 dark:text-slate-350">
              ({hiddenLogs} hidden entries)
            </span>
          </div>

          <button
            onClick={onResetFilters}
            className={classNames(
              "text-xs underline cursor-pointer rounded",
              "px-1 outline-none transition-all",
              theme.focusInput,
              theme.text1,
              theme.text1Hover,
            )}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
};
