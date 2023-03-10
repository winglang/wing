import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("inflight_ref_unknown_op", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("inflight_ref_unknown_op.w");
  });
  test("wing test", async () => {
    await testTest("inflight_ref_unknown_op.w");
  });
})
