import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("user-defined-resources-captures", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("user-defined-resources-captures.w");
  });
  test("wing test", async () => {
    await testTest("user-defined-resources-captures.w");
  });
})
