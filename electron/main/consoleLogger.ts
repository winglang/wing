import log from "electron-log";

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

export const createConsoleLogger = (
  onLog: (logLevel: LogLevel, message: string) => void,
): ConsoleLogger => {
  log.transports.console.bind(process.stdout);

  return {
    messages: new Array<LogEntry>(),
    verbose(message, source) {
      log.info(message);
      this.messages.push({
        timestamp: Date.now(),
        level: "verbose",
        message,
        source: source ?? "console",
      });
      onLog("verbose", message);
    },
    log(message, source) {
      log.info(message);
      this.messages.push({
        timestamp: Date.now(),
        level: "info",
        message,
        source: source ?? "console",
      });
      onLog("info", message);
    },
    error(error, source) {
      log.error(error);
      const message = error instanceof Error ? error.message : `${error}`;
      this.messages.push({
        timestamp: Date.now(),
        level: "error",
        message,
        source: source ?? "console",
      });
      onLog("error", message);
    },
  };
};
