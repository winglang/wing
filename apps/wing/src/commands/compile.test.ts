import { readdir, rmdir, stat } from "fs/promises";

import { compile } from "./compile";
import { resolve } from "path";

describe("compile command tests", () => {
  const cdktfOutDir = resolve(process.cwd(), "cdktf.out");
  beforeEach(async () => {
    await rmdir(cdktfOutDir, { recursive: true }).catch(() => {});
  });
  it("should be able to compile the SDK capture test", async () => {
    const sdkCaptureExample = resolve(
      __dirname,
      "../../../../examples/simple/sdk_capture_test.w"
    );
    await compile(sdkCaptureExample, {
      outDir: process.cwd(),
      target: "tf-aws",
    });
    // ensure cdktfOutDir exists and has files
    const stats = await stat(cdktfOutDir);
    expect(stats.isDirectory()).toBeTruthy();
    const files = await readdir(cdktfOutDir);
    expect(files.length).toBeGreaterThan(0);
  });
});
