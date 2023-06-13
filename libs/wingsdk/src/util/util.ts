import { Code, InflightClient } from "../core";

/**
 * Utility functions.
 */
export class Util {
  /**
   * Returns the value of an environment variable. Throws if not found or empty.
   * @param name The name of the environment variable.
   */
  public static env(name: string): string {
    const value = Util.tryEnv(name);
    if (!value) {
      throw new Error(`Environment variable ${name} not found.`);
    }
    return value;
  }

  /**
   * Returns the value of an environment variable. Returns `nil` if not found or empty.
   * @param name The name of the environment variable.
   * @returns The value of the environment variable or `nil`.
   */
  public static tryEnv(name: string): string | undefined {
    return process.env[name];
  }

  /**
   * Suspends execution for a given duration.
   *
   * @param duration The duration that has to pass before the Promise is resolved.
   * @inflight
   */
  public static async sleep(duration: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }
}
