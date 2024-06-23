"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var equality_1 = require("../../src/util/equality");
(0, vitest_1.describe)("deepStrictEqual", function () {
    // Primitive types
    (0, vitest_1.it)("should return true for equal numbers", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(1, 1)).toBe(true);
    });
    (0, vitest_1.it)("should return false for different numbers", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(1, 2)).toBe(false);
    });
    (0, vitest_1.it)("should return true for equal strings", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)("hello", "hello")).toBe(true);
    });
    (0, vitest_1.it)("should return false for different strings", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)("hello", "world")).toBe(false);
    });
    (0, vitest_1.it)("should return true for equal booleans", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(true, true)).toBe(true);
    });
    (0, vitest_1.it)("should return false for different booleans", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(true, false)).toBe(false);
    });
    (0, vitest_1.it)("should return true for equal nulls", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(null, null)).toBe(true);
    });
    (0, vitest_1.it)("should return false for null and undefined", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(null, undefined)).toBe(false);
    });
    (0, vitest_1.it)("should return true for equal undefineds", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(undefined, undefined)).toBe(true);
    });
    (0, vitest_1.it)("should return false for undefined and a number", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(undefined, 1)).toBe(false);
    });
    // Object and array types
    (0, vitest_1.it)("should return true for equal arrays", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)([1, 2, 3], [1, 2, 3])).toBe(true);
    });
    (0, vitest_1.it)("should return false for arrays with different elements", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)([1, 2, 3], [1, 2, 4])).toBe(false);
    });
    (0, vitest_1.it)("should return true for equal objects", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });
    (0, vitest_1.it)("should return false for objects with different properties", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
    });
    (0, vitest_1.it)("should return true for nested objects with same structure and values", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);
    });
    (0, vitest_1.it)("should return false for nested objects with different values", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)({ a: { b: 2 } }, { a: { b: 3 } })).toBe(false);
    });
    // Special objects and edge cases
    (0, vitest_1.it)("should return true for equal Date objects", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(new Date("2020-01-01"), new Date("2020-01-01"))).toBe(true);
    });
    (0, vitest_1.it)("should return false for different Date objects", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(new Date("2020-01-01"), new Date("2021-01-01"))).toBe(false);
    });
    (0, vitest_1.it)("should return true for equal RegExp objects", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(/abc/i, /abc/i)).toBe(true);
    });
    (0, vitest_1.it)("should return false for different RegExp objects", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(/abc/i, /abc/)).toBe(false);
    });
    (0, vitest_1.it)("should return false for different types", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(1, "1")).toBe(false);
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(1, true)).toBe(false);
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)({}, [])).toBe(false);
    });
    // NaN equality
    (0, vitest_1.it)("should return true for NaN compared to NaN", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(NaN, NaN)).toBe(true);
    });
    // Symbol comparison
    (0, vitest_1.it)("should return true for equal Symbols", function () {
        var sym1 = Symbol("foo");
        var sym2 = Symbol("foo");
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(sym1, sym1)).toBe(true);
    });
    (0, vitest_1.it)("should return false for different Symbols", function () {
        var sym1 = Symbol("foo");
        var sym2 = Symbol("foo");
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(sym1, sym2)).toBe(false);
    });
    // Sets
    (0, vitest_1.it)("should return true for equal Sets", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true);
    });
    (0, vitest_1.it)("should return false for Sets with different elements", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(new Set([1, 2, 3]), new Set([1, 2, 4]))).toBe(false);
    });
    // Maps
    (0, vitest_1.it)("should return true for equal Maps", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(new Map([
            [1, "a"],
            [2, "b"],
        ]), new Map([
            [1, "a"],
            [2, "b"],
        ]))).toBe(true);
    });
    (0, vitest_1.it)("should return false for Maps with different elements", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(new Map([
            [1, "a"],
            [2, "b"],
        ]), new Map([
            [1, "a"],
            [2, "c"],
        ]))).toBe(false);
    });
    // Nested arrays, maps, and sets
    (0, vitest_1.it)("should return true for nested arrays", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)([1, [2, [3]]], [1, [2, [3]]])).toBe(true);
    });
    (0, vitest_1.it)("should return false for nested arrays with different elements", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)([1, [2, [3]]], [1, [2, [4]]])).toBe(false);
    });
    (0, vitest_1.it)("should return true for nested Sets", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(new Set([1, new Set([2, new Set([3])])]), new Set([1, new Set([2, new Set([3])])]))).toBe(true);
    });
    (0, vitest_1.it)("should return false for nested Sets with different elements", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(new Set([1, new Set([2, new Set([3])])]), new Set([1, new Set([2, new Set([4])])]))).toBe(false);
    });
    (0, vitest_1.it)("should return true for nested Maps", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(new Map([[1, new Map([[2, new Map([[3, "value"]])]])]]), new Map([[1, new Map([[2, new Map([[3, "value"]])]])]]))).toBe(true);
    });
    (0, vitest_1.it)("should return false for nested Maps with different elements", function () {
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(new Map([[1, new Map([[2, new Map([[3, "value"]])]])]]), new Map([[1, new Map([[2, new Map([[3, "different"]])]])]]))).toBe(false);
    });
    (0, vitest_1.it)("should return true for combinations of nested structures", function () {
        var obj1 = {
            a: [new Set([1, new Map([[2, "value"]])])],
            b: new Date("2020-01-01"),
        };
        var obj2 = {
            a: [new Set([1, new Map([[2, "value"]])])],
            b: new Date("2020-01-01"),
        };
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(obj1, obj2)).toBe(true);
    });
    (0, vitest_1.it)("should return false for combinations of nested structures with different values", function () {
        var obj1 = {
            a: [new Set([1, new Map([[2, "value"]])])],
            b: new Date("2020-01-01"),
        };
        var obj2 = {
            a: [new Set([1, new Map([[2, "different"]])])],
            b: new Date("2020-01-01"),
        };
        (0, vitest_1.expect)((0, equality_1.deepStrictEqual)(obj1, obj2)).toBe(false);
    });
});
