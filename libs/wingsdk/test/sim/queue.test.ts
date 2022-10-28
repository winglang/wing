import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/sim";
import { FunctionClient } from "../../src/sim/function.inflight";
import { QueueClient } from "../../src/sim/queue.inflight";
import { QueueSchema } from "../../src/sim/schema-resources";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { simulatorJsonOf } from "./util";

jest.setTimeout(5_000); // 5 seconds

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const INFLIGHT_CODE = core.NodeJsCode.fromInline(`
async function $proc($cap, message) {
    if (message === "BAD MESSAGE") {
        throw new Error("ERROR");
    }
}`);

describe("basic", () => {
  test("queue with default batch size of 1", async () => {
    // GIVEN
    const app = new sim.App({ outdir: mkdtemp() });
    const handler = new core.Inflight({
      code: INFLIGHT_CODE,
      entrypoint: "$proc",
    });
    const queue = new cloud.Queue(app, "my_queue");
    queue.onMessage(handler);
    const simfile = app.synth();

    const s = new testing.Simulator({ simfile });
    await s.start();

    const queueAttrs = s.getAttributes("root/my_queue") as QueueSchema["attrs"];
    const queueProps = s.getProps("root/my_queue") as QueueSchema["props"];
    const queueClient = new QueueClient(queueAttrs.queueAddr);

    expect(queueProps.subscribers[0].batchSize).toEqual(1);

    const fnId = queueProps.subscribers[0].functionId;
    const fnAttrs = s.getAttributes(fnId);
    const fnClient = new FunctionClient(fnAttrs.functionAddr);

    // WHEN
    await queueClient.push("A");
    await queueClient.push("B");

    // TODO: queueClient.awaitMessages(2) or queueClient.untilEmpty() or something
    await sleep(200);

    // THEN
    expect(await fnClient.timesCalled()).toEqual(2);
    await s.stop();

    expect(simulatorJsonOf(simfile)).toMatchSnapshot();
  });

  test("queue with batch size of 5", async () => {
    // GIVEN
    const app = new sim.App({ outdir: mkdtemp() });
    const handler = new core.Inflight({
      code: INFLIGHT_CODE,
      entrypoint: "$proc",
    });
    const queue = new cloud.Queue(app, "my_queue", {
      initialMessages: ["A", "B", "C", "D", "E", "F"],
    });
    queue.onMessage(handler, { batchSize: 5 });
    const simfile = app.synth();

    const s = new testing.Simulator({ simfile });
    await s.start();

    const queueProps = s.getProps("root/my_queue") as QueueSchema["props"];

    const fnId = queueProps.subscribers[0].functionId;
    const fnAttrs = s.getAttributes(fnId);
    const fnClient = new FunctionClient(fnAttrs.functionAddr);

    await sleep(200);

    // THEN
    expect(await fnClient.timesCalled()).toEqual(2);
    await s.stop();

    expect(simulatorJsonOf(simfile)).toMatchSnapshot();
  });

  test("messages are requeued if the function fails", async () => {
    // silence console.error
    const originalError = console.error;
    console.error = jest.fn();

    // GIVEN
    const app = new sim.App({ outdir: mkdtemp() });
    const handler = new core.Inflight({
      code: INFLIGHT_CODE,
      entrypoint: "$proc",
    });
    const queue = new cloud.Queue(app, "my_queue");
    queue.onMessage(handler);
    const simfile = app.synth();

    const s = new testing.Simulator({ simfile });
    await s.start();

    // WHEN
    const queueAttrs = s.getAttributes("root/my_queue") as QueueSchema["attrs"];
    const queueProps = s.getProps("root/my_queue") as QueueSchema["props"];
    const queueClient = new QueueClient(queueAttrs.queueAddr);

    const fnId = queueProps.subscribers[0].functionId;
    const fnAttrs = s.getAttributes(fnId);
    const fnClient = new FunctionClient(fnAttrs.functionAddr);

    await queueClient.push("BAD MESSAGE");

    await sleep(300);

    // THEN
    expect(await fnClient.timesCalled()).toBeGreaterThan(1);
    await s.stop();

    expect(simulatorJsonOf(simfile)).toMatchSnapshot();

    // restore console.error
    console.error = originalError;
  });
});
