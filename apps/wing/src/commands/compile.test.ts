import { Target, compile } from "./compile";
import { readdir, stat } from "fs/promises";
import { describe, test, expect } from "vitest";
import { join, resolve } from "path";

const exampleDir = resolve("../../examples/tests/valid");
const exampleWingFile = join(exampleDir, "captures.w");

describe(
  "compile command tests",
  () => {
    test("should be able to compile the SDK capture test to tf-aws", async () => {
      const artifactDir = await compile(exampleWingFile, {
        target: Target.TF_AWS,
      });

      const stats = await stat(artifactDir);
      expect(stats.isDirectory()).toBeTruthy();
      const files = await readdir(artifactDir);
      expect(files.length).toBeGreaterThan(0);
      expect(files).toContain("main.tf.json");
      expect(files).toContain("tree.json");
    });

    test("should be able to compile the SDK capture test to sim", async () => {
      const outDir = await compile(exampleWingFile, {
        target: Target.SIM,
      });

      const stats = await stat(outDir);
      expect(stats.isDirectory()).toBeTruthy();
      const files = (await readdir(outDir)).sort();
      expect(files.length).toBeGreaterThan(0);
      expect(files).toEqual([".wing", "simulator.json", "tree.json"]);
    });

    test("should error if a nonexistent file is compiled", async () => {
      return expect(
        compile("non-existent-file.w", { target: Target.SIM })
      ).rejects.toThrowError(/Source file cannot be found/);
    });

    // https://github.com/winglang/wing/issues/2081
    test("should be able to compile extern file from same directory", async () => {
      // temporarily change cwd to the example directory
      const oldCwd = process.cwd();
      try {
        process.chdir(exampleDir);

        // because we changed to the example directory, we can just pass the filename
        const outDir = await compile("extern_implementation.w", {
          target: Target.SIM,
        });

        const stats = await stat(outDir);
        expect(stats.isDirectory()).toBeTruthy();
        const files = (await readdir(outDir)).sort();
        expect(files.length).toBeGreaterThan(0);
        expect(files).toEqual([".wing", "simulator.json", "tree.json"]);
      } finally {
        process.chdir(oldCwd);
      }
    });
  },
  { timeout: 1000 * 60 * 5 }
);
