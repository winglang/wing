// This file is generated by tools/hangar/src/generate_tests.ts

import { test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

test.concurrent("wing compile -t tf-aws", async ({ expect }) => {
  await compileTest(expect, "bucket_keys.w");
});

test.concurrent("wing test", async ({ expect }) => {
  await testTest(expect, "bucket_keys.w");
});