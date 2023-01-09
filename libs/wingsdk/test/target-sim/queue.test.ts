import * as cloud from "../../src/cloud";
import { SimApp, Testing } from "../../src/testing";
import { listMessages } from "./util";

jest.setTimeout(100000); // 5 seconds

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
