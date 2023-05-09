import open from "open";
import { run } from "./run";
import { mkdtemp } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { vi, test, expect } from "vitest";

vi.mock("open");

test("wing it runs the only .w file", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.w", "bring cloud;");

    await run();
    expect(open).toBeCalledWith("wing-console://" + resolve("foo.w"));
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it with no file throws error for a directory with more than 1 .w file", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.w", "bring cloud;");
    writeFileSync("bar.w", "bring cloud;");

    await expect(run).rejects.toThrow("Please specify which file you want to run");
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it with a file runs", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.w", "bring cloud;");

    await run("foo.w");
    expect(open).toBeCalledWith("wing-console://" + resolve("foo.w"));
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it with a nested file runs", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const subdir = join(workdir, "subdir");
  const filePath = join(subdir, "foo.w");
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    mkdirSync(subdir);
    writeFileSync(filePath, "bring cloud;");

    await run(filePath);
    expect(open).toBeCalledWith("wing-console://" + resolve(filePath));
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it with an invalid file throws exception", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.w", "bring cloud;");

    await expect(run("bar.w")).rejects.toThrow("bar.w doesn't exist");
  } finally {
    process.chdir(prevdir);
  }
});
