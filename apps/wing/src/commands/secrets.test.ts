import { writeFile } from "fs/promises";
import { join } from "path";
// import inquirer from "inquirer";
import { BuiltinPlatform } from "@winglang/compiler";
import { describe, expect, test, vitest, beforeEach, afterEach, vi } from "vitest";
import { generateTmpDir } from "../util";
import { secrets } from "../commands/secrets";

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

    expect(console.log).toHaveBeenCalledWith("0 secrets(s) found in main.w\n");
  })

});