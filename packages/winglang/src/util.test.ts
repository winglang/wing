import { describe, test, expect } from "vitest";
import { flattenObject } from "./util";

describe("flattenObject", () => {
  test("flattening an empty object", () => {
    expect(flattenObject({})).toEqual({});
  });

  test("flattening object with two levels of nesting", () => {
    expect(flattenObject({ a: { a: "b", c: "a" }, n: { a: 1 }, b: "b" })).toEqual({
      a_a: "b",
      a_c: "a",
      b: "b",
      n_a: 1,
    });
  });

  test("flattening object with two levels of nesting", () => {
    expect(flattenObject({ a: { a: "b", c: "a", d: { e: "f" } }, n: { a: 1 }, b: "b" })).toEqual({
      a_a: "b",
      a_c: "a",
      b: "b",
      a_d_e: "f",
      n_a: 1,
    });
  });

  test("flattening an empty", () => {
    expect(flattenObject({ a: [] })).toEqual({});
  });

  test("flattening array with two levels of nesting", () => {
    expect(flattenObject({ a: ["a", { b: "c" }] })).toEqual({ a_0: "a", a_1_b: "c" });
  });

  test("flattening object with three levels of nesting", () => {
    expect(flattenObject({ a: ["a", { b: "c", d: ["e", { f: "g" }] }] })).toEqual({
      a_0: "a",
      a_1_b: "c",
      a_1_d_0: "e",
      a_1_d_1_f: "g",
    });
  });
});
