# [construct-base.w](../../../../../examples/tests/valid/construct-base.w) | compile | tf-aws

## inflight.WingResource.js
```js
module.exports = function({  }) {
  class WingResource {
    constructor({  }) {
    }
  }
  return WingResource;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "undefined": {
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
      "undefined_awssqsQueueSqsQueue_8E085439": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/aws.sqsQueue.SqsQueue",
            "uniqueId": "undefined_awssqsQueueSqsQueue_8E085439"
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
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const cx = require("constructs");
const aws = require("@cdktf/provider-aws");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class WingResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        {console.log(String.raw({ raw: ["my id is ", ""] }, this.node.id))};
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.WingResource.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const WingResourceClient = ${WingResource._toInflightType(this).text};
            const client = new WingResourceClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    const getPath = ((c) => {
      return c.node.path;
    });
    const getDisplayName = ((r) => {
      return r.display.title;
    });
    const q = this.node.root.new("@cdktf/provider-aws.sqsQueue.SqsQueue",aws.sqsQueue.SqsQueue,this,"aws.sqsQueue.SqsQueue");
    const wr = new WingResource(this,"WingResource");
    const another_resource = wr;
    {console.log(String.raw({ raw: ["path of sqs.queue: ", ""] }, (getPath(q))))};
    {console.log(String.raw({ raw: ["path of wing resource: ", ""] }, (getPath(wr))))};
    const title = ((getDisplayName(wr)) ?? "no display name");
    {console.log(String.raw({ raw: ["display name of wing resource: ", ""] }, title))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "construct-base", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

