import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("inflight_ref_external", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("inflight_ref_external.w");
  });
  test("wing test", async () => {
    await testTest("inflight_ref_external.w");
  });
})
