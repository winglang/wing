import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import {
  CONNECTIONS_FILE_PATH,
  Connections,
  inflight,
  lift,
} from "../../src/core";
import { Node } from "../../src/std";
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

test("implict connections based on tokens", async () => {
  const app = new SimApp();

  const api = new cloud.Api(app, "Api");

  new cloud.Function(
    app,
    "Function",
    lift({ url: api.url }).inflight(async (ctx) => {
      console.log(ctx.url);
      return undefined;
    })
  );

  expect(app.snapshot()[CONNECTIONS_FILE_PATH].connections).containSubset([
    {
      name: "<ref>",
      source: "root/Function",
      target: "root/Api",
      targetOp: "url",
    },
  ]);
});

test("source can be omitted from `nodeof(x).addConnection()`", async () => {
  const app = new SimApp();

  const b1 = new cloud.Bucket(app, "B1");
  const b2 = new cloud.Bucket(app, "B2");

  Node.of(b1).addConnection({ target: b2, name: "my_connection" });

  expect(app.snapshot()[CONNECTIONS_FILE_PATH]).toMatchSnapshot();
});
