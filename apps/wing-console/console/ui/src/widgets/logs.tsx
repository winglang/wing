import {
  ScrollableArea,
  USE_EXTERNAL_THEME_COLOR,
  useTheme,
} from "@wingconsole/design-system";
import type { LogEntry, LogLevel } from "@wingconsole/server";
import classNames from "classnames";
import { useState, useRef, useEffect, useCallback, memo } from "react";

import { ConsoleLogsFilters } from "../features/console-logs-filters.js";
import { ConsoleLogs } from "../features/console-logs.js";
import { trpc } from "../services/trpc.js";

const DEFAULT_LOG_LEVELS: LogLevel[] = ["info", "warn", "error"];

export interface LogsWidgetProps {
  onResourceClick?: (path: string) => void;
}

export const LogsWidget = memo(({ onResourceClick }: LogsWidgetProps) => {
  const { theme } = useTheme();

  const [selectedLogTypeFilters, setSelectedLogTypeFilters] = useState(
    () => DEFAULT_LOG_LEVELS,
  );
  const [searchText, setSearchText] = useState("");

  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([]);
  const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>(
    [],
  );

  const [logsTimeFilter, setLogsTimeFilter] = useState(0);

  const filters = trpc["app.logsFilters"].useQuery();

  const logs = trpc["app.logs"].useQuery(
    {
      filters: {
        level: {
          verbose: selectedLogTypeFilters.includes("verbose"),
          info: selectedLogTypeFilters.includes("info"),
          warn: selectedLogTypeFilters.includes("warn"),
          error: selectedLogTypeFilters.includes("error"),
        },
        text: searchText,
        timestamp: logsTimeFilter,
        resourceIds: selectedResourceIds,
        resourceTypes: selectedResourceTypes,
      },
    },
    {
      keepPreviousData: true,
    },
  );

  const scrollableRef = useRef<HTMLDivElement>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const [initialScroll, setInitialScroll] = useState(true);

  useEffect(() => {
    const element = scrollableRef.current;
    if (!element) {
      return;
    }

    if (!logs.data) {
      return;
    }

    if (initialScroll || scrolledToBottom) {
      setInitialScroll(false);
      element.scrollTo({
        top: element.scrollHeight,
        behavior: initialScroll ? "instant" : "smooth",
      });
    }
  }, [initialScroll, logs.data, scrolledToBottom]);

  const onLogClick = useCallback(
    (log: LogEntry) => {
      const path = log.ctx?.sourcePath;
      if (path) {
        onResourceClick?.(path);
      }
    },
    [onResourceClick],
  );

  const clearLogs = useCallback(() => setLogsTimeFilter(Date.now()), []);

  const resetFilters = useCallback(() => {
    setSelectedLogTypeFilters(DEFAULT_LOG_LEVELS);
    setSelectedResourceIds([]);
    setSelectedResourceTypes([]);
    setSearchText("");
  }, []);

  return (
    <div className="relative h-full flex flex-col gap-2">
      <ConsoleLogsFilters
        selectedLogTypeFilters={selectedLogTypeFilters}
        setSelectedLogTypeFilters={setSelectedLogTypeFilters}
        clearLogs={clearLogs}
        onSearch={setSearchText}
        resources={filters.data?.resources ?? []}
        selectedResourceIds={selectedResourceIds}
        setSelectedResourceIds={setSelectedResourceIds}
        selectedResourceTypes={selectedResourceTypes}
        setSelectedResourceTypes={setSelectedResourceTypes}
        onResetFilters={resetFilters}
        shownLogs={logs.data?.logs.length ?? 0}
        hiddenLogs={logs.data?.hiddenLogs ?? 0}
      />

      <div className="relative h-full">
        <ScrollableArea
          ref={scrollableRef}
          overflowY
          className={classNames(
            "pb-1.5",
            theme.bg3,
            theme.text2,
            USE_EXTERNAL_THEME_COLOR,
          )}
          onScrolledToBottomChange={setScrolledToBottom}
        >
          <ConsoleLogs
            logs={logs.data?.logs ?? []}
            onResourceClick={onLogClick}
          />
        </ScrollableArea>
      </div>
    </div>
  );
});
