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
    <div>
      <div
        className={classNames(
          "flex justify-between px-2 py-1 text-xs",
          theme.bg4,
        )}
      >
        {shownLogs === 0 && (
          <div className={classNames(theme.text2)}>
            All logs entries are hidden by the current filters
          </div>
        )}

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
          Reset filters
        </button>
      </div>
    </div>
  );
};
