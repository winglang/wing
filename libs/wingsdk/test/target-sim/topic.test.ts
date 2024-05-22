import { test, expect } from "vitest";
import { treeJsonOf, waitUntilTrace } from "./util";
import * as cloud from "../../src/cloud";
import { inflight } from "../../src/core";
import { Testing } from "../../src/simulator";
import { Node } from "../../src/std";
import { SimApp } from "../sim-app";

test("create a topic", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Topic(app, "my_topic");
  const s = await app.startSimulator();

  // THEN
  expect(s.getResourceConfig("/my_topic")).toEqual({
    attrs: {
      handle: expect.any(String),
    },
    path: "root/my_topic",
    addr: expect.any(String),
    policy: [],
    props: {},
    type: cloud.TOPIC_FQN,
  });
  await s.stop();

  expect(app.snapshot()).toMatchSnapshot();
});

test("topic publishes messages to multiple subscribers", async () => {
  // GIVEN
  const app = new SimApp();
  const handler = inflight(async (_, message) =>
    console.log("Received " + message)
  );
  const otherHandler = inflight(async (_, message) =>
    console.log("Also received " + message)
  );
  const topic = new cloud.Topic(app, "my_topic");
  topic.onMessage(handler);
  topic.onMessage(otherHandler);

  const s = await app.startSimulator();
  const topicClient = s.getResource("/my_topic") as cloud.ITopicClient;

  // WHEN
  await topicClient.publish("Alpha");

  // THEN
  await waitUntilTrace(s, (trace) =>
    trace.data.message.startsWith("Received Alpha")
  );
  await waitUntilTrace(s, (trace) =>
    trace.data.message.startsWith("Also received Alpha")
  );
  await s.stop();
});

test("topic has no display hidden property", async () => {
  // GIVEN
  const app = new SimApp();
  new cloud.Topic(app, "my_topic");

  const treeJson = treeJsonOf(app.synth());
  const topic = app.node.tryFindChild("my_topic") as cloud.Topic;

  // THEN
  expect(Node.of(topic).hidden).toBeUndefined();
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
  new cloud.Topic(app, "my_topic");

  // WHEN
  const treeJson = treeJsonOf(app.synth());
  const topic = app.node.tryFindChild("my_topic") as cloud.Topic;

  // THEN
  expect(Node.of(topic).title).toBeDefined();
  expect(Node.of(topic).description).toBeDefined();
  expect(treeJson.tree.children).toMatchObject({
    my_topic: {
      display: {
        title: expect.any(String),
        description: expect.any(String),
      },
    },
  });
});
