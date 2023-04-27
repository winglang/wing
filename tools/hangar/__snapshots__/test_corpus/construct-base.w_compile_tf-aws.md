# [construct-base.w](../../../../examples/tests/valid/construct-base.w) | compile | tf-aws

## clients/WingResource.inflight.js
```js
class  WingResource {
  constructor({ stateful }) {
    this.stateful = stateful;
  }
}
exports.WingResource = WingResource;
exports.setupGlobals = function(globals) {
};

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.15.2"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_sqs_queue": {
      "root_awssqsQueueSqsQueue_47BDCAE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws.sqsQueue.SqsQueue",
            "uniqueId": "root_awssqsQueueSqsQueue_47BDCAE4"
          }
        }
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const cx = require("constructs");
const aws = require("@cdktf/provider-aws");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class WingResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        {console.log(`my id is ${this.node.id}`)};
      }
      _toInflight() {
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/WingResource.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const mod = require("${self_client_path}")
            const client = new mod.WingResource({
              stateful: ${stateful_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.stateful, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const get_path =  (c) =>  {
      {
        return c.node.path;
      }
    }
    ;
    const get_display_name =  (r) =>  {
      {
        return r.display.title;
      }
    }
    ;
    const q = this.node.root.new("@cdktf/provider-aws.sqsQueue.SqsQueue",aws.sqsQueue.SqsQueue,this,"aws.sqsQueue.SqsQueue");
    const wr = new WingResource(this,"WingResource");
    const another_resource = wr;
    {console.log(`path of sqs.queue: ${(get_path(q))}`)};
    {console.log(`path of wing resource: ${(get_path(wr))}`)};
    const title = ((get_display_name(wr)) ?? "no display name");
    {console.log(`display name of wing resource: ${title}`)};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "construct-base", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

