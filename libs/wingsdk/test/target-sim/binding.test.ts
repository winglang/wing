import { test, expect } from "vitest";
import { Bucket, Function } from "../../src/cloud";
import { Lifting } from "../../src/core";
import { Testing } from "../../src/simulator";
import { SimApp } from "../sim-app";

test("binding throws if a method is unsupported", () => {
  const app = new SimApp();
  const bucket = new Bucket(app, "Bucket");
  const handler = Testing.makeHandler("async handle() {}");
  const host = new Function(app, "Function", handler);
  expect(() => Lifting.lift(bucket, host, ["foo", "bar"])).toThrow(
    /Resource root\/Bucket does not support inflight operation foo/
  );
});
