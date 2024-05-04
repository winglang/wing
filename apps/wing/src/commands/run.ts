import { existsSync } from "fs";
import { dirname, resolve } from "path";
import { createConsoleApp } from "@wingconsole/app";
import { BuiltinPlatform } from "@winglang/compiler";
import { debug } from "debug";
import { glob } from "glob";
import { loadEnvVariables } from "../env";
import { parseNumericString } from "../util";
import { beforeShutdown } from "../util.before-shutdown.js";

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
  /**
   * Target platform
   * @default wingCompiler.BuiltinPlatform.SIM
   */
  readonly platform?: string[];
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
    const wingFiles = (await glob("{main,*.main}.{w,ts}")).sort();
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

  loadEnvVariables({ cwd: resolve(dirname(entrypoint)) });

  if (options?.platform && options?.platform[0] !== BuiltinPlatform.SIM) {
    throw new Error(
      `The first platform in the list must be the sim platform (try "-t sim -t ${options.platform.join(
        " -t"
      )}")`
    );
  }

  entrypoint = resolve(entrypoint);
  debug("opening the wing console with:" + entrypoint);

  const { port, close } = await createConsoleApp({
    wingfile: entrypoint,
    requestedPort,
    hostUtils: {
      async openExternal(url: string) {
        open(url);
      },
    },
    platform: options?.platform,
    requireAcceptTerms: !!process.stdin.isTTY,
    open: openBrowser,
  });
  const url = `http://localhost:${port}/`;
  console.log(`The Wing Console is running at ${url}`);

  beforeShutdown(async () => {
    await close();
  });
}
