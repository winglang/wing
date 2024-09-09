import { describe, test, expect } from "vitest";
import { join, resolve, basename } from "path";
import { stat, mkdtemp } from "fs/promises";
import { tmpdir } from "os";
import { BuiltinPlatform } from "./constants";
import { compile, CompileOptions } from "./compile";

const compileOrFail = async (entrypoint: string, options: CompileOptions) => {
  const result = await compile(entrypoint, options);

  if (!result.outputDir) {
    throw new Error("Compilation failed");
  }

  return result.outputDir;
};

const exampleDir = resolve("../../../tests/valid");
const exampleFilePath = join(exampleDir, "enums.test.w");

export async function generateTmpDir() {
  return mkdtemp(join(tmpdir(), "-wing-compile-test"));
}

describe("compile tests", () => {
  test("should produce stable artifacts for tf-aws", async () => {
    const targetDir = `${await generateTmpDir()}/target`;
    const artifactDir = await compileOrFail(exampleFilePath, {
      platform: [BuiltinPlatform.TF_AWS],
      targetDir,
    });

    const stats = await stat(artifactDir);
    expect(stats.isDirectory()).toBeTruthy();
    expect(artifactDir).toContain(targetDir);
    expect(basename(artifactDir)).toEqual("enums.test.tfaws");
  });

  test("should produce temp artifacts for tf-aws testing", async () => {
    const targetDir = `${await generateTmpDir()}/target`;
    const artifactDir = await compileOrFail(exampleFilePath, {
      platform: [BuiltinPlatform.TF_AWS],
      targetDir,
      testing: true,
    });

    const stats = await stat(artifactDir);
    expect(stats.isDirectory()).toBeTruthy();
    expect(artifactDir).toContain(targetDir);
    expect(basename(artifactDir).match(/enums\.test\.tfaws\.\d+$/)).toBeTruthy();
  });

  test("should produce stable artifacts for sim", async () => {
    const targetDir = `${await generateTmpDir()}/target`;
    const artifactDir = await compileOrFail(exampleFilePath, {
      platform: [BuiltinPlatform.SIM],
      targetDir,
    });

    const stats = await stat(artifactDir);
    expect(stats.isDirectory()).toBeTruthy();
    expect(artifactDir).toContain(targetDir);
    expect(basename(artifactDir)).toEqual("enums.test.wsim");
  });

  test("should produce stable artifacts for sim testing", async () => {
    const targetDir = `${await generateTmpDir()}/target`;
    const artifactDir = await compileOrFail(exampleFilePath, {
      platform: [BuiltinPlatform.SIM],
      targetDir,
      testing: true,
    });

    const stats = await stat(artifactDir);
    expect(stats.isDirectory()).toBeTruthy();
    expect(artifactDir).toContain(targetDir);
    expect(basename(artifactDir)).toEqual("enums.test.wsim");
  });

  test("should be able to override the target directory", async () => {
    const output = `${await generateTmpDir()}/a/b/dir.out`;
    const artifactDir = await compileOrFail(exampleFilePath, {
      platform: [BuiltinPlatform.SIM],
      output,
      testing: true,
    });

    const stats = await stat(artifactDir);
    expect(stats.isDirectory()).toBeTruthy();
    expect(artifactDir).toBe(output);
    expect(basename(artifactDir)).toEqual("dir.out");
  });
});
