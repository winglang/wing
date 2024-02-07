import { stat } from "node:fs/promises";
import { relative, resolve, sep, join } from "node:path";
import type Chalk from "chalk";
import type StackTracey from "stacktracey";
import { normalPath } from "../shared/misc";

export interface PrettyPrintErrorOptions {
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
  options?: PrettyPrintErrorOptions
): Promise<string> {
  const StackTracey = await import("stacktracey").then((m) => m.default);

  const chalk = options?.chalk;
  const fRed = (s: string) => (chalk ? chalk.red(s) : s);
  const fBold = (s: string) => (chalk ? chalk.bold(s) : s);
  const fDim = (s: string) => (chalk ? chalk.dim(s) : s);

  let st: StackTracey | undefined;
  let originalMessage = "";
  if (typeof error === "string") {
    if (error === "") {
      return "";
    }
    st = new StackTracey(error);
    if (st.items.length > 0) {
      // we have a stack trace! extract the message (everything before a line that starts with "    at")
      const lines = error.split("\n");
      const idx = lines.findIndex((line) => line.startsWith("    at"));
      if (idx !== -1) {
        originalMessage = lines.slice(0, idx).join("\n");
      } else {
        originalMessage = error;
      }
    } else {
      originalMessage = error;
    }

    // stringy errors commonly start with "Error: ", we can just remove it
    originalMessage = originalMessage.replace(/^Error: /, "");
  } else {
    error = rewriteCommonError(error);
    st = new StackTracey(error.stack);
    originalMessage = error.message;
  }

  const message = fBold(fRed("Error: ")) + fRed(originalMessage);

  st = await st
    .clean()
    .filter((item) => !item.native)
    // strip node internals
    .filter((item) => !item.file.startsWith("node:"))
    // strip wingsdk
    .filter(
      (item) =>
        !normalPath(item.file).includes("/libs/wingsdk/src/") &&
        !normalPath(item.file).includes("/@winglang/sdk/")
    )
    // special: remove the handler wrapper (See `cloud.Function` entrypoint for where this comes from)
    .filter((item) => !normalPath(item.file).match(/\.wing\/handler_\w+\.js$/))
    .withSourcesAsync();

  let traceWithSources = st.items;

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

  let output = [];

  // use only the first item with a source
  const firstGoodItem = traceWithSources.find(
    (item) =>
      item.sourceFile !== undefined &&
      item.sourceFile.lines.length > 0 &&
      !item.native &&
      !item.thirdParty
  );

  if (firstGoodItem) {
    const sourceFile = firstGoodItem.sourceFile!;
    const originLines = sourceFile.lines;
    const originLine = firstGoodItem.line ?? 1;
    const originColumn = firstGoodItem.column ?? 1;

    let startLine = Math.max(originLine - 3, 1);
    let finishLine = originLine;
    const maxDigits = finishLine.toString().length;

    // print line and its surrounding lines
    output.push(
      " ".repeat(maxDigits + 1) +
        `--> ${relative(
          process.cwd(),
          sourceFile.path
        )}:${originLine}:${originColumn}`
    );

    let linesOfInterest = originLines;
    if (linesOfInterest.length > 1) {
      linesOfInterest = originLines.slice(startLine - 1, finishLine);
    }
    linesOfInterest.push(" ".repeat(originColumn) + "^");
    linesOfInterest = dedent(linesOfInterest);

    let x = 0;
    for (let i = startLine; i <= finishLine; i++) {
      const interestingLine = i === originLine;
      let lineNumber = interestingLine
        ? `${i} | `
        : " ".repeat(maxDigits) + " | ";

      if (interestingLine) {
        lineNumber = fBold(fRed(lineNumber));
      }

      let lineText = linesOfInterest[x++];
      output.push(lineNumber + lineText);

      if (interestingLine) {
        // last line is the caret
        output.push(" ".repeat(maxDigits) + " |" + fRed(linesOfInterest[x]));
      }
    }
  }

  const outputText = output.length > 0 ? "\n" + output.join("\n") : "";
  const extraStack =
    traceWithSources.length > 0
      ? "\n" + fDim(traceWithSources.map(printItem).join("\n"))
      : "";

  // add the rest of the stack trace from the same file
  return message + outputText + extraStack;
}

function printItem(item: StackTracey.Entry) {
  let calleeShort = `${item.calleeShort} `;

  // These are typically useless
  // TODO These can possibly be removed when sourcemaps support "names" mappings
  if (
    item.calleeShort === "$Root" ||
    item.calleeShort === "new $Root" ||
    item.calleeShort.includes("<anonymous>")
  ) {
    calleeShort = "";
  }

  if (item.callee.match(/\$Closure\d+\.handle$/)) {
    // inflight closures use "handle" as a way to represent calling the inflight itself
    calleeShort = "";
  }

  if (item.fileName.endsWith(".w") && calleeShort.startsWith("async ")) {
    // In userland wing traces, async = inflight and is currently redundant to mention
    calleeShort = calleeShort.replace("async ", "");
  }

  const file = item.file;
  const line = item.line;
  const column = item.column;

  return `at ${calleeShort}${file}:${line}:${column}`;
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

export function dedent(lines: string[]) {
  // first, replace all tabs with 2 spaces
  lines = lines.map((line) => line.replace(/\t/g, "  "));

  // find the smallest indentation
  let minIndent = Infinity;
  for (const line of lines) {
    const match = line.match(/^ */);
    if (match && match[0].length !== line.length) {
      minIndent = Math.min(minIndent, match[0].length);
    }
  }

  // remove the indentation
  return lines.map((line) => line.substring(minIndent));
}
