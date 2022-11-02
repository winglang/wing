import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import { LogEvent } from "../cloud";
import { SimulatorContext } from "../testing";
import { ENV_WING_SIM_RUNTIME_FUNCTION_HANDLE } from "./function.sim";
import { ISimulatorResource, makeResourceHandle } from "./handle-manager";
import { ILoggerClient } from "./logger";
import { LoggerSchema } from "./schema-resources";

export class Logger implements ILoggerClient, ISimulatorResource {
  public readonly handle: string;
  private readonly logsDir: string;
  public constructor(
    path: string,
    _props: LoggerSchema["props"],
    context: SimulatorContext
  ) {
    this.handle = makeResourceHandle(context.simulationId, "logger", path);
    this.logsDir = fs.mkdtempSync(join(os.tmpdir(), "wing-sim-"));
  }

  public async init(): Promise<void> {
    return;
  }

  public async cleanup(): Promise<void> {
    // TODO: clean up logs dir?
    return;
  }

  public async print(message: string): Promise<void> {
    if (!fs.existsSync(this.logsDir)) {
      throw new Error(`Logs directory ${this.logsDir} does not exist.`);
    }

    // TODO: add some other compute context mechanism?
    const functionHandle = process.env[ENV_WING_SIM_RUNTIME_FUNCTION_HANDLE];
    const logFile = `${this.logsDir}/events.log`;
    const event = {
      functionHandle,
      message,
      timestamp: Date.now(),
    };

    // operations need to be sync to avoid only partial writes to files
    if (!fs.existsSync(logFile)) {
      fs.writeFileSync(logFile, JSON.stringify(event) + "\n");
    } else {
      fs.appendFileSync(logFile, JSON.stringify(event) + "\n");
    }
  }

  public async fetchLatestLogs(): Promise<LogEvent[]> {
    const functionHandle = process.env[ENV_WING_SIM_RUNTIME_FUNCTION_HANDLE];
    const logFile = `${this.logsDir}/events.log`;
    if (fs.existsSync(logFile)) {
      const contents = await fs.promises.readFile(logFile, "utf-8");
      return contents
        .split("\n")
        .map((line) => {
          if (line === "") {
            return undefined;
          }
          const event = JSON.parse(line);

          // only return logs for the current function
          if (event.functionHandle !== functionHandle) {
            return undefined;
          }

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
