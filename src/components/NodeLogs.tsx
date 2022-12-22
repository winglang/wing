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

interface NodeLogEntryProps {
  log: LogEntry;
}

const NodeLogEntry = ({ log }: NodeLogEntryProps) => {
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
    const html = log.message
      .replace(
        /((?:[a-z]:)?[/\\]\S+):(\d+):(\d+)/gi,
        (match, path, line, column) => {
          return `<a class="text-sky-500 underline hover:text-sky-800" onclick="event.stopPropagation()" href="vscode://file/${path}:${line}:${column}">${match}</a>`;
        },
      )
      .replace(/(\r\n|\n|\r)/gm, expanded ? "<br />" : "\n");
    expandableRef.current.innerHTML = html;
  }, [log.message, expanded]);

  return (
    <Fragment>
      <div className="flex text-slate-400 text-xs">
        {dateTimeFormat.format(log.timestamp)}
      </div>

      <div className="pl-2">
        <div
          className={classNames(
            "px-2 rounded-lg text-xs inline-flex uppercase",
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
            "px-2 rounded-lg text-xs inline-flex uppercase",
            {
              "bg-slate-50 text-slate-500": log.type === "verbose",
              "bg-slate-400 text-white": log.type === "info",
              "bg-yellow-400 text-white": log.type === "warn",
              "bg-red-400 text-white": log.type === "error",
            },
          )}
        >
          {log.type}
        </div>
      </div>

      <button
        className={classNames(
          "text-left text-xs px-1.5 py-0.5 group",
          "flex min-w-0",
          {
            "hover:bg-slate-100": canBeExpanded,
            "cursor-default": !canBeExpanded,
            "text-slate-700": log.type !== "verbose",
            "hover:text-slate-800": log.type !== "verbose" && canBeExpanded,
            "text-slate-400": log.type === "verbose",
            "hover:text-slate-500": log.type === "verbose" && canBeExpanded,
          },
        )}
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
        ></span>
      </button>
    </Fragment>
  );
};

export interface NodeLogsProps {
  logs: LogEntry[];
}

export const NodeLogs = ({ logs }: NodeLogsProps) => {
  return (
    <>
      <div
        className="grid gap-x-2 text-sm font-mono"
        style={{
          gridTemplateColumns: "max-content max-content max-content 1fr",
        }}
      >
        {logs.map((log, logIndex) => (
          <NodeLogEntry key={`${logIndex}-${log.timestamp}`} log={log} />
        ))}
      </div>
    </>
  );
};
