import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("test_bucket", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("test_bucket.w");
  });
  test("wing test", async () => {
    await testTest("test_bucket.w");
  });
})
