import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("json", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("json.w");
  });
  test("wing test", async () => {
    await testTest("json.w");
  });
})
