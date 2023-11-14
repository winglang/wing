import { Construct } from "constructs";
import { test, expect } from "vitest";
import { waitUntilTrace } from "./util";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { TraceType } from "../../src/std";
import { SimApp } from "../sim-app";

test("pushing messages through a queue", async () => {
  // GIVEN
  class HelloWorld extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const queue = new cloud.Queue(this, "Queue");
      const pusher = Testing.makeHandler(
        app,
        "Pusher",
        `async handle(event) {
          console.log("Hello, world!");
          await this.queue.push(event);
        }`,
        {
          queue: {
            obj: queue,
            ops: [cloud.QueueInflightMethods.PUSH],
          },
        }
      );
      new cloud.Function(this, "Function", pusher);

      const processor = Testing.makeHandler(
        app,
        "Processor",
        `async handle(event) {
          console.log("Received " + event);
        }`
      );
      queue.setConsumer(processor);
    }
  }

  const app = new SimApp();
  new HelloWorld(app, "HelloWorld");

  const s = await app.startSimulator();

  const pusher = s.getResource("/HelloWorld/Function") as cloud.IFunctionClient;
  const consumer = s.getResource(
    "root/HelloWorld/Queue/Queue-SetConsumer-13c4eaf1"
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
      type: "log",
    },
    {
      data: { message: "Received foo" },
      sourcePath: "root/HelloWorld/Queue/Queue-SetConsumer-13c4eaf1",
      sourceType: "@winglang/sdk.cloud.Function",
      timestamp: expect.any(String),
      type: "log",
    },
  ]);
});
