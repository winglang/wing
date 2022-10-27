import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
// import * as sim from "../../src/sim";
import * as tfaws from "../../src/tf-aws";

class HelloWorld extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const queue = new cloud.Queue(this, "Queue");
    const pusher = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          await $cap.logger.print("Hello, world!");
          await $cap.queue.push(event);
        }`
      ),
      entrypoint: "$proc",
      captures: {
        logger: {
          resource: cloud.Logger.of(this),
          methods: [cloud.LoggerInflightMethods.PRINT],
        },
        queue: {
          resource: queue,
          methods: [cloud.QueueInflightMethods.PUSH],
        },
      },
    });
    new cloud.Function(this, "Function", pusher);

    const processor = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Received " + JSON.parse(event).name);
        }`
      ),
      entrypoint: "$proc",
    });
    queue.onMessage(processor);
  }
}

const app = new tfaws.App({ outdir: __dirname });
new HelloWorld(app, "HelloWorld");
app.synth();
