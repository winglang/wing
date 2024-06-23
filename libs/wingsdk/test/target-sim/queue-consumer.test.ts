import { Construct } from "constructs";
import { test, expect } from "vitest";
import { waitUntilTrace } from "./util";
import * as cloud from "../../src/cloud";
import { inflight, lift } from "../../src/core";
import { TraceType } from "../../src/std";
import { SimApp } from "../sim-app";

test("pushing messages through a queue", async () => {
  // GIVEN
  class HelloWorld extends Construct {
    public readonly consumerPath: string;
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const queue = new cloud.Queue(this, "Queue");
      const pusher = lift({ queue })
        .grant({ queue: ["push"] })
        .inflight(async (ctx, event) => {
          console.log("Hello, world!");
          await ctx.queue.push(event);
        });

      new cloud.Function(this, "Function", pusher);

      const processor = inflight(async (_, event) =>
        console.log("Received " + event)
      );

      const consumer = queue.setConsumer(processor);
      this.consumerPath = consumer.node.path;
    }
  }

  const app = new SimApp();
  const helloWorld = new HelloWorld(app, "HelloWorld");

  const s = await app.startSimulator();

  const pusher = s.getResource("/HelloWorld/Function") as cloud.IFunctionClient;
  const consumer = s.getResource(
    helloWorld.consumerPath
  ) as cloud.IFunctionClient;

  // warm up the consumer so timing is more predictable
  await consumer.invoke(JSON.stringify({ messages: [] }));

  // WHEN
  await pusher.invoke("foo");
  await waitUntilTrace(s, (t) => t.data.message === "Received foo");

  // THEN
  await s.stop();
  expect(s.listTraces().filter((t) => t.type === TraceType.LOG)).toEqual([
    {
      data: { message: "Hello, world!" },
      sourcePath: "root/HelloWorld/Function",
      sourceType: "@winglang/sdk.cloud.Function",
      timestamp: expect.any(String),
      level: "info",
      type: "log",
    },
    {
      data: { message: "Received foo" },
      sourcePath: helloWorld.consumerPath,
      sourceType: "@winglang/sdk.cloud.Function",
      timestamp: expect.any(String),
      level: "info",
      type: "log",
    },
  ]);
});
