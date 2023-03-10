import { test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

test("wing compile -t tf-aws", async () => {
  await compileTest("enums.w");
});

test("wing test", async () => {
  await testTest("enums.w");
});