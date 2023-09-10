import assert from "node:assert/strict";
import { InflightClient } from "../core";

/**
 * The Assert class provides methods for making assertions in tests,
 * such as comparing two strings for equality.
 * @inflight
 */
export class Assert {
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
    assert.strictEqual(actual, expected);
  }

  /**
   * Compares two values for inequality.
   * @param expected The expected value.
   * @param actual The value to test.
   * @throws Will throw an error if the actual value matches the expected value.
   * @returns void
   */
  public static notEqual(actual: unknown, expected: unknown): void {
    assert.notStrictEqual(actual, expected);
  }

  /**
   * Checks if a value is nil.
   * @param actual The value to test.
   * @throws Will throw an error if the actual value is not nil.
   * @returns void
   */
  public static isNil(actual: unknown): void {
    assert.ok(
      actual === null || actual === undefined,
      `Expected "${actual}" to be nil`
    );
  }

  private constructor() {}
}
