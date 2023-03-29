import { access } from "node:fs/promises";
import path from "node:path";

import { FSWatcher } from "chokidar";

import { ConsoleLogger } from "../consoleLogger.js";
import { State } from "../types.js";

import { compile } from "./compile.js";
import type { LogInterface } from "./LogInterface.js";

// Chokidar is a CJS-only module and doesn't play well with ESM imports.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const chokidar = require("chokidar");

export interface CreateCompileRunnerProps {
  wingSrcFile: string;
  onCompilerStatusChange: (state: State, data?: unknown) => void;
  consoleLogger: ConsoleLogger;
  log: LogInterface;
}
export const runCompile = async ({
  wingSrcFile,
  onCompilerStatusChange,
  consoleLogger,
  log,
}: CreateCompileRunnerProps): Promise<FSWatcher> => {
  const fileName = path.basename(wingSrcFile, ".w");
  const compiledWSimDir = path.join(
    path.dirname(wingSrcFile),
    "target",
    `${fileName}.wsim`,
  );
  log.info(`compiling ${wingSrcFile} into ${compiledWSimDir}`, "compiler");

  const runCompile = async () => {
    try {
      onCompilerStatusChange("loading");
      const status = await compile({
        wingSrcFile,
        consoleLogger,
        log,
      });
      if (status === "error") {
        onCompilerStatusChange("error", "Compilation failed");
      } else {
        try {
          await access(compiledWSimDir);
          onCompilerStatusChange("success", compiledWSimDir);
        } catch (error) {
          consoleLogger.error(
            `directory ${compiledWSimDir} doesn't exist ${
              typeof error === "string" ? error : JSON.stringify(error)
            }`,
            "compiler",
          );
          onCompilerStatusChange("error", "Compilation failed");
          return;
        }
      }
    } catch (error) {
      consoleLogger.error(
        `failed to recompile Wing application. wFile: ${wingSrcFile}\n ${
          typeof error === "string" ? error : JSON.stringify(error)
        }`,
        "compiler",
      );
      onCompilerStatusChange("error", "Compilation failed");
    }
  };

  await runCompile();

  const wingSrcDir = path.dirname(wingSrcFile);

  // start watching wing src file directory and compile on change
  return chokidar
    .watch(wingSrcDir, {
      ignored: /(^|[/\\])\../,
      depth: 0,
      persistent: true,
    })
    .on("change", async () => {
      log.info(
        `Wing application src directory content has been changed`,
        "compiler",
      );
      await runCompile();
    })
    .on("unlink", async (path: string) => {
      if (path === wingSrcFile) {
        consoleLogger.error(
          `Wing application src file has been deleted ${wingSrcFile}`,
          "compiler",
        );
        onCompilerStatusChange(
          "error",
          "Wing application src file has been deleted",
        );
        return;
      }
    });
};
