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
    `async handle(message) { this.$logger.print("Received " + message); }`
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
  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Logger created.",
    "wingsdk.cloud.Function created.",
    "wingsdk.cloud.Topic created.",
    "Publish (message=Alpha).",
    "Sending message (message=Alpha, subscriber=sim-1).",
    "Received Alpha",
    'Invoke (payload="Alpha").',
    "Publish (message=Beta).",
    "Sending message (message=Beta, subscriber=sim-1).",
    "Received Beta",
    'Invoke (payload="Beta").',
    "wingsdk.cloud.Topic deleted.",
    "wingsdk.cloud.Function deleted.",
    "wingsdk.cloud.Logger deleted.",
  ]);
});

test("topic publishes messages to multiple subscribers", async () => {
  // GIVEN
  const app = new testing.SimApp();
  const handler = Testing.makeHandler(
    app,
    "Handler1",
    `async handle(message) { this.$logger.print("Received " + message); }`
  );
  const otherHandler = Testing.makeHandler(
    app,
    "Handler2",
    `async handle(message) { this.$logger.print("Also received " + message); }`
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
  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Logger created.",
    "wingsdk.cloud.Function created.",
    "wingsdk.cloud.Function created.",
    "wingsdk.cloud.Topic created.",
    "Publish (message=Alpha).",
    "Sending message (message=Alpha, subscriber=sim-1).",
    "Received Alpha",
    'Invoke (payload="Alpha").',
    "Sending message (message=Alpha, subscriber=sim-2).",
    "Also received Alpha",
    'Invoke (payload="Alpha").',
    "wingsdk.cloud.Topic deleted.",
    "wingsdk.cloud.Function deleted.",
    "wingsdk.cloud.Function deleted.",
    "wingsdk.cloud.Logger deleted.",
  ]);
});
