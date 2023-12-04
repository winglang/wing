import { mkdtemp, readFile } from "fs/promises";
import { tmpdir } from "os";
import * as path from "path";
import * as util from "util";
import * as vm from "vm";
import { createBundle } from "./bundling";

export interface SandboxOptions {
  readonly env?: { [key: string]: string };
  readonly context?: { [key: string]: any };
  readonly timeout?: number;
  readonly log?: (internal: boolean, level: string, message: string) => void;
}

export class Sandbox {
  private loaded = false; // "true" after first run (module is loaded into context)
  private entrypoint: string;
  private readonly options: SandboxOptions;
  private readonly context: any = {};

  constructor(entrypoint: string, options: SandboxOptions = {}) {
    this.entrypoint = entrypoint;
    this.options = options;
    this.context = this.createContext();
  }

  private createContext() {
    const sandboxProcess = {
      ...process,

      // override process.exit to throw an exception instead of exiting the process
      exit: (exitCode: number) => {
        throw new Error("process.exit() was called with exit code " + exitCode);
      },

      env: this.options.env,
    };

    const sandboxConsole: any = {};
    const levels = ["debug", "info", "log", "warn", "error"];
    for (const level of levels) {
      sandboxConsole[level] = (...args: any[]) => {
        const message = util.format(...args);
        this.options.log?.(false, level, message);
      };
    }

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
    for (const [k, v] of Object.entries(this.options.context ?? {})) {
      ctx[k] = v;
    }

    const context = vm.createContext({
      ...ctx,
      process: sandboxProcess,
      console: sandboxConsole,
      exports: {},
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

    return context;
  }

  private async loadBundleOnce() {
    // load bundle into context on first run
    if (this.loaded) {
      return;
    }

    const workdir = await mkdtemp(path.join(tmpdir(), "wing-bundles-"));
    const bundle = createBundle(this.entrypoint, workdir);
    this.entrypoint = bundle.entrypointPath;

    const code = await readFile(this.entrypoint, "utf-8");

    if (process.env.DEBUG) {
      const bundleSize = Buffer.byteLength(code, "utf-8");
      this.options.log?.(true, "log", `Bundled code (${bundleSize} bytes).`);
    }

    // this will add stuff to the "exports" object within our context
    vm.runInContext(code, this.context, {
      filename: this.entrypoint,
    });

    this.loaded = true;
  }

  public async call(fn: string, ...args: any[]): Promise<any> {
    await this.loadBundleOnce();

    return new Promise(($resolve, $reject) => {
      const cleanup = () => {
        delete this.context.$resolve;
        delete this.context.$reject;
      };

      this.context.$resolve = (value: any) => {
        cleanup();
        $resolve(value);
      };

      this.context.$reject = (reason?: any) => {
        cleanup();
        $reject(reason);
      };

      const code = `exports.${fn}(${args.join(
        ","
      )}).then($resolve).catch($reject);`;
      vm.runInContext(code, this.context, {
        filename: this.entrypoint,
        timeout: this.options.timeout,
      });
    });
  }
}
