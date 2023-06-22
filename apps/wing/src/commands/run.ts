import { readdirSync, existsSync } from "fs";
import { debug } from "debug";
import { resolve } from "path";
import open from "open";
import { createConsoleApp } from "@wingconsole/app";
import { parseNumericString } from "../util";

/**
 * Run options for the `run` command.
 * This is passed from Commander to the `run` function.
 */
export interface RunOptions {
  /**
   * Preferred port number.
   *
   * Falls back to a random port number if necessary.
   */
  readonly port?: string;
}

/**
 * Runs a Wing program in the Console.
 * @param entrypoint The program .w entrypoint. Looks for a .w file in the current directory if not specified.
 * @param options Run options.
 */
export async function run(entrypoint?: string, options?: RunOptions) {
  if (!entrypoint) {
    const wingFiles = readdirSync(".").filter((item) => item.endsWith(".w"));
    if (wingFiles.length !== 1) {
      throw new Error("Please specify which file you want to run");
    }
    entrypoint = wingFiles[0];
  }

  if (!existsSync(entrypoint)) {
    throw new Error(entrypoint + " doesn't exist");
  }

  entrypoint = resolve(entrypoint);
  debug("opening the wing console with:" + entrypoint);

  const { port } = await createConsoleApp({
    wingfile: entrypoint,
    requestedPort: parseNumericString(options?.port),
    hostUtils: {
      async openExternal(url) {
        await open(url);
      },
    },
  });
  const url = `http://localhost:${port}/`;
  await open(url);
  console.log(`The Wing Console is running at ${url}`);
}
