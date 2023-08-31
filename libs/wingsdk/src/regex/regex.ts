import { InflightClient } from "../core";

/**
 * Regex utilities and functions
 */
export class Util {
  /**
   * Check if a regex pattern is matched by a given string
   * @param pattern - regex pattern
   * @param text - given input string
   * @returns true if it matches the pattern, false otherwise
   */
  public static match(pattern: string, text: string): boolean {
    const regex = new RegExp(pattern);
    if (text.match(regex) === null) {
      return false;
    }
    return true;
  }

  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }
  private constructor() {}
}
