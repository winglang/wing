import { Construct } from "constructs";
import { listMessages } from "./util";
import * as cloud from "../../src/cloud";
import { SimApp, Testing } from "../../src/testing";

test("publishing messages to topic", async () => {
  // GIVEN
  class TopicTest extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      const topic = new cloud.Topic(this, "MyTopic");
      const publisher = Testing.makeHandler(
        this,
        "Publisher",
        `async handle(event) {
            await this.topic.publish(event);
        }`,
        {
          resources: {
            topic: {
              resource: topic,
              ops: [cloud.TopicInflightMethods.PUBLISH],
            },
          },
        }
      );
      new cloud.Function(this, "Function", publisher);

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
