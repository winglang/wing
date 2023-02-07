/**
 * Normalizes paths from windows to posix.
 */
export function normalPath(path: string) {
  if (process.platform === "win32") {
    return path
    // Replace backslashes with forward slashes
    .replace(/\\/g, "/")
    // Remove drive letter
    // Note: This uses the assumption that starting a path with `/` in windows resolves to the default drive
    .replace(/^[a-zA-Z]:/, "");
  } else {
    return path;
  }
}

