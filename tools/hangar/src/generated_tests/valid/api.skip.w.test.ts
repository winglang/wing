import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("api.skip", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("api.skip.w");
  });
  test("wing test", async () => {
    await testTest("api.skip.w");
  });
})
