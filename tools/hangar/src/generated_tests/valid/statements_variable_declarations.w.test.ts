import { test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

test("wing compile -t tf-aws", async () => {
  await compileTest("statements_variable_declarations.w");
});

test("wing test", async () => {
  await testTest("statements_variable_declarations.w");
});