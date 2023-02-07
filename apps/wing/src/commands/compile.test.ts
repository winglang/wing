import { Target, compile } from "./compile";
import { readdir, stat } from "fs/promises";

import { join, resolve } from "path";
import { mkdtempSync } from "fs";
import { tmpdir } from "os";

jest.setTimeout(1000 * 60 * 5);

describe("compile command tests", () => {
  const exampleWingFile = resolve(
    __dirname,
    "../../../../examples/tests/valid/captures.w"
  );

  it("should be able to compile the SDK capture test to tf-aws", async () => {
    const outDir = mkdtemp();
    await compile(exampleWingFile, {
      outDir,
      target: Target.TF_AWS,
    });

    // expect files to be generated in outDir/captures.tfaws
    const artifactDir = join(outDir, "captures.tfaws");

    const stats = await stat(artifactDir);
    expect(stats.isDirectory()).toBeTruthy();
    const files = await readdir(artifactDir);
    expect(files.length).toBeGreaterThan(0);
    expect(files).toContain("main.tf.json");
    expect(files).toContain("tree.json");
  });

  it("should be able to compile the SDK capture test to sim", async () => {
    const outDir = mkdtemp();
    await compile(exampleWingFile, {
      outDir: outDir,
      target: Target.SIM,
    });

    // expect files to be generated in outDir
    const artifactDir = outDir;

    const stats = await stat(artifactDir);
    expect(stats.isDirectory()).toBeTruthy();
    const files = await readdir(artifactDir);
    expect(files.length).toBeGreaterThan(0);
    expect(files).toContain("captures.wsim");
    expect(files).toContain("tree.json");
  });
});

function mkdtemp() {
  return mkdtempSync(join(tmpdir(), "wingcli-tests."));
}