import open from "open";
import { createConsoleApp } from "@wingconsole/app";
import { run } from "./run";
import { mkdtemp } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { vi, test, expect } from "vitest";

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

test("wing it runs the only entrypoint file named main.w", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("main.w", "bring cloud;");

    await run();
    expect(createConsoleApp).toBeCalledWith({
      wingfile: resolve("main.w"),
      requestedPort: 3000,
      hostUtils: expect.anything(),
      requireAcceptTerms: false,
    });
    expect(open).toBeCalledWith("http://localhost:3000/");
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it runs the only entrypoint file ending with .main.w", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.main.w", "bring cloud;");

    await run();
    expect(createConsoleApp).toBeCalledWith({
      wingfile: resolve("foo.main.w"),
      requestedPort: 3000,
      hostUtils: expect.anything(),
      requireAcceptTerms: false,
    });
    expect(open).toBeCalledWith("http://localhost:3000/");
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it doesn't run the only entrypoint file ending with .test.w", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.test.w", "bring cloud;");

    await expect(run).rejects.toThrow("Please specify which file you want to run");
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it throws error for a directory with a non-entrypoint file", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.w", "bring cloud;");

    await expect(run).rejects.toThrow("Please specify which file you want to run");
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it throws error for a directory with more than one entrypoint file", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("main.w", "bring cloud;");
    writeFileSync("foo.main.w", "bring cloud;");

    await expect(run).rejects.toThrow("Please specify which file you want to run");
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it with a nested file runs", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const subdir = join(workdir, "subdir");
  const filePath = join(subdir, "foo.main.w");
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

    writeFileSync("foo.main.w", "bring cloud;");

    await expect(run("bar.main.w")).rejects.toThrow("bar.main.w doesn't exist");
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it with a custom port runs", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.main.w", "bring cloud;");

    await run("foo.main.w", { port: "5000" });
    expect(createConsoleApp).toBeCalledWith({
      wingfile: resolve("foo.main.w"),
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

    writeFileSync("foo.main.w", "bring cloud;");

    await expect(async () => {
      await run("foo.main.w", { port: "not a number" });
    }).rejects.toThrowError('"not a number" is not a number');
  } finally {
    process.chdir(prevdir);
  }
});
