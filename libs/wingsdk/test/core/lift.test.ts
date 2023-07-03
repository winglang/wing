import { test, expect } from "vitest";
import { liftObject } from "../../src/core/internal";
import { Construct } from "constructs";

test("primitive", () => {
  const scope = new Construct(undefined as any, "root");
  const result = liftObject(scope, 1);
  expect(result).toBe("1");
});

test("lift preflight object", () => {


});