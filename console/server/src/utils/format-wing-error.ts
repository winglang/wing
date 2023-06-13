import { readFile } from "node:fs/promises";
import { relative } from "node:path";

import {
  CompileError,
  InternalError,
  PreflightError,
} from "@winglang/compiler";
import { CHARS_ASCII, emitDiagnostic, File, Label } from "codespan-wasm";

function annotatePreflightError(error: Error): Error {
  if (error.message.startsWith("There is already a Construct with name")) {
    const newMessage = [];
    newMessage.push(
      error.message,
      "hint: Every preflight object needs a unique identifier within its scope. You can assign one as shown:",
      '> new cloud.Bucket() as "MyBucket";',
      "For more information, see https://docs.winglang.io/concepts/resources",
    );

    // eslint-disable-next-line unicorn/error-message
    const newError = new Error(newMessage.join("\n\n"), { cause: error });
    newError.stack = error.stack;
    return newError;
  }

  return error;
}

function offsetFromLineAndColumn(source: string, line: number, column: number) {
  const lines = source.split("\n");
  let offset = 0;
  for (let index = 0; index < line; index++) {
    offset += lines[index]!.length + 1;
  }
  offset += column;
  return offset;
}

export const formatWingError = async (error: unknown) => {
  try {
    if (error instanceof InternalError) {
      const message: string[] = [];
      message.push(
        `${error.causedBy}`,
        "",
        "",
        "Internal error:" +
          " An internal compiler error occurred. Please report this bug by creating an issue on GitHub (github.com/winglang/wing/issues) with your code and this trace.",
      );
      return message.join("\n");
    }
    if (error instanceof CompileError) {
      console.log(error.diagnostics);
      // This is a bug in the user's code. Print the compiler diagnostics.
      const errors = error.diagnostics;
      const result = [];

      for (const error of errors) {
        const { message, span } = error;
        let files: File[] = [];
        let labels: Label[] = [];

        // file_id might be "" if the span is synthetic (see #2521)
        if (span !== null && span.file_id) {
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
          files.push({ name: span.file_id, source });
          labels.push({
            fileId: span.file_id,
            rangeStart: start,
            rangeEnd: end,
            message,
            style: "primary",
          });
        }

        console.log("pre diagnostic");
        const diagnosticText = emitDiagnostic(
          files,
          {
            message,
            severity: "error",
            labels,
          },
          {
            chars: CHARS_ASCII,
          },
          false,
        );
        result.push(diagnosticText);
      }
      return result.join("\n");
    }
    if (error instanceof PreflightError) {
      const causedBy = annotatePreflightError(error.causedBy);

      const output = new Array<string>();

      output.push(`ERROR: ${causedBy.message}`);

      if (
        causedBy.stack &&
        causedBy.stack.includes("evalmachine.<anonymous>:")
      ) {
        const lineNumber =
          Number.parseInt(
            causedBy.stack.split("evalmachine.<anonymous>:")[1]!.split(":")[0]!,
          ) - 1;
        const relativeArtifactPath = relative(
          process.cwd(),
          error.artifactPath,
        );

        output.push("", `${relativeArtifactPath}:${lineNumber}`);

        const lines = error.artifact.split("\n");
        let startLine = Math.max(lineNumber - 2, 0);
        let finishLine = Math.min(lineNumber + 2, lines.length - 1);

        // print line and its surrounding lines
        for (let index = startLine; index <= finishLine; index++) {
          if (index === lineNumber) {
            output.push(">> " + lines[index]);
          } else {
            output.push("   " + lines[index]);
          }
        }

        output.push("");
      }

      if (process.env.DEBUG) {
        output.push(
          "--------------------------------- STACK TRACE ---------------------------------",
          error.stack ?? "",
        );
      }

      return output.join("\n");
    }
    if (error instanceof Error) {
      return error.message;
    }
    return `Unknown error: ${error}`;
  } catch (error) {
    return `Unexpected error: ${error}`;
  }
};
