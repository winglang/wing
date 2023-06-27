import { copyFileSync, promises as fsPromise } from "fs";
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

export async function copyDir(src: string, dest: string) {
  await fsPromise.mkdir(dest, { recursive: true });
  let entries = await fsPromise.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ? await copyDir(srcPath, destPath) : copyFileSync(srcPath, destPath);
  }
}
