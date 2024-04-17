import { writeFile } from "fs/promises";
import { join } from "path";
// import inquirer from "inquirer";
import { BuiltinPlatform } from "@winglang/compiler";
import { describe, expect, test, vitest, beforeEach, afterEach, vi } from "vitest";
import { secrets } from "../commands/secrets";
import { generateTmpDir } from "../util";

vitest.mock("inquirer");

describe("secrets", () => {
  let log: any;

  beforeEach(() => {
    log = console.log;
    console.log = vi.fn();
  });

  afterEach(() => {
    console.log = log;
  });

  test("no secrets found", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    const wingCode = `
    bring cloud;
    `;

    await writeFile(join(workdir, "main.w"), wingCode);

    await secrets("main.w", {
      platform: [BuiltinPlatform.SIM],
      targetDir: workdir,
    });

    expect(console.log).toHaveBeenCalledWith("0 secret(s) found\n");
  });

  test("secrets found", async () => {
    const workdir = await generateTmpDir();
    process.chdir(workdir);

    const wingCode = `
    bring cloud;

    let s1 = new cloud.Secret(name: "my-secret") as "s1";
    let s2 = new cloud.Secret(name: "other-secret") as "s2";
    `;

    await writeFile(join(workdir, "main.w"), wingCode);

    await secrets("main.w", {
      platform: [BuiltinPlatform.SIM],
      targetDir: workdir,
      list: true,
    });

    expect(console.log).toHaveBeenCalledWith("2 secret(s) found\n");
  });
});
