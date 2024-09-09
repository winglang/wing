import { dirname, resolve } from "path";

import * as wingCompiler from "@winglang/compiler";
import { loadEnvVariables } from "@winglang/sdk/lib/helpers";
import { prettyPrintError } from "@winglang/sdk/lib/util/enhanced-error";
import chalk from "chalk";
import debug from "debug";
import { glob } from "glob";
import { formatDiagnostics } from "./diagnostics";
import { COLORING } from "../util";

// increase the stack trace limit to 50, useful for debugging Rust panics
// (not setting the limit too high in case of infinite recursion)
Error.stackTraceLimit = 50;

const log = debug("wing:compile");

/**
 * Compile options for the `compile` command.
 * This is passed from Commander to the `compile` function.
 */
export interface CompileOptions {
  /**
   * Target platform
   * @default wingCompiler.BuiltinPlatform.SIM
   */
  readonly platform: string[];
  /**
   * App root id
   *
   * @default "Default"
   */
  readonly rootId?: string;
  /**
   * String with platform-specific values separated by commas
   */
  readonly value?: string;
  /**
   * Path to the file with specific platform values (TOML|YAML|JSON)
   *
   * example of the file's content:
   * root/Default/Domain:
   *   hostedZoneId: Z0111111111111111111F
   *   acmCertificateArn: arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
   */
  readonly values?: string;
  /**
   * The location to save the compilation output
   * @default "./target"
   */
  readonly targetDir?: string;
  /**
   * The overrides the location to save the compilation output
   * @default "./target/<entrypoint>.<target>"
   */
  readonly output?: string;
  /**
   * Whether to run the compiler in `wing test` mode. This may create multiple
   * copies of the application resources in order to run tests in parallel.
   */
  readonly testing?: boolean;
}

/**
 * Compiles a Wing program. Throws an error if compilation fails.
 * @param entrypoint The program .w entrypoint.
 * @param options Compile options.
 * @returns the output directory
 */
export async function compile(entrypoint?: string, options?: CompileOptions): Promise<string> {
  if (!entrypoint) {
    const wingFiles = (await glob("{main,*.main}.{w,ts}")).sort();
    if (wingFiles.length === 0) {
      throw new Error(
        "Cannot find an entrypoint file (main.w, main.ts, *.main.w, *.main.ts) in the current directory."
      );
    }
    if (wingFiles.length > 1) {
      throw new Error(
        `Multiple entrypoints found in the current directory (${wingFiles.join(
          ", "
        )}). Please specify which one to use.`
      );
    }
    entrypoint = wingFiles[0];
  }
  loadEnvVariables({
    modes: options?.testing ? ["test"] : ["compile"],
    cwd: resolve(dirname(entrypoint)),
  });
  const compileOutput = await wingCompiler.compile(entrypoint, {
    ...options,
    log,
    color: COLORING,
    platform: options?.platform ?? ["sim"],
  });
  if (compileOutput.wingcErrors.length > 0) {
    // Print any errors or warnings from the compiler.
    const diagnostics = compileOutput.wingcErrors;
    const formatted = await formatDiagnostics(diagnostics);

    if (compileOutput.wingcErrors.map((e) => e.severity).includes("error")) {
      throw new Error(formatted);
    } else {
      console.error(formatted);
    }
  }

  if (compileOutput.preflightError) {
    const error = compileOutput.preflightError;
    let output = await prettyPrintError(error.causedBy, {
      chalk,
      sourceEntrypoint: resolve(entrypoint ?? "."),
    });

    if (process.env.DEBUG) {
      output +=
        "\n--------------------------------- ORIGINAL STACK TRACE ---------------------------------\n" +
        (error.causedBy.stack ?? "(no stacktrace available)");
    }

    error.causedBy.message = output;

    throw error.causedBy;
  }

  if (compileOutput.outputDir === undefined) {
    // If "outputDir" is undefined, then one or more errors should have been found, so there must be a logical bug.
    throw new Error(
      "Internal compilation error. Please report this as a bug on the Wing issue tracker."
    );
  }

  return compileOutput.outputDir;
}
