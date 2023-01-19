import { Target, compile } from "../src/commands/compile";
import { readdir, rmdir, stat } from "fs/promises";

import { resolve } from "path";

jest.setTimeout(1000 * 60 * 5);

describe("compile command tests", () => {
  const cdktfOutDir = resolve(process.cwd(), "cdktf.out");
  beforeEach(async () => {
    await rmdir(cdktfOutDir, { recursive: true }).catch(() => {});
  });
  it("should be able to compile the SDK capture test", async () => {
    const sdkCaptureExample = resolve(
      __dirname,
      "../../../examples/tests/valid/captures.w"
    );
    await compile(sdkCaptureExample, {
      outDir: process.cwd(),
      target: Target.TF_AWS,
    });
    // ensure cdktfOutDir exists and has files
    const stats = await stat(cdktfOutDir);
    expect(stats.isDirectory()).toBeTruthy();
    const files = await readdir(cdktfOutDir);
    expect(files.length).toBeGreaterThan(0);
  });
});
