import classNames from "classnames";

export interface LogEntry {
  timestamp: number;
  type: "info" | "warn" | "error";
  message: string;
}

export interface NodeLogsProps {
  logs: LogEntry[];
}

const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
});

export const NodeLogs = ({ logs }: NodeLogsProps) => {
  return (
    <div
      className="grid grid-cols-3 gap-x-4 text-sm"
      style={{ gridTemplateColumns: "max-content max-content 1fr" }}
    >
      {logs.map((log) => (
        <>
          <div className="flex items-center text-slate-500 font-mono text-xs">
            {dateTimeFormat.format(log.timestamp)}
          </div>

          <div>
            <div
              className={classNames(
                "px-2 rounded-lg text-xs inline-flex items-center uppercase",
                {
                  "bg-slate-400 text-white": log.type === "info",
                  "bg-yellow-400 text-white": log.type === "warn",
                  "bg-red-400 text-white": log.type === "error",
                },
              )}
            >
              {log.type}
            </div>
          </div>

          <div>{log.message}</div>
        </>
      ))}
    </div>
  );
};
