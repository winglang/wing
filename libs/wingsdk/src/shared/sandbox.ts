import * as cp from "child_process";
import { writeFileSync } from "fs";
import { mkdtemp, readFile, stat } from "fs/promises";
import { tmpdir } from "os";
import * as path from "path";
import { createBundle } from "./bundling";
import { processStream } from "./stream-processor";

export interface SandboxOptions {
  readonly env?: { [key: string]: string };
  readonly context?: { [key: string]: any };
  readonly timeout?: number;
  readonly log?: (internal: boolean, level: string, message: string) => void;
}

/**
 * Shape of the messages sent to the child process.
 */
type ProcessRequest = {
  fn: string;
  args: any[];
};

/**
 * Shape of the messages returned by the child process.
 */
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
  private readonly exitingChildren: Promise<void>[] = [];
  private readonly timeouts: NodeJS.Timeout[] = [];
  private readonly options: SandboxOptions;

  constructor(entrypoint: string, options: SandboxOptions = {}) {
    this.entrypoint = entrypoint;
    this.options = options;
    this.createBundlePromise = this.createBundle();
  }

  public async cleanup() {
    await this.createBundlePromise;
    for (const timeout of this.timeouts) {
      clearTimeout(timeout);
    }
    // Make sure all child processes have exited before cleaning up the sandbox.
    for (const exitingChild of this.exitingChildren) {
      await exitingChild;
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
    writeFileSync(wrappedPath, contents); // async fsPromises.writeFile "flush" option is not available in Node 20
    const bundle = createBundle(wrappedPath, [], workdir);
    this.entrypoint = bundle.entrypointPath;

    if (process.env.DEBUG) {
      const bundleSize = (await stat(bundle.entrypointPath)).size;
      this.debugLog(`Bundled code (${bundleSize} bytes).`);
    }
  }

  public async call(fn: string, ...args: any[]): Promise<any> {
    // wait for the bundle to finish creation
    await this.createBundlePromise;

    this.debugLog("Forking process to run bundled code.");

    // start a Node.js process that runs the bundled code
    // note: unlike the fork(2) POSIX system call, child_process.fork()
    // does not clone the current process
    const child = cp.fork(this.entrypoint, [], {
      env: this.options.env,
      stdio: "pipe",
      cwd: process.cwd(),
      // execArgv: ["--enable-source-maps"],
      // this option allows complex objects like Error to be sent from the child process to the parent
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

    // Keep track of when the child process exits so that the simulator doesn't try
    // to clean up the sandbox before the child process has exited.
    // NOTE: If child processes are taking too long to exit (preventing simulator cleanups),
    // we could add a mechanism to send SIGKILL to the child process after a certain amount of time.
    let childExited: (value?: any) => void;
    this.exitingChildren.push(
      new Promise((resolve) => {
        childExited = resolve;
      })
    );

    // Send the function name and arguments to the child process.
    // When a message is received, kill the child process.
    // Once the child process is killed (by the parent process or because the user code
    // exited on its own), resolve or reject the promise.
    return new Promise((resolve, reject) => {
      child.send({ fn, args } as ProcessRequest);

      let result: any;
      let status: "resolve" | "reject" | "pending" = "pending";

      child.on("message", (message: ProcessResponse) => {
        this.debugLog("Received a message, killing child process.");
        child.kill();
        if (message.type === "resolve") {
          result = message.value;
          status = "resolve";
        } else if (message.type === "reject") {
          result = message.reason;
          status = "reject";
        } else {
          result = `Parent received unexpected message from child process: ${message}`;
          status = "reject";
        }
      });

      // "error" could be emitted for any number of reasons
      // (e.g. the process couldn't be spawned or killed, or a message couldn't be sent).
      // Since this is unexpected, we kill the process with SIGKILL to ensure it's dead, and reject the promise.
      child.on("error", (error) => {
        this.debugLog("Killing process after error.");
        child.kill("SIGKILL");
        childExited();
        reject(`Unexpected error: ${error}`);
      });

      child.on("exit", (code, _signal) => {
        this.debugLog("Child processed stopped.");
        childExited();
        if (status === "pending") {
          // If the child process stopped without sending us back a message, reject the promise.
          reject(new Error(`Process exited with code ${code}`));
        } else if (status === "resolve") {
          resolve(result);
        } else if (status === "reject") {
          reject(result);
        }
      });

      if (this.options.timeout) {
        const timeout = setTimeout(() => {
          this.debugLog("Killing process after timeout.");
          child.kill();
          status = "reject";
          result = new Error(
            `Function timed out (it was configured to only run for ${this.options.timeout}ms)`
          );
        }, this.options.timeout);
        this.timeouts.push(timeout);
      }
    });
  }

  private debugLog(message: string) {
    if (process.env.DEBUG) {
      this.options.log?.(true, "log", message);
    }
  }
}
