import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("bring_fs", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("bring_fs.w");
  });
  test("wing test", async () => {
    await testTest("bring_fs.w");
  });
})
