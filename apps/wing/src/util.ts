import { copyFileSync, promises as fsPromise, readFileSync } from "fs";
import ora from "ora";
import { basename, join, resolve } from "path";
import { cp, mkdtemp } from "fs/promises";
import { tmpdir } from "os";

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
    let srcPath = join(src, entry.name);
    let destPath = join(dest, entry.name);

    entry.isDirectory() ? await copyDir(srcPath, destPath) : copyFileSync(srcPath, destPath);
  }
}

/**
 * Creates a clean environment for each test by copying the example file to a temporary directory.
 */
export async function generateTmpDir(sourcePath: string, ...additionalFiles: string[]) {
  const sourceFile = basename(sourcePath);
  const file = readFileSync(sourcePath, "utf-8");
  const externs = file.match(/(?<=extern ")[.\\\/A-Za-z0-9_-]+/g) ?? [];
  const sourceDir = await mkdtemp(join(tmpdir(), "-wing-compile-test"));
  const tempWingFile = join(sourceDir, sourceFile);

  await cp(sourcePath, tempWingFile);

  for (const filePath of additionalFiles) {
    const file = basename(filePath);
    await cp(filePath, join(sourceDir, file));
  }

  for (const path of externs) {
    await cp(join(resolve(sourcePath), `../${path}`), join(sourceDir, path));
  }

  return tempWingFile;
}
