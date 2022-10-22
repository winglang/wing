import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/sim";
import { FunctionClient } from "../../src/sim/function.inflight";
import * as testing from "../../src/testing";
// import * as tfaws from "../../src/tf-aws";

class HelloWorld extends Construct {
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

const app = new sim.App({ outdir: __dirname });
new HelloWorld(app, "HelloWorld");
app.synth();

async function main() {
  const s = new testing.Simulator({ simfile: "app.wx" });
  await s.start();

  console.log(JSON.stringify(s.tree, null, 2));

  const pusherAttrs = s.getAttributes("root/HelloWorld/Function");
  const pusherClient = new FunctionClient(pusherAttrs.functionAddr);
  await pusherClient.invoke(JSON.stringify({ name: "Yoda" }));

  await new Promise((resolve) => setTimeout(resolve, 500));

  const processorAttrs = s.getAttributes(
    "root/HelloWorld/Queue/OnMessage-d022ec4ba5b8429e"
  );
  const processorClient = new FunctionClient(processorAttrs.functionAddr);
  await processorClient.timesCalled();

  await s.stop();
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
