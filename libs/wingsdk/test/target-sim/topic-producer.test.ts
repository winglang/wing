import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import { SimApp } from "../../src/testing";
import { listMessages } from "./util";

test("publishing messages to topic", async () => {
  // GIVEN
  class TopicTest extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const topic = new cloud.Topic(this, "MyTopic");
      const publisher = new core.Inflight({
        code: core.NodeJsCode.fromInline(
          `async function $proc($cap, event) {
                        await $cap.topic.publish(event);
                    }`
        ),
        entrypoint: "$proc",
        bindings: {
          topic: topic,
        },
        policies: {
          topic: {
            methods: [cloud.TopicInflightMethods.PUBLISH],
          },
        },
      });
      new cloud.Function(this, "Function", publisher);

      const processor = new core.Inflight({
        code: core.NodeJsCode.fromInline(
          `async function $proc($cap, event) {
                        if (event.message === "") throw new Error("No message recieved");
                    }`
        ),
        entrypoint: "$proc",
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

  // THEN
  await s.stop();

  expect(listMessages(s)).toEqual([
    "wingsdk.cloud.Function created.",
    "wingsdk.cloud.Topic created.",
    "wingsdk.cloud.Function created.",
    "Publish (message=ABC).",
    `Sending message (message="ABC", subscriber=sim-0).`,
    `Invoke (payload="{"message":"ABC"}").`,
    `Invoke (payload="ABC").`,
    `wingsdk.cloud.Function deleted.`,
    `wingsdk.cloud.Topic deleted.`,
    `wingsdk.cloud.Function deleted.`,
  ]);
});
