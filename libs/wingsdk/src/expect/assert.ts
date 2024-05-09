import nodeAssert from "node:assert/strict";
import { InflightClient } from "../core";

/**
 * The Util class provides methods for making assertions in tests,
 * such as comparing two strings for equality with rich error messages.
 * @inflight
 */
export class Util {
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
   * @returns void
   */
  public static equal(actual: unknown, expected: unknown): void {
    nodeAssert.deepStrictEqual(actual, expected);
  }

  /**
   * Compares two values for inequality.
   * @param expected The expected value.
   * @param actual The value to test.
   * @throws Will throw an error if the actual value matches the expected value.
   * @returns void
   */
  public static notEqual(actual: unknown, expected: unknown): void {
    nodeAssert.notDeepStrictEqual(actual, expected);
  }

  /**
   * Checks if a value is nil.
   * @param actual The value to test.
   * @throws Will throw an error if the actual value is not nil.
   * @returns void
   */
  public static nil(actual: unknown): void {
    nodeAssert.ok(
      actual === null || actual === undefined,
      `Expected "${actual}" to be nil`
    );
  }

  /**
   * Checks if a value is not nil.
   * @param actual The value to test.
   * @throws Will throw an error if the actual value is nil.
   * @returns void
   */
  public static notNil(actual: unknown): void {
    nodeAssert.ok(
      actual !== null && actual !== undefined,
      `Expected "${actual}" to be not nil`
    );
  }

  /**
   * Checks if a string matches a regular expression pattern.
   * @param actual The string to test.
   * @param expected The regular expression pattern to match against.
   * @throws Will throw an error if the actual value does not match the expected regular expression pattern.
   * @returns void
   */
  public static match(actual: string, expected: any): void {
    const regex = new RegExp(expected);
    nodeAssert.match(actual, regex);
  }

  /**
   * Checks if a string does not match a regular expression pattern.
   * @param actual The string to test.
   * @param expected The regular expression pattern to check against.
   * @throws Will throw an error if the actual value matches the expected regular expression pattern.
   * @returns void
   */
  public static doesNotMatch(actual: string, expected: any): void {
    const regex = new RegExp(expected);
    nodeAssert.doesNotMatch(actual, regex);
  }
  /**
   * Checks if a function throws an error with a specific message.
   * @param fn The function to test.
   * @throws Will throw an error if the provided function does not throw an error .
   * @returns void
   */
  public static throws(fn: any): void {
    nodeAssert.throws(fn);
  }

  /**
   * Asserts that a function does not throw an error.
   * @param fn The function to test.
   * @throws Will throw an error if the function `fn` throws an error.
   * @returns void
   */
  public static doesNotThrow(fn: any): void {
    nodeAssert.doesNotThrow(fn);
  }

  /**
   * Marks a test as failed.
   * @param message An optional message to include with the failure.
   * @throws Always throws an error with the provided message.
   * @returns void
   */
  public static fail(message?: string): void {
    nodeAssert.fail(message);
  }

  /**
   * Asserts that a condition is truthy.
   * @param condition The condition to test.
   * @param message An optional message to include if the condition is falsy.
   * @throws Will throw an error if the condition is falsy.
   * @returns void
   */
  public static ok(condition: boolean, message?: string): void {
    nodeAssert.ok(condition, message);
  }

  /**
   * Checks if a value contains another value.
   * Supports arrays, sets, and strings.
   * @param actual The value to test.
   * @param expected The value to check for containment.
   * @throws Will throw an error if the actual value does not contain the expected value.
   * @returns void
   */
  public static contains<T>(actual: unknown, expected: T | string): void {
    let containsValue: boolean;

    if (Array.isArray(actual)) {
      containsValue = actual.includes(expected as T);
    } else if (actual instanceof Set) {
      containsValue = (actual as Set<T>).has(expected as T);
    } else if (typeof actual === "string") {
      containsValue = (actual as string).includes(expected as string);
    } else {
      throw new Error("Unsupported type");
    }

    if (!containsValue) {
      throw new Error(`Expected "${actual}" to contain "${expected}"`);
    }
  }
  /**
   * Checks if a value doesn't contains another value.
   * Supports arrays, sets, and strings.
   * @param actual The value to test.
   * @param expected The value to check for containment.
   * @throws Will throw an error if the actual value contain the expected value.
   * @returns void
   */
  public static doesNotContain<T>(actual: unknown, expected: T | string): void {
    let doesNotContainValue: boolean;

    if (Array.isArray(actual)) {
      doesNotContainValue = !actual.includes(expected as T);
    } else if (actual instanceof Set) {
      doesNotContainValue = !(actual as Set<T>).has(expected as T);
    } else if (typeof actual === "string") {
      doesNotContainValue = !(actual as string).includes(expected as string);
    } else {
      throw new Error("Unsupported type");
    }

    if (!doesNotContainValue) {
      throw new Error(`Expected "${actual}" to not contain "${expected}"`);
    }
  }

  private constructor() {}
}
