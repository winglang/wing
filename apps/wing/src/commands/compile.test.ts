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
    const tmpdir = mkdtemp();
    await compile(exampleWingFile, {
      outDir: tmpdir,
      target: Target.TF_AWS,
    });

    const artifactDir = join(tmpdir, "captures.tfaws");

    // expect files to be generated in outDir/captures.tfaws
    const stats = await stat(artifactDir);
    expect(stats.isDirectory()).toBeTruthy();
    const files = await readdir(artifactDir);
    expect(files.length).toBeGreaterThan(0);
    expect(files).toContain("main.tf.json");
    expect(files).toContain("tree.json");
  });

  it("should be able to compile the SDK capture test to sim", async () => {
    const tmpdir = mkdtemp();
    await compile(exampleWingFile, {
      outDir: tmpdir,
      target: Target.SIM,
    });

    const artifactDir = join(tmpdir, "captures.sim");

    // expect files to be generated in outDir/captures.sim
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