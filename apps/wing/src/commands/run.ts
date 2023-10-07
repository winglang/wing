import { existsSync } from "fs";
import { resolve } from "path";
import { createConsoleApp } from "@wingconsole/app";
import { debug } from "debug";
import { glob } from "glob";
import open from "open";
import { parseNumericString } from "../util";

/**
 * Options for the `run` command.
 * This is passed from Commander to the `run` function.
 */
export interface RunOptions {
  /**
   * Preferred port number.
   *
   * Falls back to a random port number if necessary.
   */
  readonly port?: string;

  /**
   * Whether to open the Wing Console in the browser automatically.
   *
   * @default true
   */
  readonly open?: boolean;
}

/**
 * Runs a Wing program in the Console.
 * @param entrypoint The program .w entrypoint. Looks for a .w file in the current directory if not specified.
 * @param options Run options.
 */
export async function run(entrypoint?: string, options?: RunOptions) {
  const requestedPort = parseNumericString(options?.port) ?? 3000;
  const openBrowser = options?.open ?? true;

  if (!entrypoint) {
    const wingFiles = await glob("{main,*.main}.w");
    if (wingFiles.length === 0) {
      throw new Error(
        "Cannot find entrypoint files (main.w or *.main.w) in the current directory."
      );
    }
    if (wingFiles.length > 1) {
      throw new Error(
        `Multiple entrypoints found in the current directory (${wingFiles.join(
          ", "
        )}). Please specify which one to use.`
      );
    }
    entrypoint = wingFiles[0];
  }

  if (!existsSync(entrypoint)) {
    throw new Error(entrypoint + " doesn't exist");
  }

  entrypoint = resolve(entrypoint);
  debug("opening the wing console with:" + entrypoint);

  const { port, close } = await createConsoleApp({
    wingfile: entrypoint,
    requestedPort,
    hostUtils: {
      async openExternal(url: string) {
        await open(url);
      },
    },
    requireAcceptTerms: !!process.stdin.isTTY,
  });
  const url = `http://localhost:${port}/`;
  if (openBrowser) {
    await open(url);
  }
  console.log(`The Wing Console is running at ${url}`);

  const onExit = async (exitCode: number) => {
    await close(() => process.exit(exitCode));
  };

  process.once("exit", async (c) => onExit(c));
  process.once("SIGTERM", async () => onExit(0));
  process.once("SIGINT", async () => onExit(0));
}
