import * as cp from "child_process";
import { sep } from "path";
import { promisify } from "util";
import debug from "debug";

const log = debug("wing:test");

/**
 * @param path path to the test/s file
 * @returns the file name and parent dir in the following format: "folder/file.ext"
 */
export const renderTestName = (path: string) => path.split(sep).slice(-2).join("/");

const MAX_BUFFER = 10 * 1024 * 1024;

/**
 * Executes command and returns STDOUT. If the command fails (non-zero), throws an error.
 */
export async function execCapture(command: string, options: { cwd: string }) {
  log(command);
  const exec = promisify(cp.exec);
  const { stdout, stderr } = await exec(command, {
    cwd: options.cwd,
    maxBuffer: MAX_BUFFER,
  });
  if (stderr) {
    throw new Error(stderr);
  }
  log(stdout);
  return stdout;
}
