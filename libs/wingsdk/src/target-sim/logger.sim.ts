import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import { ISimulatorContext } from "../testing";
import { ENV_WING_SIM_RUNTIME_FUNCTION_PATH } from "./function";
import { ILoggerClient } from "./logger";
import { ISimulatorResource } from "./resource";
import { LoggerSchema } from "./schema-resources";

export class Logger implements ILoggerClient, ISimulatorResource {
  private readonly logsDir: string;
  private readonly context: ISimulatorContext;
  public constructor(
    _props: LoggerSchema["props"],
    context: ISimulatorContext
  ) {
    this.logsDir = fs.mkdtempSync(join(os.tmpdir(), "wing-sim-"));
    this.context = context;
  }

  public async init(): Promise<void> {
    this.context.addTrace({
      message: "Logger created.",
    });
  }

  public async cleanup(): Promise<void> {
    // TODO: clean up logs dir?
    this.context.addTrace({
      message: "Logger deleted.",
    });
  }

  public async print(message: string): Promise<void> {
    if (!fs.existsSync(this.logsDir)) {
      throw new Error(`Logs directory ${this.logsDir} does not exist.`);
    }

    // TODO: add some other compute context mechanism?
    const functionPath =
      process.env[ENV_WING_SIM_RUNTIME_FUNCTION_PATH] ?? "unknown";

    try {
      this.context.addLog({
        message,
        resourceId: functionPath,
      });
      this.context.addTrace({
        message: "Print operation succeeded.",
      });
    } catch (e) {
      this.context.addTrace({
        message: "Print operation failed.",
      });
      throw e;
    }
  }
}
