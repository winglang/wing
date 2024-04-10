import { test, expect } from "vitest";
import {
  listMessages,
  treeJsonOf,
  waitUntilTrace,
  waitUntilTraceCount,
} from "./util";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { Duration, Node } from "../../src/std";
import { SimApp } from "../sim-app";

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
    addr: expect.any(String),
    policy: [],
    props: {
      retentionPeriod: 3600,
      timeout: 30,
    },
    type: cloud.QUEUE_FQN,
  });

  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("try to create a queue with invalid retention period", async () => {
  // GIVEN
  const app = new SimApp();
  const retentionPeriod = Duration.fromSeconds(5);

  // THEN
  expect(() => {
    new cloud.Queue(app, "my_queue", {
      retentionPeriod,
    });
  }).toThrowError("Retention period must be greater than or equal to timeout");
});

test("queue with one subscriber, default batch size of 1", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
  const queue = new cloud.Queue(app, "my_queue");
  queue.setConsumer(handler);
  const s = await app.startSimulator();

  const queueClient = s.getResource("/my_queue") as cloud.IQueueClient;

  // WHEN
  await queueClient.push("A", "B");
  await waitUntilTraceCount(s, 2, (trace) =>
    trace.data.message.startsWith("Sending messages")
  );

  // THEN
  await s.stop();

  expect(listMessages(s)).not.toContain("Subscriber error");
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

  const queue = new cloud.Queue(app, "my_queue");
  const handler = Testing.makeHandler(INFLIGHT_CODE);
  const consumer = queue.setConsumer(handler, { batchSize: 5 });

  // initialize the queue with some messages
  const onDeployHandler = Testing.makeHandler(
    `\
async handle() {
  await this.queue.push("A");
  await this.queue.push("B");
  await this.queue.push("C");
  await this.queue.push("D");
  await this.queue.push("E");
  await this.queue.push("F");
}`,
    {
      queue: {
        obj: queue,
        ops: [cloud.QueueInflightMethods.PUSH],
      },
    }
  );
  new cloud.OnDeploy(app, "my_queue_messages", onDeployHandler);

  const s = await app.startSimulator();

  // WHEN
  await waitUntilTraceCount(
    s,
    2,
    (trace) =>
      trace.sourcePath === consumer.node.path && trace.data.status === "success"
  );

  // THEN
  await s.stop();

  const invokeMessages = s
    .listTraces()
    .filter(
      (trace) =>
        trace.sourcePath === consumer.node.path &&
        trace.data.message.startsWith("Invoke")
    );
  expect(invokeMessages.length).toBeGreaterThanOrEqual(2); // queue messages are processed in multiple batches based on batch size
  expect(app.snapshot()).toMatchSnapshot();
});

// waiting for this: https://github.com/winglang/wing/issues/1980 to be resolved
test.skip("messages are requeued if the function fails after timeout", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
  const queue = new cloud.Queue(app, "my_queue", {
    timeout: Duration.fromSeconds(1),
  });
  queue.setConsumer(handler);
  const s = await app.startSimulator();

  // WHEN
  const REQUEUE_MSG =
    "1 messages pushed back to queue after visibility timeout.";
  const queueClient = s.getResource("/my_queue") as cloud.IQueueClient;
  void queueClient.push("BAD MESSAGE");
  await waitUntilTrace(s, (trace) => trace.data.message.startsWith("Invoke"));
  // stopping early to avoid the next queue message from being processed
  await s.stop();

  // THEN
  await waitUntilTrace(s, (trace) =>
    trace.data.message.startsWith(REQUEUE_MSG)
  );
  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();

  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == cloud.QUEUE_FQN)
      .map((trace) => trace.data.message)
  ).toContain(REQUEUE_MSG);
});

