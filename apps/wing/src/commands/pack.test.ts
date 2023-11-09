import * as fs from "fs/promises";
import { join } from "path";
import { describe, it, expect, afterEach, vi } from "vitest";
import { pack } from "./pack";
import { exec, generateTmpDir } from "../util";

const fixturesDir = join(__dirname, "..", "..", "fixtures");
const goodFixtureDir = join(__dirname, "..", "..", "..", "..", "examples", "wing-fixture");

console.log = vi.fn();

describe("wing pack", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("throws an error if a project is missing package.json", async () => {
    const projectDir = join(fixturesDir, "invalid1");
    const outdir = await generateTmpDir();
    process.chdir(projectDir);
    await expect(pack({ outfile: join(outdir, "tarball.tgz") })).rejects.toThrow(
      /No package.json found in the current directory./
    );
    await expectNoTarball(outdir);
  });

  it("throws an error if package.json is missing a required field", async () => {
    const projectDir = join(fixturesDir, "invalid2");
    const outdir = await generateTmpDir();
    process.chdir(projectDir);

    await expect(pack({ outfile: join(outdir, "tarball.tgz") })).rejects.toThrow(
      /Missing required field "license" in package.json/
    );
    await expectNoTarball(outdir);
  });

  it("throws an error if the project doesn't compile", async () => {
    const projectDir = join(fixturesDir, "invalid3");
    const outdir = await generateTmpDir();
    process.chdir(projectDir);

    await expect(pack({ outfile: join(outdir, "tarball.tgz") })).rejects.toThrow(/Expected ';'/);
    await expectNoTarball(outdir);
  });

  it("throws an error if necessary wing files are excluded by package.json", async () => {
    // invalid4's package.json contains this:
    // {
    //   ...
    //   "files": [
    //     "!file1.w"
    //   ]
    // }
    const projectDir = join(fixturesDir, "invalid4");
    const outdir = await generateTmpDir();
    process.chdir(projectDir);

    await expect(pack()).rejects.toThrow(/Cannot find module ".\/file1.w"/);
    await expectNoTarball(outdir);
  });

  it("includes extra files specified by package.json", async () => {
    // valid1's package.json contains this:
    // {
    //   ...
    //   "files": [
    //     "**/*.ts"
    //   ]
    // }

    // GIVEN
    const projectDir = join(fixturesDir, "valid1");
    const outdir = await generateTmpDir();
    process.chdir(projectDir);

    // WHEN
    await pack({ outfile: join(outdir, "tarball.tgz") });

    // THEN
    const tarballContents = await extractTarball(join(outdir, "tarball.tgz"), outdir);
    expect(tarballContents["util.ts"]).toBeDefined();
  });

  it("excludes files in /target from the packaged tarball", async () => {
    const projectDir = join(fixturesDir, "valid1");
    const outdir = await generateTmpDir();

    // copy everything to the output directory to sandbox this test
    await exec(`cp -r ${projectDir}/* ${outdir}`);
    process.chdir(outdir);

    // create a file in /target
    await fs.mkdir("target");
    await fs.writeFile("target/index.js", "console.log('hello world');");

    await pack({ outfile: join(outdir, "tarball.tgz") });
    const tarballContents = await extractTarball(join(outdir, "tarball.tgz"), outdir);
    expect(tarballContents["target/index.js"]).toBeUndefined();
  });

  it("packages a valid Wing project to a default path", async () => {
    // GIVEN
    const outdir = await generateTmpDir();
    // copy everything to the output directory to sandbox this test
    await exec(`cp -r ${goodFixtureDir}/* ${outdir}`);
    process.chdir(outdir);

    // WHEN
    await pack();

    // THEN
    const files = await fs.readdir(outdir);
    expect(files.filter((path) => path.endsWith(".tgz")).length).toEqual(1);
    const tarballPath = files.find((path) => path.endsWith(".tgz"))!;
    const tarballContents = await extractTarball(join(outdir, tarballPath), outdir);

    const expectedFiles = ["index.js", "README.md", "package.json", "store.w"];
    for (const file of expectedFiles) {
      expect(tarballContents[file]).toBeDefined();
    }

    const pkgJson = JSON.parse(tarballContents["package.json"]);
    expect(pkgJson.name).toEqual("@winglibs/testfixture");
    expect(pkgJson.keywords.includes("winglang")).toBe(true);
    expect(pkgJson.engines.wing).toEqual("*");
    expect(pkgJson.wing).toEqual(true);
  });

  it("packages a valid Wing project to a user-specified path", async () => {
    // GIVEN
    const projectDir = goodFixtureDir;
    const outdir = await generateTmpDir();
    process.chdir(projectDir);

    // WHEN
    await pack({ outfile: join(outdir, "tarball.tgz") });

    // THEN
    const files = await fs.readdir(outdir);
    expect(files.filter((path) => path.endsWith(".tgz")).length).toEqual(1);
    const tarballPath = files.find((path) => path.endsWith(".tgz"))!;
    const tarballContents = await extractTarball(join(outdir, tarballPath), outdir);

    const expectedFiles = [
      "index.js",
      "README.md",
      "LICENSE",
      "package.json",
      "store.w",
      "enums.w",
      "subdir/util.w",
      "util.js",
      // util.ts - TypeScript files are not included by default
    ];
    expect(Object.keys(tarballContents).sort()).toEqual(expectedFiles.sort());

    const pkgJson = JSON.parse(tarballContents["package.json"]);
    expect(pkgJson.name).toEqual("@winglibs/testfixture");
    expect(pkgJson.keywords.includes("winglang")).toBe(true);
    expect(pkgJson.engines.wing).toEqual("*");
    expect(pkgJson.wing).toEqual(true);
  });
});

/**
 * Asserts that no tarball was created in the specified directory.
 */
async function expectNoTarball(projectDir: string) {
  const files = await fs.readdir(projectDir);
  expect(files.findIndex((path) => path.endsWith(".tgz"))).toEqual(-1);
}

async function extractTarball(src: string, outdir: string): Promise<Record<string, string>> {
  await exec(`tar -xzf ${src} -C ${outdir}`);
  const contents: Record<string, string> = {};

  // when you extract an npm tarball, it creates a directory called "package"
  const base = join(outdir, "package");

  async function readDir(dir: string) {
    const files = await fs.readdir(join(base, dir));
    for (const file of files) {
      const path = join(base, dir, file);
      const stat = await fs.stat(path);
      if (stat.isDirectory()) {
        await readDir(join(dir, file));
      } else {
        contents[join(dir, file)] = (await fs.readFile(path)).toString();
      }
    }
  }
  await readDir(".");

  return contents;
}
