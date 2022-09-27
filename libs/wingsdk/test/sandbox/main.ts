import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import { QueueInflightMethods } from "../../src/cloud";
import * as core from "../../src/core";
// import * as local from "../../src/local";
import * as tfaws from "../../src/tf-aws";

class Root extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const queue = new cloud.Queue(this, "Queue");
    const pusher = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          await $cap.queue.push(JSON.stringify(event));
        }`
      ),
      entrypoint: "$proc",
      captures: {
        queue: {
          obj: queue,
          methods: [QueueInflightMethods.PUSH],
        },
      },
    });
    new cloud.Function(this, "Function", pusher);

    const processor = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          console.log("Received " + event.name);
        }`
      ),
      entrypoint: "$proc",
    });
    queue.onMessage(processor);
  }
}

const app = new core.App({
  synthesizer: new tfaws.Synthesizer({ outdir: __dirname }),
});
new Root(app.root, "root");
app.synth();
