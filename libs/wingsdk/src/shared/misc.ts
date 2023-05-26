import { execFile } from "child_process";
import { readFileSync } from "fs";

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
export async function runCommand(cmd: string, args: string[]): Promise<any> {
  const raw = await new Promise((resolve, reject) => {
    execFile(cmd, args, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(error);
      }
      resolve(stdout);
    });
  });
  return raw;
}
