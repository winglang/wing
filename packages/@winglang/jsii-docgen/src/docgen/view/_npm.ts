import { spawn, SpawnOptionsWithoutStdio } from "child_process";
import * as os from "os";
import { join } from "path";
import { major } from "semver";
import {
  NoSpaceLeftOnDevice,
  UnInstallablePackageError,
  NpmError,
} from "../../errors";

export class Npm {
  #npmCommand: string | undefined;

  public constructor(
    private readonly workingDirectory: string,
    private readonly logger = console.log,
    npmCommand?: string,
  ) {
    this.#npmCommand = npmCommand;
  }

  /**
   * Installs the designated package into this repository's working directory.
   *
   * @param target the name or path to the package that needs to be installed.
   */
  public async install(target: string): Promise<void> {
    const result = await this.runCommand(
      await this.npmCommandPath(),
      [
        "install",
        target,
        // this is critical from a security perspective to prevent
        // code execution as part of the install command using npm hooks. (e.g postInstall)
        "--ignore-scripts",
        // ensures npm does not insert anything in $PATH
        "--no-bin-links",
        "--no-save",
        // ensures we are installing devDependencies, too.
        "--include=dev",
        // don't write or update a package-lock.json file
        "--no-package-lock",
        // always produce JSON output
        "--json",
      ],
      chunksToObject,
      {
        cwd: this.workingDirectory,
        shell: true,
      },
    );
    return assertSuccess(result);
  }

  /**
   * Obtains the path to the npm command that should be run. This always returns
   * the path to an npm >= 7, which "correctly" handles peerDependencies. If the
   * npm version that's available in $PATH satisfies this predicate, this will
   * simply return `npm`.
   */
  private async npmCommandPath(): Promise<string> {
    if (this.#npmCommand) {
      return this.#npmCommand;
    }

    try {
      // If the npm in $PATH is >= v7, we can use that directly. The
      // `npm version --json` command returns a JSON object containing the
      // versions of several components (npm, node, v8, etc...). We are only
      // interested in the `npm` key here.
      const { exitCode, stdout } = await this.runCommand(
        "npm",
        ["version", "--json"],
        chunksToObject,
      );
      if (exitCode === 0 && major((stdout as any).npm) >= 7) {
        return (this.#npmCommand = "npm");
      }
    } catch (e) {
      this.logger("Could not determine version of npm in $PATH:", e);
    }

    // npm@8 is needed so that we also install peerDependencies - they are needed to construct
    // the full type system.
    this.logger("The npm in $PATH is not >= v7. Installing npm@8 locally...");
    const result = await this.runCommand(
      "npm",
      ["install", "npm@8", "--no-package-lock", "--no-save", "--json"],
      chunksToObject,
      {
        cwd: this.workingDirectory,
        shell: true,
      },
    );
    assertSuccess(result);

    this.#npmCommand = join(
      this.workingDirectory,
      "node_modules",
      ".bin",
      "npm",
    );
    this.logger(`Done installing npm@8 at ${this.#npmCommand}`);
    return this.#npmCommand;
  }

  /**
   * Runs the supplied command with the provided arguments, captures the data
   * pushed to STDOUT, and "parses" it using `outputTransform` to produce a
   * result.
   *
   * You must consult the `exitCode` of the return value to determine whether
   * the command was successful or not. Use the `assertSuccess` function to
   * throw/reject in case the execution was not successful.
   *
   * @param command         the command to invoke.
   * @param args            arguments to provide to the command.
   * @param outputTransform the function that will parse STDOUT data.
   * @param options         additional `spawn` options, if necessary.
   */
  private async runCommand<T = Buffer>(
    command: string,
    args: readonly string[],
    outputTransform: (stderr: readonly Buffer[]) => T,
    options?: SpawnOptionsWithoutStdio,
  ): Promise<CommandResult<T>> {
    return new Promise<CommandResult<T>>((ok, ko) => {
      const child = spawn(command, args, {
        ...options,
        stdio: ["inherit", "pipe", "pipe"],
      });
      const stdout = new Array<Buffer>();
      child.stdout.on("data", (chunk) => {
        stdout.push(Buffer.from(chunk));
      });
      child.stderr.on("data", (chunk) => {
        stdout.push(Buffer.from(chunk));
      });

      child.once("error", ko);
      child.once("close", (exitCode, signal) => {
        try {
          ok({
            command: `${command} ${args.join(" ")}`,
            exitCode,
            signal,
            stdout: outputTransform(stdout),
          });
        } catch (error) {
          ko(error);
        }
      });
    });
  }
}

