import { join } from "path";
import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import * as tfaws from "../../src/target-tf-aws";

class MyBucket extends Construct {
  private inner: cloud.Bucket;
  private thing: string;
  constructor(scope: Construct, id: string, message: string) {
    super(scope, id);
    this.inner = new cloud.Bucket(this, "Bucket");
    this.thing = message;
  }

  _bind(host: core.Resource, policy: core.Policy) {
    const inner_client_policy = policy.lookup("this.inner");
    const inner_client = this.inner._bind(host, inner_client_policy);
    const thing_client = JSON.stringify(this.thing);
    const my_bucket_client_path = join(__dirname, "MyBucket.inflight.js");
    return core.NodeJsCode.fromInline(
      `new (require("${my_bucket_client_path}")).MyBucket__Inflight({ inner: ${inner_client.text}, thing: ${thing_client} })`
    );
  }
}

class Handler extends Construct {
  private b: MyBucket;
  constructor(scope: Construct, id: string, b: MyBucket) {
    super(scope, id);
    this.b = b;
  }

  _bind(host: core.Resource, policy: core.Policy) {
    const b_client_policy = policy.lookup("this.b"); // or just "b"
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
    const code = new core.Inflight({
      code: core.NodeJsCode.fromInline(
        `async function $proc($cap, body) {
          await $cap.handler.handle();
        }`
      ),
      entrypoint: "$proc",
      bindings: {
        handler: handler,
      },
      policies: {
        handler: {
          methods: ["handle"],
        },
        "handler.b": {
          methods: ["put_something"],
        },
        "handler.b.inner": {
          methods: ["put"],
        },
      },
    });
    new cloud.Function(this, "Function", code);
  }
}

const app = new sim.App({ outdir: __dirname });
cloud.Logger.register(app);
new HelloWorld(app, "HelloWorld");
app.synth();
