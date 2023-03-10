import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("capture_containers_of_resources", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("capture_containers_of_resources.w");
  });
  test("wing test", async () => {
    await testTest("capture_containers_of_resources.w");
  });
})
