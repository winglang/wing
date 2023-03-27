import { exec } from "node:child_process";
import util from "node:util";

import { ConsoleLogger } from "../consoleLogger.js";

import { LogInterface } from "./LogInterface.js";

export type CompileStatusTypes = "success" | "error" | "compiling";

export interface ICompileOptions {
  wingSrcFile: string;
  consoleLogger: ConsoleLogger;
  log: LogInterface;
}

export const compile = async ({
  wingSrcFile,
  consoleLogger,
  log,
}: ICompileOptions): Promise<CompileStatusTypes> => {
  log.info(
    `exec child process: wing compile ${wingSrcFile} -t sim`,
    "compiler",
  );
  try {
    // fixPath();
    const { stdout, stderr } = await util.promisify(exec)(
      `wing compile ${wingSrcFile} -t sim`,
    );
    if (stdout) {
      log.info(stdout, "compiler");
    }
    if (stderr) {
      consoleLogger.error(stderr, "compiler");
    }
    log.info(`Compilation succeeded`, "compiler");
    return "success";
  } catch (error) {
    consoleLogger.error(error, "compiler");
    return "error";
  }
};
