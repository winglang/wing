import * as cp from "child_process";
import { mkdtemp, readFile, writeFile, stat } from "fs/promises";
import { tmpdir } from "os";
import * as path from "path";
import * as util from "util";
import * as vm from "vm";
import { createBundle } from "./bundling";
import { processStream } from "./stream-processor";

export interface SandboxOptions {
  readonly env?: { [key: string]: string };
  readonly context?: { [key: string]: any };
  readonly timeout?: number;
  readonly log?: (internal: boolean, level: string, message: string) => void;
}

type ProcessRequest = {
  fn: string;
  args: any[];
};

type ProcessResponse =
  | {
      type: "resolve";
      value: any;
    }
  | {
      type: "reject";
      reason: Error;
    };

export class Sandbox {
  private createBundlePromise: Promise<void>;
  private entrypoint: string;
  private readonly timeouts: NodeJS.Timeout[] = [];
  private readonly options: SandboxOptions;

  constructor(entrypoint: string, options: SandboxOptions = {}) {
    this.entrypoint = entrypoint;
    this.options = options;
    this.createBundlePromise = this.createBundle();
  }

  public async cleanup() {
    for (const timeout of this.timeouts) {
      clearTimeout(timeout);
    }
  }

  private async createBundle() {
    const workdir = await mkdtemp(path.join(tmpdir(), "wing-bundles-"));

    // wrap contents with a shim that handles the communication with the parent process
    // we insert this shim before bundling to ensure source maps are generated correctly
    let contents = (await readFile(this.entrypoint)).toString();

    // log a warning if contents includes __dirname or __filename
    if (contents.includes("__dirname") || contents.includes("__filename")) {
      this.options.log?.(
        false,
        "warn",
        `Warning: __dirname and __filename cannot be used within bundled cloud functions. There may be unexpected behavior.`
      );
    }

    contents = `
"use strict";
${contents}
process.on("message", async (message) => {
  const { fn, args } = message;
  try {
    const value = await exports[fn](...args);
    process.send({ type: "resolve", value });
  } catch (err) {
    process.send({ type: "reject", reason: err });
  }
});
`;
    const wrappedPath = this.entrypoint.replace(/\.js$/, ".sandbox.js");
    await writeFile(wrappedPath, contents);
    const bundle = createBundle(wrappedPath, [], workdir);
    this.entrypoint = bundle.entrypointPath;

    if (process.env.DEBUG) {
      const bundleSize = (await stat(bundle.entrypointPath)).size;
      this.options.log?.(true, "log", `Bundled code (${bundleSize} bytes).`);
    }
  }

  public async call(fn: string, ...args: any[]): Promise<any> {
    // wait for the bundle to finish creation
    await this.createBundlePromise;

    // start a Node.js process that runs the bundled code
    const child = cp.fork(this.entrypoint, [], {
      env: this.options.env,
      stdio: "pipe",
      execArgv: ["--enable-source-maps"],
      serialization: "advanced",
    });

    const log = (message: string) => this.options.log?.(false, "log", message);
    const logError = (message: string) =>
      this.options.log?.(false, "error", message);

    // pipe stdout and stderr from the child process
    if (child.stdout) {
      processStream(child.stdout, log);
    }
    if (child.stderr) {
      processStream(child.stderr, logError);
    }

    return new Promise((resolve, reject) => {
      child.send({ fn, args } as ProcessRequest);
      child.on("message", (message: ProcessResponse) => {
        if (message.type === "resolve") {
          child.kill();
          resolve(message.value);
        } else if (message.type === "reject") {
          child.kill();
          reject(message.reason);
        }
      });
      child.on("error", (error) => {
        child.kill();
        reject(error);
      });
      child.on("exit", (code, _signal) => {
        child.kill();
        reject(new Error(`Process exited with code ${code}`));
      });

      if (this.options.timeout) {
        const timeout = setTimeout(() => {
          child.kill();
          reject(
            new Error(
              `Function timed out (it was configured to only run for ${this.options.timeout}ms)`
            )
          );
        }, this.options.timeout);
        this.timeouts.push(timeout);
      }
    });
  }
}

export class LegacySandbox {
  private createBundlePromise: Promise<void>;
  private entrypoint: string;
  private code: string | undefined;
  private readonly options: SandboxOptions;
  private readonly context: any = {};

  constructor(entrypoint: string, options: SandboxOptions = {}) {
    this.entrypoint = entrypoint;
    this.options = options;
    this.context = this.createContext();
    this.createBundlePromise = this.createBundle();
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
        // also log to stderr if DEBUG is set
        if (process.env.DEBUG) {
          console.error(message);
        }
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

  private async createBundle() {
    // load bundle into context on first run
    const workdir = await mkdtemp(path.join(tmpdir(), "wing-bundles-"));
    const bundle = createBundle(this.entrypoint, [], workdir);
    this.entrypoint = bundle.entrypointPath;

    this.code = await readFile(this.entrypoint, "utf-8");

    if (process.env.DEBUG) {
      const bundleSize = Buffer.byteLength(this.code, "utf-8");
      this.options.log?.(true, "log", `Bundled code (${bundleSize} bytes).`);
    }
  }

  public async call(fn: string, ...args: any[]): Promise<any> {
    // wait for the bundle to finish creation
    await this.createBundlePromise;

    if (!this.code) {
      throw new Error("Bundle not created yet - please report this as a bug");
    }

    // this will add stuff to the "exports" object within our context
    vm.runInContext(this.code!, this.context, {
      filename: this.entrypoint,
    });

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

      const code = `exports.${fn}(${args
        .map((arg) => JSON.stringify(arg))
        .join(",")}).then($resolve).catch($reject);`;
      vm.runInContext(code, this.context, {
        filename: this.entrypoint,
        timeout: this.options.timeout,
      });
    });
  }
}
