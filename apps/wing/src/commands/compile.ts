import { promises as fsPromise } from "fs";
import { relative } from "path";

import chalk from "chalk";
import debug from "debug";
import {
  Annotation,
  FormatOptions,
  Slice,
  SourceAnnotation,
  annotateSnippet,
} from "annotate-snippets";
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
  readonly rootId?: string;
  /**
   * Whether to run the compiler in `wing test` mode. This may create multiple
   * copies of the application resources in order to run tests in parallel.
   */
  readonly testing?: boolean;
  /**
   * The location to save the compilation output
   * @default "./target"
   */
  readonly targetDir?: string;
}

/**
 * Compiles a Wing program. Throws an error if compilation fails.
 * @param entrypoint The program .w entrypoint.
 * @param options Compile options.
 * @returns the output directory
 */
export async function compile(entrypoint: string, options: CompileOptions): Promise<string> {
  const coloring = chalk.supportsColor ? chalk.supportsColor.hasBasic : false;
  try {
    return await wingCompiler.compile(entrypoint, {
      ...options,
      log,
      color: coloring,
      targetDir: options.targetDir,
    });
  } catch (error) {
    if (error instanceof wingCompiler.CompileError) {
      // This is a bug in the user's code. Print the compiler diagnostics.
      const errors = error.diagnostics;
      const result = [];

      for (const error of errors) {
        const { message, span, annotations } = error;

        // file_id might be "" if the span is synthetic (see #2521)
        const slices: Slice[] = [];
        if (span?.file_id) {
          // `span` should only be null if source file couldn't be read etc.
          const source = await fsPromise.readFile(span.file_id, "utf8");
          const minLine = Math.min(span.start.line, ...annotations.map((a) => a.span.start.line));
          const maxLine = Math.max(span.end.line, ...annotations.map((a) => a.span.end.line));
          const sourceFragment = sliceByLines(source, minLine, maxLine);
          const start = byteOffsetFromLineAndColumn(
            sourceFragment,
            span.start.line - minLine,
            span.start.col
          );
          let end = byteOffsetFromLineAndColumn(
            sourceFragment,
            span.end.line - minLine,
            span.end.col
          );
          if (end === start) {
            // avoid zero-length slices
            end += 1;
          }

          const sourceAnnotations: SourceAnnotation[] = [];
          sourceAnnotations.push({
            annotationType: "error",
            label: message,
            range: [start, end],
          });
          for (const annotation of annotations) {
            const start = byteOffsetFromLineAndColumn(
              sourceFragment,
              annotation.span.start.line - minLine,
              annotation.span.start.col
            );
            const end = byteOffsetFromLineAndColumn(
              sourceFragment,
              annotation.span.end.line - minLine,
              annotation.span.end.col
            );
            sourceAnnotations.push({
              annotationType: annotation.kind, // TODO: is this lowercase?
              label: annotation.message,
              range: [start, end],
            });
          }
          slices.push({
            annotations: sourceAnnotations,
            fold: true,
            lineStart: minLine + 1,
            source: sourceFragment,
            origin: span.file_id,
          });
        }

        const title: Annotation = {
          annotationType: "error",
          label: message,
        };
        const footer: Annotation[] = [];
        const options: FormatOptions = {
          anonymizedLineNumbers: false,
          color: true,
        };

        const diagnosticText = annotateSnippet(title, footer, slices, options);
        result.push(diagnosticText + "\n");
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
        output.push(causedBy.stack ?? "");
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
    newMessage.push(
      "For more information, see https://www.winglang.io/docs/language-guide/language-reference#33-preflight-classes"
    );

    const newError = new Error(newMessage.join("\n\n"), { cause: error });
    newError.stack = error.stack;
    return newError;
  }

  return error;
}

function sliceByLines(source: string, startLine: number, endLine: number) {
  const lines = source.split("\n");
  let startOffset = 0;
  for (let i = 0; i < startLine; i++) {
    startOffset += lines[i].length + 1;
  }
  let endOffset = startOffset;
  for (let i = startLine; i <= endLine; i++) {
    endOffset += lines[i].length + 1;
  }
  return source.substring(startOffset, endOffset);
}

function byteOffsetFromLineAndColumn(source: string, line: number, column: number) {
  const lines = source.split("\n");
  let offset = 0;
  for (let i = 0; i < line; i++) {
    offset += lines[i].length + 1;
  }

  // Convert char offset to byte offset
  const encoder = new TextEncoder();
  const srouce_bytes = encoder.encode(source.substring(0, offset));
  return srouce_bytes.length + column;
}
