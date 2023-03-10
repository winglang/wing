import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("inflight_ref_resource_sub_method", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("inflight_ref_resource_sub_method.w");
  });
  test("wing test", async () => {
    await testTest("inflight_ref_resource_sub_method.w");
  });
})
