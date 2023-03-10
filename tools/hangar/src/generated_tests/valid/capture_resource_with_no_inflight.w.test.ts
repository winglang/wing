import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("capture_resource_with_no_inflight", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("capture_resource_with_no_inflight.w");
  });
  test("wing test", async () => {
    await testTest("capture_resource_with_no_inflight.w");
  });
})
