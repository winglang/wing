import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("static_members", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("static_members.w");
  });
  test("wing test", async () => {
    await testTest("static_members.w");
  });
})
