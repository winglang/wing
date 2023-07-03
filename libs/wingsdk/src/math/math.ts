import { Code, InflightClient } from "../core";

/**
 * Options for rounding a number.
 */
export interface RoundingOptions {
  /**
   * The number of decimal places to round to.
   */
  readonly decimalPlaces?: number;
}

/**
 * Utility class for mathematical operations.
 */
export class Util {
  /**
   * The mathematical constant representing the ratio of a circle's circumference to its diameter.
   */
  public static readonly PI = Math.PI;
  /**
   * The mathematical constant representing the ratio of a circle's circumference to the radius.
   */
  public static readonly TAO = 2 * Math.PI;
  /**
   * Euler's number, a mathematical constant approximately equal to 2.71828.
   */
  public static readonly E = Math.E;

  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Checks if a number is prime.
   * @param n The number to check for primality.
   */
  public static isPrime(n: number): boolean {
    if (n <= 1) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
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
    return sum / arr.length;
  }

  /**
   * Calculates the geometric mean of an array of numbers.
   * @param arr - The array of numbers.
   */
  public static geometricMean(arr: number[]): number {
    const product = arr.reduce((acc, num) => acc * num, 1);
    return this.round(Math.pow(product, 1 / arr.length), {
      decimalPlaces: 6,
    });
  }

  /**
   * Calculates the harmonic mean of an array of numbers.
   * @param arr - The array of numbers.
   */
  public static harmonicMean(arr: number[]): number {
    const reciprocalSum = arr.reduce((acc, num) => acc + 1 / num, 0);
    return arr.length / reciprocalSum;
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
  public static round(value: number, options?: RoundingOptions): number {
    if (options && options.decimalPlaces) {
      const multiplier = Math.pow(10, options.decimalPlaces);
      return Math.round(value * multiplier) / multiplier;
    }
    return Math.round(value);
  }

  /**
   * Returns the minimum value from an array of numbers.
   * @param arr The array of numbers.
   */
  public static min(arr: number[]): number {
    return Math.min(...arr);
  }

  /**
   * Returns the maximum value from an array of numbers.
   * @param arr The array of numbers.
   */
  public static max(arr: number[]): number {
    return Math.max(...arr);
  }

  /**
   * Calculates the nth Fibonacci number.
   * @param n - The position of the Fibonacci number to calculate.
   */
  public static fibonacci(n: number): number {
    if (n === 0 || n === 1) {
      return n;
    }
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  /**
   * Calculates the factorial of a given number.
   * @param n - The number to calculate the factorial for.
   */
  public static factorial(n: number): number {
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * this.factorial(n - 1);
  }

  /**
   * Calculates the number of combinations for choosing r items from a total of n items.
   * @param n - The total number of items.
   * @param r - The number of items to be chosen.
   */
  public static combinations(n: number, r: number): number {
    if (r > n) {
      return 0;
    }
    const numerator = this.factorial(n);
    const denominator = this.factorial(r) * this.factorial(n - r);
    return numerator / denominator;
  }


  /**
   * Calculate the length of the vector from the origin to the point given by the coordinates
   * @param coodinates Array of coodinates
   * @returns 
   */
  public static hypot(coodinates: number[]): number {
    return Math.hypot(...coodinates);
  }

  /**
   * Convert degrees to radians
   * @param degrees Degree value
   */
  public static degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  /**
   * Convert radians to degrees
   * @param radians Radians value
   */
  public static radiansToDegrees(radians: number): number {
    return radians * 180 / Math.PI;
  }

  /**
   * Returns the sine of a number in radians.
   * @param value A number representing an angle in radians.
   */
  public static sin(value: number): number {
    return Math.sin(value);
  }

  /**
   * Returns the cosine of a number in radians.
   * @param value A number representing an angle in radians.
   */
  public static cos(value: number): number {
    return Math.cos(value);
  }

  /**
   * Returns the tangent of a number in radians.
   * @param value A number representing an angle in radians.
   */
  public static tan(value: number): number {
    return Math.tan(value);
  }

  /**
   * Returns the inverse sine (in radians) of a number.
   * @param value A number between -1 and 1, inclusive, representing the angle's sine value.
   */
  public static asin(value: number): number {
    return Math.asin(value);
  }

  /**
   * Returns the inverse cosine (in radians) of a number.
   * @param value A number between -1 and 1, inclusive, representing the angle's cosine value.
   */
  public static acos(value: number): number {
    return Math.acos(value);
  }

  /**
   * Returns the inverse tangent (in radians) of a number.
   * @param value A number.
   */
  public static atan(value: number): number {
    return Math.atan(value);
  }

  private constructor() { }
}
