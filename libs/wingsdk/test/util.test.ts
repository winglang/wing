import { test, expect, describe } from "vitest";
import { Util } from "../src/util";

describe("env", () => {
  test("env", () => {
    expect(Util.env("NODE_ENV")).toBe("test");
  });
});
