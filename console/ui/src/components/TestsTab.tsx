import { MagnifyingGlassIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { LogEntry } from "@wingconsole/server";
import classNames from "classnames";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";

import { Button } from "../design-system/Button.js";
import { Input } from "../design-system/Input.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { trpc } from "../utils/trpc.js";

import { ConsoleLogs, LoggerEntry } from "./ConsoleLogs.js";

const getLogEntry = (entry: {
  message: string;
  timestamp?: number;
  logClassName?: string;
  labelClassName?: string;
}): LoggerEntry => {
  return {
    id: `${nanoid()}`,
    timestamp: entry.timestamp,
    message: entry.message,
    level: "info",
    source: "user",
    logClassName: entry.logClassName,
    labelClassName: entry.labelClassName,
  };
};

export const TestsTab = () => {
  const logsRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState("");
  const [logsTimeFilter, setLogsTimeFilter] = useState<number>(0);

  const [parsedLogs, setParsedLogs] = useState<LogEntry[]>([]);
  const logsQuery = trpc["test.logs"].useQuery(
    {
      filters: {
        text: searchText,
        timestamp: logsTimeFilter,
      },
    },
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    logsQuery.refetch();
  }, [searchText, logsTimeFilter]);

  useEffect(() => {
    if (!logsQuery.data) {
      return;
    }
    setParsedLogs(
      logsQuery.data.map((log) =>
        getLogEntry({
          message: log.message,
          timestamp: log.type === "log" ? log.timestamp : undefined,
          logClassName: classNames(
            log.type === "title" && "font-medium",
            log.type !== "title" && "border-none",
            log.type === "error" && "pl-4 bg-red-100",
          ),
          labelClassName: classNames(
            log.type === "title" && "text-slate-500",
            log.type === "error" && "text-red-500",
            log.type === "success" && "text-green-700",
            log.type === "fail" && "text-red-500",
            log.type === "summary" && "font-medium text-slate-600",
          ),
        }),
      ),
    );
  }, [logsQuery.data]);

  useEffect(() => {
    const div = logsRef.current;
    if (div) {
      div.scrollTo({ top: div.scrollHeight });
    }
  }, [parsedLogs]);

  return (
    <div className="flex flex-col grow gap-2">
      <div className="flex space-x-2 px-2 pt-1">
        <Button
          icon={NoSymbolIcon}
          className="px-1.5"
          onClick={() => setLogsTimeFilter(Date.now())}
          title="Clear logs"
          disabled={parsedLogs.length === 0}
        />
        <Input
          value={searchText}
          className="min-w-[14rem]"
          leftIcon={MagnifyingGlassIcon}
          type="text"
          placeholder="Filter..."
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      <div className="flex grow">
        <div className="relative flex flex-col grow">
          <div className="flex-1 h-full flex relative">
            <ScrollableArea
              ref={logsRef}
              overflowY
              className="pb-1.5 font-mono"
            >
              {parsedLogs?.length > 0 && (
                <ConsoleLogs logs={parsedLogs ?? []} />
              )}
              {parsedLogs?.length === 0 && (
                <div className="text-slate-400 text-2xs px-2">No logs</div>
              )}
            </ScrollableArea>
          </div>
        </div>
      </div>
    </div>
  );
};
