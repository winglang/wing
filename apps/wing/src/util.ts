/**
 * Normalizes paths from windows to posix.
 */
export function normalPath(path: string) {
  if (process.platform === "win32") {
    return path
    // Replace backslashes with forward slashes
    .replace(/\\/g, "/")
    // Remove drive letter
    .replace(/^([a-zA-Z]):/, "/__$1");
  } else {
    return path;
  }
}

