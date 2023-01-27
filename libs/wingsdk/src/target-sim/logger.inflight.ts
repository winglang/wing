import * as fs from "fs";
import * as os from "os";
import { join } from "path";
import {
  ENV_WING_SIM_INFLIGHT_RESOURCE_PATH,
  ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE,
} from "./function";
import { ISimulatorResourceInstance } from "./resource";
import { LoggerSchema } from "./schema-resources";
import { ILoggerClient } from "../cloud";
import { ISimulatorContext, TraceType } from "../testing";

export class Logger implements ILoggerClient, ISimulatorResourceInstance {
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
    const resourcePath = process.env[ENV_WING_SIM_INFLIGHT_RESOURCE_PATH]!;
    const resourceType = process.env[ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE]!;

    return this.context.addTrace({
      data: { message },
      type: TraceType.LOG,
      sourcePath: resourcePath,
      sourceType: resourceType,
      timestamp: new Date().toISOString(),
    });
  }
}
