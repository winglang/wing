import {
  ChevronDownIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useTheme, ResourceIcon } from "@wingconsole/design-system";
import type { LogEntry } from "@wingconsole/server";
import classNames from "classnames";
import Linkify from "linkify-react";
import throttle from "lodash.throttle";
import { Fragment, memo, useEffect, useMemo, useRef, useState } from "react";

import { OpenFileInEditorButton } from "../shared/use-file-link.js";

const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
});

interface LogEntryProps {
  log: LogEntry;
  onResourceClick?: (log: LogEntry) => void;
  onRowClick?: (log: LogEntry) => void;
  showIcons?: boolean;
}

function logText(log: LogEntry, expanded: boolean) {
  return expanded ? log.message : log.message?.split("\n")?.[0];
}

const LogEntryRow = memo(
  ({ log, showIcons = true, onRowClick, onResourceClick }: LogEntryProps) => {
    const { theme } = useTheme();

    const [expanded, setExpanded] = useState(false);
    const expandableRef = useRef<HTMLPreElement>(null);
    const [overflows, setOverflows] = useState(false);

    useEffect(() => {
      const computeOverflows = throttle(() => {
        const element = expandableRef.current?.parentNode as HTMLPreElement;
        if (!element) {
          return;
        }
        setOverflows(
          element.offsetWidth < element.scrollWidth ||
            log.message?.indexOf("\n") !== -1,
        );
      }, 500);

      computeOverflows();

      window.addEventListener("resize", computeOverflows);
      return () => {
        window.removeEventListener("resize", computeOverflows);
      };
    }, [log.message]);
    const [canBeExpanded, setCanBeExpanded] = useState(false);
    useEffect(() => {
      setCanBeExpanded(overflows || expanded);
    }, [expanded, overflows]);

    const ChevronIcon = useMemo(
      () => (expanded ? ChevronDownIcon : ChevronRightIcon),
      [expanded],
    );

    return (
      <Fragment>
        {/*TODO: Fix a11y*/}
        {/*eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions*/}
        <div
          className={classNames(
            "group w-full flex",
            "flex min-w-0",
            "justify-between",
            theme.border4,
            theme.bg2Hover,
            "border-t text-2xs py-0.5 px-2",
            {
              [theme.text1]: log.level === "info",
              "text-blue-500": log.level === "verbose",
              "hover:text-blue-600": log.level === "verbose" && canBeExpanded,
              "text-yellow-500": log.level === "warn",
              "hover:text-yellow-600": log.level === "warn" && canBeExpanded,
              "text-red-500": log.level === "error",
              "hover:text-red-600": log.level === "error" && canBeExpanded,
            },
            log.ctx?.messageType === "info" && theme.bg4,
          )}
          onClick={() => onRowClick?.(log)}
        >
          {showIcons && (
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
          )}

          {log.timestamp && !log.ctx?.hideTimestamp && (
            <div
              className={classNames(
                theme.text2,
                "flex-shrink-0 select-none pointer-events-none",
              )}
            >
              {dateTimeFormat.format(log.timestamp)}
            </div>
          )}
          <div
            className={classNames("min-w-0 text-left grow", {
              truncate: !expanded,
              "ml-2": log.timestamp && !log.ctx?.hideTimestamp,
            })}
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
                    "mr-0.5 inline-block -mt-0.5",
                    theme.text1,
                    theme.text1Hover,
                  )}
                />
              </button>
            )}
            <pre
              className={classNames(
                "inline",
                expanded && "whitespace-pre-wrap break-words",
                log.ctx?.messageType === "info" && theme.text2,
                log.ctx?.messageType === "title" && theme.text1,
                log.ctx?.messageType === "success" &&
                  "text-green-700 dark:text-green-500",
                log.ctx?.messageType === "fail" && "text-red-500",
                log.ctx?.messageType === "summary" && [
                  "font-medium",
                  theme.text1,
                ],
              )}
              ref={expandableRef}
            >
              <Linkify
                options={{
                  className: "text-sky-500 underline hover:text-sky-800",
                  attributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  },
                }}
              >
                {logText(log, expanded)}
              </Linkify>
            </pre>
          </div>

          {onResourceClick && (
            <div className="justify-end ml-1 flex space-x-1 select-none">
              {log.ctx?.sourceType && (
                <span className="p-0.5">
                  <ResourceIcon
                    resourceType={log.ctx.sourceType}
                    resourcePath={log.ctx.sourcePath}
                    className="h-4 w-4"
                  />
                </span>
              )}
              <button
                onClick={() => onResourceClick(log)}
                className={classNames(
                  "flex cursor-pointer underline truncate",
                  theme.text1,
                  theme.text3Hover,
                )}
              >
                {log.ctx?.label || log.ctx?.sourcePath}
              </button>
            </div>
          )}
        </div>
      </Fragment>
    );
  },
);

export interface ConsoleLogsProps {
  logs: LogEntry[];
  onRowClick?: (log: LogEntry) => void;
  onResourceClick?: (log: LogEntry) => void;
  showIcons?: boolean;
  hiddenLogs: number;
}

export const ConsoleLogs = memo(
  ({
    logs,
    onRowClick,
    onResourceClick,
    showIcons = true,
    hiddenLogs,
  }: ConsoleLogsProps) => {
    const { theme } = useTheme();

    return (
      <div
        className="w-full h-full gap-x-2 text-2xs font-mono select-text"
        data-testid="logs"
      >
        {logs.map((log) => (
          <LogEntryRow
            key={`${log.id}`}
            log={log}
            onResourceClick={onResourceClick}
            onRowClick={onRowClick}
            showIcons={showIcons}
          />
        ))}
        {logs.length === 0 && hiddenLogs === 0 && (
          <div className={classNames(theme.text1, "text-2xs px-2 select-none")}>
            No logs
          </div>
        )}
      </div>
    );
  },
);
