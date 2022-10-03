import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/sim";
// eslint-disable-next-line import/no-restricted-paths
import { FunctionClient } from "../../src/sim/function.inflight";
// eslint-disable-next-line import/no-restricted-paths
import { QueueClient } from "../../src/sim/queue.inflight";
import * as testing from "../../src/testing";
// import * as tfaws from "../../src/tf-aws";

class Main extends Construct {
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
          methods: [cloud.QueueInflightMethods.PUSH],
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
  synthesizer: new sim.Synthesizer({ outdir: __dirname }),
});
new Main(app.root, "Main");
app.synth();

async function main() {
  const s = await testing.Simulator.fromWingApp("app.wx");

  console.error(JSON.stringify(s.tree, null, 2));

  // const pusherAttrs = s.getAttributes("root/my_function");
  // const pusherClient = new FunctionClient(pusherAttrs.functionAddr);

  // const queueAttrs = s.getAttributes("root/Queue");
  // const queueClient = new QueueClient(queueAttrs.queueAddr);

  // const processorAttrs = s.getAttributes("root/my_function");
  // const processorClient = new FunctionClient(processorAttrs.functionAddr);
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
