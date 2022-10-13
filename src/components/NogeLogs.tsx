import classNames from "classnames";

export interface LogEntry {
  timestamp: number;
  message: string;
}

export interface NodeLogsProps {
  logs: LogEntry[];
}

export const NodeLogs = ({ logs }: NodeLogsProps) => {
  return (
    <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
      <thead className="bg-slate-50">
        <tr>
          <th
            scope="col"
            className="sticky top-0 z-[1] border-b border-slate-300 bg-slate-50 bg-opacity-75 py-1.5 pl-5 pr-2 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter"
          >
            Timestamp
          </th>
          <th
            scope="col"
            className="sticky top-0 z-[1] border-b border-slate-300 bg-slate-50 bg-opacity-75 px-2 py-1.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter w-full"
          >
            Message
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {logs.map((log, logIndex) => (
          <tr key={logIndex}>
            <td
              className={classNames(
                logIndex !== logs.length - 1 ? "border-b border-slate-200" : "",
                "whitespace-nowrap p-2 pl-5 text-sm text-slate-800",
              )}
            >
              <div className="truncate">
                <span>{log.timestamp}</span>
              </div>
            </td>
            <td
              className={classNames(
                logIndex !== logs.length - 1 ? "border-b border-slate-200" : "",
                "whitespace-nowrap p-2 text-sm text-slate-800",
              )}
            >
              <div className="max-w-xs truncate">{log.message}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
