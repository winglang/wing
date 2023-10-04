import { mkdirSync, writeFileSync } from "fs";
import { mkdtemp } from "fs/promises";
import { tmpdir } from "os";
import { join, resolve } from "path";
import { createConsoleApp } from "@wingconsole/app";
import open from "open";
import { vi, test, expect } from "vitest";
import { run } from "./run";

vi.mock("open");

vi.mock("@wingconsole/app", () => {
  return {
    createConsoleApp: vi.fn((options?: { requestedPort?: number }) => {
      return {
        port: options?.requestedPort ?? 1214,
      };
    }),
  };
});

test("wing it runs the only .w file", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.w", "bring cloud;");

    await run();
    expect(createConsoleApp).toBeCalledWith({
      wingfile: resolve("foo.w"),
      requestedPort: 3000,
      hostUtils: expect.anything(),
      requireAcceptTerms: false,
    });
    expect(open).toBeCalledWith("http://localhost:3000/");
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
    expect(createConsoleApp).toBeCalledWith({
      wingfile: resolve("foo.w"),
      requestedPort: 3000,
      hostUtils: expect.anything(),
      requireAcceptTerms: false,
    });
    expect(open).toBeCalledWith("http://localhost:3000/");
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
    expect(createConsoleApp).toBeCalledWith({
      wingfile: resolve(filePath),
      requestedPort: 3000,
      hostUtils: expect.anything(),
      requireAcceptTerms: false,
    });
    expect(open).toBeCalledWith("http://localhost:3000/");
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

test("wing it with a custom port runs", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.w", "bring cloud;");

    await run("foo.w", { port: "5000" });
    expect(createConsoleApp).toBeCalledWith({
      wingfile: resolve("foo.w"),
      requestedPort: 5000,
      hostUtils: expect.anything(),
      requireAcceptTerms: false,
    });
    expect(open).toBeCalledWith("http://localhost:5000/");
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it throws when invalid port number is used", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.w", "bring cloud;");

    await expect(async () => {
      await run("foo.w", { port: "not a number" });
    }).rejects.toThrowError('"not a number" is not a number');
  } finally {
    process.chdir(prevdir);
  }
});
