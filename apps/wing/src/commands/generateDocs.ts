import { writeFile } from "fs/promises";
import { relative, resolve } from "path";
import * as wingCompiler from "@winglang/compiler";
import chalk from "chalk";
import debug from "debug";
import { formatDiagnostics } from "./diagnostics";

const log = debug("wing:generateDocs");
const color = chalk.supportsColor ? chalk.supportsColor.hasBasic : false;

export async function generateDocs() {
  // TODO: calculate the workDir by looking up for a wing.toml file
  // For now, assume the workDir is the current directory
  const workDir = "."; // TODO: process.cwd()?

  const docs = await wingCompiler.generateWingDocs({
    projectDir: workDir,
    color,
    log,
  });

  if (docs.diagnostics.length > 0) {
    await formatDiagnostics(docs.diagnostics);
  }

  if (docs.diagnostics.some((d) => d.severity === "error")) {
    process.exitCode = 1;
    return;
  }

  const docsFile = resolve(workDir, "API.md");
  await writeFile(docsFile, docs.docsContents);

  console.log(`Docs generated at ${relative(".", docsFile)}.`);
}
