import { test, expect } from "vitest";
import { Function } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { SimApp } from "../sim-app";

test.skip("binding throws if a method is unsupported", () => {
  const app = new SimApp();
  const handler = Testing.makeHandler("async handle() {}");
  const host = new Function(app, "Function", handler);
  expect(() => (handler as any)._addOnLift(host, ["foo", "bar"])).toThrow(
    /Resource root\/Handler does not support inflight operation foo \(requested by root\/Function\)/
  );
});
