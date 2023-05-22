import { mkdtemp, readFile } from "fs/promises";
import { tmpdir } from "os";
import * as path from "path";
import * as util from "util";
import * as vm from "vm";
import { build } from "esbuild-wasm";
import {
  FUNCTION_TYPE,
  FunctionAttributes,
  FunctionSchema,
} from "./schema-resources";
import { IFunctionClient, TraceType } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../testing/simulator";

export class Function implements IFunctionClient, ISimulatorResourceInstance {
  private readonly filename: string;
  private readonly env: Record<string, string>;
  private readonly context: ISimulatorContext;
  private readonly timeout: number;

  private bundle?: string;

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
    const workdir = await mkdtemp(path.join(tmpdir(), "wing-bundles-"));
    const outfile = path.join(workdir, "index.js");
    await build({
      bundle: true,
      entryPoints: [this.filename],
      outfile: outfile,
      minify: false,
      platform: "node",
      target: "node16",
    });

    this.bundle = outfile;

    return {};
  }

  public async cleanup(): Promise<void> {
    return;
  }

  public async invoke(payload: string): Promise<string> {
    return this.context.withTrace({
      message: `Invoke (payload=${JSON.stringify(payload)}).`,
      activity: async () => {
        if (!this.bundle) {
          throw new Error("unable to find bundle (function not initialized?)");
        }

        const sandboxProcess = {
          ...process,

          // override process.exit to throw an exception instead of exiting the process
          exit: (exitCode: number) => {
            throw new Error(
              "process.exit() was called with exit code " + exitCode
            );
          },

          env: this.env,
        };

        const sandboxConsole: any = {};
        const levels = [
          "debug",
          "info",
          "log",
          "warn",
          "error",
          "dir",
          "trace",
        ];

        for (const level of levels) {
          sandboxConsole[level] = (...args: any[]) => {
            const message = util.format(...args);
            this.context.addTrace({
              data: { message },
              type: TraceType.LOG,
              sourcePath: this.context.resourcePath,
              sourceType: FUNCTION_TYPE,
              timestamp: new Date().toISOString(),
            });
          };
        }

        return runSandbox(this.bundle, payload, {
          timeout: this.timeout,
          context: {
            process: sandboxProcess,
            $simulator: this.context,
            console: sandboxConsole,
          },
        });
      },
    });
  }
}

interface RunSandboxOptions {
  readonly context: { [key: string]: any };
  readonly timeout: number;
}

/**
 * Runs user code in a sandboxed environment. The code is expected to export a `handler` async
 * function which take a payload and returns a result via a promise.
 *
 * @param filepath A path to a bundled JavaScript file (no "require")
 * @param payload The payload JSON object to pass to the handler
 * @param opts Sandbox options
 * @returns A promise
 */
async function runSandbox(
  filepath: string,
  payload: any,
  opts: RunSandboxOptions
): Promise<any> {
  const ctx: any = {};

  // create a copy of all the globals from our current context.
  for (const k of Object.getOwnPropertyNames(global)) {
    try {
      ctx[k] = (global as any)[k];
    } catch {
      // ignore unresolvable globals (see https://github.com/winglang/wing/pull/1923)
    }
  }

  // append the user's context
  for (const k of Object.keys(opts.context)) {
    ctx[k] = opts.context[k];
  }

  const code = await readFile(filepath, "utf-8");

  return new Promise(($resolve, $reject) => {
    const wrapper = [
      "const exports = {};",
      code,
      `exports.handler(${JSON.stringify(
        payload
      )}).then($resolve).catch($reject);`,
    ].join("\n");

    const context = vm.createContext({
      ...ctx,
      $resolve,
      $reject,
      require, // to support requiring node.js sdk modules (others will be bundled)
    });

    // emit an explicit error when trying to access `__dirname` and `__filename` because we cannot
    // resolve these when bundling (this is true both for simulator and the cloud since we are
    // bundling there as well).
    const forbidGlobal = (name: string) => {
      Object.defineProperty(context, name, {
        get: () => {
          throw new Error(
            `${name} cannot be used within bundled cloud functions`
          );
        },
      });
    };

    forbidGlobal("__dirname");
    forbidGlobal("__filename");

    vm.runInContext(wrapper, context, {
      timeout: opts.timeout,
      filename: filepath,
    });
  });
}
