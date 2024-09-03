import { mkdtemp, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { describe, expect, it } from "vitest";
import { loadEnvVariables } from "../src/helpers.ts";

describe("loadEnvVariables", () => {
  it("should load env file", async () => {
    const tempdir = await mkdtemp(join(tmpdir(), "env-test"));

    const envFile = `${tempdir}/.env`;
    await writeFile(envFile, "TEST1=1\nTEST2=2\n");

    const loaded = loadEnvVariables({
      cwd: tempdir,
      modes: ["test"],
    })!;

    expect(loaded).toBeDefined();
    expect(loaded.TEST1).toBe("1");
    expect(loaded.TEST2).toBe("2");
  });

  it("can load env file with expansion", async () => {
    const tempdir = await mkdtemp(join(tmpdir(), "env-test"));

    const envFile = `${tempdir}/.env`;
    await writeFile(envFile, "BASE_THING=hi\nOTHER_THING=${BASE_THING}_wing\n");

    const loaded = loadEnvVariables({
      cwd: tempdir,
      modes: ["test"],
    })!;

    expect(loaded).toBeDefined();
    expect(loaded.BASE_THING).toBe("hi");
    expect(loaded.OTHER_THING).toBe("hi_wing");
  });

  it("can load local and mode env files", async () => {
    const tempdir = await mkdtemp(join(tmpdir(), "env-test"));

    await writeFile(`${tempdir}/.env`, "TEST1=1\n");
    await writeFile(`${tempdir}/.env.local`, "TEST2=2\n");
    await writeFile(`${tempdir}/.env.run`, "TEST3=3\n");
    await writeFile(`${tempdir}/.env.run.local`, "TEST4=4\n");
    await writeFile(`${tempdir}/.env.it`, "TEST5=5\n");
    await writeFile(`${tempdir}/.env.it.local`, "TEST6=6\n");

    const loaded = loadEnvVariables({
      cwd: tempdir,
      modes: ["run", "it"],
    })!;

    expect(loaded).toBeDefined();
    expect(loaded.TEST1).toBe("1");
    expect(loaded.TEST2).toBe("2");
    expect(loaded.TEST3).toBe("3");
    expect(loaded.TEST4).toBe("4");
    expect(loaded.TEST5).toBe("5");
    expect(loaded.TEST6).toBe("6");
  });
});
