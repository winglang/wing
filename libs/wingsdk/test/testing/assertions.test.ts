import { test, describe, expect } from "vitest";
import { Assert } from "../../src/testing/assert";

describe("equalStr", () => {
  test("is equal", () => {
    expect(() => {
      Assert.strEqual("a", "a");
    }).not.toThrow();
  });

  test("is not equal", () => {
    expect(() => {
      Assert.strEqual("a", "b");
    }).toThrowError(new RegExp("'b' !== 'a'"));
  });
});
