import { test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

test("wing compile -t tf-aws", async () => {
  await compileTest("forward_decl.w");
});

test("wing test", async () => {
  await testTest("forward_decl.w");
});