import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
// import * as sim from "../../src/sim";
import * as tfaws from "../../src/tf-aws";

class Main extends Construct {
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

const app = new core.App({
  synthesizer: new tfaws.Synthesizer({ outdir: __dirname }),
  // synthesizer: new sim.Synthesizer({ outdir: __dirname }),
});
cloud.Logger.register(app.root);
new Main(app.root, "Main");
app.synth();
