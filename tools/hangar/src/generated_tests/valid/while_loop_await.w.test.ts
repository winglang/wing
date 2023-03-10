import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("while_loop_await", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("while_loop_await.w");
  });
  test("wing test", async () => {
    await testTest("while_loop_await.w");
  });
})
