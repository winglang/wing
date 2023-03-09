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

    const handler = testing.Testing.makeHandler(
      this,
      "Handler",
      `async handle() { console.log("Hello, world!"); }`
    );
    // cloud.Function._newFunction(this, "Function", handler);
    const queue = cloud.Queue._newQueue(this, "Queue");
    queue.onMessage(handler);
  }
}

const app = new tfaws.App({
  outdir: join(__dirname, "target"),
});
new HelloWorld(app, "HelloWorld");
app.synth();
