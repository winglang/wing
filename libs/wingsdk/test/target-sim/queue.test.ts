import { listMessages, treeJsonOf } from "./util";
import * as cloud from "../../src/cloud";
import { SimApp, Testing } from "../../src/testing";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const INFLIGHT_CODE = `
async handle(message) {
    if (message === "BAD MESSAGE") {
        throw new Error("ERROR");
    }
}`;

test("create a queue", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Queue(app, "my_queue");
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_queue")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_queue",
    props: {
      initialMessages: [],
      subscribers: [],
      timeout: 30,
    },
    type: "wingsdk.cloud.Queue",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("queue with one subscriber, default batch size of 1", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const queue = new cloud.Queue(app, "my_queue");
  queue.onMessage(handler);
  const s = await app.startSimulator();

  const queueClient = s.getResource("/my_queue") as cloud.IQueueClient;

  // WHEN
  await queueClient.push("A");
  await queueClient.push("B");

  // TODO: queueClient.awaitMessages(2) or queueClient.untilEmpty() or something
  await sleep(200);

  // THEN
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("queue batch size of 2, purge the queue", async () => {
  // GIVEN
  const QUEUE_SIZE = 2;
  const QUEUE_EMPTY_SIZE = 0;
  const app = new SimApp();
  new cloud.Queue(app, "my_queue");
  const s = await app.startSimulator();

  const queueClient = s.getResource("/my_queue") as cloud.IQueueClient;

  // WHEN
  await queueClient.push("A");
  await queueClient.push("B");

  let approxSize = await queueClient.approxSize();

  expect(approxSize).toEqual(QUEUE_SIZE);

  await queueClient.purge();

  approxSize = await queueClient.approxSize();
  expect(approxSize).toEqual(QUEUE_EMPTY_SIZE);

  // THEN
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("queue with one subscriber, batch size of 5", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const queue = new cloud.Queue(app, "my_queue", {
    initialMessages: ["A", "B", "C", "D", "E", "F"],
  });
  queue.onMessage(handler, { batchSize: 5 });
  const s = await app.startSimulator();

  // WHEN
  await sleep(200);

  // THEN
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("messages are requeued if the function fails", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(app, "Handler", INFLIGHT_CODE);
  const queue = new cloud.Queue(app, "my_queue");
  queue.onMessage(handler);
  const s = await app.startSimulator();

  // WHEN
  const queueClient = s.getResource("/my_queue") as cloud.IQueueClient;
  await queueClient.push("BAD MESSAGE");

  await sleep(300);

  // THEN
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();
});

test("queue has no display hidden property", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Queue(app, "my_queue");

  const treeJson = treeJsonOf(app.synth());
  const queue = app.node.tryFindChild("my_queue") as cloud.Queue;

  // THEN
  expect(queue.display.hidden).toBeUndefined();
  expect(treeJson.tree.children).toBeDefined();
  expect(treeJson.tree.children).not.toMatchObject({
    my_queue: {
      display: {
        hidden: expect.any(Boolean),
      },
    },
  });
});

test("queue has display title and description properties", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Queue(app, "my_queue");

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const queue = app.node.tryFindChild("my_queue") as cloud.Queue;

  // THEN
  expect(queue.display.title).toBeDefined();
  expect(queue.display.description).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    my_queue: {
      display: {
        title: expect.any(String),
        description: expect.any(String),
      },
    },
  });
});
