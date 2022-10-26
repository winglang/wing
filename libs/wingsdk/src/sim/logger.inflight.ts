import * as fs from "fs";
import { LogEvent } from "../cloud";
import { ILoggerClient } from "./logger";

export class LoggerClient implements ILoggerClient {
  public constructor(
    private readonly logsDir: string,
    private readonly functionId: string
  ) {}
  public async print(message: string): Promise<void> {
    if (!fs.existsSync(this.logsDir)) {
      throw new Error(`Logs directory ${this.logsDir} does not exist.`);
    }
    const logFile = `${this.logsDir}/${this.functionId}.log`;
    const event = {
      message,
      timestamp: Date.now(),
    };
    if (!fs.existsSync(logFile)) {
      fs.writeFileSync(logFile, JSON.stringify(event) + "\n");
    } else {
      fs.appendFileSync(logFile, JSON.stringify(event) + "\n");
    }
  }

  public async fetchLatestLogs(): Promise<LogEvent[]> {
    const logFile = `${this.logsDir}/${this.functionId}.log`;
    if (fs.existsSync(logFile)) {
      const contents = fs.readFileSync(logFile, "utf-8");
      return contents
        .split("\n")
        .map((line) => {
          if (line === "") {
            return undefined;
          }
          const event = JSON.parse(line);
          return {
            message: event.message,
            timestamp: event.timestamp,
          };
        })
        .filter((e) => e !== undefined) as LogEvent[];
    } else {
      return [];
    }
  }
}
