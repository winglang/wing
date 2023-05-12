import { copyFileSync, promises as fsPromise } from "fs";
import ora from "ora";
import path from "path";

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

export async function withSpinner<T>(message: string, fn: () => Promise<T>): Promise<T> {
  const spinner = ora({
    stream: process.stdout, // hangar tests currently expect stderr to be empty or else they fail
    text: message,
  }).start();
  try {
    const result = await fn();
    spinner.succeed();
    return result;
  } catch (e) {
    spinner.fail();
    throw e;
  }
}

export async function copyDir(src: string, dest: string) {
  await fsPromise.mkdir(dest, { recursive: true });
  let entries = await fsPromise.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ? await copyDir(srcPath, destPath) : copyFileSync(srcPath, destPath);
  }
}
