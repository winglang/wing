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
  onLog: (channel: string, args: string) => void,
): ConsoleLogger => {
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
      // TODO: Use TRPC websockets.
      onLog("trpc.invalidate", "app.logs");
    },
    log(message, source) {
      log.info(message);
      this.messages.push({
        timestamp: Date.now(),
        level: "info",
        message,
        source: source ?? "console",
      });
      // TODO: Use TRPC websockets.
      onLog("trpc.invalidate", "app.logs");
    },
    error(error, source) {
      log.error(error);
      this.messages.push({
        timestamp: Date.now(),
        level: "error",
        message: error instanceof Error ? error.message : `${error}`,
        source: source ?? "console",
      });
      // TODO: Use TRPC websockets.
      onLog("trpc.invalidate", "app.logs");
    },
  };
};
