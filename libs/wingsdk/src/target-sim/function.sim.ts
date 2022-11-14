import * as fs from "fs";
import * as path_ from "path";
import * as process from "process";
import * as vm from "vm";
import { ISimulatorContext } from "../testing/simulator";
import { log } from "../util";
import { IFunctionClient } from "./function";
import { ISimulatorResource } from "./resource";
import { FunctionSchema } from "./schema-resources";

export class Function implements IFunctionClient, ISimulatorResource {
  private readonly filename: string;
  private readonly env: Record<string, string>;
  private _timesCalled: number = 0;
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
    this.context.addTrace({
      message: "Function created.",
    });
  }

  public async cleanup(): Promise<void> {
    this.context.addTrace({
      message: "Function deleted.",
    });
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
    log("running wrapped code: %s", wrapper);

    const context = vm.createContext({
      // TODO: include all NodeJS globals?
      // https://nodejs.org/api/globals.html#global-objects
      // https://stackoverflow.com/questions/59049140/is-it-possible-to-make-all-of-node-js-globals-available-in-nodes-vm-context
      console: console,
      fs: fs,
      path: path_,
      process: process,

      $env: { ...this.env },

      // Make the global simulator available to user code so that they can find
      // and use other resource clients
      // TODO: Object.freeze this?
      $simulator: this.context,
    });

    try {
      const result = await vm.runInContext(wrapper, context);
      this.context.addTrace({
        message: `Invoke (payload="${payload}") operation succeeded. Response: ${result}`,
      });
      this._timesCalled += 1;
      return result;
    } catch (e) {
      this.context.addTrace({
        message: `Invoke (payload="${payload}") operation failed. Response: ${e}`,
      });
      this._timesCalled += 1;
      throw e;
    }
  }

  public async timesCalled(): Promise<number> {
    return Promise.resolve(this._timesCalled);
  }
}
