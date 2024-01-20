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
  private sandbox: Sandbox | undefined;

  constructor(props: FunctionSchema["props"], context: ISimulatorContext) {
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    this.filename = path.resolve(context.simdir, props.sourceCodeFile);
    this.env = props.environmentVariables ?? {};
    this.context = context;
    this.timeout = props.timeout;
  }

  public async init(): Promise<FunctionAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {
    return;
  }

  public async save(): Promise<void> {}

  /**
   * Creates a single instance of the function sandbox and returns it.
   *
   * Subsequent calls will return the same instance to mimick the behavior
   * in the cloud where a function container may be reused across multiple
   * invocations.
   *
   * @returns The simulator sandbox instance.
   */
  private getCreateSandbox(): Sandbox {
    if (!this.sandbox) {
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

    return this.sandbox;
  }

  public async invoke(payload: string): Promise<string> {
    return this.context.withTrace({
      message: `Invoke (payload=${JSON.stringify(payload)}).`,
      activity: async () => {
        const sb = this.getCreateSandbox();
        return sb.call("handler", JSON.stringify(payload)) ?? "";
      },
    });
  }

  public async invokeAsync(payload: string): Promise<void> {
    await this.context.withTrace({
      message: `InvokeAsync (payload=${JSON.stringify(payload)}).`,
      activity: async () => {
        const sb = this.getCreateSandbox();
        process.nextTick(() => {
          void sb.call("handler", JSON.stringify(payload));
        });
      },
    });
  }
}
