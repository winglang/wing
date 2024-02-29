import { join } from "node:path";
import { compile } from "../src/internal";
import { test, describe, expect } from "vitest";
import { readdirSync } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";

const fixturesDir = join(__dirname, "fixtures");

// add custom serializer to remove ansi sequences from error messages
expect.addSnapshotSerializer({
  test: (val) => val instanceof Error,
  serialize: (val) => val.toString().replace(/\u001b\[.*?m/g, ""),
});

// The fixtures directory contains a pass and fail directory.
describe("compile", async () => {
  for (const dir of ["pass", "fail"]) {
    const statusDir = join(fixturesDir, dir);
    const shouldFail = dir === "fail";

    describe(dir, async () => {
      for (const file of readdirSync(statusDir).filter((f) =>
        f.endsWith(".ts")
      )) {
        test(
          file,
          async () => {
            const tmpDir = await mkdtemp(join(tmpdir(), `wingts.${file}`));
            const filePath = join(statusDir, file);
            let compilePromise = compile({
              entrypoint: filePath,
              workDir: tmpDir,
            });

            if (shouldFail) {
              await expect(compilePromise).rejects.toThrowErrorMatchingSnapshot();
            } else {
              await compilePromise;
            }
          },
          {
            // The typescript compiler is quite slow, especially in CI
            // See https://github.com/winglang/wing/issues/5676
            timeout: 60000,
          }
        );
      }
    });
  }
});
