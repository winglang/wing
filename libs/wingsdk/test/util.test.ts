import { test, expect, describe } from "vitest";
import { Util } from "../src/util";

describe("env", () => {
  test("env", () => {
    expect(Util.env("NODE_ENV")).toBe("test");
  });

  test("setEnv", () => {
    Util.setEnv("FOO", "bar");
    expect(Util.env("FOO")).toBe("bar");
  });
});

describe("ulid", () => {
  test("ulid", () => {
    expect(Util.ulid()).toMatch(/^[0-9A-Z]{26}$/);
  });

  test("seed", () => {
    expect(Util.ulid({ seed: 1200 })).toMatch(/^000000015G[0-9A-Z]{16}$/);
  });
});
