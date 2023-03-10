import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("primitive_methods", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("primitive_methods.w");
  });
  test("wing test", async () => {
    await testTest("primitive_methods.w");
  });
})
