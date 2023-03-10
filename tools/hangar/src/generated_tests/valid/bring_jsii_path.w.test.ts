import { describe, test } from "vitest";
import { compileTest, testTest } from "../../generated_test_targets";

describe("bring_jsii_path", () => {
  test("wing compile -t tf-aws", async () => {
    await compileTest("bring_jsii_path.w");
  });
  test("wing test", async () => {
    await testTest("bring_jsii_path.w");
  });
})
