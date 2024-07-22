import { Construct } from "constructs";
import { test, expect } from "vitest";
import { listMessages, waitUntilTraceCount } from "./util";
import * as cloud from "../../src/cloud";
import { inflight, lift } from "../../src/core";
import { SimApp } from "../sim-app";

test("publishing messages to topic", async () => {
  // GIVEN
  class TopicTest extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const topic = new cloud.Topic(this, "MyTopic");

      const publisher = lift({ topic })
        .grant({ topic: [cloud.TopicInflightMethods.PUBLISH] })
        .inflight(async (ctx, event) => {
          await ctx.topic.publish(event);
        });

      new cloud.Function(this, "Function", publisher);

      const processor = inflight(async (_, event) => {
        if (event.message === "") throw new Error("No message recieved");
        console.log("Message received");
      });

      topic.onMessage(processor);
    }
  }

  const app = new SimApp();
  new TopicTest(app, "TopicTester");

  const s = await app.startSimulator();

  const publisher = s.getResource(
    "/TopicTester/Function"
  ) as cloud.IFunctionClient;

  // WHEN
  await publisher.invoke("ABC");

  await waitUntilTraceCount(s, 1, (trace) =>
    trace.data.message.includes("Message received")
  );

  // THEN
  await s.stop();
});

test("publishing multiple messages to topic", async () => {
  // GIVEN
  class TopicTest extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const topic = new cloud.Topic(this, "MyTopic");
      const publisher = lift({ topic })
        .grant({ topic: [cloud.TopicInflightMethods.PUBLISH] })
        .inflight(async (ctx, event) => {
          await ctx.topic.publish(...event.split(""));
        });

      new cloud.Function(this, "Function", publisher);

      const processor = inflight(async (_, event) => {
        if (event.message === "") throw new Error("No message recieved");
      });

      topic.onMessage(processor);
    }
  }

  const app = new SimApp();
  new TopicTest(app, "TopicTester");

  const s = await app.startSimulator();

  const publisher = s.getResource(
    "/TopicTester/Function"
  ) as cloud.IFunctionClient;

  // WHEN
  await publisher.invoke("ABC");

  await waitUntilTraceCount(s, 1, (trace) =>
    trace.data.message.includes("A", "B", "C")
  );

  // THEN
  await s.stop();
});
