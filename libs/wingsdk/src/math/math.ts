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
   * Calculates the median value of an array of numbers.
   * @param arr - The array of numbers.
   */
  public static median(arr: number[]): number {
    const mid = Math.floor(arr.length / 2);
    const nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  }

  /**
   * Calculates the mode values of an array of numbers.
   * @param arr - The array of numbers.
   */
  public static mode(arr: number[]): number[] {
    const frequencyMap: Record<number, number> = {};
    let maxFrequency = 0;

    arr.forEach((num) => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
      maxFrequency = Math.max(maxFrequency, frequencyMap[num]);
    });

    const modeValues: number[] = [];

    for (const num in frequencyMap) {
      if (frequencyMap[num] === maxFrequency) {
        modeValues.push(+num);
      }
    }

    return modeValues;
  }

  /**
   * Calculates the mean value of an array of numbers.
   * @param arr - The array of numbers.
   */
  public static arithmeticMean(arr: number[]): number {
    const sum = arr.reduce((acc, num) => acc + num, 0);
    const meanValue = sum / arr.length;
    return meanValue;
  }

  /**
   * Calculates the geometric mean of an array of numbers.
   * @param arr - The array of numbers.
   */
  public static geometricMean(arr: number[]): number {
    const product = arr.reduce((acc, num) => acc * num, 1);
    const meanValue = Number(Math.pow(product, 1 / arr.length).toPrecision(6));
    return meanValue;
  }

  /**
   * Calculates the harmonic mean of an array of numbers.
   * @param arr - The array of numbers.
   */
  public static harmonicMean(arr: number[]): number {
    const reciprocalSum = arr.reduce((acc, num) => acc + 1 / num, 0);
    const meanValue = arr.length / reciprocalSum;
    return meanValue;
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

  private constructor() { }
}
