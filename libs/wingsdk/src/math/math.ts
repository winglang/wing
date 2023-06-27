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
    let minValue: number | undefined;

    for (const num of arr) {
      if (minValue === undefined || num < minValue) {
        minValue = num;
      }
    }

    if (minValue === undefined) {
      throw new Error("The set is empty.");
    }

    return minValue;
  }

  /**
   * Returns the maximum value from an set of numbers.
   * @param arr The set of numbers.
   */
  public static max(arr: any): number {
    let maxValue: number | undefined;

    for (const value of arr) {
      if (maxValue === undefined || value > maxValue) {
        maxValue = value;
      }
    }

    if (maxValue === undefined) {
      throw new Error("The set is empty.");
    }

    return maxValue;
  }

  private constructor() {}
}
