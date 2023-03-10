import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("while", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("while.w");
  });
  test("wing test", async () => {
    await testTest("while.w");
  });
})
