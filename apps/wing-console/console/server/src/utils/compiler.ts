import path from "node:path";

import * as wing from "@winglang/compiler";
import { loadEnvVariables } from "@winglang/sdk/lib/helpers";
import chokidar from "chokidar";
import Emittery from "emittery";

import { formatWingError } from "./format-wing-error.js";

export interface CompilerEvents {
  compiling: undefined;
  compiled: { simfile: string };
  error: Error;
}

export interface Compiler {
  start(): Promise<void>;
  stop(): Promise<void>;
  on<T extends keyof CompilerEvents>(
    event: T,
    listener: (event: CompilerEvents[T]) => void | Promise<void>,
  ): void;
  getSimfile(): Promise<string>;
}

export interface CreateCompilerProps {
  wingfile: string;
  platform?: string[];
  testing?: boolean;
  stateDir?: string;
  watchGlobs?: string[];
}

export const createCompiler = ({
  wingfile,
  platform = [wing.BuiltinPlatform.SIM],
  testing = false,
  stateDir,
  watchGlobs,
}: CreateCompilerProps): Compiler => {
  const dirname = path.dirname(wingfile);
  const events = new Emittery<CompilerEvents>();
  let isCompiling = false;
  let shouldCompileAgain = false;
  let simfile: string | undefined;

  const recompile = async () => {
    if (isCompiling) {
      shouldCompileAgain = true;
      return;
    }

    loadEnvVariables({ cwd: dirname });

    try {
      isCompiling = true;
      await events.emit("compiling");
      simfile = await wing.compile(wingfile, {
        platform,
        testing,
        log: testing
          ? undefined
          : (...arguments_) => {
              console.log(
                `[${new Intl.DateTimeFormat(undefined, {
                  dateStyle: undefined,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  fractionalSecondDigits: 3,
                  hour12: false,
                }).format(new Date())}]`,
                // testing ? "[testing]" : "[compiler]",
                "[compiler]",
                ...arguments_,
              );
            },
      });
      await events.emit("compiled", { simfile });
    } catch (error) {
      // There's no point in showing errors if we're going to recompile anyway.
      if (shouldCompileAgain) {
        return;
      }

      await events.emit(
        "error",
        new Error(
          `Failed to compile.\n\n${await formatWingError(error, wingfile)}`,
          {
            cause: error,
          },
        ),
      );
    } finally {
      isCompiling = false;

      if (shouldCompileAgain) {
        shouldCompileAgain = false;
        await recompile();
      }
    }
  };

  const pathsToWatch = [
    `!**/node_modules/**`,
    `!**/.git/**`,
    `!${dirname}/target/**`,
    dirname,
    `${dirname}/.env`,
    ...(watchGlobs ?? []),
  ];

  if (stateDir) {
    pathsToWatch.push(`!${stateDir}`);
  }

  const watcher = chokidar.watch(pathsToWatch, {
    ignoreInitial: true,
  });
  watcher.on("change", recompile);
  watcher.on("add", recompile);
  watcher.on("unlink", async (path: string) => {
    if (path === wingfile) {
      await events.emit("error", new Error("Wing file deleted"));
    }
    void recompile();
  });

  void recompile();

  return {
    async start() {
      await recompile();
    },
    async stop() {
      await watcher.close();
    },
    on(event, listener) {
      events.on(event, listener);
    },
    async getSimfile() {
      if (simfile) {
        return simfile;
      }

      const compiled = await events.once("compiled");
      return compiled.simfile;
    },
  };
};
