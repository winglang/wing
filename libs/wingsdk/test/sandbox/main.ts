import { join } from "path";
import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import * as tfaws from "../../src/target-tf-aws";
import * as tfazure from "../../src/target-tf-azure";
import * as tfgcp from "../../src/target-tf-gcp";
import * as testing from "../../src/testing";

// TODO: support multiple sandboxes
class HelloWorld extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const counter = new cloud.Counter(this, "Counter", {
      initial: 1000,
    });
    const bucket = new cloud.Bucket(this, "Bucket");
    const queue = new cloud.Queue(this, "Queue");
    const processor = testing.Testing.makeHandler(
      this,
      "Processor",
      `async handle(event) {
        let next = await this.counter.inc();
          let key = "file-" + next + ".txt";
          await this.bucket.put(key, event);
      }`,
      {
        resources: {
          counter: {
            resource: counter,
            ops: [cloud.CounterInflightMethods.INC],
          },
          bucket: {
            resource: bucket,
            ops: [cloud.BucketInflightMethods.PUT],
          },
        },
      }
    );
    queue.onMessage(processor);
  }
}

const app = new sim.App({
  outdir: join(__dirname, "target"),
});
new HelloWorld(app, "HelloWorld");
app.synth();
