import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("bucket_keys", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("bucket_keys.w");
  });
  test("wing test", async () => {
    await testTest("bucket_keys.w");
  });
})
