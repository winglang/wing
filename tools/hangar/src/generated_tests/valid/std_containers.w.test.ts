import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("std_containers", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("std_containers.w");
  });
  test("wing test", async () => {
    await testTest("std_containers.w");
  });
})
