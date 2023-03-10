import { test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

test("wing compile -t tf-aws", async () => {
  await compileTest("bring_jsii.w");
});

test("wing test", async () => {
  await testTest("bring_jsii.w");
});