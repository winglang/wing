import { test, expect } from "vitest";
import { Bucket, Function } from "../../src/cloud";
import { Lifting, inflight } from "../../src/core";
import { SimApp } from "../sim-app";

test("binding throws if a method is unsupported", () => {
  const app = new SimApp();
  const bucket = new Bucket(app, "Bucket");
  const handler = inflight(async () => {});
  const host = new Function(app, "Function", handler);
  expect(() => Lifting.lift(bucket, host, ["foo", "bar"])).toThrow(
    /Resource root\/Bucket does not support inflight operation foo/
  );
});
