import { existsSync, statSync } from "fs";
import { readFile } from "fs/promises";
import { relative } from "path";
import { WingDiagnostic } from "@winglang/compiler";
import { Label, File, emitDiagnostic, CHARS_ASCII } from "codespan-wasm";
import { COLORING } from "../util";

export async function formatDiagnostics(diagnostics: WingDiagnostic[]): Promise<string> {
  const cwd = process.cwd();
  const result = [];

  for (const diagnostic of diagnostics) {
    const { message, span, annotations, hints, severity } = diagnostic;
    const files: File[] = [];
    const labels: Label[] = [];

    // file_id might be "" if the span is synthetic (see #2521)
    if (span?.file_id && existsSync(span.file_id) && statSync(span.file_id).isFile()) {
      // `span` should only be null if source file couldn't be read etc.
      const source = await readFile(span.file_id, "utf8");
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
      if (
        !annotation.span?.file_id ||
        !existsSync(annotation.span.file_id) ||
        !statSync(annotation.span.file_id).isFile()
      ) {
        continue;
      }
      const source = await readFile(annotation.span.file_id, "utf8");
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
        severity,
        labels,
        notes: hints.map((hint) => `hint: ${hint}`),
      },
      {
        chars: CHARS_ASCII,
      },
      COLORING
    );
    result.push(diagnosticText);
  }

  return result.join("\n").trimEnd();
}
