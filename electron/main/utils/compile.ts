import { exec } from "node:child_process";
import util from "node:util";

import fixPath from "fix-path";

import { ConsoleLogger } from "../consoleLogger.js";

export type CompileStatusTypes = "success" | "error" | "compiling";

export interface ICompileOptions {
  outDir: string;
  wingSrcFile: string;
  consoleLogger: ConsoleLogger;
}

export const compile = async ({
  wingSrcFile,
  consoleLogger,
  outDir,
}: ICompileOptions): Promise<CompileStatusTypes> => {
  consoleLogger.verbose(
    `exec child process for compiling ${wingSrcFile} into ${outDir}`,
    "compiler",
  );
  try {
    fixPath();
    const { stdout, stderr } = await util.promisify(exec)(
      `wing compile ${wingSrcFile} -t sim -o ${outDir}`,
    );
    if (stdout) {
      consoleLogger.verbose(`Compiler info: ${stdout}`, "compiler");
    }
    if (stderr) {
      consoleLogger.error(
        `Compilation failed for ${wingSrcFile} into ${outDir}\n ${
          typeof stderr === "string" ? stderr : JSON.stringify(stderr)
        }`,
        "compiler",
      );
      return "error";
    }
    consoleLogger.verbose(
      `Compilation succeeded for ${wingSrcFile} into ${outDir}`,
      "compiler",
    );
    return "success";
  } catch (error) {
    consoleLogger.error(
      `Compilation failed for ${wingSrcFile} into ${outDir}\n: ${
        typeof error === "string" ? error : JSON.stringify(error)
      }`,
      "compiler",
    );
    return "error";
  }
};
