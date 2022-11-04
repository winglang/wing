import { test, expect } from "vitest";
import "zx/globals";

const testDir = path.posix.resolve(__dirname, "../../../examples/tests");
const hangarDir = path.posix.resolve(__dirname, "..");
const tmpDir = path.posix.join(hangarDir, "tmp");
const npmCacheDir = path.posix.join(tmpDir, ".npm");

process.env.HANGAR_WING_TGZ =
  "/Users/markm/Documents/GitHub/winglang/tools/hangar/tmp/packages/wing.tgz";

const validWingFiles = fs
  .readdirSync(path.posix.join(testDir, "valid"))
  .filter((f) => f.endsWith(".w"));

test(
  "wing --version",
  async () => {
    await within(async () => {
      $.verbose = true;
      $`cd ${tmpDir}`;

      await $`mkdir -p ${npmCacheDir}`;

      let output =
        await $`npm exec --yes --cache ${npmCacheDir} file:${process.env.HANGAR_WING_TGZ} --version`;

      expect(output.stdout).toMatch(/^(\d+\.)?(\d+\.)?(\*|\d+)(-.+)?$/);

      console.log(output.stdout);
    });
  },
  {
    timeout: 1000 * 20,
  }
);

test.each(validWingFiles)(
  "wing compile %s",
  async (wingFile) => {
    await within(async () => {
      $.verbose = true;
      $`cd ${tmpDir}`;

      await $`mkdir -p ${npmCacheDir}`;

      let output =
        await $`npm exec --yes --cache ${npmCacheDir} file:${process.env.HANGAR_WING_TGZ} compile ${wingFile}`;

      console.log(output.stdout);
    });
  },
  {
    timeout: 1000 * 20,
  }
);
