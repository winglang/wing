import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("reassignment", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("reassignment.w");
  });
  test("wing test", async () => {
    await testTest("reassignment.w");
  });
})
