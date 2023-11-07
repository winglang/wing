import { stat } from "node:fs/promises";
import { relative, resolve, sep, join } from "node:path";
import type Chalk from "chalk";
import type StackTracey from "stacktracey";

export interface EnhancedErrorOptions {
  /**
   * The source entrypoint. If provided, the stack trace will only show source files that are in the same directory or its subdirectories.
   * It will also exclude files in a `target` subdirectory.
   */
  sourceEntrypoint?: string;

  /**
   * "chalk" instance to format output.
   * If provided, ANSI color and format will be used.
   */
  chalk?: typeof Chalk;
}

/**
 * Pretty print an error, rewrites stack traces with sourcemaps, shows line that caused the error, and add general formatting.
 * This function has some special handling for winglang-based errors, but can be used whether winglang is used or not.
 * @param error An error object or a simple error string. If the string contains a stacktrace, it will be rewritten.
 * @param options Display options
 * @returns a pretty printed error, containing ANSI formatting if color is enabled
 */
export async function prettyPrintError(
  error: Error | string,
  options?: EnhancedErrorOptions
): Promise<string> {
  const chalk = options?.chalk;
  const isColor = options?.chalk !== undefined;
  const StackTracey = await import("stacktracey").then((m) => m.default);

  let st: StackTracey | undefined;
  let originalMessage = "";
  if (typeof error === "string") {
    st = new StackTracey(error);
    // assuming the string is a full stacktrace, extract the message from the first line
    originalMessage = error.split("\n")[0] ?? "";
  } else {
    error = rewriteCommonError(error);
    st = new StackTracey(error.stack);
    originalMessage = error.message;
  }
  const message = !isColor
    ? `[ERROR] ${originalMessage}`
    : chalk!.bold.red("[ERROR] ") + chalk!.red(originalMessage);

  st = await st.clean().withSourcesAsync();

  let traceWithSources = st.items.filter((item) => !item.native);

  if (traceWithSources.length === 0) {
    return message;
  }

  let interestingRoot = options?.sourceEntrypoint;
  if (
    interestingRoot !== undefined &&
    (await stat(interestingRoot)
      .then((s) => !s.isDirectory())
      .catch(() => true))
  ) {
    interestingRoot = resolve(interestingRoot, "..");
  }

  if (interestingRoot !== undefined) {
    interestingRoot = interestingRoot + sep;
  }

  if (interestingRoot !== undefined) {
    traceWithSources = traceWithSources.filter((item) =>
      (item.sourceFile?.path ?? item.file).startsWith(interestingRoot!)
    );
    const targetDir = join(interestingRoot, "target") + sep;
    traceWithSources = traceWithSources.filter(
      (item) => !(item.sourceFile?.path ?? item.file).startsWith(targetDir)
    );
  }

  const getRelativePath = (path: string) => {
    return relative(process.cwd(), path);
  };

  let output = [];

  // use only the first item with a source
  const firstGoodItem = traceWithSources.find(
    (item) => item.sourceFile && !item.native && !item.thirdParty
  );

  if (firstGoodItem) {
    const sourceFile = firstGoodItem.sourceFile!;
    const originLines = sourceFile.lines;
    const originLine = firstGoodItem.line ?? 0;
    const originColumn = firstGoodItem.column ?? 0;

    let startLine = Math.max(originLine - 3, 0);
    let finishLine = originLine;

    // print line and its surrounding lines
    output.push(
      `${getRelativePath(sourceFile.path)}:${originLine}:${originColumn}`
    );

    const linesOfInterest = dedent([
      ...originLines.slice(startLine, finishLine),
      " ".repeat(originColumn) + "^",
    ]);

    const maxDigits = finishLine.toString().length;

    let x = 0;
    for (let i = startLine + 1; i <= finishLine; i++) {
      const interestingLine = i === originLine;
      const lineNumberBasic = `${i}`.padStart(maxDigits, " ") + "| ";
      let lineNumber = lineNumberBasic;
      if (isColor) {
        if (interestingLine) {
          lineNumber = chalk!.bold.red(lineNumberBasic);
        } else {
          lineNumber = chalk!.dim(lineNumberBasic);
        }
      }
      let lineText = linesOfInterest[x++];
      output.push(lineNumber + lineText);

      if (interestingLine) {
        // last line is the caret
        output.push(
          " ".repeat(lineNumberBasic.length - 1) +
            (isColor ? chalk!.red(linesOfInterest[x]) : linesOfInterest[x])
        );
      }
    }
  }

  const printItem = (item: StackTracey.Entry) => {
    let calleeShort = `${item.calleeShort} `;

    // These are typically useless
    // TODO These can possibly be removed when sourcemaps support "names" mappings
    if (
      item.calleeShort === "new $Root" ||
      item.calleeShort.includes("<anonymous>")
    ) {
      calleeShort = "";
    }

    const file = item.file;
    const line = item.line;
    const column = item.column;
    return `at ${calleeShort}(${file}:${line}:${column})`;
  };

  const outputText = output.length > 0 ? "\n" + output.join("\n") : "";
  const extraStack =
    traceWithSources.length > 0
      ? "\n" +
        (isColor
          ? chalk!.dim(traceWithSources.map(printItem).join("\n"))
          : traceWithSources.map(printItem).join("\n"))
      : "";

  // add the rest of the stack trace from the same file
  return message + outputText + extraStack;
}

export function rewriteCommonError(error: Error): Error {
  if (error.message.startsWith("There is already a Construct with name")) {
    const newMessage = [];
    newMessage.push(error.message);
    newMessage.push(
      "hint: Every preflight object needs a unique identifier within its scope. You can assign one as shown:"
    );
    newMessage.push('> new cloud.Bucket() as "MyBucket";');
    newMessage.push(
      "For more information, see https://www.winglang.io/docs/concepts/application-tree"
    );
    error.message = newMessage.join("\n\n");
  } else if (error.constructor.name === "NotImplementedError") {
    error.name = "NotImplementedError";
  }

  return error;
}

function dedent(lines: string[]) {
  // first, replace all tabs with 2 spaces
  lines = lines.map((line) => line.replace(/\t/g, "  "));

  // find the smallest indentation
  let minIndent = Infinity;
  for (const line of lines) {
    const match = line.match(/^ */);
    if (match) {
      minIndent = Math.min(minIndent, match[0].length);
    }
  }

  // remove the indentation
  return lines.map((line) => line.substring(minIndent));
}
