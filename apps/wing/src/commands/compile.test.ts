import { readdir, stat, writeFile, mkdtemp } from "fs/promises";
import { tmpdir } from "os";
import { join, resolve } from "path";
import { BuiltinPlatform } from "@winglang/compiler";
import { describe, test, expect } from "vitest";
import { compile } from "./compile";

const exampleDir = resolve("../../examples/tests/valid");
const exampleErrorDir = resolve("../../examples/tests/error");
const exampleSmallDir = resolve("../../examples/tests/valid/subdir2");
const exampleFilePath = join(exampleDir, "captures.test.w");

function rndTargetDir() {
  return `./target/wingtest-${Math.random().toString(36).substring(7)}`;
}

describe(
  "compile command tests",
  () => {
    test("should be able to compile the SDK capture test to sim", async () => {
      const outDir = await compile(exampleFilePath, {
        platform: [BuiltinPlatform.SIM],
        targetDir: rndTargetDir(),
      });

      const stats = await stat(outDir);
      expect(stats.isDirectory()).toBeTruthy();
      const files = (await readdir(outDir)).sort();
      expect(files.length).toBeGreaterThan(0);
      expect(files).toMatchInlineSnapshot(`
        [
          ".wing",
          "connections.json",
          "simulator.json",
          "tree.json",
        ]
      `);
    });

    test("should be able to compile the SDK capture test to tf-aws", async () => {
      const artifactDir = await compile(exampleFilePath, {
        platform: [BuiltinPlatform.TF_AWS],
        targetDir: rndTargetDir(),
      });
      const expectedFiles = ["main.tf.json", "tree.json", "connections.json"];

      const stats = await stat(artifactDir);
      expect(stats.isDirectory()).toBeTruthy();
      const files = await readdir(artifactDir);
      expect(files.length).toBeGreaterThan(0);
      expectedFiles.forEach((file) => expect(files).toContain(file));
    });

    test("should be able to compile to default target sim", async () => {
      const outDir = await compile(exampleFilePath, {
        platform: [BuiltinPlatform.SIM],
        targetDir: rndTargetDir(),
      });

      const stats = await stat(outDir);
      expect(stats.isDirectory()).toBeTruthy();
      const files = (await readdir(outDir)).sort();
      expect(files.length).toBeGreaterThan(0);
      expect(files).toMatchInlineSnapshot(`
        [
          ".wing",
          "connections.json",
          "simulator.json",
          "tree.json",
        ]
      `);
    });

    test("should be able to compile the only entrypoint file in current directory", async () => {
      const outDir = await mkdtemp(join(tmpdir(), "-wing-compile-test"));
      const prevdir = process.cwd();

      try {
        process.chdir(outDir);
        await writeFile("main.w", "bring cloud;");
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
      return expect(
        compile("non-existent-file.w", { platform: [BuiltinPlatform.SIM] })
      ).rejects.toThrowError(/Source file cannot be found/);
    });

    test("should create verbose stacktrace with DEBUG env set", async () => {
      const exampleErrorFile = join(exampleErrorDir, "bool_from_json.test.w");

      await expect(
        compile(exampleErrorFile, { platform: [BuiltinPlatform.SIM] })
      ).rejects.not.toThrowError(/wingsdk/);

      const prevDebug = process.env.DEBUG;
      process.env.DEBUG = "true";

      await expect(
        compile(exampleErrorFile, { platform: [BuiltinPlatform.SIM] })
      ).rejects.toThrowError(/wingsdk/);

      process.env.DEBUG = prevDebug;
    });

    test("should be able to compile a directory", async () => {
      const artifactDir = await compile(exampleSmallDir, {
        platform: [BuiltinPlatform.SIM],
        targetDir: rndTargetDir(),
      });

      const stats = await stat(artifactDir);
      expect(stats.isDirectory()).toBeTruthy();
    });

    test("should be able to compile a directory to tf-aws", async () => {
      const artifactDir = await compile(exampleSmallDir, {
        platform: [BuiltinPlatform.TF_AWS],
        targetDir: rndTargetDir(),
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
          platform: [BuiltinPlatform.SIM],
          targetDir: rndTargetDir(),
        });

        const stats = await stat(outDir);
        expect(stats.isDirectory()).toBeTruthy();
        const files = (await readdir(outDir)).sort();
        expect(files.length).toBeGreaterThan(0);
        expect(files).toMatchInlineSnapshot(`
          [
            ".wing",
            "connections.json",
            "simulator.json",
            "tree.json",
          ]
        `);
      } finally {
        process.chdir(oldCwd);
      }
    });

    test("should not delete files in the output directory if they are not generated by the compiler", async () => {
      const targetDir = rndTargetDir();
      const artifactDir = await compile(exampleFilePath, {
        platform: [BuiltinPlatform.TF_AWS],
        targetDir,
      });
      const expectedFiles = ["main.tf.json", "tree.json", "connections.json"];

      const files = await readdir(artifactDir);
      expect(files.length).toBeGreaterThan(0);
      expectedFiles.forEach((file) => expect(files).toContain(file));

      // create a file in the output directory
      const extraFile = join(artifactDir, "terraform.tfstate");
      await writeFile(extraFile, "hello world");

      // recompile
      const artifactDir2 = await compile(exampleFilePath, {
        platform: [BuiltinPlatform.TF_AWS],
        targetDir,
      });
      expect(artifactDir2).toBe(artifactDir);

      const files2 = await readdir(artifactDir2);
      expect(files2.length).toBeGreaterThan(0);
      expectedFiles.forEach((file) => expect(files2).toContain(file));
    });
  },
  { timeout: 1000 * 60 * 5 }
);
