import { test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

test.skip("wing compile -t tf-aws", async () => {
  await compileTest("api.skip.w");
});

test.skip("wing test", async () => {
  await testTest("api.skip.w");
});