import fs from "node:fs";
import { access } from "node:fs/promises";
import * as os from "node:os";
import path from "node:path";

import { ConsoleLogger } from "../consoleLogger.js";

import { compile } from "./compile.js";

// Chokidar is a CJS-only module and doesn't play well with ESM imports.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const chokidar = require("chokidar");

export interface CreateCompileRunnerProps {
  wingSrcFile: string;
  onLoading: (loading: boolean) => void;
  onError: (error: unknown) => void;
  onSuccess: (simFileName: string) => void;
  consoleLogger: ConsoleLogger;
}
export const runCompile = ({
  wingSrcFile,
  onLoading,
  onError,
  onSuccess,
  consoleLogger,
}: CreateCompileRunnerProps) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "wing-app-target-dir-"));
  const fileName = path.basename(wingSrcFile, ".w");
  const compiledSimFile = path.join(tmpDir, fileName + ".wsim");
  consoleLogger.log(`compiling ${wingSrcFile} into ${tmpDir}`);

  const runCompile = async () => {
    try {
      onLoading(true);
      const status = await compile({
        wingSrcFile,
        outDir: tmpDir,
        consoleLogger,
      });
      if (status === "error") {
        onError("compilation failed");
      } else {
        try {
          await access(compiledSimFile);
        } catch (error) {
          consoleLogger.error(
            `file ${compiledSimFile} doesn't exist ${
              typeof error === "string" ? error : JSON.stringify(error)
            }`,
          );
          onError("compilation failed");
          return;
        }
        onSuccess(compiledSimFile);
      }
    } catch (error) {
      consoleLogger.log(
        `failed to recompile Wing application. wFile: ${wingSrcFile}, outDir: ${tmpDir}\n ${
          typeof error === "string" ? error : JSON.stringify(error)
        }`,
      );
      onError("compilation failed");
    }
  };

  void runCompile();

  const wingSrcDir = path.dirname(wingSrcFile);

  // start watching wing src file directory and compile on change
  chokidar
    .watch(wingSrcDir, {
      ignored: /(^|[/\\])\../,
      persistent: true,
    })
    .on("change", () => {
      consoleLogger.log(
        `Wing application src directory content has been changed`,
      );
      void runCompile();
    })
    .on("unlink", async () => {
      consoleLogger.error(
        `Wing application src directory has been deleted ${wingSrcDir}`,
      );
      onError("Wing application src directory has been deleted");
      // todo [sa] what should we do here?
    });
};
