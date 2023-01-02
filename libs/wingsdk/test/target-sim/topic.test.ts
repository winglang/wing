import * as cloud from "../../src/cloud";
import * as testing from "../../src/testing";
import { Testing } from "../../src/testing";
import { listMessages } from "./util";

jest.setTimeout(5_000);

test("create a topic", async () => {
  // GIVEN
  const app = new testing.SimApp();
  new cloud.Topic(app, "my_topic");
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_topic")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_topic",
    props: {
      subscribers: [],
    },
    type: "wingsdk.cloud.Topic",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("topic publishes messages as they are received", async () => {
  // GIVEN
  const app = new testing.SimApp();
  const handler = Testing.makeHandler(
    app,
    "Handler",
    `async handle(message) { console.log("Received " + message); }`
  );
  const topic = new cloud.Topic(app, "my_topic");
  topic.onMessage(handler);

  const s = await app.startSimulator();
  const topicClient = s.getResource("/my_topic") as cloud.ITopicClient;

  // WHEN
  await topicClient.publish("Alpha");
  await topicClient.publish("Beta");

  // THEN
  await s.stop();
  expect(listMessages(s)).toMatchSnapshot();
});

test("topic publishes messages to multiple subscribers", async () => {
  // GIVEN
  const app = new testing.SimApp();
  const handler = Testing.makeHandler(
    app,
    "Handler1",
    `async handle(message) { console.log("Received " + message); }`
  );
  const otherHandler = Testing.makeHandler(
    app,
    "Handler2",
    `async handle(message) { console.log("Also received " + message); }`
  );
  const topic = new cloud.Topic(app, "my_topic");
  topic.onMessage(handler);
  topic.onMessage(otherHandler);

  const s = await app.startSimulator();
  const topicClient = s.getResource("/my_topic") as cloud.ITopicClient;

  // WHEN
  await topicClient.publish("Alpha");

  // THEN
  await s.stop();
  expect(listMessages(s)).toMatchSnapshot();
});
