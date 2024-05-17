import { ExecOptions, ExecFileOptions, exec, execFile } from "child_process";
import { readFileSync } from "fs";
import { promisify } from "util";

const execPromise = promisify(exec);
const execFilePromise = promisify(execFile);

export function readJsonSync(file: string) {
  return JSON.parse(readFileSync(file, "utf-8"));
}

/**
 * Normalize windows paths to be posix-like.
 */
export function normalPath(path: string) {
  if (process.platform === "win32") {
    return (
      path
        // force posix path separator
        .replace(/\\+/g, "/")
    );
  } else {
    return path;
  }
}

/**
 * Just a helpful wrapper around `execFile` that returns a promise.
 */
export async function runCommand(
  cmd: string,
  args: string[],
  options?: ExecFileOptions
): Promise<any> {
  const { stdout } = await execFilePromise(cmd, args, options);
  return stdout;
}

/**
 * Just a helpful wrapper around `exec` that returns a promise.
 * This will run commands through the shell, while `runCommand` doesn't.
 */
export async function shell(
  cmd: string,
  args: string[],
  options?: ExecOptions
): Promise<any> {
  const { stdout } = await execPromise(cmd + " " + args.join(" "), options);
  return stdout;
}

export function isPath(s: string) {
  s = normalPath(s);
  return s.startsWith("./") || s.startsWith("/");
}
