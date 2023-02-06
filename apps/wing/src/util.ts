/**
 * Normalizes paths from windows to posix.
 */
export function normalPath(path: string) {
  if (process.platform === "win32") {
    return path.replace(/\\/g, "/").replace(/^[a-zA-Z]:/, "");
  } else {
    return path;
  }
}