test.skip("messages are not requeued if the function fails before timeout", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
  const queue = new cloud.Queue(app, "my_queue", {
    timeout: Duration.fromSeconds(30),
  });
  queue.setConsumer(handler);
  const s = await app.startSimulator();

  // WHEN
  const queueClient = s.getResource("/my_queue") as cloud.IQueueClient;
  void queueClient.push("BAD MESSAGE");
  await waitUntilTrace(
    s,
    (trace) =>
      trace.data.message ==
      "Subscriber error - returning 1 messages to queue: ERROR"
  );

  // THEN
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(app.snapshot()).toMatchSnapshot();

  expect(
    s
      .listTraces()
      .filter((v) => v.sourceType == cloud.QUEUE_FQN)
      .map((trace) => trace.data.message)
  ).toMatchInlineSnapshot(`
    [
      "@winglang/sdk.cloud.Queue created.",
      "Push (messages=BAD MESSAGE).",
      "Sending messages (messages=[\\"BAD MESSAGE\\"], subscriber=sim-0).",
      "Subscriber error - returning 1 messages to queue: ERROR",
      "@winglang/sdk.cloud.Queue deleted.",
    ]
  `);
});

// TODO: this test is skipped because it is flaky
test.skip("messages are not requeued if the function fails after retention timeout", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(INFLIGHT_CODE);
  const queue = new cloud.Queue(app, "my_queue", {
    retentionPeriod: Duration.fromSeconds(1),
    timeout: Duration.fromMilliseconds(100),
  });
  queue.setConsumer(handler);
  const s = await app.startSimulator();

  // WHEN
  const queueClient = s.getResource("/my_queue") as cloud.IQueueClient;
  void queueClient.push("BAD MESSAGE");
  await waitUntilTrace(
    s,
    (trace) =>
      trace.data.message ==
      "1 messages pushed back to queue after visibility timeout."
  );

  // THEN
  await s.stop();
  expect(listMessages(s)).toContain(
    "1 messages pushed back to queue after visibility timeout."
  );
  expect(app.snapshot()).toMatchSnapshot();
});

test("queue has no display hidden property", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Queue(app, "my_queue");

  const treeJson = treeJsonOf(app.synth());
  const queue = app.node.tryFindChild("my_queue") as cloud.Queue;

  // THEN
  expect(Node.of(queue).hidden).toBeUndefined();
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
  expect(Node.of(queue).title).toBeDefined();
  expect(Node.of(queue).description).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    my_queue: {
      display: {
        title: expect.any(String),
        description: expect.any(String),
      },
    },
  });
});

test("can pop messages from queue", async () => {
  // GIVEN
  const app = new SimApp();
  const messages = ["A", "B", "C", "D", "E", "F"];
  new cloud.Queue(app, "my_queue");

  // WHEN
  const s = await app.startSimulator();
  const queueClient = s.getResource("/my_queue") as cloud.IQueueClient;

  // initialize the messages
  for (const message of messages) {
    await queueClient.push(message);
  }

  // try popping them
  const poppedMessages: Array<string | undefined> = [];
  for (let i = 0; i < messages.length; i++) {
    poppedMessages.push(await queueClient.pop());
  }
  poppedMessages.sort();
  const poppedOnEmptyQueue = await queueClient.pop();

  // THEN
  await s.stop();
  expect(poppedMessages).toEqual(messages);
  expect(poppedOnEmptyQueue).toBeUndefined();
});

test("pop from empty queue returns nothing", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Queue(app, "my_queue");

  // WHEN
  const s = await app.startSimulator();
  const queueClient = s.getResource("/my_queue") as cloud.IQueueClient;
  const popped = await queueClient.pop();

  // THEN
  await s.stop();
  expect(popped).toBeUndefined();
});

test("push rejects empty message", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Queue(app, "my_queue");

  // WHEN
  const s = await app.startSimulator();
  const queueClient = s.getResource("/my_queue") as cloud.IQueueClient;

  // THEN
  await expect(() => queueClient.push("")).rejects.toThrowError(
    /Empty messages are not allowed/
  );
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
  expect(s.listTraces()[1].data.status).toEqual("failure");
  expect(app.snapshot()).toMatchSnapshot();
});
