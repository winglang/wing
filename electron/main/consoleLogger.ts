export interface LogEntry {
  timestamp: number;
  type: "info" | "warn" | "error";
  message: string;
}

export interface ConsoleLogger {
  messages: LogEntry[];
  log: (message: string) => void;
  error: (message: unknown) => void;
}
