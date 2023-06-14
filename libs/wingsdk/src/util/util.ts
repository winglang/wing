import { Code, InflightClient } from "../core";
import { Duration } from "../std";

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
   * @param delay The time to suspend execution
   * @inflight
   */
  public static async sleep(delay: Duration): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(resolve, duration.seconds * 1000)
    );
  }

  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }
}
