import { nanoid } from "nanoid";

import { LogInterface } from "./utils/LogInterface.js";

export type LogLevel = "verbose" | "info" | "warn" | "error";

export type LogSource = "compiler" | "console" | "simulator" | "user";

export interface TracingContext {
  sourceType: string;
  sourcePath: string;
}

export interface LogEntry {
  id: string;
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

export interface CreateConsoleLoggerOptions {
  onLog: (logLevel: LogLevel, message: string) => void;
  log: LogInterface;
}

export const createConsoleLogger = ({
  onLog,
  log,
}: CreateConsoleLoggerOptions): ConsoleLogger => {
  return {
    messages: new Array<LogEntry>(),
    verbose(message, source, ctx) {
      log.info(message);
      this.messages.push({
        id: `${nanoid()}`,
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
        id: `${nanoid()}`,
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
      if (source === "user") {
        this.messages.push({
          id: `${nanoid()}`,
          timestamp: Date.now(),
          level: "error",
          message,
          source,
          ctx,
        });
      }
      onLog("error", message);
    },
  };
};
