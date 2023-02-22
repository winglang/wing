import {
  ChevronDownIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
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
  onResourceClick: (log: LogEntry) => void;
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

const LogEntryRow = ({ log, onResourceClick }: LogEntryProps) => {
  const [expanded, setExpanded] = useState(false);
  const expandableRef = useRef<HTMLElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const computeOverflows = throttle(() => {
      const element = expandableRef.current?.parentNode as HTMLElement;
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
      <div
        className={classNames(
          "group w-full flex",
          "flex min-w-0",
          "justify-between",
          "border-t border-slate-200 text-2xs py-0.5",
          {
            "text-blue-500": log.level === "verbose",
            "hover:text-blue-600": log.level === "verbose" && canBeExpanded,
            "text-slate-700": log.level === "info",
            "hover:text-slate-800": log.level === "info" && canBeExpanded,
            "text-yellow-500": log.level === "warn",
            "hover:text-yellow-600": log.level === "warn" && canBeExpanded,
            "text-red-500 bg-red-100": log.level === "error",
            "hover:text-red-600": log.level === "error" && canBeExpanded,
          },
        )}
      >
        <div className="flex-shrink-0">
          <XCircleIcon
            className={classNames(
              "w-3.5 h-3.5",
              "text-red-500 mr-1 inline-block -mt-0.5",
              {
                invisible: log.level !== "error",
              },
            )}
          />
        </div>

        <div className="flex text-slate-500 ml-1">
          {dateTimeFormat.format(log.timestamp)}
        </div>

        <div
          className={classNames(
            "cursor-default select-text min-w-0 ml-2 text-left grow",
            {
              truncate: !expanded,
            },
          )}
        >
          {canBeExpanded && (
            <button
              onClick={() => {
                setExpanded((expanded) => !expanded);
              }}
            >
              <ChevronIcon
                className={classNames(
                  "w-3.5 h-3.5",
                  "text-slate-500 mr-0.5 inline-block -mt-0.5",
                  "hover:text-slate-600",
                )}
              />
            </button>
          )}
          <span ref={expandableRef} />
        </div>

        <div className="justify-end ml-1">
          <a
            onClick={() => onResourceClick(log)}
            className={classNames(
              "flex cursor-pointer underline truncate",
              "text-slate-500 hover:text-slate-600",
            )}
          >
            {log.ctx?.sourcePath}
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export interface ConsoleLogsProps {
  logs: LogEntry[];
  onResourceClick?: (log: LogEntry) => void;
}

export const ConsoleLogs = ({ logs, onResourceClick }: ConsoleLogsProps) => {
  return (
    <>
      <div className="w-full gap-x-2 text-2xs font-mono">
        {logs.map((log, logIndex) => (
          <LogEntryRow
            key={`${log.id}`}
            log={log}
            onResourceClick={(logEntry) => onResourceClick?.(logEntry)}
          />
        ))}
        {logs.length === 0 && (
          <div className="text-slate-400 text-2xs">No logs</div>
        )}
      </div>
    </>
  );
};
