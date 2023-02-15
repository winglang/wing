import log from "electron-log";

export type LogLevel = "verbose" | "info" | "warn" | "error";

export type LogSource = "compiler" | "console" | "simulator";

export interface TracingContext {
  sourcePath: string;
}

export interface LogEntry {
  timestamp: number;
  level: LogLevel;
  message: string;
  source: LogSource;
  ctx?: TracingContext;
}

export interface ConsoleLogger {
  messages: LogEntry[];
  verbose: (message: string, source?: LogSource, ctx?: TracingContext) => void;
  log: (message: string, source?: LogSource, ctx?: TracingContext) => void;
  error: (message: unknown, source?: LogSource, ctx?: TracingContext) => void;
}

export const createConsoleLogger = (
  onLog: (logLevel: LogLevel, message: string) => void,
): ConsoleLogger => {
  log.transports.console.bind(process.stdout);

  return {
    messages: new Array<LogEntry>(),
    verbose(message, source, ctx) {
      log.info(message);
      this.messages.push({
        timestamp: Date.now(),
        level: "verbose",
        message,
        source: source ?? "console",
        ctx,
      });
      onLog("verbose", message);
    },
    log(message, source, ctx) {
      log.info(message);
      this.messages.push({
        timestamp: Date.now(),
        level: "info",
        message,
        source: source ?? "console",
        ctx,
      });
      onLog("info", message);
    },
    error(error, source, ctx) {
      log.error(error);
      const message = error instanceof Error ? error.message : `${error}`;
      onLog("error", message);
    },
  };
};
