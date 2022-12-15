import { join } from "path";
import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import * as tfaws from "../../src/target-tf-aws";

class MyBucket extends core.Resource {
  public readonly stateful = true;
  private inner: cloud.Bucket;
  private thing: string;

  /** @internal */
  public readonly _policies = {
    put_something: {
      inner: {
        methods: ["put"],
      },
    },
  };

  constructor(scope: Construct, id: string, message: string) {
    super(scope, id);
    this.inner = new cloud.Bucket(this, "Bucket");
    this.thing = message;
  }

  bindImpl(host: core.Resource, policy: core.OperationPolicy) {
    const inner_client_policy = core.Policies.make(policy, this.inner, "inner");
    const inner_client = this.inner._bind(host, inner_client_policy);
    const thing_client = JSON.stringify(this.thing);
    const my_bucket_client_path = join(__dirname, "MyBucket.inflight.js");
    return core.NodeJsCode.fromInline(
      `new (require("${my_bucket_client_path}")).MyBucket__Inflight({ inner: ${inner_client.text}, thing: ${thing_client} })`
    );
  }
}

class Handler extends core.Resource implements cloud.IFunctionHandler {
  public readonly stateful = true;
  private b: MyBucket;

  /** @internal */
  public readonly _policies = {
    handle: {
      b: {
        methods: ["put_something"],
      },
    },
  };

  constructor(scope: Construct, id: string, b: MyBucket) {
    super(scope, id);
    this.b = b;
  }

  bindImpl(host: core.Resource, policy: core.OperationPolicy) {
    const b_client_policy = core.Policies.make(policy, this.b, "b");
    const b_client = this.b._bind(host, b_client_policy);
    const handler_client_path = join(__dirname, "Handler.inflight.js");
    return core.NodeJsCode.fromInline(
      `new (require("${handler_client_path}")).Handler__Inflight({ b: ${b_client.text} })`
    );
  }
}

class HelloWorld extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const my_bucket = new MyBucket(this, "MyBucket", "Hello, World!");
    const handler = new Handler(this, "Handler", my_bucket);
    new cloud.Function(this, "Function", handler);

    const queue = new cloud.Queue(this, "Queue");
    queue.onMessage(handler);
  }
}

const app = new tfaws.App({ outdir: __dirname });
cloud.Logger.register(app);
new HelloWorld(app, "HelloWorld");
app.synth();
