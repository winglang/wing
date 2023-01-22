import { join } from "path";
import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import * as tfaws from "../../src/target-tf-aws";
import * as tfazure from "../../src/target-tf-azure";
import * as testing from "../../src/testing";

class MyBucket extends core.Resource {
  public readonly stateful = true;
  private inner: cloud.Bucket;
  private thing: string;

  constructor(scope: Construct, id: string, message: string) {
    super(scope, id);
    this.inner = new cloud.Bucket(this, "Bucket");
    this.thing = message;
  }

  _toInflight(): core.Code {
    const inner_client = this.inner._toInflight();
    const thing_client = JSON.stringify(this.thing);
    const my_bucket_client_path = join(__dirname, "MyBucket.inflight.js");
    return core.NodeJsCode.fromInline(
      `new (require("${my_bucket_client_path}")).MyBucket__Inflight({ inner: ${inner_client.text}, thing: ${thing_client} })`
    );
  }
}

MyBucket._annotateInflight("put_something", {
  "this.inner": { ops: ["put"] },
});

class Handler extends core.Resource implements cloud.IFunctionHandler {
  public readonly stateful = true;
  private b: MyBucket;

  constructor(scope: Construct, id: string, b: MyBucket) {
    super(scope, id);
    this.b = b;
  }

  _toInflight(): core.Code {
    const b_client = this.b._toInflight();
    const handler_client_path = join(__dirname, "Handler.inflight.js");
    return core.NodeJsCode.fromInline(
      `new (require("${handler_client_path}")).Handler__Inflight({ b: ${b_client.text} })`
    );
  }
}

Handler._annotateInflight("handle", {
  "this.b": { ops: ["put_something"] },
});

// TODO: support multiple sandboxes
class HelloWorld extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new cloud.Bucket(this, "cloud.Bucket");
    const queue = new cloud.Queue(this, "cloud.Queue");
    const pusher = testing.Testing.makeHandler(
      app,
      "Pusher",
      `async handle(event) {
        console.log("Hello, world!");
        await this.queue.push(event);
      }`,
      {
        resources: {
          queue: {
            resource: queue,
            ops: [cloud.QueueInflightMethods.PUSH],
          },
        },
      }
    );
    new cloud.Function(this, "cloud.Function", pusher);
  }
}

const app = new tfaws.App({ outdir: __dirname });
new HelloWorld(app, "HelloWorld");
app.synth();
