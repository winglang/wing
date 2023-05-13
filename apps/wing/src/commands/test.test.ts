import { describe, test, expect } from "vitest";
import { tmpTestFile } from "./compile.test";
import { checkTerraformStateIsEmpty, terraformInit } from "./test";
import { compile } from "./compile";
import { Target } from "./constants";

describe("test command tests", () => {
  test(
    "checkTerraformStateIsEmpty won't fail on a newly created folder",
    async () => {
      let error;
      const exampleWingFile = await tmpTestFile("captures.w");

      const outDir = await compile(exampleWingFile, {
        target: Target.TF_AWS,
      });
      await terraformInit(outDir);
      try {
        await checkTerraformStateIsEmpty(outDir);
      } catch (e) {
        error = e;
      }

      expect(error).toBeUndefined();
    },
    { timeout: 5 * 60 * 1000 }
  );
});
