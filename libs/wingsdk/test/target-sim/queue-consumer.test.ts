import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import { SimApp, Testing, TraceType } from "../../src/testing";

jest.setTimeout(30_1000);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
            resource: queue,
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
      queue.onMessage(processor);
    }
  }

  const app = new SimApp();
  new HelloWorld(app, "HelloWorld");

  const s = await app.startSimulator();

  const pusher = s.getResource("/HelloWorld/Function") as cloud.IFunctionClient;

  // WHEN
  await pusher.invoke("foo");
  await sleep(200);

  // THEN
  await s.stop();
  expect(s.listTraces().filter((t) => t.type === TraceType.LOG)).toEqual([
    {
      data: { message: "Hello, world!" },
      sourcePath: "root/HelloWorld/Function",
      sourceType: "wingsdk.cloud.Function",
      timestamp: expect.any(String),
      type: "log",
    },
    {
      data: { message: "Received foo" },
      sourcePath: "root/HelloWorld/Queue-OnMessage-13c4eaf1",
      sourceType: "wingsdk.cloud.Function",
      timestamp: expect.any(String),
      type: "log",
    },
  ]);
});
