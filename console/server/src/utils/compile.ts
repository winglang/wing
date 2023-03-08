import { exec } from "node:child_process";
import util from "node:util";

import { ConsoleLogger } from "../consoleLogger.js";

import { LogInterface } from "./LogInterface.js";

export type CompileStatusTypes = "success" | "error" | "compiling";

export interface ICompileOptions {
  outDir: string;
  wingSrcFile: string;
  consoleLogger: ConsoleLogger;
  log: LogInterface;
}

export const compile = async ({
  wingSrcFile,
  consoleLogger,
  outDir,
  log,
}: ICompileOptions): Promise<CompileStatusTypes> => {
  log.info(
    `exec child process: wing compile ${wingSrcFile} -t sim -o ${outDir}`,
    "compiler",
  );
  try {
    // fixPath();
    const { stdout, stderr } = await util.promisify(exec)(
      `wing compile ${wingSrcFile} -t sim -o ${outDir}`,
    );
    if (stdout) {
      log.info(stdout, "compiler");
    }
    if (stderr) {
      consoleLogger.error(stderr, "compiler");
      return "error";
    }
    log.info(`Compilation succeeded`, "compiler");
    return "success";
  } catch (error) {
    consoleLogger.error(error, "compiler");
    return "error";
  }
};
