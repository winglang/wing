import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("file_counter", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("file_counter.w");
  });
  test("wing test", async () => {
    await testTest("file_counter.w");
  });
})
