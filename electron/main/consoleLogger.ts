export type LogType = "verbose" | "info" | "warn" | "error";

export type LogSource = "compiler" | "console" | "simulator";

export interface LogEntry {
  timestamp: number;
  type: LogType;
  message: string;
  source: LogSource;
}

export interface ConsoleLogger {
  messages: LogEntry[];
  verbose: (message: string, source?: LogSource) => void;
  log: (message: string, source?: LogSource) => void;
  error: (message: unknown, source?: LogSource) => void;
}
