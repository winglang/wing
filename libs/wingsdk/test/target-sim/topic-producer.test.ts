import { Construct } from "constructs";
import { test, expect } from "vitest";
import { listMessages } from "./util";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/testing";
import { SimApp } from "../sim-app";

test("publishing messages to topic", async () => {
  // GIVEN
  class TopicTest extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const topic = cloud.Topic._newTopic(this, "MyTopic");
      const publisher = Testing.makeHandler(
        this,
        "Publisher",
        `async handle(event) {
            await this.topic.publish(event);
        }`,
        {
          topic: {
            obj: topic,
            ops: [cloud.TopicInflightMethods.PUBLISH],
          },
        }
      );
      cloud.Function._newFunction(this, "Function", publisher);

      const processor = Testing.makeHandler(
        this,
        "Processor",
        `async handle(event) {
          if (event.message === "") throw new Error("No message recieved");
      }`
      );
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

  // THEN
  await s.stop();

  expect(listMessages(s)).toMatchSnapshot();
});
