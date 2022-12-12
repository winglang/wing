import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
// import * as sim from "../../src/target-sim";
import * as tfaws from "../../src/target-tf-aws";

class HelloWorld extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const counter = new cloud.Counter(this, "Counter", {
      initial: 1000,
    });
    const bucket = new cloud.Bucket(this, "Bucket");
    const queue = new cloud.Queue(this, "Queue");
    const processor = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, body) {
          let next = await $cap.counter.inc();
          let key = "file-" + next + ".txt";
          await $cap.bucket.put(key, body);
        }`
      ),
      entrypoint: "$proc",
      captures: {
        counter: {
          resource: counter,
          methods: [cloud.CounterInflightMethods.INC],
        },
        bucket: {
          resource: bucket,
          methods: [cloud.BucketInflightMethods.PUT],
        },
      },
    });
    queue.onMessage(processor);

    // Subscribing & publishing to Topics
    const topic = new cloud.Topic(this, "Topic");
    const otherTopic = new cloud.Topic(this, "OtherTopic");

    const subscriber = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          await $cap.topic.publish("Forwarding On Message: " + event.Message);
        }`
      ),
      entrypoint: "$proc",
      captures: {
        topic: {
          resource: otherTopic,
          methods: [cloud.TopicInflightMethods.PUBLISH],
        },
      },
    });
    topic.onMessage(subscriber);
  }
}

const app = new tfaws.App({ outdir: __dirname });
cloud.Logger.register(app);
new HelloWorld(app, "HelloWorld");
app.synth();
