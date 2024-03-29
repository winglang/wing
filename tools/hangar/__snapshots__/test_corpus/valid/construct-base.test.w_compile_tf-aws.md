# [construct-base.test.w](../../../../../examples/tests/valid/construct-base.test.w) | compile | tf-aws

## inflight.WingResource-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class WingResource {
    constructor({  }) {
    }
  }
  return WingResource;
}
//# sourceMappingURL=inflight.WingResource-1.js.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_sqs_queue": {
      "SqsQueue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/SqsQueue",
            "uniqueId": "SqsQueue"
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
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const cx = require("constructs");
const aws = require("@cdktf/provider-aws");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class WingResource extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        console.log(String.raw({ raw: ["my id is ", ""] }, this.node.id));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.WingResource-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const WingResourceClient = ${WingResource._toInflightType()};
            const client = new WingResourceClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    const getPath = ((c) => {
      return c.node.path;
    });
    const getDisplayName = ((r) => {
      return $helpers.nodeof(r).title;
    });
    const q = this.node.root.new("@cdktf/provider-aws.sqsQueue.SqsQueue", aws.sqsQueue.SqsQueue, this, "SqsQueue");
    const wr = new WingResource(this, "WingResource");
    const another_resource = wr;
    console.log(String.raw({ raw: ["path of sqs.queue: ", ""] }, (getPath(q))));
    console.log(String.raw({ raw: ["path of wing resource: ", ""] }, (getPath(wr))));
    const title = ((getDisplayName(wr)) ?? "no display name");
    console.log(String.raw({ raw: ["display name of wing resource: ", ""] }, title));
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

