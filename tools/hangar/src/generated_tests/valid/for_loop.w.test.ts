import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("for_loop", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("for_loop.w");
  });
  test("wing test", async () => {
    await testTest("for_loop.w");
  });
})
