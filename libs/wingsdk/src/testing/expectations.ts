import { InflightClient } from "../core";

export class StringExpectations {
   /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  constructor(private expected: string) {}

  /**
   *
   * @param actual The string to test.
   * @throws Will throw an error if the actual string does not match the expected string.
   * @returns True if the strings are equal, throws otherwise.
   * @inflight
    */
  public toEqual(actual: string): boolean {
    if (this.expected !== actual) {
      throw new Error(`Expected "${this.expected}", but got "${actual}".`);
    }
    return true;
  }
}

export class NumberExpectations {
  constructor(private expected: number) {}

  public toEqual(actual: number): boolean {
    if (this.expected !== actual) {
      throw new Error(`Expected "${this.expected}", but got "${actual}".`);
    }
    return true;
  }
};

/**
 * The Assert class provides methods for making assertions in tests,
 * such as comparing two strings for equality.
 * @inflight
 */
export class Expectations {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Compares two values for equality.
   * @param expected The expected value.
   * @param actual The value to test.
   * @throws Will throw an error if the actual value does not match the expected value.
   * @returns True if the values are equal, throws otherwise.
   */
  public static expect(expected: string): StringExpectations;

  /**
   * Compares two values for equality.
   * @param expected The expected value.
   * @param actual The value to test.
   * @throws Will throw an error if the actual value does not match the expected value.
   * @returns True if the values are equal, throws otherwise.
   */
  public static expect(expected: number): NumberExpectations;


  public static expect(expected: any): any {
    if (typeof expected === "string") {
      return new StringExpectations(expected);
    } else if (typeof expected === "number") {
      return new NumberExpectations(expected);
    }
    // You can continue the pattern for other types as necessary.
    throw new Error(`No expectations available for type "${typeof expected}".`);
  }
}
