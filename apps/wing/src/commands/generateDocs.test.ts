import * as fs from "fs/promises";
import { basename, join } from "path";
import { describe, it, expect, afterEach, vi } from "vitest";
import { generateDocs } from "./generateDocs";

const fixturesDir = join(__dirname, "..", "..", "fixtures");

console.log = vi.fn();

describe("wing gen-docs", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws an error if a project is missing package.json", async () => {
    // GIVEN
    const projectDir = join(fixturesDir, "invalid1");
    process.chdir(projectDir);

    // THEN
    await expect(generateDocs()).rejects.toThrow("No package.json found in project directory");
    await expectNoDocs(projectDir);
  });

  it("generates docs for a Wing library", async () => {
    // GIVEN
    const projectDir = join(fixturesDir, "valid1");
    process.chdir(projectDir);

    await fs.rm(join(projectDir, "API.md"));

    // WHEN
    await generateDocs();
    
    // THEN
    const files = await fs.readdir(projectDir);
    expect(files.findIndex((path) => basename(path) === "API.md")).not.toEqual(-1);
    const apiMd = await fs.readFile(join(projectDir, "API.md"), "utf8");
    expect(apiMd).toContain("Foo");
  });
});

/**
 * Asserts that no docs were created in the specified directory.
 */
async function expectNoDocs(projectDir: string) {
  const files = await fs.readdir(projectDir);
  expect(files.findIndex((path) => basename(path) === "API.md")).toEqual(-1);
}
