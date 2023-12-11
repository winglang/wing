import { exec as nodeExec, spawn as nodeSpawn } from "child_process";
import { createHash } from "crypto";
import { promisify } from "util";
import { nanoid, customAlphabet } from "nanoid";
import { v4 } from "uuid";
import { InflightClient } from "../core";
import { Duration, IInflight } from "../std";

const execPromise = promisify(nodeExec);

/**
 * Describes what to do with a standard I/O stream for a child process.
 */
export enum Stdio {
  /**
   * The child inherits from the corresponding parent descriptor.
   */
  INHERIT = "inherit",
  /**
   * A new pipe should be arranged to connect the parent and child processes.
   */
  PIPED = "pipe",
  /**
   * This stream will be ignored. This is the equivalent of attaching the stream to /dev/null.
   */
  NULL = "ignore",
}

/**
 * Base command options.
 */
export interface CommandOptions {
  /**
   * Path to a directory to run the command in.
   * @default - the default working directory of the host
   */
  readonly cwd?: string;
  /**
   * Environment variables.
   * @default - no environment variables
   */
  readonly env?: { [key: string]: string };
  /**
   * Whether to inherit environment variables from the host's environment.
   * @default false
   */
  readonly inheritEnv?: boolean;
}

/**
 * Additional options for `util.shell()`
 */
export interface ShellOptions extends CommandOptions {}

/**
 * Additional options for `util.exec()`
 */
export interface ExecOptions extends CommandOptions {}

/**
 * Additional options for `util.spawn()`
 */
export interface SpawnOptions extends CommandOptions {
  /**
   * Configuration for the process's standard input stream.
   * @default - Stdio.INHERIT
   */
  readonly stdin?: Stdio;
  /**
   * Configuration for the process's standard output stream.
   * @default - Stdio.INHERIT
   */
  readonly stdout?: Stdio;
  /**
   * Configuration for the process's standard error stream.
   * @default - Stdio.INHERIT
   */
  readonly stderr?: Stdio;
}

/**
 * Output of a finished process.
 */
export interface Output {
  /**
   * The standard output of a finished process.
   */
  readonly stdout: string;
  /**
   * The standard error of a finished process.
   */
  readonly stderr: string;
  /**
   * A process's exit status.
   */
  readonly status: number;
}

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
  private childProcess: ReturnType<typeof nodeSpawn>;
  /**
   * The child's OS-assigned process ID.
   */
  public readonly id: number;

  constructor(program: string, args: string[], opts?: SpawnOptions) {
    this.childProcess = nodeSpawn(program, args, {
      cwd: opts?.cwd,
      env: opts?.env,
    });
    this.id = this.childProcess.pid ?? -1;
  }

  /**
   * Kill the process.
   * @param signal - the signal to send to the process (defaults to SIGTERM)
   */
  public kill(signal: number = 15): void {
    this.childProcess.kill(signal);
  }

  /**
   * Wait for the process to finish and return its output.
   * Calling this method multiple times will return the same output.
   */
  public async wait(): Promise<Output> {
    return new Promise((resolve, reject) => {
      let stdout = "";
      let stderr = "";

      this.childProcess.stdout?.on("data", (data) => (stdout += data));
      this.childProcess.stderr?.on("data", (data) => (stderr += data));

      this.childProcess.on("close", (status) => {
        resolve({ stdout, stderr, status: status !== null ? status : -1 });
      });

      this.childProcess.on("error", (error) => {
        reject(error);
      });
    });
  }
}

/**
 * Properties for `util.waitUntil`.
 */
export interface WaitUntilProps {
  /**
   * The timeout for keep trying predicate
   * @default 1m
   */
  readonly timeout?: Duration;
  /**
   * Interval between predicate retries
   * @default 0.1s
   */
  readonly interval?: Duration;
}

/**
 * A predicate with an inflight "handle" method that can be passed to
 * `util.busyWait`.
 * @inflight `@winglang/sdk.util.IPredicateHandlerClient`
 */
export interface IPredicateHandler extends IInflight {}

/**
 * Inflight client for `IPredicateHandler`.
 */
export interface IPredicateHandlerClient {
  /**
   * The Predicate function that is called
   * @inflight
   */
  handle(): Promise<boolean>;
}

/**
 * Options to generating a unique ID
 */
export interface NanoidOptions {
  /**
   * Size of ID
   * @default 21
   */
  readonly size?: number;
  /**
   * Characters that make up the alphabet to generate the ID, limited to 256 characters or fewer.
   */
  readonly alphabet?: string;
}

/**
 * Utility functions.
 */
