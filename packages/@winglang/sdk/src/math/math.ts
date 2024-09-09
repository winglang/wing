import { InflightClient } from "../core";

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
  public static readonly TAU = 2 * Math.PI;
  /**
   * Euler's number, a mathematical constant approximately equal to 2.71828.
   */
  public static readonly E = Math.E;
  /**
   * Positive infinity constant
   */
  public static readonly INF = Number.POSITIVE_INFINITY;

  /**
   * @internal
   */
  public static _toInflightType(): string {
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
   * Returns the square root of a number.
   * @param value A number greater than or equal to 0.
   */
  public static sqrt(value: number): number {
    if (value < 0) {
      throw new Error("Input value must be greater than or equal to 0.");
    }
    return Math.sqrt(value);
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
   * @param coordinates Array of coordinates
   * @returns
   */
  public static hypot(coordinates: number[]): number {
    return Math.hypot(...coordinates);
  }

  /**
   * Convert degrees to radians
   * @param degrees Degree value
   */
  public static degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Convert radians to degrees
   * @param radians Radians value
   */
  public static radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }

  /**
   * Returns the natural logarithm (base e) of a number.
   * @param value The input number.
   */
  public static log(value: number): number {
    return Math.log(value);
  }

  /**
   * Returns the base-2 logarithm of a number.
   * @param value The input number.
   */
  public static log2(value: number): number {
    return Math.log2(value);
  }

  /**
   * Returns the base-10 logarithm of a number.
   * @param value The input number.
   */
  public static log10(value: number): number {
    return Math.log10(value);
  }

  /**
   * Returns 1 or -1, indicating the sign of the number passed as an argument, 0 for 0.
   * @param value The input number.
   */
  public static sign(value: number): number {
    return Math.sign(value);
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
    if (value < -1 || value > 1) {
      throw new Error("Input value must be between -1 and 1, inclusive.");
    }
    return Math.asin(value);
  }

  /**
   * Returns the inverse cosine (in radians) of a number.
   * @param value A number between -1 and 1, inclusive, representing the angle's cosine value.
   */
  public static acos(value: number): number {
    if (value < -1 || value > 1) {
      throw new Error("Input value must be between -1 and 1, inclusive.");
    }
    return Math.acos(value);
  }

  /**
   * Returns the inverse tangent (in radians) of a number.
   * @param value A number.
   */
  public static atan(value: number): number {
    return Math.atan(value);
  }

  /**
   * Returns the angle in the plane (in radians) between the positive x-axis and the ray from
   * (0, 0) to the point (x, y), for Math.atan2(y, x).
   * @param y The y coordinate of the point.
   * @param x The x coordinate of the point.
   */
  public static atan2(y: number, x: number): number {
    return Math.atan2(y, x);
  }

  /**
   * Calculates the secant of an angle (in radians).
   *
   * @param value The angle in radians.
   * @returns The secant value of the angle.
   */
  public static sec(value: number): number {
    return 1 / Math.cos(value);
  }

  /**
   * Calculates the cosecant of an angle (in radians).
   *
   * @param value The angle in radians.
   * @returns The cosecant value of the angle.
   */
  public static csc(value: number): number {
    return 1 / Math.sin(value);
  }

  /**
   * Calculates the cotangent of an angle (in radians).
   *
   * @param value The angle in radians.
   * @returns The cotangent value of the angle.
   */
  public static cot(value: number): number {
    return 1 / Math.tan(value);
  }

  /**
   * Calculates the inverse secant (asec) of a number.
   *
   * @param value A number equal or greater than |1|, representing the secant value.
   * @returns The inverse secant (asec) in radians.
   */
  public static asec(value: number): number {
    if (Math.abs(value) < 1) {
      throw new Error("Input value must be equal or greater than |1|.");
    }
    return Math.acos(1 / value);
  }

  /**
   * Calculates the inverse cosecant (acsc) of a number.
   *
   * @param value A number equal or greater than |1|, representing the cosecant value.
   * @returns The inverse cosecant (acsc) in radians.
   */
  public static acsc(value: number): number {
    if (Math.abs(value) < 1) {
      throw new Error("Input value must be equal or greater than |1|.");
    }
    return Math.asin(1 / value);
  }

  /**
   * Calculates the inverse cotangent (acot) of a number.
   *
   * @param value A number representing the cotangent value.
   * @returns The inverse cotangent (acot) in radians.
   */
  public static acot(value: number): number {
    return Math.atan(1 / value);
  }

  /**
   * Generates a pseudo-random number between 0 and max (default of 1).
   * @param max - The maximum value of the random number.
   * @returns A pseudo-random number between 0 and max.
   */
  public static random(max: number | undefined): number {
    return Math.random() * (max || 1);
  }

  /**
   * Convert a value to a new number base
   *
   * @param value The number to be converted
   * @param base The base of the new value
   * @returns A string representation of the new number
   */
  public static toRadix(value: number, base: number): string {
    return value.toString(base);
  }

  private constructor() {}
}
