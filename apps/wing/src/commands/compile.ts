import { promises as fsPromise } from "fs";
import { relative } from "path";

import chalk from "chalk";
import debug from "debug";
import { CHARS_ASCII, emitDiagnostic, File, Label } from "codespan-wasm";
import * as wingCompiler from "@winglang/compiler";

// increase the stack trace limit to 50, useful for debugging Rust panics
// (not setting the limit too high in case of infinite recursion)
Error.stackTraceLimit = 50;

const log = debug("wing:compile");

/**
 * Compile options for the `compile` command.
 * This is passed from Commander to the `compile` function.
 */
export interface CompileOptions {
  readonly target: wingCompiler.Target;
  readonly plugins?: string[];
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
export async function compile(entrypoint: string, options: CompileOptions): Promise<string> {
  try {
    return await wingCompiler.compile(entrypoint, {
      ...options,
      log,
    });
  } catch (error) {
    if (error instanceof wingCompiler.InternalError) {
      const message = [];
      message.push(error.causedBy);
      message.push();
      message.push();
      message.push(
        chalk.bold.red("Internal error:") +
          " An internal compiler error occurred. Please report this bug by creating an issue on GitHub (github.com/winglang/wing/issues) with your code and this trace."
      );

      throw new Error(message.join("\n"));
    } else if (error instanceof wingCompiler.CompileError) {
      // This is a bug in the user's code. Print the compiler diagnostics.
      const errors = error.diagnostics;
      const result = [];
      const coloring = chalk.supportsColor ? chalk.supportsColor.hasBasic : false;

      for (const error of errors) {
        const { message, span } = error;
        let files: File[] = [];
        let labels: Label[] = [];

        // file_id might be "" if the span is synthetic (see #2521)
        if (span !== null && span.file_id) {
          // `span` should only be null if source file couldn't be read etc.
          const source = await fsPromise.readFile(span.file_id, "utf8");
          const start = offsetFromLineAndColumn(source, span.start.line, span.start.col);
          const end = offsetFromLineAndColumn(source, span.end.line, span.end.col);
          files.push({ name: span.file_id, source });
          labels.push({
            fileId: span.file_id,
            rangeStart: start,
            rangeEnd: end,
            message,
            style: "primary",
          });
        }

        const diagnosticText = await emitDiagnostic(
          files,
          {
            message,
            severity: "error",
            labels,
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
      const causedBy = annotatePreflightError(error.causedBy);

      const output = new Array<string>();

      output.push(chalk.red(`ERROR: ${causedBy.message}`));

      if (causedBy.stack && causedBy.stack.includes("evalmachine.<anonymous>:")) {
        const lineNumber =
          Number.parseInt(causedBy.stack.split("evalmachine.<anonymous>:")[1].split(":")[0]) - 1;
        const relativeArtifactPath = relative(process.cwd(), error.artifactPath);
        log("relative artifact path: %s", relativeArtifactPath);

        output.push("");
        output.push(chalk.underline(chalk.dim(`${relativeArtifactPath}:${lineNumber}`)));

        const lines = error.artifact.split("\n");
        let startLine = Math.max(lineNumber - 2, 0);
        let finishLine = Math.min(lineNumber + 2, lines.length - 1);

        // print line and its surrounding lines
        for (let i = startLine; i <= finishLine; i++) {
          if (i === lineNumber) {
            output.push(chalk.bold.red(">> ") + chalk.red(lines[i]));
          } else {
            output.push("   " + chalk.dim(lines[i]));
          }
        }

        output.push("");
      }

      if (process.env.DEBUG) {
        output.push(
          "--------------------------------- STACK TRACE ---------------------------------"
        );
        output.push(error.stack ?? "");
      }

      throw new Error(output.join("\n"));
    } else {
      throw error;
    }
  }
}

function annotatePreflightError(error: Error): Error {
  if (error.message.startsWith("There is already a Construct with name")) {
    const newMessage = [];
    newMessage.push(error.message);
    newMessage.push(
      "hint: Every preflight object needs a unique identifier within its scope. You can assign one as shown:"
    );
    newMessage.push('> new cloud.Bucket() as "MyBucket";');
    newMessage.push("For more information, see https://docs.winglang.io/concepts/resources");

    const newError = new Error(newMessage.join("\n\n"), { cause: error });
    newError.stack = error.stack;
    return newError;
  }

  return error;
}

function offsetFromLineAndColumn(source: string, line: number, column: number) {
  const lines = source.split("\n");
  let offset = 0;
  for (let i = 0; i < line; i++) {
    offset += lines[i].length + 1;
  }
  offset += column;
  return offset;
}
