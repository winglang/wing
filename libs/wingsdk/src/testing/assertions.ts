import { InflightClient } from "../core";

/**
 * The Assert class provides methods for making assertions in tests,
 * such as comparing two strings for equality.
 * @inflight
 */
export class Assert {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Compares two strings for equality.
   * @param expected The expected string.
   * @param actual The string to test.
   * @throws Will throw an error if the actual string does not match the expected string.
   * @returns True if the strings are equal, throws otherwise.
   */
  public static equalStr(expected: string, actual: string): boolean {
    if (expected !== actual) {
      throw new Error(`Expected "${expected}", but got "${actual}".`);
    }
    return true;
  }

  private constructor() {}
}