export class Util {
  /**
   * Execute a command in the shell and return its standard output.
   * @param command - The shell command to execute.
   * @param opts - The shell options including working directory, environment variables, etc.
   * @returns The standard output of the shell command.
   * @throws An error if the command returns a non-zero exit code.
   */
  public static async shell(
    command: string,
    opts?: ShellOptions
  ): Promise<string> {
    const output = await Util.exec("/bin/sh", ["-c", command], opts);
    if (output.status !== 0) {
      throw new Error(
        `Command exited with status ${output.status}: ${command}`
      );
    }
    return output.stdout;
  }

  /**
   * Execute a program with the given arguments, wait for it to finish, and
   * return its outputs.
   * @param program - The program to execute.
   * @param args - An array of arguments to pass to the program.
   * @param opts - Execution options including working directory, environment variables, etc.
   * @returns A promise that resolves to the output of the executed program.
   * @throws An error if the execution fails.
   */
  public static async exec(
    program: string,
    args: Array<string>,
    opts?: ExecOptions
  ): Promise<Output> {
    const command = `${program} ${args.join(" ")}`;

    const { stdout, stderr } = await execPromise(command, opts);

    const status = 0;

    const stdoutString = stdout.toString();
    const stderrString = stderr.toString();

    return { stdout: stdoutString, stderr: stderrString, status };
  }

  /**
   * Execute a program with the given arguments, and return a `ChildProcess`
   * object that can be used to interact with the process while it is running.
   * @param program - The program to execute.
   * @param args - An array of arguments to pass to the program.
   * @param opts - Spawn options including working directory, environment variables, and stdio configurations.
   * @returns The `ChildProcess` instance associated with the spawned process.
   */
  public static spawn(
    program: string,
    args: Array<string>,
    opts?: SpawnOptions
  ): ChildProcess {
    return new ChildProcess(program, args, opts);
  }

  /**
   * Returns the value of an environment variable. Throws if not found or empty.
   * @param name The name of the environment variable.
   */
  public static env(name: string): string {
    const value = Util.tryEnv(name);
    if (!value) {
      throw new Error(`Environment variable ${name} not found.`);
    }
    return value;
  }

  /**
   * Returns the value of an environment variable. Returns `nil` if not found or empty.
   * @param name The name of the environment variable.
   * @returns The value of the environment variable or `nil`.
   */
  public static tryEnv(name: string): string | undefined {
    return process.env[name];
  }

  /**
   * Converts a string from UTF-8 to base64.
   * @param stringToEncode The name of the UTF-8 string to encode.
   * @param url If `true`, a URL-safe base64 string is returned.
   * @returns The base64 string.
   */
  public static base64Encode(stringToEncode: string, url?: boolean): string {
    return Buffer.from(stringToEncode).toString(url ? "base64url" : "base64");
  }

  /**
   * Converts a string from base64 to UTF-8.
   * @param stringToDecode base64 string to decode.
   * @param url If `true`, the source is expected to be a URL-safe base64 string.
   * @returns The UTF-8 string.
   */
  public static base64Decode(stringToDecode: string, url?: boolean): string {
    return Buffer.from(stringToDecode, url ? "base64url" : "base64").toString(
      "utf8"
    );
  }

  /**
   * Suspends execution for a given duration.
   * @param delay The time to suspend execution.
   * @inflight
   */
  public static async sleep(delay: Duration): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delay.seconds * 1000));
  }

  /**
   * Run a predicate repeatedly, waiting until it returns true or until the timeout elapses.
   * @param predicate The function that will be evaluated.
   * @param props Timeout and interval values, default to one 1m timeout and 0.1sec interval.
   * @throws Will throw if the given predicate throws.
   * @returns True if predicate is truthful within timeout.
   * @inflight
   */
  public static async waitUntil(
    predicate: IPredicateHandler,
    props: WaitUntilProps = {}
  ): Promise<boolean> {
    const timeout = props.timeout ?? Duration.fromMinutes(1);
    const interval = props.interval ?? Duration.fromSeconds(0.1);
    const f = predicate as any;
    let elapsed = 0;
    while (elapsed < timeout.seconds) {
      if (await f()) {
        return true;
      }
      // not taking account the real elapsed time just the sum of intervals till timeout
      // it might be that predicate takes a long time and it is not considered inside timeout
      elapsed += interval.seconds;
      await this.sleep(interval);
    }
    return false;
  }

  /**
   * Computes the SHA256 hash of the given data.
   * @param data - The string to be hashed.
   */
  public static sha256(data: string): string {
    return createHash("sha256").update(data).digest("hex");
  }

  /**
   * Generates a version 4 UUID.
   */
  public static uuidv4(): string {
    return v4();
  }

  /**
   * Generates a unique ID using the nanoid library.
   # @link https://github.com/ai/nanoid
   * @param options - Optional options object for generating the ID.
   */
  public static nanoid(options?: NanoidOptions): string {
    const size = options?.size ?? 21;
    const nano = options?.alphabet
      ? customAlphabet(options.alphabet, size)
      : undefined;
    return nano ? nano(size) : nanoid(size);
  }

  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }
  private constructor() {}
}
