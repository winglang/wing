import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { Connections } from "../../src/core";
import { Testing } from "../../src/simulator";
import { SimApp } from "../sim-app";

test("create a bucket", async () => {
  // GIVEN
  const app = new SimApp();
  const bucket = cloud.Bucket._newBucket(app, "my_bucket");
  const handler = Testing.makeHandler(
    app,
    "Handler",
    "async handle() { return 'hello'; }"
  );
  const fn = cloud.Function._newFunction(app, "my_function", handler);

  // WHEN
  for (let i = 0; i < 5; i++) {
    Connections.of(app).add({
      source: bucket,
      target: fn,
      name: "relationship",
    });
  }

  // THEN
  expect(app.snapshot()).toMatchSnapshot();
});
