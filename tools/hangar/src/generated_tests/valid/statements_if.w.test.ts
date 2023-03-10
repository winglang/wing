import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("statements_if", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("statements_if.w");
  });
  test("wing test", async () => {
    await testTest("statements_if.w");
  });
})
