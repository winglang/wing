import { Construct } from "constructs";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("pushing messages through a queue", async () => {
  // GIVEN
  class HelloWorld extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const queue = cloud.Queue._newQueue(this, "Queue");
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
      cloud.Function._newFunction(this, "Function", pusher);

      const processor = Testing.makeHandler(
        app,
        "Processor",
        `async handle(event) {
          console.log("Received " + event);
        }`
      );
      queue.addConsumer(processor);
    }
  }

  const app = new SimApp();
  new HelloWorld(app, "HelloWorld");

  const s = await app.startSimulator();

  const pusher = s.getResource("/HelloWorld/Function") as cloud.IFunctionClient;
  const consumer = s.getResource(
    "root/HelloWorld/Queue-AddConsumer-13c4eaf1"
  ) as cloud.IFunctionClient;

  // warm up the consumer so timing is more predictable
  await consumer.invoke(JSON.stringify({ messages: [] }));

  // WHEN
  await pusher.invoke("foo");
  await sleep(200);

  // THEN
  await s.stop();
  expect(s.listTraces().filter((t) => t.type === cloud.TraceType.LOG)).toEqual([
    {
      data: { message: "Hello, world!" },
      sourcePath: "root/HelloWorld/Function",
      sourceType: "wingsdk.cloud.Function",
      timestamp: expect.any(String),
      type: "log",
    },
    {
      data: { message: "Received foo" },
      sourcePath: "root/HelloWorld/Queue-AddConsumer-13c4eaf1",
      sourceType: "wingsdk.cloud.Function",
      timestamp: expect.any(String),
      type: "log",
    },
  ]);
});
