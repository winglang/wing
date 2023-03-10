import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("captures", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("captures.w");
  });
  test("wing test", async () => {
    await testTest("captures.w");
  });
})
