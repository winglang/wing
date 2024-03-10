import * as path from "path";
import { FunctionAttributes, FunctionSchema } from "./schema-resources";
import { FUNCTION_FQN, IFunctionClient } from "../cloud";
import { Sandbox } from "../shared/sandbox";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";
import { TraceType } from "../std";

export class Function implements IFunctionClient, ISimulatorResourceInstance {
  private readonly filename: string;
  private readonly env: Record<string, string>;
  private readonly context: ISimulatorContext;
  private readonly timeout: number;
  private readonly sandbox: Sandbox;

  constructor(props: FunctionSchema["props"], context: ISimulatorContext) {
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    this.filename = path.resolve(context.simdir, props.sourceCodeFile);
    this.env = props.environmentVariables ?? {};
    this.context = context;
    this.timeout = props.timeout;
    this.sandbox = new Sandbox(this.filename, {
      env: {
        ...this.env,
        WING_SIMULATOR_URL: this.context.serverUrl,
      },
      timeout: this.timeout,
      log: (internal, _level, message) => {
        this.context.addTrace({
          data: { message },
          type: internal ? TraceType.RESOURCE : TraceType.LOG,
          sourcePath: this.context.resourcePath,
          sourceType: FUNCTION_FQN,
          timestamp: new Date().toISOString(),
        });
      },
    });
  }

  public async init(): Promise<FunctionAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {
    await this.sandbox.cleanup();
  }

  public async save(): Promise<void> {}

  public async invoke(payload: string): Promise<string> {
    return this.context.withTrace({
      message: `Invoke (payload=${JSON.stringify(payload)}).`,
      activity: () => this.sandbox.call("handler", payload),
    });
  }

  public async invokeAsync(payload: string): Promise<void> {
    await this.context.withTrace({
      message: `InvokeAsync (payload=${JSON.stringify(payload)}).`,
      activity: async () => {
        process.nextTick(() => {
          void this.sandbox.call("handler", payload);
        });
      },
    });
  }
}
