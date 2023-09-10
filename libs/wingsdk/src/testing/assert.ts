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
   * Compares two strings for equality.
   * @param expected The expected string.
   * @param actual The string to test.
   * @throws Will throw an error if the actual string does not match the expected string.
   * @returns void
   */
  public static strEqual(actual: string, expected: string): void {
    assert.strictEqual(actual, expected);
  }

  /**
   * Checks if a string is null or undefined.
   * @param actual The string to test.
   * @throws Will throw an error if the actual string is not null or undefined.
   * @returns void
   */
  public static strIsNil(actual: string | undefined): void {
    assert.ok(actual === null || actual === undefined, `Expected "${actual}" to be nil`);
  }

  /**
   * Compares two numbers for equality.
   * @param expected The expected number.
   * @param actual The number to test.
   * @throws Will throw an error if the actual number does not match the expected number.
   * @returns void
   */
  public static numEqual(actual: number, expected: number): void {
    assert.strictEqual(actual, expected);
  }

  /**
   * Checks if a number is null or undefined.
   * @param actual The number to test.
   * @throws Will throw an error if the actual number is not null or undefined.
   * @returns void
   */
  public static numIsNil(actual: number | undefined): void {
    assert.ok(actual === null || actual === undefined, `Expected ${actual} to be nil`);
  }

  private constructor() {}
}
