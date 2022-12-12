import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as testing from "../../src/testing";
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
  cloud.Logger.register(app);
  const handler = makeInflight(
    `async function $proc($cap, message) { $cap.logger.print("Received " + message); }`,
    app
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
    'Sending message (message="Alpha", subscriber=sim-1).',
    "Received Alpha",
    'Invoke (payload="{"message":"Alpha"}").',
    "Publish (message=Beta).",
    'Sending message (message="Beta", subscriber=sim-1).',
    "Received Beta",
    'Invoke (payload="{"message":"Beta"}").',
    "wingsdk.cloud.Topic deleted.",
    "wingsdk.cloud.Function deleted.",
    "wingsdk.cloud.Logger deleted.",
  ]);
});

test("topic publishes messages to multiple subscribers", async () => {
  // GIVEN
  const app = new testing.SimApp();
  cloud.Logger.register(app);
  const handler = makeInflight(
    `async function $proc($cap, message) { $cap.logger.print("Received " + message); }`,
    app
  );
  const otherHandler = makeInflight(
    `async function $proc($cap, message) { $cap.logger.print("Also received " + message); }`,
    app
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
    'Sending message (message="Alpha", subscriber=sim-1).',
    "Received Alpha",
    'Invoke (payload="{"message":"Alpha"}").',
    'Sending message (message="Alpha", subscriber=sim-2).',
    "Also received Alpha",
    'Invoke (payload="{"message":"Alpha"}").',
    "wingsdk.cloud.Topic deleted.",
    "wingsdk.cloud.Function deleted.",
    "wingsdk.cloud.Function deleted.",
    "wingsdk.cloud.Logger deleted.",
  ]);
});

function makeInflight(code: string, app: core.IApp) {
  return new core.Inflight({
    code: core.NodeJsCode.fromInline(code),
    entrypoint: "$proc",
    captures: {
      logger: {
        resource: cloud.Logger.of(app),
        methods: [cloud.LoggerInflightMethods.PRINT],
      },
    },
  });
}
