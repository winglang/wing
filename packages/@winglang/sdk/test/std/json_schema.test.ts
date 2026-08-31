import { test, expect } from "vitest";
import { JsonSchema } from "../../src/std/json_schema";

test("fromJson converts top-level duration and regex fields", () => {
  const schema = new JsonSchema({
    $id: "/MyStruct",
    type: "object",
    properties: {
      field1: { type: "string", format: "duration" },
      field2: { type: "string" },
      field3: { type: "string", format: "regex" },
    },
    required: ["field1", "field2", "field3"],
  });

  const result: any = schema._fromJson({
    field1: "6000",
    field2: "hi",
    field3: "/p[a-z]+ch/",
  });

  expect(result.field1.milliseconds).toBe(6000);
  expect(result.field2).toBe("hi");
  expect(result.field3.test("punch")).toBe(true);
  expect(result.field3.test("reach")).toBe(false);
});

test("fromJson converts duration/regex fields nested in structs, arrays, maps, and optionals", () => {
  const schema = new JsonSchema({
    $id: "/MyStruct",
    type: "object",
    properties: {
      inner: {
        type: "object",
        properties: {
          d: { type: "string", format: "duration" },
        },
        required: ["d"],
      },
      arr: {
        type: "array",
        items: { type: "string", format: "regex" },
      },
      map: {
        type: "object",
        patternProperties: { ".*": { type: "string", format: "duration" } },
      },
      opt: { oneOf: [{ type: "null" }, { type: "string", format: "regex" }] },
    },
    required: ["inner", "arr", "map"],
  });

  const result: any = schema._fromJson({
    inner: { d: "1000" },
    arr: ["/ab+c/", "/[0-9]+/"],
    map: { a: "5000", b: "2000" },
    opt: "/x+y/",
  });

  expect(result.inner.d.milliseconds).toBe(1000);
  expect(result.arr[0].test("abbbc")).toBe(true);
  expect(result.arr[1].test("123")).toBe(true);
  expect(result.map.a.milliseconds).toBe(5000);
  expect(result.map.b.milliseconds).toBe(2000);
  expect(result.opt.test("xxy")).toBe(true);
});

test("fromJson leaves primitive fields untouched", () => {
  const schema = new JsonSchema({
    $id: "/MyStruct",
    type: "object",
    properties: {
      s: { type: "string" },
      n: { type: "number" },
      b: { type: "boolean" },
    },
    required: ["s", "n", "b"],
  });

  const result: any = schema._fromJson({ s: "hi", n: 5, b: true });
  expect(result.s).toBe("hi");
  expect(result.n).toBe(5);
  expect(result.b).toBe(true);
});
