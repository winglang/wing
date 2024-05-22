import * as cp from "child_process";
import { writeFileSync } from "fs";
import { readFile, stat } from "fs/promises";
import { url as inspectorUrl } from "inspector";
import { Bundle, createBundle } from "./bundling";
import { processStream } from "./stream-processor";
import { LogLevel } from "../std";

export interface SandboxOptions {
  readonly env?: { [key: string]: string };
  readonly context?: { [key: string]: any };
  /**
   * How long the sandbox is allowed to run code when `sandbox.call()` is called
   * before the child process should be stopped (killed), in milliseconds.
   *
   * If an invocation returns successfully, the child process continues running
   * and can be reused for subsequent invocations.
   */
  readonly timeout?: number;
  readonly log?: (internal: boolean, level: LogLevel, message: string) => void;
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
      type: "ok";
      value: any;
    }
  | {
      type: "error";
      reason: Error;
    };

export class Sandbox {
  public static async createBundle(
    entrypoint: string,
    log?: (message: string, level: LogLevel) => void
  ): Promise<Bundle> {
    let contents = await readFile(entrypoint, "utf-8");

    // log a warning if contents includes __dirname or __filename
    if (contents.includes("__dirname") || contents.includes("__filename")) {
      log?.(
        `Warning: __dirname and __filename cannot be used within bundled cloud functions. There may be unexpected behavior.`,
        LogLevel.WARNING
      );
    }

    let debugShim = "";
    if (inspectorUrl?.()) {
      // If we're debugging, we need to make sure the debugger has enough time to attach
      // to the child process. This gives enough time for the debugger load sourcemaps and set breakpoints.
      // See https://github.com/microsoft/vscode-js-debug/issues/1510
      debugShim =
        "\n  await new Promise((resolve) => setTimeout(resolve, 25));";
    }

    // wrap contents with a shim that handles the communication with the parent process
    // we insert this shim before bundling to ensure source maps are generated correctly
    contents += `
process.on("uncaughtException", (reason) => {
  process.send({ type: "error", reason });
});

process.on("message", async (message) => {${debugShim}
  const { fn, args } = message;
  const value = await exports[fn](...args);
  process.send({ type: "ok", value });
});
`;

    const wrappedPath = entrypoint.replace(/\.cjs$/, ".sandbox.cjs");
    writeFileSync(wrappedPath, contents); // async fsPromises.writeFile "flush" option is not available in Node 20
    const bundle = createBundle(wrappedPath);

    if (process.env.DEBUG) {
      const fileStats = await stat(entrypoint);
      log?.(`Bundled code (${fileStats.size} bytes).`, LogLevel.VERBOSE);
    }

    return bundle;
  }

  private readonly entrypoint: string;
  private readonly options: SandboxOptions;

  private child: cp.ChildProcess | undefined;
  private childPid: number | undefined;
  private onChildMessage: ((message: ProcessResponse) => void) | undefined;
  private onChildError: ((error: Error) => void) | undefined;
  private onChildExit:
    | ((code: number | null, signal: NodeJS.Signals | null) => void)
    | undefined;

  private timeout: NodeJS.Timeout | undefined;

  // Tracks whether the sandbox is available to process a new request
  // When call() is called, it sets this to false, and when it's returning
  // a response or error, it sets it back to true.
  private available = true;
  private cleaningUp = false;

  constructor(entrypoint: string, options: SandboxOptions = {}) {
    this.entrypoint = entrypoint;
    this.options = options;
  }

  public async cleanup() {
    this.cleaningUp = true;
    if (this.timeout) {
      clearTimeout(this.timeout);
    } else {
    }

    if (this.child) {
      this.debugLog(
        `Terminating sandbox child process (PID ${this.childPid}).`
      );
      this.child.kill("SIGTERM");
      this.child = undefined;
      this.available = true;
    }
  }

  public isAvailable(): boolean {
    return this.available;
  }

