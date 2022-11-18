import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import * as testing from "../../src/testing";
import { mkdtemp } from "../../src/util";
import { appSnapshot, directorySnapshot } from "../util";

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

  // WHEN
  new cloud.Queue(app, "my_queue");

  // THEN
  expect(appSnapshot(app)).toMatchSnapshot();
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

  const queueClient = s.getResource("app/my_queue") as cloud.IQueueClient;

  // WHEN
  await queueClient.push("A");
  await queueClient.push("B");

  // TODO: queueClient.awaitMessages(2) or queueClient.untilEmpty() or something
  await sleep(200);

  // THEN
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Function created.",
    "wingsdk.cloud.Queue created.",
    "Push (message=A).",
    "Push (message=B).",
    'Sending messages (messages=["A"], subscriber=sim-0).',
    'Sending messages (messages=["B"], subscriber=sim-0).',
    'Invoke (payload="{"messages":["A"]}").',
    'Invoke (payload="{"messages":["B"]}").',
    "wingsdk.cloud.Queue deleted.",
    "wingsdk.cloud.Function deleted.",
  ]);
  expect(directorySnapshot(app.outdir)).toMatchSnapshot();
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
  await sleep(200);

  // THEN
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Function created.",
    "wingsdk.cloud.Queue created.",
    'Sending messages (messages=["A","B","C","D","E"], subscriber=sim-0).',
    'Sending messages (messages=["F"], subscriber=sim-0).',
    'Invoke (payload="{"messages":["F"]}").',
    'Invoke (payload="{"messages":["A","B","C","D","E"]}").',
    "wingsdk.cloud.Queue deleted.",
    "wingsdk.cloud.Function deleted.",
  ]);
  expect(directorySnapshot(app.outdir)).toMatchSnapshot();
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
  const queueClient = s.getResource("app/my_queue") as cloud.IQueueClient;
  await queueClient.push("BAD MESSAGE");

  await sleep(300);

  // THEN
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Function created.",
    "wingsdk.cloud.Queue created.",
    "Push (message=BAD MESSAGE).",
    'Sending messages (messages=["BAD MESSAGE"], subscriber=sim-0).',
    'Invoke (payload="{"messages":["BAD MESSAGE"]}").',
    "Subscriber error - returning 1 messages to queue.",
    'Sending messages (messages=["BAD MESSAGE"], subscriber=sim-0).',
    'Invoke (payload="{"messages":["BAD MESSAGE"]}").',
    "Subscriber error - returning 1 messages to queue.",
    "wingsdk.cloud.Queue deleted.",
    "wingsdk.cloud.Function deleted.",
  ]);
  expect(directorySnapshot(app.outdir)).toMatchSnapshot();
});

function listMessages(s: testing.Simulator) {
  return s.listTraces().map((trace) => trace.data.message);
}
