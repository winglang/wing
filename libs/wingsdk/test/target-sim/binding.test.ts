import { test, expect } from "vitest";
import { Bucket, Function } from "../../src/cloud";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

test("binding throws if a method is unsupported", () => {
  const app = new SimApp();
  const bucket = Bucket._newBucket(app, "Bucket");
  const handler = Testing.makeHandler(app, "Handler", "async handle() {}", {
    foo: { obj: bucket, ops: ["invalid-op"] },
  });
  expect(() => Function._newFunction(app, "Function", handler)).toThrow(
    /Resource root\/Bucket does not support inflight operation invalid-op \(requested by root\/Function\)/
  );
});
