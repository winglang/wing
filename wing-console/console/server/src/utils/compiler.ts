import path from "node:path";

import * as wing from "@winglang/compiler";
import { CompileError } from "@winglang/compiler";
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
  preflightLog?: (message: string) => void;
}

export const createCompiler = ({
  wingfile,
  platform = [wing.BuiltinPlatform.SIM],
  testing = false,
  stateDir,
  watchGlobs,
  preflightLog,
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

    loadEnvVariables({ modes: ["run", "it"], cwd: dirname });

    isCompiling = true;
    await events.emit("compiling");

    const { outputDir, wingcErrors, preflightError } = await wing.compile(
      wingfile,
      {
        platform,
        testing,
        preflightLog,
      },
    );

    isCompiling = false;
    if (shouldCompileAgain) {
      shouldCompileAgain = false;
      await recompile();
      return;
    }

    let errorString = "";
    if (wingcErrors.length > 0) {
      errorString += await formatWingError(
        new CompileError(wingcErrors),
        wingfile,
      );
    }
    if (preflightError) {
      errorString += await formatWingError(preflightError, wingfile);
    }
    if (errorString) {
      if (outputDir === undefined) {
        // Emit a blue screen of death error if there is no output directory.
        await events.emit("error", new Error(errorString));
        return;
      } else {
        // Log the error if there is an output directory.
        preflightLog?.(errorString);
      }
    }

    if (outputDir) {
      simfile = outputDir;
      await events.emit("compiled", { simfile });
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
