import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { Connections, inflight } from "../../src/core";
import { SimApp } from "../sim-app";

test("create a bucket", async () => {
  // GIVEN
  const app = new SimApp();
  const bucket = new cloud.Bucket(app, "my_bucket");
  const handler = inflight(async () => "hello");
  const fn = new cloud.Function(app, "my_function", handler);

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
