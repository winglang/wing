import fs from "node:fs";
import { access } from "node:fs/promises";
import * as os from "node:os";
import path from "node:path";

import { FSWatcher } from "chokidar";
import log from "electron-log";

import { ConsoleLogger } from "../consoleLogger.js";
import { State } from "../types.js";

import { compile } from "./compile.js";

// Chokidar is a CJS-only module and doesn't play well with ESM imports.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const chokidar = require("chokidar");

export interface CreateCompileRunnerProps {
  wingSrcFile: string;
  onCompilerStatusChange: (state: State, data?: unknown) => void;
  consoleLogger: ConsoleLogger;
}
export const runCompile = async ({
  wingSrcFile,
  onCompilerStatusChange,
  consoleLogger,
}: CreateCompileRunnerProps): Promise<FSWatcher> => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "wing-app-target-dir-"));
  const fileName = path.basename(wingSrcFile, ".w");
  const compiledSimFile = path.join(tmpDir, fileName + ".wsim");
  log.info(`compiling ${wingSrcFile} into ${tmpDir}`, "compiler");

  const runCompile = async () => {
    try {
      onCompilerStatusChange("loading");
      const status = await compile({
        wingSrcFile,
        outDir: tmpDir,
        consoleLogger,
      });
      if (status === "error") {
        onCompilerStatusChange("error", "Compilation failed");
      } else {
        try {
          await access(compiledSimFile);
          onCompilerStatusChange("success", compiledSimFile);
        } catch (error) {
          consoleLogger.error(
            `file ${compiledSimFile} doesn't exist ${
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
        `failed to recompile Wing application. wFile: ${wingSrcFile}, outDir: ${tmpDir}\n ${
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
      persistent: true,
    })
    .on("change", async () => {
      log.info(
        `Wing application src directory content has been changed`,
        "compiler",
      );
      await runCompile();
    })
    .on("unlink", async () => {
      consoleLogger.error(
        `Wing application src directory has been deleted ${wingSrcDir}`,
        "compiler",
      );
      onCompilerStatusChange(
        "error",
        "Wing application src directory has been deleted",
      );
      // todo [sa] what should we do here?
    });
};
