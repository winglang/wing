import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import * as testing from "../../src/testing";
import { TraceType } from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { simulatorJsonOf } from "./util";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

test("pushing messages through a queue", async () => {
  // GIVEN
  class HelloWorld extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const queue = new cloud.Queue(this, "Queue");
      const pusher = new core.Inflight({
        code: core.NodeJsCode.fromInline(
          `async function $proc($cap, event) {
            await $cap.logger.print("Hello, world!");
            await $cap.queue.push(event);
          }`
        ),
        entrypoint: "$proc",
        captures: {
          logger: {
            resource: cloud.Logger.of(this),
            methods: [cloud.LoggerInflightMethods.PRINT],
          },
          queue: {
            resource: queue,
            methods: [cloud.QueueInflightMethods.PUSH],
          },
        },
      });
      new cloud.Function(this, "Function", pusher);

      const processor = new core.Inflight({
        code: core.NodeJsCode.fromInline(
          `async function $proc($cap, event) {
            await $cap.logger.print("Received " + event);
          }`
        ),
        captures: {
          logger: {
            resource: cloud.Logger.of(this),
            methods: [cloud.LoggerInflightMethods.PRINT],
          },
        },
        entrypoint: "$proc",
      });
      queue.onMessage(processor);
    }
  }

  const app = new sim.App({ outdir: mkdtemp() });
  cloud.Logger.register(app);
  new HelloWorld(app, "HelloWorld");
  const simfile = app.synth();

  const s = new testing.Simulator({ simfile });
  await s.start();

  const pusher = s.getResource(
    "main/HelloWorld/Function"
  ) as cloud.IFunctionClient;

  // WHEN
  await pusher.invoke("foo");
  await sleep(200);

  // THEN
  await s.stop();
  expect(s.listTraces().filter((t) => t.type === TraceType.LOG)).toEqual([
    {
      data: { message: "Hello, world!" },
      sourcePath: "main/HelloWorld/Function",
      sourceType: "wingsdk.cloud.Function",
      timestamp: expect.any(String),
      type: "log",
    },
    {
      data: { message: "Received foo" },
      sourcePath: "main/HelloWorld/Queue/OnMessage-004546ee82d97e73",
      sourceType: "wingsdk.cloud.Function",
      timestamp: expect.any(String),
      type: "log",
    },
  ]);

  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});
