import { mkdir, open } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";

import { errorMessage } from "@wingconsole/error-message";
import { throttle } from "@wingconsole/utilities";
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

interface ListMessagesOptions {}

export interface ConsoleLogger {
  listMessages(options?: ListMessagesOptions): Promise<{
    entries: LogEntry[];
  }>;
  close(): Promise<void>;
  verbose(message: string, source?: LogSource, context?: LogContext): void;
  log(message: string, source?: LogSource, context?: LogContext): void;
  error(message: unknown, source?: LogSource, context?: LogContext): void;
  warning(message: string, source?: LogSource, context?: LogContext): void;
}

export interface CreateConsoleLoggerOptions {
  logfile: string;
  onLog(): void;
  log: LogInterface;
}

export const createConsoleLogger = async ({
  logfile,
  onLog,
  log,
}: CreateConsoleLoggerOptions): Promise<ConsoleLogger> => {
  await mkdir(path.dirname(logfile), { recursive: true });

  // Create or truncate the log file. In the future, we might want to use `a+` to append to the file instead.
  const fileHandle = await open(logfile, "w+");

  // Create an `appendEntry` function that will append log
  // entries to the log file at a maximum speed of 4 times a second.
  // Finally, `onLog` will be called to report changes to the log file.
  const { appendEntry } = (() => {
    const pendingEntries = new Array<LogEntry>();
    const flushEntries = throttle(async () => {
      const [...entries] = pendingEntries;
      pendingEntries.length = 0;
      for (const entry of entries) {
        await fileHandle.appendFile(`${JSON.stringify(entry)}\n`);
      }
      onLog();
    }, 250);
    const appendEntry = (entry: LogEntry) => {
      pendingEntries.push(entry);
      flushEntries();
    };
    return { appendEntry };
  })();

  return {
    async close() {
      await fileHandle.close();
    },
    async listMessages(options) {
      const fileHandle = await open(logfile, "r+");
      const entries = new Array<LogEntry>();
      for await (const line of readline.createInterface({
        input: fileHandle.createReadStream(),
      })) {
        try {
          entries.push(JSON.parse(line) as LogEntry);
        } catch (error) {
          log.error("Failed to parse log entry:");
          log.error(error);
        }
      }
      await fileHandle.close();
      return {
        entries,
      };
    },
    verbose(message, source, context) {
      log.info(message);
      appendEntry({
        id: `${nanoid()}`,
        timestamp: Date.now(),
        level: "verbose",
        message,
        source: source ?? "console",
        ctx: context,
      });
    },
    log(message, source, context) {
      log.info(message);
      appendEntry({
        id: `${nanoid()}`,
        timestamp: Date.now(),
        level: "info",
        message,
        source: source ?? "console",
        ctx: context,
      });
    },
    warning(message, source, context) {
      log.warning(message);
      appendEntry({
        id: `${nanoid()}`,
        timestamp: Date.now(),
        level: "warn",
        message,
        source: source ?? "console",
        ctx: context,
      });
    },
    error(error, source, context) {
      log.error(error);
      if (source === "user") {
        appendEntry({
          id: `${nanoid()}`,
          timestamp: Date.now(),
          level: "error",
          message: errorMessage(error),
          source,
          ctx: context,
        });
      }
    },
  };
};
