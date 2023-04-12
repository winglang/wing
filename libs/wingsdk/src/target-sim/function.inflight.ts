import * as path from "path";
import { NodeVM } from "vm2";
import {
  ENV_WING_SIM_INFLIGHT_RESOURCE_PATH,
  ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE,
} from "./function";
import { ISimulatorResourceInstance } from "./resource";
import {
  FunctionAttributes,
  FunctionSchema,
  FUNCTION_TYPE,
} from "./schema-resources";
import { IFunctionClient } from "../cloud";
import { ISimulatorContext } from "../testing/simulator";

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
        const vm = new NodeVM({
          console: "redirect", // we hijack `console.xxx` calls inside the vm
          require: {
            external: true,
            builtin: ["*"], // allow using all node modules
            context: "sandbox", // require inside the sandbox (addresses #1871)
          },
          sandbox: {
            $simulator: this.context,
          },
          env: {
            ...process.env,
            [ENV_WING_SIM_INFLIGHT_RESOURCE_PATH]: this.context.resourcePath,
            [ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE]: FUNCTION_TYPE,
            ...this.env,
          },
          timeout: this.timeout,
        });

        const index = vm.runFile(this.filename);
        return index.handler(payload);
      },
    });
  }
}