  public async initialize() {
    const childEnv = this.options.env ?? {};
    if (inspectorUrl?.()) {
      // We're exposing a debugger, let's attempt to ensure the child process automatically attaches
      childEnv.NODE_OPTIONS =
        (childEnv.NODE_OPTIONS ?? "") + (process.env.NODE_OPTIONS ?? "");

      // If the child process is not already configured to attach a debugger, add a flag to do so
      if (
        !childEnv.NODE_OPTIONS.includes("--inspect") &&
        !process.execArgv.includes("--inspect")
      ) {
        childEnv.NODE_OPTIONS += " --inspect=0";
      }

      // VSCode's debugger adds some environment variables that we want to pass to the child process
      for (const key in process.env) {
        if (key.startsWith("VSCODE_")) {
          childEnv[key] = process.env[key]!;
        }
      }
    }

    // start a Node.js process that runs the inflight code
    // note: unlike the fork(2) POSIX system call, child_process.fork()
    // does not clone the current process
    this.child = cp.fork(this.entrypoint, {
      env: childEnv,
      stdio: "pipe",
      // keep the process detached so in the case of cloud.Service, if the parent process is killed
      // (e.g. someone presses Ctrl+C while using Wing Console),
      // we can gracefully call any cleanup code in the child process
      detached: true,
      // this option allows complex objects like Error to be sent from the child process to the parent
      serialization: "advanced",
    });
    this.childPid = this.child.pid;

    this.debugLog(`Initialized sandbox (PID ${this.childPid}).`);

    const log = (message: string) => {
      let level = LogLevel.INFO;
      if (message.startsWith("info:")) {
        message = message.slice(5);
      } else if (message.startsWith("error:")) {
        message = message.slice(6);
        level = LogLevel.ERROR;
      } else if (message.startsWith("warning:")) {
        message = message.slice(8);
        level = LogLevel.WARNING;
      } else if (message.startsWith("verbose:")) {
        message = message.slice(8);
        level = LogLevel.VERBOSE;
      }
      this.options.log?.(false, level, message);
    };
    const logError = (message: string) =>
      this.options.log?.(false, LogLevel.ERROR, message);

    // pipe stdout and stderr from the child process
    if (this.child.stdout) {
      processStream(this.child.stdout, log);
    }
    if (this.child.stderr) {
      processStream(this.child.stderr, logError);
    }

    this.child.on("message", (message: ProcessResponse) => {
      this.onChildMessage?.(message);
    });
    this.child!.on("error", (error) => {
      this.onChildError?.(error);
    });
    this.child!.on("exit", (code, signal) => {
      this.onChildExit?.(code, signal);
    });
  }

  public async call(fn: string, ...args: any[]): Promise<any> {
    if (!this.available) {
      throw new SandboxMultipleConcurrentCallsError();
    }

    // Prevent multiple calls to the same sandbox running concurrently.
    this.available = false;

    // If this sandbox doesn't have a child process running (because it
    // just got created, OR because the previous child process was killed due
    // to timeout or an unexpected error), initialize one.
    if (!this.child) {
      await this.initialize();
    }

    // Send the function name and arguments to the child process.
    // When a message is received, resolve or reject the promise.
    return new Promise((resolve, reject) => {
      this.child!.send({ fn, args } as ProcessRequest);
      this.debugLog(
        `Sent a message to the sandbox (PID ${this.childPid}): ${JSON.stringify(
          {
            fn,
            args,
          }
        )}`
      );

      this.onChildMessage = (message: ProcessResponse) => {
        this.debugLog(
          `Received a message from the sandbox (PID ${
            this.childPid
          }): ${JSON.stringify(message)}`
        );
        this.available = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        if (message.type === "ok") {
          resolve(message.value);
        } else if (message.type === "error") {
          reject(message.reason);
        } else {
          reject(
            new Error(
              `Unexpected message from the sandbox (PID ${this.childPid}): ${message}`
            )
          );
        }
      };

      // "error" could be emitted for any number of reasons
      // (e.g. the process couldn't be spawned or killed, or a message couldn't be sent).
      // Since this is unexpected, we kill the process with SIGKILL to ensure it's dead, and reject the promise.
      this.onChildError = (error: Error) => {
        this.debugLog(
          `Unexpected error from the sandbox (PID ${this.childPid}).`
        );
        this.child?.kill("SIGKILL");
        this.child = undefined;
        this.available = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        if (this.cleaningUp) {
          resolve(undefined);
        } else {
          reject(error);
        }
      };

      // "exit" could be emitted if the user code called process.exit(), or if we killed the process
      // due to a timeout or unexpected error. In any case, we reject the promise.
      this.onChildExit = (code: number | null, signal: unknown) => {
        this.debugLog(`Sandbox (PID ${this.childPid}) stopped.`);
        this.child = undefined;
        this.available = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        if (this.cleaningUp) {
          resolve(undefined);
        } else {
          reject(
            new Error(`Process exited with code ${code}, signal ${signal}`)
          );
        }
      };

      if (this.options.timeout && !inspectorUrl?.()) {
        this.timeout = setTimeout(() => {
          this.debugLog(
            `Killing sandbox (PID ${this.childPid}) after timeout.`
          );
          this.child?.kill("SIGTERM");
          this.child = undefined;
          this.available = true;
          if (this.cleaningUp) {
            resolve(undefined);
          } else {
            reject(new SandboxTimeoutError(this.options.timeout ?? 0));
          }
        }, this.options.timeout);
      }
    });
  }

  private debugLog(message: string) {
    if (process.env.DEBUG) {
      this.options.log?.(true, LogLevel.VERBOSE, message);
    }
  }
}

export class SandboxTimeoutError extends Error {
  constructor(public readonly timeout: number) {
    super("Timed out after " + timeout + "ms.");
  }
}

export class SandboxMultipleConcurrentCallsError extends Error {
  constructor() {
    super("Cannot process multiple requests in parallel.");
  }
}
