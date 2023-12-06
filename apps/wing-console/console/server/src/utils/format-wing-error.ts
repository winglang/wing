import { readFile } from "node:fs/promises";
import { relative, resolve } from "node:path";

import { CompileError, PreflightError } from "@winglang/compiler";
import { prettyPrintError } from "@winglang/sdk/lib/util/enhanced-error";
import { CHARS_ASCII, emitDiagnostic, File, Label } from "codespan-wasm";

function offsetFromLineAndColumn(source: string, line: number, column: number) {
  const lines = source.split("\n");
  let offset = 0;
  for (let index = 0; index < line; index++) {
    offset += lines[index]!.length + 1;
  }
  offset += column;
  return offset;
}

export const formatWingError = async (error: unknown, entryPoint?: string) => {
  try {
    if (error instanceof CompileError) {
      // This is a bug in the user's code. Print the compiler diagnostics.
      const errors = error.diagnostics;
      const result = [];

      for (const error of errors) {
        const { message, span, annotations, hints } = error;
        const files: File[] = [];
        const labels: Label[] = [];
        const cwd = process.cwd();

        // file_id might be "" if the span is synthetic (see #2521)
        if (span !== null && span !== undefined && span.file_id) {
          // `span` should only be null if source file couldn't be read etc.
          const source = await readFile(span.file_id, "utf8");
          const start = offsetFromLineAndColumn(
            source,
            span.start.line,
            span.start.col,
          );
          const end = offsetFromLineAndColumn(
            source,
            span.end.line,
            span.end.col,
          );
          const filePath = relative(cwd, span.file_id);
          files.push({ name: filePath, source });
          labels.push({
            fileId: filePath,
            rangeStart: start,
            rangeEnd: end,
            message,
            style: "primary",
          });
        }

        for (const annotation of annotations) {
          const source = await readFile(annotation.span.file_id, "utf8");
          const start = offsetFromLineAndColumn(
            source,
            annotation.span.start.line,
            annotation.span.start.col,
          );
          const end = offsetFromLineAndColumn(
            source,
            annotation.span.end.line,
            annotation.span.end.col,
          );
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
          false,
        );
        result.push(diagnosticText);
      }
      return result.join("\n");
    } else if (error instanceof PreflightError) {
      const output = new Array<string>();

      output.push(
        await prettyPrintError(error.causedBy, {
          sourceEntrypoint: resolve(entryPoint ?? "."),
        }),
      );

      if (process.env.DEBUG) {
        output.push(
          "--------------------------------- ORIGINAL STACK TRACE ---------------------------------",
          error.stack ?? "(no stacktrace available)",
        );
      }

      return output.join("\n");
    }
    if (error instanceof Error) {
      const message: string[] = [];
      message.push(
        `${error.message}`,
        "",
        "",
        "Internal error:" +
          " An internal compiler error occurred. Please report this bug by creating an issue on GitHub (github.com/winglang/wing/issues) with your code and this trace.",
      );
      return message.join("\n");
    }
    return `Unknown error: ${error}`;
  } catch (error) {
    return `Unexpected error: ${error}`;
  }
};
