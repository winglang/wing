import path from "node:path";

import * as wing from "@winglang/compiler";
import chokidar from "chokidar";
import Emittery from "emittery";

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

const deduceSimfile = (wingfile: string): string => {
  const dirname = path.dirname(wingfile);
  const basename = path.basename(wingfile, ".w");
  return path.resolve(dirname, "target", `${basename}.wsim`);
};

export const createCompiler = (wingfile: string): Compiler => {
  const simfile = deduceSimfile(wingfile);
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
      console.log({ simfile });
      const outdir = await wing.compile(wingfile, {
        target: wing.Target.SIM,
      });
      console.log({ outdir });
      await events.emit("compiled", { simfile });
    } catch (error) {
      console.log({ error });
      // There's no point in showing errors if we're going to recompile anyway.
      if (shouldCompileAgain) {
        return;
      }

      await events.emit(
        "error",
        new Error(`Failed to compile.\n\n${error}`, { cause: error }),
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
  const ignoreList = ["**/target/**", "**/node_modules/**"];
  const watcher = chokidar.watch(dirname, {
    ignored: ignoreList,
  });
  watcher.on("change", recompile);
  watcher.on("add", recompile);
  watcher.on("unlink", async (path: string) => {
    if (path === wingfile) {
      await events.emit("error", new Error("Wing file deleted"));
    }
    void recompile();
  });

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
