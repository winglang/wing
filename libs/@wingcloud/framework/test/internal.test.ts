import { join } from "node:path";
import { compile } from "../src/internal";
import { test, describe, expect } from "vitest";
import { readdirSync } from "node:fs";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";

const fixturesDir = join(__dirname, "fixtures");

// The fixtures directory contains a pass and fail directory.
describe("compile", async () => {
  for (const dir of ["pass", "fail"]) {
    const statusDir = join(fixturesDir, dir);
    const shouldFail = dir === "fail";

    describe(dir, async () => {
      for (const file of readdirSync(statusDir)) {
        test(
          file,
          async () => {
            const tmpDir = await mkdtemp(join(tmpdir(), `wingts.${file}`));
            const filePath = join(statusDir, file);
            await compile({
              entrypoint: filePath,
              workDir: tmpDir,
            }).catch((e) => {
              if (!shouldFail) {
                expect.fail("expected to pass: " + e);
              }
            });
          },
          {
            // The typescript compiler is quite slow, especially in CI
            timeout: 60000,
          }
        );
      }
    });
  }
});
