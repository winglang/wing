import { readdir, writeFile } from "fs/promises";
import { join } from "path";
import inquirer from "inquirer";
import { describe, it, expect, test, vitest, beforeEach, afterEach, vi } from "vitest";
import { init, initTemplateNames } from "../commands/init";
import { generateTmpDir } from "src/util";

vitest.mock("inquirer");

describe("initTemplateNames", () => {
  it("should list init templates", () => {
    expect(initTemplateNames()).toMatchSnapshot();
  });
});

describe("init", () => {
  let log: any;
  beforeEach(() => {
    log = console.log;
    console.log = vi.fn();
  });

  afterEach(() => {
    console.log = log;
  });

  test("wing new invalid-template", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    await expect(init("invalid-template")).rejects.toThrow(
      /Template "invalid-template" is not available/
    );
  });

  test("wing new http-api --language=python", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    await expect(init("http-api", { language: "python" })).rejects.toThrow(/Unknown language/);
  });

  test("wing new http-api --language=typescript", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    await expect(init("http-api", { language: "typescript" })).rejects.toThrow(
      /Template "http-api" is not available in typescript/
    );
  });

  test("wing new with conflicting file", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    // write a conflicting file
    await writeFile(join(workdir, "main.w"), "hello");

    await expect(init("http-api", { language: "wing" })).rejects.toThrow(
      /The following files already exist in the current directory and will be overwritten/
    );
  });

  test("wing new http-api --language wing", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    await init("http-api", { language: "wing" });

    const files = await readdir(workdir);
    expect(files).toEqual(["main.w"]);
  });

  test("wing new with interactive prompt", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    (inquirer.prompt as any) = vitest.fn().mockResolvedValue({
      template: "http-api",
      language: "wing",
    });

    await init(undefined as any);

    const files = await readdir(workdir);
    expect(files).toEqual(["main.w"]);
  });
});
