import { promises as fsPromise } from "fs";
import { dirname, relative, resolve } from "path";

import * as wingCompiler from "@winglang/compiler";
import { prettyPrintError } from "@winglang/sdk/lib/util/enhanced-error";
import chalk from "chalk";
import { CHARS_ASCII, emitDiagnostic, File, Label } from "codespan-wasm";
import debug from "debug";
import { glob } from "glob";
import { loadEnvVariables } from "../env";

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
  loadEnvVariables({ cwd: resolve(dirname(entrypoint)) });
  const coloring = chalk.supportsColor ? chalk.supportsColor.hasBasic : false;
  try {
    return await wingCompiler.compile(entrypoint, {
      ...options,
      log,
      color: coloring,
      platform: options?.platform ?? ["sim"],
    });
  } catch (error) {
    if (error instanceof wingCompiler.CompileError) {
      // This is a bug in the user's code. Print the compiler diagnostics.
      const diagnostics = error.diagnostics;
      const cwd = process.cwd();
      const result = [];

      for (const diagnostic of diagnostics) {
        const { message, span, annotations, hints } = diagnostic;
        const files: File[] = [];
        const labels: Label[] = [];

        // file_id might be "" if the span is synthetic (see #2521)
        if (span?.file_id) {
          // `span` should only be null if source file couldn't be read etc.
          const source = await fsPromise.readFile(span.file_id, "utf8");
          const start = span.start_offset;
          const end = span.end_offset;
          const filePath = relative(cwd, span.file_id);
          files.push({ name: filePath, source });
          labels.push({
            fileId: filePath,
            rangeStart: start,
            rangeEnd: end,
            message: "",
            style: "primary",
          });
        }

        for (const annotation of annotations) {
          // file_id might be "" if the span is synthetic (see #2521)
          if (!annotation.span?.file_id) {
            continue;
          }
          const source = await fsPromise.readFile(annotation.span.file_id, "utf8");
          const start = annotation.span.start_offset;
          const end = annotation.span.end_offset;
          const filePath = relative(cwd, annotation.span.file_id);
          files.push({ name: filePath, source });
          labels.push({
            fileId: filePath,
            rangeStart: start,
            rangeEnd: end,
            message: annotation.message,
            style: "secondary",
          });
        }

        const diagnosticText = emitDiagnostic(
          files,
          {
            message,
            severity: "error",
            labels,
            notes: hints.map((hint) => `hint: ${hint}`),
          },
          {
            chars: CHARS_ASCII,
          },
          coloring
        );
        result.push(diagnosticText);
      }
      throw new Error(result.join("\n"));
    } else if (error instanceof wingCompiler.PreflightError) {
      let output = await prettyPrintError(error.causedBy, {
        chalk,
        sourceEntrypoint: resolve(entrypoint ?? "."),
      });
      if (process.env.WING_ERROR_TEST) {
        console.error(`output >>>${output}<<<`);
      }

      if (process.env.DEBUG) {
        output +=
          "\n--------------------------------- ORIGINAL STACK TRACE ---------------------------------\n" +
          (error.causedBy.stack ?? "(no stacktrace available)");
      }

      error.causedBy.message = output;

      throw error.causedBy;
    } else {
      throw error;
    }
  }
}
