import { test, expect } from "vitest";
import { listMessages, treeJsonOf } from "./util";
import * as cloud from "../../src/cloud";
import * as testing from "../../src/testing";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

test("create a topic", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Topic._newTopic(app, "my_topic");
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_topic")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_topic",
    props: {},
    type: "wingsdk.cloud.Topic",
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("topic publishes messages as they are received", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = Testing.makeHandler(
    app,
    "Handler",
    `async handle(message) { console.log("Received " + message); }`
  );
  const topic = cloud.Topic._newTopic(app, "my_topic");
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
  const app = new SimApp();
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
  const topic = cloud.Topic._newTopic(app, "my_topic");
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

test("topic has no display hidden property", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Topic._newTopic(app, "my_topic");

  const treeJson = treeJsonOf(app.synth());
  const topic = app.node.tryFindChild("my_topic") as cloud.Topic;

  // THEN
  expect(topic.display.hidden).toBeUndefined();
  expect(treeJson.tree.children).toBeDefined();
  expect(treeJson.tree.children).not.toMatchObject({
    my_topic: {
      display: {
        hidden: expect.any(Boolean),
      },
    },
  });
});

test("topic has display title and description properties", async () => {
  // GIVEN
  const app = new SimApp();
  cloud.Topic._newTopic(app, "my_topic");

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const topic = app.node.tryFindChild("my_topic") as cloud.Topic;

  // THEN
  expect(topic.display.title).toBeDefined();
  expect(topic.display.description).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    my_topic: {
      display: {
        title: expect.any(String),
        description: expect.any(String),
      },
    },
  });
});
