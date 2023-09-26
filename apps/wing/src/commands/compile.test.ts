import { compile } from "./compile";
import { readdir, stat, writeFile } from "fs/promises";
import { describe, test, expect } from "vitest";
import { join, resolve } from "path";
import { Target } from "@winglang/compiler";
import { generateTmpDir } from "src/util";

const exampleDir = resolve("../../examples/tests/valid");
const exampleFilePath = join(exampleDir, "captures.test.w");

describe(
  "compile command tests",
  () => {
    test("should be able to compile the SDK capture test to tf-aws", async () => {
      const artifactDir = await compile(exampleFilePath, {
        target: Target.TF_AWS,
        targetDir: `${await generateTmpDir()}/target`,
      });

      const stats = await stat(artifactDir);
      expect(stats.isDirectory()).toBeTruthy();
      const files = await readdir(artifactDir);
      expect(files.length).toBeGreaterThan(0);
      expect(files).toContain("main.tf.json");
      expect(files).toContain("tree.json");
      expect(files).toContain("connections.json");
    });

    test("should be able to compile the SDK capture test to sim", async () => {
      const outDir = await compile(exampleFilePath, {
        target: Target.SIM,
        targetDir: `${await generateTmpDir()}/target`,
      });

      const stats = await stat(outDir);
      expect(stats.isDirectory()).toBeTruthy();
      const files = (await readdir(outDir)).sort();
      expect(files.length).toBeGreaterThan(0);
      expect(files).toEqual([".wing", "connections.json", "simulator.json", "tree.json"]);
    });

    test("should error if a nonexistent file is compiled", async () => {
      return expect(compile("non-existent-file.w", { target: Target.SIM })).rejects.toThrowError(
        /Source file cannot be found/
      );
    });

    // https://github.com/winglang/wing/issues/2081
    test("should be able to compile extern file from same directory", async () => {
      // temporarily change cwd to the example directory
      const oldCwd = process.cwd();
      try {
        process.chdir(exampleDir);

        // because we changed to the example directory, we can just pass the filename
        const outDir = await compile("extern_implementation.test.w", {
          target: Target.SIM,
          targetDir: `${await generateTmpDir()}/target`,
        });

        const stats = await stat(outDir);
        expect(stats.isDirectory()).toBeTruthy();
        const files = (await readdir(outDir)).sort();
        expect(files.length).toBeGreaterThan(0);
        expect(files).toEqual([".wing", "connections.json", "simulator.json", "tree.json"]);
      } finally {
        process.chdir(oldCwd);
      }
    });

    test("should not delete files in the output directory if they are not generated by the compiler", async () => {
      const targetDir = `${await generateTmpDir()}/target`;
      const artifactDir = await compile(exampleFilePath, { target: Target.TF_AWS, targetDir });

      const files = await readdir(artifactDir);
      expect(files.length).toBeGreaterThan(0);
      expect(files).toContain("main.tf.json");
      expect(files).toContain("tree.json");
      expect(files).toContain("connections.json");
      expect(files).not.toContain("terraform.tfstate");

      // create a file in the output directory
      const extraFile = join(artifactDir, "terraform.tfstate");
      await writeFile(extraFile, "hello world");

      // recompile
      const artifactDir2 = await compile(exampleFilePath, { target: Target.TF_AWS, targetDir });
      expect(artifactDir2).toBe(artifactDir);

      const files2 = await readdir(artifactDir2);
      expect(files2.length).toBeGreaterThan(0);
      expect(files2).toContain("main.tf.json");
      expect(files2).toContain("tree.json");
      expect(files2).toContain("connections.json");
      expect(files2).toContain("terraform.tfstate"); // file was not deleted
    });
  },
  { timeout: 1000 * 60 * 5 }
);
