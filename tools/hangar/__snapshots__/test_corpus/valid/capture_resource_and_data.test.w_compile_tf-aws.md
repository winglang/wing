# [capture_resource_and_data.test.w](../../../../../examples/tests/valid/capture_resource_and_data.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $data_size, $queue, $res }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($data_size, 3), "data.size == 3");
      (await $res.put("file.txt", "world"));
      $helpers.assert($helpers.eq((await $res.get("file.txt")), "world"), "res.get(\"file.txt\") == \"world\"");
      (await $queue.push("spirulina"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
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
    "aws_s3_bucket": {
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      }
    },
    "aws_sqs_queue": {
      "Queue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Default",
            "uniqueId": "Queue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "Queue-c822c726",
        "visibility_timeout_seconds": 30
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
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $data_size: ${$stdlib.core.liftObject(data.size)},
            $queue: ${$stdlib.core.liftObject(queue)},
            $res: ${$stdlib.core.liftObject(res)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [data.size, []],
            [queue, ["push"]],
            [res, [].concat(["put"], ["get"])],
          ],
          "$inflight_init": [
            [data.size, []],
            [queue, []],
            [res, []],
          ],
        });
      }
    }
    const data = new Set([1, 2, 3]);
    const res = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const queue = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "Queue");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:resource and data", new $Closure1(this, "$Closure1"));
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

