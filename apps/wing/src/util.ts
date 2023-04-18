import ora from "ora";

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

export async function withSpinner<T>(
  message: string,
  fn: () => Promise<T>,
): Promise<T> {
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
