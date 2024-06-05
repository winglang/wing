import { describe, it, expect } from "vitest";
import { deepStrictEqual } from "../../src/util/equality";

describe("deepStrictEqual", () => {
  // Primitive types
  it("should return true for equal numbers", () => {
    expect(deepStrictEqual(1, 1)).toBe(true);
  });

  it("should return false for different numbers", () => {
    expect(deepStrictEqual(1, 2)).toBe(false);
  });

  it("should return true for equal strings", () => {
    expect(deepStrictEqual("hello", "hello")).toBe(true);
  });

  it("should return false for different strings", () => {
    expect(deepStrictEqual("hello", "world")).toBe(false);
  });

  it("should return true for equal booleans", () => {
    expect(deepStrictEqual(true, true)).toBe(true);
  });

  it("should return false for different booleans", () => {
    expect(deepStrictEqual(true, false)).toBe(false);
  });

  it("should return true for equal nulls", () => {
    expect(deepStrictEqual(null, null)).toBe(true);
  });

  it("should return false for null and undefined", () => {
    expect(deepStrictEqual(null, undefined)).toBe(false);
  });

  it("should return true for equal undefineds", () => {
    expect(deepStrictEqual(undefined, undefined)).toBe(true);
  });

  it("should return false for undefined and a number", () => {
    expect(deepStrictEqual(undefined, 1)).toBe(false);
  });

  // Object and array types
  it("should return true for equal arrays", () => {
    expect(deepStrictEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it("should return false for arrays with different elements", () => {
    expect(deepStrictEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it("should return true for equal objects", () => {
    expect(deepStrictEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  it("should return false for objects with different properties", () => {
    expect(deepStrictEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
  });

  it("should return true for nested objects with same structure and values", () => {
    expect(deepStrictEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);
  });

  it("should return false for nested objects with different values", () => {
    expect(deepStrictEqual({ a: { b: 2 } }, { a: { b: 3 } })).toBe(false);
  });

  // Special objects and edge cases
  it("should return true for equal Date objects", () => {
    expect(
      deepStrictEqual(new Date("2020-01-01"), new Date("2020-01-01"))
    ).toBe(true);
  });

  it("should return false for different Date objects", () => {
    expect(
      deepStrictEqual(new Date("2020-01-01"), new Date("2021-01-01"))
    ).toBe(false);
  });

  it("should return true for equal RegExp objects", () => {
    expect(deepStrictEqual(/abc/i, /abc/i)).toBe(true);
  });

  it("should return false for different RegExp objects", () => {
    expect(deepStrictEqual(/abc/i, /abc/)).toBe(false);
  });

  it("should return false for different types", () => {
    expect(deepStrictEqual(1, "1")).toBe(false);
    expect(deepStrictEqual(1, true)).toBe(false);
    expect(deepStrictEqual({}, [])).toBe(false);
  });

  // NaN equality
  it("should return true for NaN compared to NaN", () => {
    expect(deepStrictEqual(NaN, NaN)).toBe(true);
  });

  // Symbol comparison
  it("should return true for equal Symbols", () => {
    const sym1 = Symbol("foo");
    const sym2 = Symbol("foo");
    expect(deepStrictEqual(sym1, sym1)).toBe(true);
  });

  it("should return false for different Symbols", () => {
    const sym1 = Symbol("foo");
    const sym2 = Symbol("foo");
    expect(deepStrictEqual(sym1, sym2)).toBe(false);
  });

  // Sets
  it("should return true for equal Sets", () => {
    expect(deepStrictEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true);
  });

  it("should return false for Sets with different elements", () => {
    expect(deepStrictEqual(new Set([1, 2, 3]), new Set([1, 2, 4]))).toBe(false);
  });

  // Maps
  it("should return true for equal Maps", () => {
    expect(
      deepStrictEqual(
        new Map([
          [1, "a"],
          [2, "b"],
        ]),
        new Map([
          [1, "a"],
          [2, "b"],
        ])
      )
    ).toBe(true);
  });

  it("should return false for Maps with different elements", () => {
    expect(
      deepStrictEqual(
        new Map([
          [1, "a"],
          [2, "b"],
        ]),
        new Map([
          [1, "a"],
          [2, "c"],
        ])
      )
    ).toBe(false);
  });

  // Nested arrays, maps, and sets
  it("should return true for nested arrays", () => {
    expect(deepStrictEqual([1, [2, [3]]], [1, [2, [3]]])).toBe(true);
  });

  it("should return false for nested arrays with different elements", () => {
    expect(deepStrictEqual([1, [2, [3]]], [1, [2, [4]]])).toBe(false);
  });

  it("should return true for nested Sets", () => {
    expect(
      deepStrictEqual(
        new Set([1, new Set([2, new Set([3])])]),
        new Set([1, new Set([2, new Set([3])])])
      )
    ).toBe(true);
  });

  it("should return false for nested Sets with different elements", () => {
    expect(
      deepStrictEqual(
        new Set([1, new Set([2, new Set([3])])]),
        new Set([1, new Set([2, new Set([4])])])
      )
    ).toBe(false);
  });

  it("should return true for nested Maps", () => {
    expect(
      deepStrictEqual(
        new Map([[1, new Map([[2, new Map([[3, "value"]])]])]]),
        new Map([[1, new Map([[2, new Map([[3, "value"]])]])]])
      )
    ).toBe(true);
  });

  it("should return false for nested Maps with different elements", () => {
    expect(
      deepStrictEqual(
        new Map([[1, new Map([[2, new Map([[3, "value"]])]])]]),
        new Map([[1, new Map([[2, new Map([[3, "different"]])]])]])
      )
    ).toBe(false);
  });

  it("should return true for combinations of nested structures", () => {
    const obj1 = {
      a: [new Set([1, new Map([[2, "value"]])])],
      b: new Date("2020-01-01"),
    };
    const obj2 = {
      a: [new Set([1, new Map([[2, "value"]])])],
      b: new Date("2020-01-01"),
    };
    expect(deepStrictEqual(obj1, obj2)).toBe(true);
  });

  it("should return false for combinations of nested structures with different values", () => {
    const obj1 = {
      a: [new Set([1, new Map([[2, "value"]])])],
      b: new Date("2020-01-01"),
    };
    const obj2 = {
      a: [new Set([1, new Map([[2, "different"]])])],
      b: new Date("2020-01-01"),
    };
    expect(deepStrictEqual(obj1, obj2)).toBe(false);
  });
});
