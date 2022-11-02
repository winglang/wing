import * as fs from "fs";
import * as path_ from "path";
import * as process from "process";
import * as vm from "vm";
import { SimulatorContext } from "../testing/simulator";
import { log } from "../util";
import { IFunctionClient } from "./function";
import {
  HandleManager,
  ISimulatorResource,
  makeResourceHandle,
} from "./handle-manager";
import { FunctionSchema } from "./schema-resources";

export const ENV_WING_SIM_RUNTIME_FUNCTION_HANDLE =
  "WING_SIM_RUNTIME_FUNCTION_HANDLE";

export class Function implements IFunctionClient, ISimulatorResource {
  public readonly handle: string;
  private readonly filename: string;
  private readonly env: Record<string, string>;
  private _timesCalled: number = 0;

  constructor(
    path: string,
    props: FunctionSchema["props"],
    context: SimulatorContext
  ) {
    this.handle = makeResourceHandle(context.simulationId, "function", path);

    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    this.filename = path_.resolve(context.assetsDir, props.sourceCodeFile);
    this.env = props.environmentVariables ?? {};
  }

  public async init(): Promise<void> {
    return;
  }

  public async cleanup(): Promise<void> {
    return;
  }

  public async invoke(payload: string): Promise<string> {
    this._timesCalled += 1;

    const userCode = fs.readFileSync(this.filename, "utf8");
    const envSetup = Object.entries(this.env).map(
      ([key, value]) =>
        `process.env[${JSON.stringify(key)}] = ${JSON.stringify(value)};`
    );

    const wrapper = [
      "var exports = {};",
      ...envSetup,
      `process.env["${ENV_WING_SIM_RUNTIME_FUNCTION_HANDLE}"] = "${this.handle}";`,
      userCode,
      // The last statement is the value that will be returned by vm.runInThisContext
      `exports.handler(${JSON.stringify(payload)});`,
    ].join("\n");
    log("running wrapped code: %s", wrapper);

    const context = vm.createContext({
      // TODO: include all NodeJS globals?
      // https://nodejs.org/api/globals.html#global-objects
      // https://stackoverflow.com/questions/59049140/is-it-possible-to-make-all-of-node-js-globals-available-in-nodes-vm-context
      console: console,
      fs: fs,
      path: path_,
      process: process,

      // Make the global HandleManager available to user code so that they can access
      // other resource clients
      HandleManager: HandleManager,
    });
    const result = await vm.runInNewContext(wrapper, context);

    return result;
  }

  public async timesCalled(): Promise<number> {
    return Promise.resolve(this._timesCalled);
  }
}
