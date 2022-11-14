import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import { IFunctionClient, IQueueClient } from "../../src/target-sim";
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

test("create a queue", async () => {
  // GIVEN
  const app = new sim.App({ outdir: mkdtemp() });
  new cloud.Queue(app, "my_queue");
  const simfile = app.synth();

  // THEN
  const s = new testing.Simulator({ simfile });
  await s.start();
  expect(s.getAttributes("root/my_queue")).toEqual({
    handle: expect.any(String),
  });
  expect(s.getProps("root/my_queue")).toEqual({
    timeout: 30,
  });
  await s.stop();

  expect(simulatorJsonOf(simfile)).toMatchSnapshot();
});

test("queue with one subscriber, default batch size of 1", async () => {
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

  const queueClient = s.getResourceByPath("root/my_queue") as IQueueClient;
  const fnClient = s.getResourceByPath(
    "root/my_queue/OnMessage-236ff3d72ad0ae46"
  ) as IFunctionClient;

  // WHEN
  await queueClient.push("A");
  await queueClient.push("B");

  // TODO: queueClient.awaitMessages(2) or queueClient.untilEmpty() or something
  await sleep(200);

  // THEN
  expect(await fnClient.timesCalled()).toEqual(2);
  await s.stop();

  expect(listMessages(s)).toEqual([
    "Function created.",
    "Queue created.",
    "Push operation succeeded.",
    "Push operation succeeded.",
    "Sending 1 messages to subscriber sim-0.",
    "Sending 1 messages to subscriber sim-0.",
    'Invoke (payload="{"messages":["A"]}") operation succeeded. Response: undefined',
    'Invoke (payload="{"messages":["B"]}") operation succeeded. Response: undefined',
    "Queue deleted.",
    "Function deleted.",
  ]);
});

test("queue with one subscriber, batch size of 5", async () => {
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

  // WHEN
  const fnClient = s.getResourceByPath(
    "root/my_queue/OnMessage-236ff3d72ad0ae46"
  ) as IFunctionClient;

  await sleep(200);

  // THEN
  expect(await fnClient.timesCalled()).toEqual(2);
  await s.stop();

  expect(listMessages(s)).toEqual([
    "Function created.",
    "Queue created.",
    "Sending 5 messages to subscriber sim-0.",
    "Sending 1 messages to subscriber sim-0.",
    'Invoke (payload="{"messages":["F"]}") operation succeeded. Response: undefined',
    'Invoke (payload="{"messages":["A","B","C","D","E"]}") operation succeeded. Response: undefined',
    "Queue deleted.",
    "Function deleted.",
  ]);
});

test("messages are requeued if the function fails", async () => {
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
  const queueClient = s.getResourceByPath("root/my_queue") as IQueueClient;
  const fnClient = s.getResourceByPath(
    "root/my_queue/OnMessage-236ff3d72ad0ae46"
  ) as IFunctionClient;

  await queueClient.push("BAD MESSAGE");

  await sleep(300);

  // THEN
  expect(await fnClient.timesCalled()).toBeGreaterThan(1);
  await s.stop();

  expect(listMessages(s)).toEqual([
    "Function created.",
    "Queue created.",
    "Push operation succeeded.",
    "Sending 1 messages to subscriber sim-0.",
    'Invoke (payload="{"messages":["BAD MESSAGE"]}") operation failed. Response: Error: ERROR',
    "Subscriber error (Error: ERROR) - returning 1 messages to queue.",
    "Sending 1 messages to subscriber sim-0.",
    'Invoke (payload="{"messages":["BAD MESSAGE"]}") operation failed. Response: Error: ERROR',
    "Subscriber error (Error: ERROR) - returning 1 messages to queue.",
    "Queue deleted.",
    "Function deleted.",
  ]);
});

function listMessages(s: testing.Simulator) {
  return s.listEvents().map((evt) => evt.message);
}
