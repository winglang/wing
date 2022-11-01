import { readFileSync } from "fs";
import { resolve } from "path";
import * as vm from "vm";
import { SimulatorContext } from "../testing/simulator";
import { log } from "../util";
import { IFunctionClient } from "./function";
import { HandleManager, makeResourceHandle } from "./handle-manager";
import { FunctionSchema } from "./schema-resources";

export const ENV_WING_SIM_RUNTIME_FUNCTION_HANDLE =
  "WING_SIM_RUNTIME_FUNCTION_HANDLE";

export async function start(
  path: string,
  props: FunctionSchema["props"],
  context: SimulatorContext
): Promise<FunctionSchema["attrs"]> {
  const fn = new Function(path, props, context);
  const handle = HandleManager.addInstance(fn);
  return { handle };
}

export async function stop(attrs: FunctionSchema["attrs"]): Promise<void> {
  HandleManager.removeInstance(attrs!.handle);
}

class Function implements IFunctionClient {
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
    this.filename = resolve(context.assetsDir, props.sourceCodeFile);
    this.env = props.environmentVariables;
  }

  public async invoke(payload: string): Promise<string> {
    this._timesCalled += 1;

    // The simulator is target for local development and debugging so we are not
    // trying to overly secure or sandbox the execution environment.
    const userCode = readFileSync(this.filename, "utf8");
    const envStmts = Object.entries(this.env).map(
      ([key, value]) =>
        `process.env[${JSON.stringify(key)}] = ${JSON.stringify(value)};\n`
    );
    const wrapper = [
      "var exports = {};",
      envStmts,
      userCode,
      `process.env.${ENV_WING_SIM_RUNTIME_FUNCTION_HANDLE} = "${this.handle}"`,
      `exports.handler(${JSON.stringify(payload)});`,
    ].join("\n");
    log("running wrapped code: %s", wrapper);
    const result = await vm.runInThisContext(wrapper);

    return result;
  }

  public async timesCalled(): Promise<number> {
    return Promise.resolve(this._timesCalled);
  }
}
