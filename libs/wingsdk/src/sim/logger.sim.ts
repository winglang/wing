import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import { LogEvent } from "../cloud";
import { SimulatorContext } from "../testing";
import { ENV_WING_SIM_RUNTIME_FUNCTION_HANDLE } from "./function.sim";
import { HandleManager, makeResourceHandle } from "./handle-manager";
import { ILoggerClient } from "./logger";
import { LoggerSchema } from "./schema-resources";

export async function start(
  path: string,
  props: any,
  context: SimulatorContext
): Promise<LoggerSchema["attrs"]> {
  const logger = new Logger(path, props, context);
  const handle = HandleManager.addInstance(logger);
  return { handle };
}

export async function stop(attrs: LoggerSchema["attrs"]): Promise<void> {
  HandleManager.removeInstance(attrs!.handle);
}

class Logger implements ILoggerClient {
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

  public async print(message: string): Promise<void> {
    if (!fs.existsSync(this.logsDir)) {
      throw new Error(`Logs directory ${this.logsDir} does not exist.`);
    }

    // TODO: add some other compute context mechanism?
    const functionId = process.env[ENV_WING_SIM_RUNTIME_FUNCTION_HANDLE];
    const logFile = `${this.logsDir}/${functionId}.log`;
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
    const functionId = process.env[ENV_WING_SIM_RUNTIME_FUNCTION_HANDLE];
    const logFile = `${this.logsDir}/${functionId}.log`;
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
