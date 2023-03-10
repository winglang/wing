import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("std_string", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("std_string.w");
  });
  test("wing test", async () => {
    await testTest("std_string.w");
  });
})
