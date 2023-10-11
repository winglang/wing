import * as path from "path";
import {
  FUNCTION_TYPE,
  FunctionAttributes,
  FunctionSchema,
} from "./schema-resources";
import { IFunctionClient } from "../cloud";
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

  public async invoke(payload: string): Promise<string> {
    return this.context.withTrace({
      message: `Invoke (payload=${JSON.stringify(payload)}).`,
      activity: async () => {
        const sb = new Sandbox(this.filename, {
          context: { $simulator: this.context },
          env: {
            ...this.env,
            WING_SIMULATOR_URL: this.context.serverUrl,
          },
          timeout: this.timeout,
          log: (_level, message) => {
            this.context.addTrace({
              data: { message },
              type: TraceType.LOG,
              sourcePath: this.context.resourcePath,
              sourceType: FUNCTION_TYPE,
              timestamp: new Date().toISOString(),
            });
          },
        });

        return sb.call("handler", JSON.stringify(payload));
      },
    });
  }
}
