import { exec, execFile } from "child_process";
import { createHash } from "crypto";
import { promisify } from "util";
import { nanoid, customAlphabet } from "nanoid";
import { ulid } from "ulid";
import { v4 } from "uuid";
import { ChildProcess } from "./child-process";
import { InflightClient } from "../core";
import { Duration, IInflight } from "../std";

const execPromise = promisify(exec);
const execFilePromise = promisify(execFile);

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
 * Additional options for `util.exec()`
 */
export interface ExecOptions extends CommandOptions {}

/**
 * Additional options for `util.shell()`
 */
export interface ShellOptions extends CommandOptions {
  /**
   * Whether to throw an error on command execution failure.
   * @default true
   */
  readonly throw?: boolean;
}

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
  /**
   * Whether to throw an error if the timeout elapses.
   * @default true
   */
  readonly throws?: boolean;
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
 * Options to generate universally unique lexicographically sortable identifiers.
 */
export interface UlidOptions {
  /**
   * You can also input a seed time which will consistently give you the same string for the time component. This is useful for migrating to ulid.
   * @default Date.now()
   */
  readonly seed?: number;
}

/**
 * Utility functions.
 */
export class Util {
  /**
   * Executes a command in the shell and returns its standard output.
   * @param command The command string to execute in the shell.
   * @param opts `ShellOptions`, such as the working directory and environment variables.
   * @returns The standard output of the shell command.
   * @throws An error if the shell command execution fails or returns a non-zero exit code.
   */
  public static async shell(
    command: string,
    opts?: ShellOptions
  ): Promise<String> {
    const shellOpts = {
      windowsHide: true,
      cwd: opts?.cwd,
      env:
        opts?.inheritEnv === true
          ? { ...process.env, ...opts?.env }
          : { ...opts?.env },
    };

    const createErrorMessage = (error: any): string => {
      if (error.stderr) {
        return `Error executing command "${command}". Exited with error: ${error.stderr}`;
      }
      return `Error executing command "${command}". Exited with error code: ${error.code}`;
    };

    try {
      const { stdout } = await execPromise(command, shellOpts);
      return stdout.toString();
    } catch (error: any) {
      const errorMessage = createErrorMessage(error);

      if (opts?.throw !== false) {
        throw new Error(errorMessage);
      }

      return errorMessage;
    }
  }

  /**
   * Execute a program with the given arguments, wait for it to finish, and
   * return its outputs.
   * @param program The program to execute.
   * @param args An array of arguments to pass to the program.
   * @param opts `ExecOptions`, such as the working directory and environment variables.
   * @returns A struct containing `stdout`, `stderr` and exit `status` of the executed program.
   */
  public static async exec(
    program: string,
    args: Array<string>,
    opts?: ExecOptions
  ): Promise<Output> {
    const execOpts = {
      windowsHide: true,
      shell: false,
      cwd: opts?.cwd,
      env:
        opts?.inheritEnv === true
          ? { ...process.env, ...opts?.env }
          : { ...opts?.env },
    };

    try {
      const { stdout, stderr } = await execFilePromise(program, args, execOpts);
      return {
        stdout: stdout.toString(),
        stderr: stderr.toString(),
        status: 0,
      };
    } catch (error: any) {
      if (error.code === "ENOENT") {
        throw new Error(`Program not found: ${error.message}`);
      } else {
        return {
          stdout: error.stdout.toString(),
          stderr: error.stderr.toString(),
          status: error.code,
        };
      }
    }
  }

  /**
   * Execute a program with the given arguments, and return a `ChildProcess`
   * object that can be used to interact with the process while it is running.
   * @param program - The program to execute.
   * @param args - An array of arguments to pass to the program.
   * @param opts - Spawn options including working directory, environment variables, and stdio configurations.
   * @returns The `ChildProcess` instance associated with the spawned process.
   * @inflight
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
   * Sets the given name and value as an environment variable.
   * @param name The name of the environment variable.
   * @param value The value of the environment variable.
   */
  public static setEnv(name: string, value: string) {
    process.env[name] = value;
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
   * If the timeout elapses, the function throws an error.
   *
   * Alternatively, you can pass `throws: false` to suppress the error, and instead return a boolean
   * indicating whether the predicate returned true within the timeout.
   *
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
    if (props.throws !== false) {
      throw new Error("Timeout elapsed");
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
   * Generates universally unique lexicographically sortable identifier.
   # @link https://github.com/ulid/javascript
   * @param options - Optional options object for generating the ID.
   */
  public static ulid(options?: UlidOptions): string {
    const seed = options?.seed;
    return ulid(seed);
  }

  /**
   * Returns a string identifying the operating system platform.
   * @returns The operating system platform
   * @example "linux", "darwin", "win32"
   */
  public static os(): string {
    return process.platform;
  }

  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }
  private constructor() {}
}
