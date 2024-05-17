import path from "node:path";

import * as wing from "@winglang/compiler";
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
  const events = new Emittery<CompilerEvents>();
  let isCompiling = false;
  let shouldCompileAgain = false;
  const recompile = async () => {
    if (isCompiling) {
      shouldCompileAgain = true;
      return;
    }

    try {
      isCompiling = true;
      await events.emit("compiling");
      const simfile = await wing.compile(wingfile, {
        platform,
        testing,
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

  const dirname = path.dirname(wingfile);

  const pathsToWatch = [
    `!**/node_modules/**`,
    `!**/.git/**`,
    `!${dirname}/target/**`,
    dirname,
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
  };
};
