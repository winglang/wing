export type LogLevel = "verbose" | "info" | "warn" | "error";

export type LogSource = "compiler" | "console" | "simulator";

export interface LogEntry {
  timestamp: number;
  level: LogLevel;
  message: string;
  source: LogSource;
}

export interface ConsoleLogger {
  messages: LogEntry[];
  verbose: (message: string, source?: LogSource) => void;
  log: (message: string, source?: LogSource) => void;
  error: (message: unknown, source?: LogSource) => void;
}
