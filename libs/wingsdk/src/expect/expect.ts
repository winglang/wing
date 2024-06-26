import nodeAssert from "node:assert/strict";
import { InflightClient } from "../core";
import { Regex } from "../std";

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
  public static match(actual: string, expected: string): void {
    const regex = Regex.compile(expected);
    const matches = regex.test(actual);
    if (!matches) {
      throw new nodeAssert.AssertionError({
        message: `The input did not match the regular expression ${expected}`,
      });
    }
  }

  /**
   * Checks if a string does not match a regular expression pattern.
   * @param actual The string to test.
   * @param expected The regular expression pattern to check against.
   * @throws Will throw an error if the actual value matches the expected regular expression pattern.
   * @returns void
   */
  public static doesNotMatch(actual: string, expected: string): void {
    const regex = Regex.compile(expected);
    const matches = regex.test(actual);
    if (matches) {
      throw new nodeAssert.AssertionError({
        message: `The input should not match the regular expression ${expected}`,
      });
    }
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

  private constructor() {}
}
