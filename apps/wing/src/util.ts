/**
 * Normalizes paths from windows to posix while also making it suitable for WASI.
 */
export function wasiPath(path: string) {
  return path;
  // if (process.platform === "win32") {
  //   return path
  //   // Replace backslashes with forward slashes
  //   .replace(/\\/g, "/")
  //   // "C:\a\b" -> "/__C/a/b"
  //   .replace(/^([a-zA-Z]):/, "/__$1");
  // } else {
  //   return path;
  // }
}
