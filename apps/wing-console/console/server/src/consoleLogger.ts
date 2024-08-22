import { mkdir, open } from "node:fs/promises";
import path from "node:path";

import { errorMessage } from "@wingconsole/error-message";
import { nanoid } from "nanoid";

import type { LogInterface } from "./utils/LogInterface.js";

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
  messages(): Promise<LogEntry[]>;
  verbose: (message: string, source?: LogSource, context?: LogContext) => void;
  log: (message: string, source?: LogSource, context?: LogContext) => void;
  error: (message: unknown, source?: LogSource, context?: LogContext) => void;
  warning: (message: string, source?: LogSource, context?: LogContext) => void;
}

export interface CreateConsoleLoggerOptions {
  logfile: string;
  onLog: (logLevel: LogLevel, message: string) => void;
  log: LogInterface;
}

export const createConsoleLogger = async ({
  logfile,
  onLog,
  log,
}: CreateConsoleLoggerOptions): Promise<ConsoleLogger> => {
  await mkdir(path.dirname(logfile), { recursive: true });

  const fileHandle = await open(logfile, "a+");

  const messages = new Array<LogEntry>();
  return {
    async messages() {
      return messages;
    },
    verbose(message, source, context) {
      const entry: LogEntry = {
        id: `${nanoid()}`,
        timestamp: Date.now(),
        level: "verbose",
        message,
        source: source ?? "console",
        ctx: context,
      };
      fileHandle.appendFile(`${JSON.stringify(entry)}\n`);
      log.info(message);
      messages.push(entry);
      onLog("verbose", message);
    },
    log(message, source, context) {
      const entry: LogEntry = {
        id: `${nanoid()}`,
        timestamp: Date.now(),
        level: "info",
        message,
        source: source ?? "console",
        ctx: context,
      };
      fileHandle.appendFile(`${JSON.stringify(entry)}\n`);
      log.info(message);
      messages.push(entry);
      onLog("info", message);
    },
    warning(message, source, context) {
      const entry: LogEntry = {
        id: `${nanoid()}`,
        timestamp: Date.now(),
        level: "warn",
        message,
        source: source ?? "console",
        ctx: context,
      };
      fileHandle.appendFile(`${JSON.stringify(entry)}\n`);
      log.warning(message);
      messages.push(entry);
      onLog("warn", message);
    },
    error(error, source, context) {
      log.error(error);
      const message = errorMessage(error);
      if (source === "user") {
        const entry: LogEntry = {
          id: `${nanoid()}`,
          timestamp: Date.now(),
          level: "error",
          message,
          source,
          ctx: context,
        };
        fileHandle.appendFile(`${JSON.stringify(entry)}\n`);
        messages.push(entry);
      }
      onLog("error", message);
    },
  };
};
