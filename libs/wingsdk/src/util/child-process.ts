import { spawn } from "child_process";
import { Output, SpawnOptions, Stdio } from "./util";
import { InflightClient } from "../core";

/**
 * Handle to a running child process.
 */
export class ChildProcess {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * The underlying native child process object representing the spawned process.
   */
  private readonly child: ReturnType<typeof spawn>;
  /**
   * The child's OS-assigned process ID.
   */
  public readonly pid: number | undefined;
  /**
   * The accumulated standard output from the child process.
   */
  private stdout: string = "";
  /**
   * The accumulated standard error from the child process.
   */
  private stderr: string = "";
  /**
   * The exit status of the child process. Null if the process has not yet finished.
   */
  private exitStatus: number | null = null;

  constructor(program: string, args: string[], opts?: SpawnOptions) {
    const spawnOpts = {
      cwd: opts?.cwd,
      env: opts?.inheritEnv
        ? { ...process.env, ...opts.env }
        : { ...opts?.env },
      stdio: [
        opts?.stdin ?? Stdio.INHERIT,
        opts?.stdout ?? Stdio.INHERIT,
        opts?.stderr ?? Stdio.INHERIT,
      ],
    };

    // Spawn the child process with the provided options
    this.child = spawn(program, args, spawnOpts);

    this.pid = this.child.pid;
    console.log(`Spawned child process with PID: ${this.pid}`);

    // // If stdio for stdout is set to `pipe`, listen for data events on stdout.
    // if (this.child.stdout) {
    //   this.child.stdout.on("data", (data: Buffer) => {
    //     console.log("Received stdout data:", data.toString());
    //     this.stdout += data.toString();
    //   });
    // }

    // // // If stdio for stderr is set to `pipe`, listen for data events on stderr.
    // if (this.child.stderr) {
    //   this.child.stderr.on("data", (data: Buffer) => {
    //     console.log("Received stderr data:", data.toString());
    //     this.stderr += data.toString();
    //   });
    // }

    // this.child.on("error", (error: Error) => {
    //   console.error(
    //     `Failed to start child process for ${program}: ${error.message}`
    //   );
    // });

    this.child.on("exit", (code) => {
      console.log(`Child process exited with code: ${code}`);
      this.exitStatus = code;
    });
  }

  /**
   * Kill the process.
   * @param signal - the signal to send to the process (defaults to SIGTERM)
   */
  public kill(signal: number = 15): void {
    this.child.kill(signal);
  }

  /**
   * Wait for the process to finish and return its output.
   * Calling this method multiple times will return the same output.
   */
  public async wait(): Promise<Output> {
    if (this.exitStatus !== null) {
      console.log("Process already finished, returning output.");
      return {
        stdout: this.stdout,
        stderr: this.stderr,
        status: this.exitStatus,
      };
    }

    console.log("Waiting for child process to finish..." + this.exitStatus);

    return new Promise((resolve, reject) => {
      const cleanup = () => {
        this.child.off("exit", onExit);
        this.child.off("error", onError);
        if (this.child.stdout) {
          this.child.stdout.off("data", onDataStdout);
        }
        if (this.child.stderr) {
          this.child.stderr.off("data", onDataStderr);
        }
      };

      const onExit = (code: number | null, signal: string | null) => {
        cleanup();
        if (code !== null) {
          resolve({ stdout: this.stdout, stderr: this.stderr, status: code });
        } else {
          reject(new Error(`Process terminated by signal ${signal}`));
        }
      };

      const onError = (error: Error) => {
        cleanup();
        reject(error);
      };

      const onDataStdout = (data: Buffer) => {
        this.stdout += data.toString();
      };

      const onDataStderr = (data: Buffer) => {
        this.stderr += data.toString();
      };

      this.child.on("exit", onExit);
      this.child.on("error", onError);
      if (this.child.stdout) {
        this.child.stdout.on("data", onDataStdout);
      }
      if (this.child.stderr) {
        this.child.stderr.on("data", onDataStderr);
      }
    });
  }
}
