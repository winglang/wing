import { test, expect, describe } from "vitest";
import { path } from "../src/helpers";

describe("helpers", () => {
  describe("path", () => {
    test("simple", () => {
      const p = path("/my/outdir", "..", "package.json");

      expect(p).toBe("/my/package.json");
    });

    test("absolute", () => {
      expect(() => path("/my/outdir", "..", "/package.json")).toThrow(
        "Provided path must be relative but received an absolute path: /package.json"
      );
    });

    test("empty", () => {
      const p = path("/my/outdir", "..", "");

      expect(p).toBe("/my");
    });

    test("dot", () => {
      const p = path("/my/outdir", "..", ".");

      expect(p).toBe("/my");
    });

    test("dot slash", () => {
      const p = path("/my/outdir", "..", "./");

      expect(p).toBe("/my");
    });

    test("double dot", () => {
      const p = path("/my/outdir", "..", "..");

      expect(p).toBe("/");
    });
  });
});
