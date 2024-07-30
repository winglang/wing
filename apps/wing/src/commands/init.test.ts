import { readdir, writeFile } from "fs/promises";
import { join } from "path";
import inquirer from "inquirer";
import { describe, expect, test, vitest, beforeEach, afterEach, vi } from "vitest";
import { test as cliTest } from "./test/test";
import { init } from "../commands/init";
import { generateTmpDir, projectTemplateNames } from "../util";

vitest.mock("inquirer");

const templates = projectTemplateNames();

describe.each(templates)("new %s --language=wing", (template) => {
  let log: any;
  beforeEach(() => {
    log = console.log;
    console.log = vi.fn();
  });

  afterEach(() => {
    console.log = log;
  });

  test(`wing new ${template} && wing test main.w`, async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    await init(template, { language: "wing" });

    await cliTest(["main.w"], {
      platform: ["sim"],
      clean: false,
    });
  });
});

describe("new --list-templates", () => {
  let log: any;
  beforeEach(() => {
    log = console.log;
    console.log = vi.fn();
  });

  afterEach(() => {
    console.log = log;
  });

  test("does not contain duplicate template names", async () => {
    await init("", { listTemplates: true });
    expect(console.log).toHaveBeenCalledWith(templates.join("\n"));

    const outputLines = (console.log as any).mock.calls[0][0].split("\n");
    const outputLinesAsSet = new Set(outputLines);

    expect(outputLines.length).toBeGreaterThan(0);
    // Check there are no duplicate lines
    expect(outputLinesAsSet.size).toBe(outputLines.length);
  });
});

describe("new empty --language=ts", () => {
  let log: any;
  beforeEach(() => {
    log = console.log;
    console.log = vi.fn();
  });

  afterEach(() => {
    console.log = log;
  });

  test(`wing new empty --language ts && wing test main.w`, async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    await init("empty", { language: "typescript" });

    await cliTest(["main.ts"], {
      platform: ["sim"],
      clean: false,
    });
  });
});

describe("new", () => {
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

  // test an invalid language
  test("wing new http-api --language=python", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    await expect(init("http-api", { language: "python" })).rejects.toThrow(/Unknown language/);
  });

  // test an unavailable language
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

  test("wing new with interactive prompt", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    (inquirer.prompt as any) = vitest.fn().mockResolvedValue({
      template: "http-api",
      language: "wing",
    });

    await init(undefined as any);

    const files = await readdir(workdir);
    expect(files).toEqual(["main.w", "package-lock.json", "package.json", "target"]);
  });
});
