import * as cp from "child_process";
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
  private readonly entrypoint: string;
  private readonly options: SandboxOptions;

  private child: cp.ChildProcess | undefined;
  private onChildMessage: ((message: ProcessResponse) => void) | undefined;
  private onChildError: ((error: Error) => void) | undefined;
  private onChildExit:
    | ((code: number | null, signal: NodeJS.Signals | null) => void)
    | undefined;

  private timeout: NodeJS.Timeout | undefined;
  private available = true;

  constructor(entrypoint: string, options: SandboxOptions = {}) {
    this.entrypoint = entrypoint;
    this.options = options;
  }

  public async cleanup() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this.child) {
      this.child.kill("SIGTERM");
      this.child = undefined;
      this.available = true;
    }
  }

  public isAvailable(): boolean {
    return this.available;
  }

  public async initialize() {
    this.debugLog("Initializing sandbox.");

    // start a Node.js process that runs the inflight code
    // note: unlike the fork(2) POSIX system call, child_process.fork()
    // does not clone the current process
    this.child = cp.fork(this.entrypoint, [], {
      env: this.options.env,
      stdio: "pipe",
      // this option allows complex objects like Error to be sent from the child process to the parent
      serialization: "advanced",
    });

    const log = (message: string) => this.options.log?.(false, "log", message);
    const logError = (message: string) =>
      this.options.log?.(false, "error", message);

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
    // Prevent multiple calls to the same sandbox running concurrently.
    this.available = false;

    if (!this.child) {
      await this.initialize();
    }

    // Send the function name and arguments to the child process.
    // When a message is received, resolve or reject the promise.
    return new Promise((resolve, reject) => {
      this.child!.send({ fn, args } as ProcessRequest);

      this.onChildMessage = (message: ProcessResponse) => {
        this.debugLog("Received a message from the sandbox.");
        this.available = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        if (message.type === "resolve") {
          resolve(message.value);
        } else if (message.type === "reject") {
          reject(message.reason);
        } else {
          reject(
            new Error(
              `Unexpected message from sandbox child process: ${message}`
            )
          );
        }
      };

      // "error" could be emitted for any number of reasons
      // (e.g. the process couldn't be spawned or killed, or a message couldn't be sent).
      // Since this is unexpected, we kill the process with SIGKILL to ensure it's dead, and reject the promise.
      this.onChildError = (error: Error) => {
        this.debugLog("Unexpected error from the sandbox.");
        this.child?.kill("SIGKILL");
        this.child = undefined;
        this.available = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        reject(error);
      };

      // "exit" could be emitted if the user code called process.exit(), or if we killed the process
      // due to a timeout or unexpected error. In any case, we reject the promise.
      this.onChildExit = (code: number | null) => {
        this.debugLog("Child processed stopped.");
        this.child = undefined;
        this.available = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        reject(new Error(`Process exited with code ${code}`));
      };

      if (this.options.timeout) {
        this.timeout = setTimeout(() => {
          this.debugLog("Killing process after timeout.");
          this.child?.kill();
          this.child = undefined;
          this.available = true;
          reject(
            new Error(
              `Function timed out (it was configured to only run for ${this.options.timeout}ms)`
            )
          );
        }, this.options.timeout);
      }
    });
  }

  private debugLog(message: string) {
    if (process.env.DEBUG) {
      this.options.log?.(true, "log", message);
    }
  }
}
