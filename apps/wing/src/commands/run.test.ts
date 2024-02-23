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
    createConsoleApp: vi.fn((options?: { requestedPort?: number; platform?: string[] }) => {
      return {
        port: options?.requestedPort ?? 1214,
        platfrom: options?.platform,
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
      requireAcceptTerms: expect.anything(),
      open: expect.anything(),
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
      requireAcceptTerms: expect.anything(),
      open: expect.anything(),
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

    await expect(run).rejects.toThrow(
      "Cannot find entrypoint files (main.w or *.main.w) in the current directory."
    );
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

    await expect(run).rejects.toThrow(
      "Cannot find entrypoint files (main.w or *.main.w) in the current directory."
    );
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

    await expect(run).rejects.toThrow(
      "Multiple entrypoints found in the current directory (foo.main.w, main.w). Please specify which one to use."
    );
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
      requireAcceptTerms: expect.anything(),
      open: expect.anything(),
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
      requireAcceptTerms: expect.anything(),
      open: expect.anything(),
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

test("wing it throws when invalid platform is used", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.main.w", "bring cloud;");

    await expect(async () => {
      await run("foo.main.w", { platform: ["anyPlatform"] });
    }).rejects.toThrowError(
      'The first platform in the list must be the sim platform (try "-t sim -t anyPlatform")'
    );
  } finally {
    process.chdir(prevdir);
  }
});

test("wing it with a custom platform runs", async () => {
  const workdir = await mkdtemp(join(tmpdir(), "-wing-it-test"));
  const prevdir = process.cwd();
  try {
    process.chdir(workdir);

    writeFileSync("foo.main.w", "bring cloud;");

    await run("foo.main.w", { platform: ["sim", "anyPlatform"] });
    expect(createConsoleApp).toBeCalledWith({
      wingfile: resolve("foo.main.w"),
      requestedPort: expect.anything(),
      hostUtils: expect.anything(),
      platform: ["sim", "anyPlatform"],
      requireAcceptTerms: expect.anything(),
      open: expect.anything(),
    });
    expect(open).toBeCalledWith("http://localhost:5000/");
  } finally {
    process.chdir(prevdir);
  }
});
