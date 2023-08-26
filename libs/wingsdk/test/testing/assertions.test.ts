import { test, describe, beforeEach, vi, Mock, expect } from "vitest";
import { Assert } from "../../src/testing/assertions";

describe("equalStr", () => {
  test("is equal", () => {
    expect(Assert.equalStr("a", "a")).toEqual(true);
  });

  test("is not equal", () => {
    expect(() => {
      Assert.equalStr("a", "b");
    }).toThrowError(`Expected "a", but got "b".`);
  });
});
