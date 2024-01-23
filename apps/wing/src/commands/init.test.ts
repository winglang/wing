import { readdir, writeFile } from "fs/promises";
import { join } from "path";
import { describe, it, expect, test } from "vitest";
import { init, initTemplateNames } from "../commands/init";
import { generateTmpDir } from "src/util";

describe("initTemplateNames", () => {
  it("should list init templates", () => {
    expect(initTemplateNames()).toMatchSnapshot();
  });
});

describe("init", () => {
  test("wing new", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    await expect(init(undefined as any)).rejects.toThrow(
      /Please select from one of the available choices/
    );
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
    expect(files).toMatchSnapshot();
  });
});
