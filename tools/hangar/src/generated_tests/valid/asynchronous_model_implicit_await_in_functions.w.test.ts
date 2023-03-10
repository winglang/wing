import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("asynchronous_model_implicit_await_in_functions", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("asynchronous_model_implicit_await_in_functions.w");
  });
  test("wing test", async () => {
    await testTest("asynchronous_model_implicit_await_in_functions.w");
  });
})
