/**
 * Emits a log message to the console if the DEBUG environment variable is set.
 * @param args Arguments to pass to console.error.
 */
export function log(...args: any[]) {
  if (process.env.DEBUG) {
    console.error(...args);
  }
}
