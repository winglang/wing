import { Target, compile } from "./compile";
import { readdir, stat } from "fs/promises";

import { resolve } from "path";

jest.setTimeout(1000 * 60 * 5);

describe("compile command tests", () => {
  const exampleWingFile = resolve(
    __dirname,
    "../../../../examples/tests/valid/captures.w"
  );

  it("should be able to compile the SDK capture test to tf-aws", async () => {
    const artifactDir = await compile(exampleWingFile, {
      target: Target.TF_AWS,
    });

    const stats = await stat(artifactDir);
    expect(stats.isDirectory()).toBeTruthy();
    const files = await readdir(artifactDir);
    expect(files.length).toBeGreaterThan(0);
    expect(files).toContain("main.tf.json");
    expect(files).toContain("tree.json");
  });

  it("should be able to compile the SDK capture test to sim", async () => {
    const outDir = await compile(exampleWingFile, {
      target: Target.SIM,
    });

    // expect files to be generated in outDir
    const artifactDir = outDir;

    const stats = await stat(artifactDir);
    expect(stats.isDirectory()).toBeTruthy();
    const files = await readdir(artifactDir);
    expect(files.length).toBeGreaterThan(0);
    expect(files).toContain("captures.wsim");
  });

  it("should error if a nonexistent file is compiled", async () => {
    return expect(compile("non-existent-file.w", { target: Target.SIM }))
      .rejects.toThrowError(/Source file cannot be found/);
  });
});

