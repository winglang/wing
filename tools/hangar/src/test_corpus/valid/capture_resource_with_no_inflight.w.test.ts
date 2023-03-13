// This file is generated by tools/hangar/src/generate_tests.ts

import { test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

test.concurrent("wing compile -t tf-aws", async ({ expect }) => {
  await compileTest(expect, "capture_resource_with_no_inflight.w");
});

test.concurrent("wing test", async ({ expect }) => {
  await testTest(expect, "capture_resource_with_no_inflight.w");
});