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
    `exec child process: wing compile ${wingSrcFile} -t sim -o ${outDir}`,
    "compiler",
  );
  try {
    fixPath();
    const { stdout, stderr } = await util.promisify(exec)(
      `wing compile ${wingSrcFile} -t sim -o ${outDir}`,
    );
    if (stdout) {
      consoleLogger.verbose(stdout, "compiler");
    }
    if (stderr) {
      consoleLogger.error(stderr, "compiler");
      return "error";
    }
    consoleLogger.verbose(`Compilation succeeded`, "compiler");
    return "success";
  } catch (error) {
    consoleLogger.error(error, "compiler");
    return "error";
  }
};
