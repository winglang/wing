import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("try_catch", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("try_catch.w");
  });
  test("wing test", async () => {
    await testTest("try_catch.w");
  });
})
