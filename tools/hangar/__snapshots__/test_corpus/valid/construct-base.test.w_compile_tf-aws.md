# [construct-base.test.w](../../../../../examples/tests/valid/construct-base.test.w) | compile | tf-aws

## inflight.WingResource-1.js
```js
"use strict";
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
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
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
      "awssqsQueueSqsQueue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws.sqsQueue.SqsQueue",
            "uniqueId": "awssqsQueueSqsQueue"
          }
        }
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const cx = require("constructs");
const aws = require("@cdktf/provider-aws");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class WingResource extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        {console.log(String.raw({ raw: ["my id is ", ""] }, this.node.id))};
      }
      static _toInflightType(context) {
        return `
          require("./inflight.WingResource-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const WingResourceClient = ${WingResource._toInflightType(this)};
            const client = new WingResourceClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    const getPath = ((c) => {
      return c.node.path;
    });
    const getDisplayName = ((r) => {
      return (std.Node.of(r)).title;
    });
    const q = this.node.root.new("@cdktf/provider-aws.sqsQueue.SqsQueue",aws.sqsQueue.SqsQueue,this, "aws.sqsQueue.SqsQueue");
    const wr = new WingResource(this, "WingResource");
    const another_resource = wr;
    {console.log(String.raw({ raw: ["path of sqs.queue: ", ""] }, (getPath(q))))};
    {console.log(String.raw({ raw: ["path of wing resource: ", ""] }, (getPath(wr))))};
    const title = ((getDisplayName(wr)) ?? "no display name");
    {console.log(String.raw({ raw: ["display name of wing resource: ", ""] }, title))};
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "construct-base.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

