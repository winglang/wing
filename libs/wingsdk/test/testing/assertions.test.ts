import { test, describe, expect } from "vitest";
import { Assert } from "../../src/testing/assert";

describe("equal string", () => {
  test("is equal", () => {
    expect(() => {
      Assert.equal("a", "a");
    }).not.toThrow();
  });

  test("is not equal", () => {
    expect(() => {
      Assert.equal("a", "b");
    }).toThrowError(new RegExp("'a' !== 'b'"));
  });
});

describe("equal number", () => {
  test("is equal", () => {
    expect(() => {
      Assert.equal(1, 1);
    }).not.toThrow();
  });

  test("is not equal", () => {
    expect(() => {
      Assert.equal(1, 2);
    }).toThrowError(new RegExp("1 !== 2"));
  });
});

describe("equal boolean", () => {
  test("is equal", () => {
    expect(() => {
      Assert.equal(true, true);
    }).not.toThrow();
  });

  test("is not equal", () => {
    expect(() => {
      Assert.equal(true, false);
    }).toThrowError(new RegExp("true !== false"));
  });
});

describe("is nil", () => {
  test("is null", () => {
    expect(() => {
      Assert.isNil(undefined);
    }).not.toThrow();
  });

  test("is not null", () => {
    expect(() => {
      Assert.isNil("not null");
    }).toThrow();
  });

  test("is not null number", () => {
    expect(() => {
      Assert.isNil(5);
    }).toThrow();
  });
});
