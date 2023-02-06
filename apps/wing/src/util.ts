/**
 * Normalizes paths from windows to posix.
 */
export function normalPath(path: string) {
  return path.replace(/\\/g, "/");
}