interface CommandResult<T> {
  readonly command: string;
  readonly exitCode: number | null;
  readonly signal: NodeJS.Signals | null;
  readonly stdout: T;
}
interface SuccessfulCommandResult<T> extends CommandResult<T> {
  readonly exitCode: 0;
  readonly signal: null;
}

/**
 * Asserts the provided CommandResult corresponds to a command that exited with
 * code `0`. If that is not the case, this will throw an appropriate error,
 * either `NpmError` or `NoSpaceLeftOnDevice`.
 */
function assertSuccess(
  result: CommandResult<ResponseObject>,
): asserts result is SuccessfulCommandResult<ResponseObject> {
  const { command, exitCode, signal, stdout } = result;
  if (exitCode === 0) {
    return;
  }
  if (signal != null) {
    throw new NpmError(`Command "${command}" was killed by ${signal}`, stdout);
  }
  if (exitCode === 228 || stdout.error?.code === "ENOSPC") {
    throw new NoSpaceLeftOnDevice(
      `Command "${command}" failed due to insufficient available disk space`,
    );
  }
  const { code, detail, summary } = stdout.error;
  const message = [
    `Command "${command}" exited with code ${exitCode}`,
    summary ? `: ${summary}` : "",
    detail ? `\n${detail}` : "",
    // If we have an error, but neither detail nor summary, then we probably
    // have an actual Error object, so we'll stringify that here...
    stdout.error && !detail && !summary ? `: ${stdout.error}` : "",
  ].join("");

  if (
    typeof summary === "string" &&
    summary.includes("must provide string spec")
  ) {
    // happens when package.json dependencies don't have a spec.
    // for example: https://github.com/markusl/cdk-codepipeline-bitbucket-build-result-reporter/blob/v0.0.7/package.json
    throw new UnInstallablePackageError(summary);
  }

  // happens when a package has been deleted from npm
  // for example: sns-app-jsii-component
  if (
    !code &&
    !detail &&
    typeof summary === "string" &&
    summary.includes("Cannot convert undefined or null to object")
  ) {
    throw new UnInstallablePackageError(summary);
  }

  switch (code) {
    case "ERESOLVE": // dependency resolution problem requires a manual intervention (most likely...)
    case "EOVERRIDE": // Package contains some version overrides that conflict.
    case "E404": // package (or dependency) can't be found on NPM. This can happen if the package depends on a deprecated package (for example).
      throw new UnInstallablePackageError(message);
    default:
      throw new NpmError(message, stdout, code);
  }
}

/**
 * Concatenates the provided chunks into a single Buffer, converts it to a
 * string using the designated encoding, then JSON-parses it. If any part of
 * this process results in an error, returns an object that contains the error
 * and the raw chunks.
 */
function chunksToObject(
  chunks: readonly Buffer[],
  encoding: BufferEncoding = "utf-8",
): ResponseObject {
  const raw = Buffer.concat(chunks).toString(encoding);
  try {
    // npm will sometimes print non json log lines even though --json was requested.
    // observed these log lines always start with 'npm', so we filter those out.
    // for example: "npm notice New patch version of npm available! 8.1.0 -> 8.1.3"
    // for example: "npm ERR! must provide string spec"
    const onlyJson = raw
      .split(os.EOL)
      .filter((l) => !l.startsWith("npm"))
      .join(os.EOL);
    return JSON.parse(onlyJson);
  } catch (error) {
    return { error, raw };
  }
}

type ResponseObject =
  // The error when we failed to parse the output as JSON
  | { readonly error: any; readonly raw: string }
  // The error objects npm returns when operating in --json mode
  | {
      readonly error: {
        readonly code: string;
        readonly summary: string;
        readonly detail: string;
      };
    }
  // The successful objects are treated as opaque blobs here
  | { readonly error: undefined; readonly [key: string]: unknown };
