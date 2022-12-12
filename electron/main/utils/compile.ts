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
  consoleLogger.log(
    `exec child process for compiling ${wingSrcFile} into ${outDir}`,
  );
  try {
    fixPath();
    const { stdout, stderr } = await util.promisify(exec)(
      `wing compile ${wingSrcFile} -t sim -o ${outDir}`,
    );
    if (stdout) {
      consoleLogger.log(`Compiler info: ${stdout}`);
    }
    if (stderr) {
      consoleLogger.error(
        `compilation failed for ${wingSrcFile} into ${outDir}\n ${
          typeof stderr === "string" ? stderr : JSON.stringify(stderr)
        }`,
      );
      return "error";
    }
    consoleLogger.log(
      `compilation succeeded for ${wingSrcFile} into ${outDir}`,
    );
    return "success";
  } catch (error) {
    consoleLogger.error(
      `compilation failed for ${wingSrcFile} into ${outDir}\n: ${
        typeof error === "string" ? error : JSON.stringify(error)
      }`,
    );
    return "error";
  }
};
