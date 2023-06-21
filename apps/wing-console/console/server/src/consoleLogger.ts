import { errorMessage } from "@wingconsole/error-message";
import { nanoid } from "nanoid";

import { LogInterface } from "./utils/LogInterface.js";

export type LogLevel = "verbose" | "info" | "warn" | "error";

export type LogSource = "compiler" | "console" | "simulator" | "user";

export interface LogContext {
  sourceType?: string;
  sourcePath?: string;
  label?: string;
  messageType?: MessageType;
  hideTimestamp?: boolean;
}

export interface LogEntry {
  id: string;
  timestamp?: number;
  level: LogLevel;
  message: string;
  source: LogSource;
  ctx?: LogContext;
}

export type MessageType = "info" | "title" | "summary" | "success" | "fail";

export interface ConsoleLogger {
  messages: LogEntry[];
  verbose: (message: string, source?: LogSource, context?: LogContext) => void;
  log: (message: string, source?: LogSource, context?: LogContext) => void;
  error: (message: unknown, source?: LogSource, context?: LogContext) => void;
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
    verbose(message, source, context) {
      log.info(message);
      this.messages.push({
        id: `${nanoid()}`,
        timestamp: Date.now(),
        level: "verbose",
        message,
        source: source ?? "console",
        ctx: context,
      });
      onLog("verbose", message);
    },
    log(message, source, context) {
      log.info(message);
      this.messages.push({
        id: `${nanoid()}`,
        timestamp: Date.now(),
        level: "info",
        message,
        source: source ?? "console",
        ctx: context,
      });
      onLog("info", message);
    },
    error(error, source, context) {
      log.error(error);
      const message = errorMessage(error);
      if (source === "user") {
        this.messages.push({
          id: `${nanoid()}`,
          timestamp: Date.now(),
          level: "error",
          message,
          source,
          ctx: context,
        });
      }
      onLog("error", message);
    },
  };
};
