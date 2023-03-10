import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("anon_function", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("anon_function.w");
  });
  test("wing test", async () => {
    await testTest("anon_function.w");
  });
})
