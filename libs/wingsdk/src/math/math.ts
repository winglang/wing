import { Code, InflightClient } from "../core";

/**
 * Utility class for mathematical operations.
 */
export class Util {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Returns the absolute value of a number.
   * @param value The input number.
   */
  public static abs(value: number): number {
    return Math.abs(value);
  }

  /**
   * Returns the largest integer less than or equal to a given number.
   * @param value The input number.
   */
  public static floor(value: number): number {
    return Math.floor(value);
  }

  /**
   * Returns the smallest integer greater than or equal to a given number.
   * @param value The input number.
   */
  public static ceil(value: number): number {
    return Math.ceil(value);
  }

  /**
   * Rounds the given number to the nearest integer.
   * @param value - The number to be rounded.
   */
  public static round(value: number): number {
    return Math.round(value);
  }

  /**
   * Returns the minimum value from an set of numbers.
   * @param arr The set of numbers.
   */
  public static min(arr: any): number {
    if (arr instanceof Set) {
      return Math.min(...arr);
    }

    throw new Error("The argument is not a Set");
  }

  /**
   * Returns the maximum value from an set of numbers.
   * @param arr The set of numbers.
   */
  public static max(arr: any): number {
    if (arr instanceof Set) {
      return Math.max(...arr);
    }

    throw new Error("The argument is not a Set");
  }

  private constructor() {}
}
