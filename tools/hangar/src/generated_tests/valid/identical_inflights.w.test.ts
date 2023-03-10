import { test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

test("wing compile -t tf-aws", async () => {
  await compileTest("identical_inflights.w");
});

test("wing test", async () => {
  await testTest("identical_inflights.w");
});