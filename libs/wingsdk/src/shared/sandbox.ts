import { mkdtemp, readFile } from "fs/promises";
import { tmpdir } from "os";
import * as path from "path";
import * as util from "util";
import { Worker } from "worker_threads";
import { createBundle } from "./bundling";

export interface SandboxOptions {
  readonly env?: { [key: string]: string };
  readonly context?: { [key: string]: any };
  readonly timeout?: number;
  readonly log?: (internal: boolean, level: string, message: string) => void;
}

export class Sandbox {
  private createBundlePromise: Promise<void>;
  private entrypoint: string;
  private code: string | undefined;
  private readonly timeouts: NodeJS.Timeout[] = [];
  private readonly options: SandboxOptions;

  constructor(entrypoint: string, options: SandboxOptions = {}) {
    this.entrypoint = entrypoint;
    this.options = options;
    this.createBundlePromise = this.createBundle(); // start bundle creation
  }

  public async stop(): Promise<void> {
    for (const timeout of this.timeouts) {
      clearTimeout(timeout);
    }
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

    // emit an explicit error when trying to access __dirname and __filename because we cannot
    // resolve these when bundling (this is true both for simulator and the cloud since we are
    // bundling there as well).
    const shim = `
const { parentPort: $parent } = require('worker_threads');
const $resolve = (value) => $parent.postMessage({ type: 'resolve', value });
const $reject = (reason) => $parent.postMessage({ type: 'reject', reason });
console.log = (...args) => $parent.postMessage({ type: 'log', args });
console.debug = (...args) => $parent.postMessage({ type: 'debug', args });
console.info = (...args) => $parent.postMessage({ type: 'info', args });
console.warn = (...args) => $parent.postMessage({ type: 'warn', args });
console.error = (...args) => $parent.postMessage({ type: 'error', args });
process.exit = (exitCode) => $parent.postMessage({ type: 'exit', exitCode });
Object.defineProperty(globalThis, "__dirname", {
  get: () => { throw new Error("__dirname cannot be used within bundled cloud functions"); },
});
Object.defineProperty(globalThis, "__filename", {
  get: () => { throw new Error("__filename cannot be used within bundled cloud functions"); },
});
${this.code}
$parent.on('message', async (message) => {
  try {
    const result = await exports[message.fn](...message.payload);
    $resolve(result);
  } catch (error) {
    $reject(error);
  }
});
      `;
    console.error(shim);

    // currently, a fresh worker is used for every invocation
    // it could be better to keep the worker alive and reuse it
    // but this requires additional work to make sure logs between invocations
    // are not mixed up, and timeouts are handled correctly
    const worker = new Worker(shim, {
      env: this.options.env,
      eval: true,
    });

    let cleanupStarted = false;
    const cleanupWorker = async () => {
      cleanupStarted = true;
      try {
        await worker.terminate();
      } catch (err) {
        console.error("worker terminate error:", err);
      }
    };

    return new Promise((resolve, reject) => {
      worker.postMessage({ type: "invoke", fn, payload: args });
      worker.on("message", (message) => {
        switch (message.type) {
          case "resolve":
            void cleanupWorker().then(() => resolve(message.value));
            break;
          case "reject":
            console.error("rejecting", message);
            void cleanupWorker().then(() => reject(message.reason));
            break;
          case "log":
          case "debug":
          case "info":
          case "warn":
          case "error":
            this.options.log?.(
              false,
              message.type,
              util.format(...message.args)
            );
            if (process.env.DEBUG) {
              console.error(message);
            }
            break;
          case "exit":
            void cleanupWorker().then(() =>
              reject(
                new Error(
                  `process.exit() was called with exit code ${message.exitCode}`
                )
              )
            );
            break;
          default:
            console.error("Unknown message type", message);
        }
      });
      worker.on("error", (error) => {
        void cleanupWorker().then(() => reject(error));
      });
      worker.on("exit", (code) => {
        if (cleanupStarted) {
          // worker was terminated by us, so we don't need to reject
        } else {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });

      if (this.options.timeout) {
        const timeout = setTimeout(() => {
          void cleanupWorker().then(() => {
            reject(
              new Error(
                `Function timed out (it was configured to only run for ${this.options.timeout}ms)`
              )
            );
          });
        }, this.options.timeout);
        this.timeouts.push(timeout);
      }
    });
  }
}
