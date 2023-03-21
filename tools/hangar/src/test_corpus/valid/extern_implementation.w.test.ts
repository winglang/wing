// This file is generated by tools/hangar/src/generate_tests.ts

import { test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

test("wing compile -t tf-aws", async ({ expect }) => {
  await compileTest(expect, "extern_implementation.w");
});

test("wing test", async ({ expect }) => {
  await testTest(expect, "extern_implementation.w");
});