import * as fs from "fs";
import * as path_ from "path";
import * as process from "process";
import * as vm from "vm";
import {
  ENV_WING_SIM_INFLIGHT_RESOURCE_PATH,
  ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE,
} from "./function";
import { ISimulatorResourceInstance } from "./resource";
import { FunctionSchema } from "./schema-resources";
import { FUNCTION_TYPE, IFunctionClient } from "../cloud";
import { ISimulatorContext } from "../testing/simulator";
import { normalizePath } from "../util";

export class Function implements IFunctionClient, ISimulatorResourceInstance {
  private readonly filename: string;
  private readonly env: Record<string, string>;
  private readonly context: ISimulatorContext;
  private readonly timeout: number;

  constructor(props: FunctionSchema["props"], context: ISimulatorContext) {
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    console.debug(`Assetdir ${context.assetsDir}`);
    console.debug(`Loading function from ${props.sourceCodeFile}`);
    this.filename = path_.resolve(
      normalizePath(context.assetsDir),
      normalizePath(props.sourceCodeFile)
    );
    this.env = props.environmentVariables ?? {};
    this.context = context;
    this.timeout = props.timeout;
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
      fs: fs,
      path: path_,
      process: {
        ...process,
        // override process.exit to throw an exception instead of exiting the process
        exit: (code: number) => {
          throw new Error("process.exit() was called with exit code " + code);
        },
      },

      // explicitly DO NOT propagate `console` because inflight
      // function bind console.log to the global $logger object.

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
      message: `Invoke (payload="${JSON.stringify(payload)}").`,
      activity: async () => {
        return vm.runInContext(wrapper, context, { timeout: this.timeout });
      },
    });
  }
}
