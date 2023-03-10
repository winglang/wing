import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("mut_container_types", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("mut_container_types.w");
  });
  test("wing test", async () => {
    await testTest("mut_container_types.w");
  });
})
