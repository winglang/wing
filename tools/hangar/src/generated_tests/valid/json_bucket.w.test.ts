import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("json_bucket", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("json_bucket.w");
  });
  test("wing test", async () => {
    await testTest("json_bucket.w");
  });
})
