import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import throttle from "lodash.throttle";
import { Fragment, useEffect, useRef, useState } from "react";

import { LogEntry } from "../../electron/main/consoleLogger.js";

const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
});

interface LogEntryProps {
  log: LogEntry;
  onMouseDownHandler: (log: LogEntry) => void;
  isSelected: boolean;
}

export const formatAbsolutePaths = (
  error: string,
  className: string,
  expanded: boolean = false,
) => {
  return error
    .replace(
      /\B((?:[a-z]:)?[/\\]\S+):(\d+):(\d+)/gi,
      (match, path, line, column) => {
        return `<a class="${className}" onclick="event.stopPropagation()" href="vscode://file/${path}:${line}:${column}">${match}</a>`;
      },
    )
    .replace(/(\r\n|\n|\r)/gm, expanded ? "<br />" : "\n");
};

const LogEntryRow = ({
  log,
  isSelected,
  onMouseDownHandler,
}: LogEntryProps) => {
  const [expanded, setExpanded] = useState(false);
  const expandableRef = useRef<HTMLElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const computeOverflows = throttle(() => {
      const element = expandableRef.current;
      if (!element) {
        return;
      }
      setOverflows(element.offsetWidth < element.scrollWidth);
    }, 500);

    computeOverflows();

    window.addEventListener("resize", computeOverflows);
    return () => {
      window.removeEventListener("resize", computeOverflows);
    };
  }, []);
  const [canBeExpanded, setCanBeExpanded] = useState(false);
  useEffect(() => {
    setCanBeExpanded(overflows || expanded);
  }, [expanded, overflows]);

  const ChevronIcon = expanded ? ChevronDownIcon : ChevronRightIcon;

  useEffect(() => {
    if (expandableRef.current === null) {
      return;
    }
    const html = formatAbsolutePaths(
      log.message,
      "text-sky-500 underline hover:text-sky-800",
      expanded,
    );
    expandableRef.current.innerHTML = html;
  }, [log.message, expanded]);

  return (
    <Fragment>
      <div className="flex text-slate-400 text-2xs">
        {dateTimeFormat.format(log.timestamp)}
      </div>

      <div className="pl-2">
        <div
          className={classNames(
            "px-2 rounded-lg text-2xs inline-flex uppercase",
            {
              "bg-slate-400 text-white": true,
            },
          )}
        >
          {log.source}
        </div>
      </div>

      <div>
        <div
          className={classNames(
            "px-2 rounded-lg text-2xs inline-flex uppercase",
            {
              "bg-slate-50 text-slate-500": log.level === "verbose",
              "bg-slate-400 text-white": log.level === "info",
              "bg-yellow-400 text-white": log.level === "warn",
              "bg-red-400 text-white": log.level === "error",
            },
          )}
        >
          {log.level}
        </div>
      </div>

      <button
        className={classNames(
          "text-left text-2xs px-1.5 py-0.5 group select-text",
          "flex min-w-0",
          {
            "hover:bg-slate-100": canBeExpanded,
            "cursor-default": !canBeExpanded,
            "text-slate-700": log.level !== "verbose",
            "hover:text-slate-800": log.level !== "verbose" && canBeExpanded,
            "text-slate-400": log.level === "verbose",
            "hover:text-slate-500": log.level === "verbose" && canBeExpanded,
            "bg-slate-100": isSelected,
          },
        )}
        onMouseDown={() => onMouseDownHandler(log)}
        onClick={() => {
          if (canBeExpanded) {
            setExpanded((expanded) => !expanded);
          }
        }}
      >
        <div
          className={classNames(
            "flex-shrink-0 pr-1.5",
            canBeExpanded && "group-hover:bg-slate-100",
          )}
        >
          <ChevronIcon
            className={classNames("w-3.5 h-3.5 inline-block", {
              invisible: !canBeExpanded,
            })}
          />
        </div>
        <span
          ref={expandableRef}
          className={classNames({
            truncate: !expanded,
          })}
        />
      </button>
    </Fragment>
  );
};

export interface ConsoleLogsProps {
  logs: LogEntry[];
  onLogSelected?: (log: LogEntry) => void;
}

export const ConsoleLogs = ({ logs, onLogSelected }: ConsoleLogsProps) => {
  const [selectedLog, setSelectedLog] = useState<LogEntry | undefined>(
    undefined,
  );
  const handleMouseDown = (log: LogEntry) => {
    setSelectedLog(log);
    onLogSelected?.(log);
  };
  return (
    <>
      <div
        className="grid gap-x-2 text-2xs font-mono"
        style={{
          gridTemplateColumns: "max-content max-content max-content 1fr",
        }}
      >
        {logs.map((log, logIndex) => (
          <LogEntryRow
            key={`${logIndex}-${log.timestamp}`}
            log={log}
            isSelected={selectedLog === log}
            onMouseDownHandler={handleMouseDown}
          />
        ))}
        {logs.length === 0 && (
          <div className="text-slate-400 text-2xs">No logs</div>
        )}
      </div>
    </>
  );
};
