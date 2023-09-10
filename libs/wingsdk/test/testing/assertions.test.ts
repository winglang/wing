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
    }).toThrowError(new RegExp("'a' !== 'b'"));
  });
});

describe("numEqual", () => {
  test("is equal", () => {
    expect(() => {
      Assert.numEqual(1, 1);
    }).not.toThrow();
  });

  test("is not equal", () => {
    expect(() => {
      Assert.numEqual(1, 2);
    }).toThrowError(new RegExp("1 !== 2"));
  });
});

describe("strIsNil", () => {
  test("is null", () => {
    expect(() => {
      Assert.strIsNil(undefined);
    }).not.toThrow();
  });

  test("is not null", () => {
    expect(() => {
      Assert.strIsNil("not null");
    }).toThrow();
  });
});

describe("numIsNil", () => {
  test("is null", () => {
    expect(() => {
      Assert.numIsNil(undefined);
    }).not.toThrow();
  });

  test("is not null", () => {
    expect(() => {
      Assert.numIsNil(1);
    }).toThrow();
  });
});
