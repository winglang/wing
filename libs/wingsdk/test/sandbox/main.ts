import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/sim";
// eslint-disable-next-line import/no-restricted-paths
import { FunctionClient } from "../../src/sim/function.inflight";
import * as testing from "../../src/testing";
// import * as tfaws from "../../src/tf-aws";

class Main extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const queue = new cloud.Queue(this, "Queue");
    const pusher = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, event) {
          await $cap.queue.push(event);
        }`
      ),
      entrypoint: "$proc",
      captures: {
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
  synthesizer: new sim.Synthesizer({ outdir: __dirname }),
});
new Main(app.root, "Main");
app.synth();

async function main() {
  const s = new testing.Simulator({ appPath: "app.wx" });
  await s.start();

  console.log(JSON.stringify(s.tree, null, 2));

  const pusherAttrs = s.getAttributes("root/Main/Function");
  const pusherClient = new FunctionClient(pusherAttrs.functionAddr);
  await pusherClient.invoke(JSON.stringify({ name: "Yoda" }));

  await new Promise((resolve) => setTimeout(resolve, 500));

  const processorAttrs = s.getAttributes(
    "root/Main/Queue/OnMessage-d022ec4ba5b8429e"
  );
  const processorClient = new FunctionClient(processorAttrs.functionAddr);
  await processorClient.timesCalled();

  await s.stop();
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
