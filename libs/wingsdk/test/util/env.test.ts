import { mkdtemp, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { describe, expect } from "vitest";
import { loadEnvVariables } from "../../src/util/env";

describe("can load env file", async () => {
  const tempdir = await mkdtemp(join(tmpdir(), "env-test"));

  const envFile = `${tempdir}/.env`;
  await writeFile(envFile, "TEST1=1\nTEST2=2\n");

  const loaded = loadEnvVariables({
    cwd: tempdir,
  })!;

  expect(loaded).toBeDefined();
  expect(loaded.TEST1).toBe("1");
  expect(loaded.TEST2).toBe("2");
});

describe("can load env file with expansion", async () => {
  const tempdir = await mkdtemp(join(tmpdir(), "env-test"));

  const envFile = `${tempdir}/.env`;
  await writeFile(envFile, "BASE_THING=hi\nOTHER_THING=${BASE_THING}_wing\n");

  const loaded = loadEnvVariables({
    cwd: tempdir,
  })!;

  expect(loaded).toBeDefined();
  expect(loaded.BASE_THING).toBe("hi");
  expect(loaded.OTHER_THING).toBe("hi_wing");
});
