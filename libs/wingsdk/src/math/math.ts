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
    return value < 0 ? value * -1 : value;
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
   * Returns the minimum value from an set of numbers.
   * @param arr The set of numbers.
   */
  public static min(arr: any): number {
    if (arr instanceof Set) {
      const arrAsArray = Array.from(arr);
      return Math.min(...arrAsArray);
    }

    throw new Error('The argument is not a Set');
  }

  /**
   * Returns the maximum value from an set of numbers.
   * @param arr The set of numbers.
   */
  public static max(arr: any): number {
    if (arr instanceof Set) {
      // Convert the Set to an array
      const arrAsArray = Array.from(arr);
      // Find the maximum value in the array
      return Math.max(...arrAsArray);
    }

    throw new Error('The argument is not a Set');
  }

  private constructor() { }
}
