import * as fs from "fs";
import * as path_ from "path";
import * as process from "process";
import * as vm from "vm";
import { FUNCTION_TYPE, IFunctionClient } from "../cloud";
import { ISimulatorContext } from "../testing/simulator";
import {
  ENV_WING_SIM_INFLIGHT_RESOURCE_PATH,
  ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE,
} from "./function";
import { ISimulatorResourceInstance } from "./resource";
import { FunctionSchema } from "./schema-resources";

export class Function implements IFunctionClient, ISimulatorResourceInstance {
  private readonly filename: string;
  private readonly env: Record<string, string>;
  private readonly context: ISimulatorContext;

  constructor(props: FunctionSchema["props"], context: ISimulatorContext) {
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    this.filename = path_.resolve(context.assetsDir, props.sourceCodeFile);
    this.env = props.environmentVariables ?? {};
    this.context = context;
  }

  public async init(): Promise<void> {
    return;
  }

  public async cleanup(): Promise<void> {
    return;
  }

  public async invoke(payload: string): Promise<string> {
    const userCode = fs.readFileSync(this.filename, "utf8");
    const wrapper = [
      "const exports = {};",
      "Object.assign(process.env, $env);",
      userCode,
      // The last statement is the value that will be returned by vm.runInThisContext
      `exports.handler(${JSON.stringify(payload)});`,
    ].join("\n");

    const context = vm.createContext({
      // TODO: include all NodeJS globals?
      // https://nodejs.org/api/globals.html#global-objects
      // https://stackoverflow.com/questions/59049140/is-it-possible-to-make-all-of-node-js-globals-available-in-nodes-vm-context
      console: console,
      fs: fs,
      path: path_,
      process: process,

      $env: {
        ...this.env,
        [ENV_WING_SIM_INFLIGHT_RESOURCE_PATH]: this.context.resourcePath,
        [ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE]: FUNCTION_TYPE,
      },

      // Make the global simulator available to user code so that they can find
      // and use other resource clients
      // TODO: Object.freeze this?
      $simulator: this.context,
    });

    return this.context.withTrace({
      message: `Invoke (payload="${payload}").`,
      activity: async () => {
        return vm.runInContext(wrapper, context);
      },
    });
  }
}
