import * as fs from "fs";
import * as path from "path";
import { dirname } from "path";
import * as process from "process";
import * as vm from "vm";
import {
  ENV_WING_SIM_INFLIGHT_RESOURCE_PATH,
  ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE,
} from "./function";
import { ISimulatorResourceInstance } from "./resource";
import { FunctionSchema, FUNCTION_TYPE } from "./schema-resources";
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

  public async init(): Promise<void> {
    return;
  }

  public async cleanup(): Promise<void> {
    return;
  }

  public async invoke(payload: string): Promise<string> {
    const userCode = fs.readFileSync(this.filename, "utf8");

    return this.context.withTrace({
      message: `Invoke (payload="${JSON.stringify(payload)}").`,
      activity: async () => {
        return runInSandbox(userCode, payload, {
          resolveDir: dirname(this.filename),
          context: {
            fs,
            path,
            process: {
              ...process,

              // override process.exit to throw an exception instead of exiting the process
              exit: (exitCode: number) => {
                throw new Error(
                  "process.exit() was called with exit code " + exitCode
                );
              },
            },

            $env: {
              ...this.env,
              [ENV_WING_SIM_INFLIGHT_RESOURCE_PATH]: this.context.resourcePath,
              [ENV_WING_SIM_INFLIGHT_RESOURCE_TYPE]: FUNCTION_TYPE,
            },

            __dirname: dirname(this.filename),

            // Make the global simulator available to user code so that they can find
            // and use other resource clients
            // TODO: Object.freeze this?
            $simulator: this.context,

            // explicitly DO NOT propagate `console` because inflight
            // function bind console.log to the global $logger object.
          },
          timeout: this.timeout,
        });
      },
    });
  }
}

interface RunCodeOptions {
  readonly resolveDir: string;
  readonly context: { [key: string]: any };
  readonly timeout: number;
}

/**
 * Runs user code in a sandboxed environment. The code is expected to export a `handler`
 * async function which take a payload and returns a result.
 *
 * @param code The JavaScript code
 * @param payload The payload JSON object to pass to the handler
 * @param opts
 * @returns
 */
async function runInSandbox(code: string, payload: any, opts: RunCodeOptions) {
  const ctx: any = {};

  // create a copy of all the globals from our current context.
  for (const k of Object.getOwnPropertyNames(global)) {
    ctx[k] = (global as any)[k];
  }

  // append the user's context
  for (const k of Object.keys(opts.context)) {
    ctx[k] = opts.context[k];
  }

  // we are hijacking console.log to log to the inflight $logger so do not propagate
  delete ctx.console;

  return new Promise(($resolve, $reject) => {
    const wrapper = [
      "const exports = {};",
      "Object.assign(process.env, $env);",
      code,
      // The last statement is the value that will be returned by vm.runInThisContext
      `exports.handler(${JSON.stringify(
        payload
      )}).then($resolve).catch($reject);`,
    ].join("\n");

    // we want "require"s to resolve relative to the directory of the user's code
    const requireResolve = (p: string) =>
      require.resolve(p, { paths: [opts.resolveDir] });
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const inflightRequire = (p: string) => require(requireResolve(p));
    inflightRequire.resolve = requireResolve;

    const context = vm.createContext({
      ...ctx,
      require: inflightRequire,
      $resolve,
      $reject,
    });

    vm.runInContext(wrapper, context, { timeout: opts.timeout });
  });
}
