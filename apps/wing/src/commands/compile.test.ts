import { writeFileSync } from "fs";
import { readdir, stat, writeFile, mkdtemp } from "fs/promises";
import { tmpdir } from "os";
import { join, resolve } from "path";
import { Target } from "@winglang/compiler";
import { describe, test, expect } from "vitest";
import { compile } from "./compile";
import { generateTmpDir } from "src/util";

const exampleDir = resolve("../../examples/tests/valid");
const exampleSmallDir = resolve("../../examples/tests/valid/subdir2");
const exampleFilePath = join(exampleDir, "captures.test.w");
const exampleFilePath2 = join(exampleDir, "capture_primitives.test.w");

describe(
  "compile command tests",
  () => {
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

    test("should be able to compile the SDK capture primitives test to awscdk", async () => {
      process.env.CDK_STACK_NAME = "compile-test-stack";

      const artifactDir = await compile(examplefilepath2, {
        target: Target.AWSCDK,
        targetDir: `${await generateTmpDir()}/target`,
      });

      const stats = await stat(artifactDir);
      expect(stats.isDirectory()).toBeTruthy();
      const files = await readdir(artifactDir);
      expect(files.length).toBeGreaterThan(0);
      expect(files).toContain("compile-test-stack.assets.json");
      expect(files).toContain("compile-test-stack.template.json");
      expect(files).toContain("tree.json");
      expect(files).toContain("connections.json");
    });

    test("should be able to compile to default target sim", async () => {
      const outDir = await compile(exampleFilePath, {
        targetDir: `${await generateTmpDir()}/target`,
      });

      const stats = await stat(outDir);
      expect(stats.isDirectory()).toBeTruthy();
      const files = (await readdir(outDir)).sort();
      expect(files.length).toBeGreaterThan(0);
      expect(files).toEqual([".wing", "connections.json", "simulator.json", "tree.json"]);
    });

    test("should be able to compile the only entrypoint file in current directory", async () => {
      const outDir = await mkdtemp(join(tmpdir(), "-wing-compile-test"));
      const prevdir = process.cwd();

      try {
        process.chdir(outDir);
        writeFileSync("main.w", "bring cloud;");
        await compile();

        const stats = await stat(outDir);
        expect(stats.isDirectory()).toBeTruthy();
        const files = (await readdir(outDir)).sort();
        expect(files.length).toBeGreaterThan(0);
        expect(files).toEqual(["main.w", "target"]);
      } finally {
        process.chdir(prevdir);
      }
    });

    test("should error if a nonexistent file is compiled", async () => {
      return expect(compile("non-existent-file.w", { target: Target.SIM })).rejects.toThrowError(
        /Source file cannot be found/
      );
    });

    test("should be able to compile a directory", async () => {
      const artifactDir = await compile(exampleSmallDir, {
        target: Target.SIM,
        targetDir: `${await generateTmpDir()}/target`,
      });

      const stats = await stat(artifactDir);
      expect(stats.isDirectory()).toBeTruthy();
    });

    test("should be able to compile a directory to tf-aws", async () => {
      const artifactDir = await compile(exampleSmallDir, {
        target: Target.TF_AWS,
        targetDir: `${await generateTmpDir()}/target`,
      });

      const stats = await stat(artifactDir);
      expect(stats.isDirectory()).toBeTruthy();
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
