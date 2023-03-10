import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("hello", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("hello.w");
  });
  test("wing test", async () => {
    await testTest("hello.w");
  });
})
