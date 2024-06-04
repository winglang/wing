# [main.w](../../../../../../../examples/tests/doc_examples/valid/01-preflight-and-inflight.md_example_9/main.w) | compile | tf-aws

## inflight.ReplayableQueue-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class ReplayableQueue {
    constructor({ $this_bucket, $this_counter, $this_queue }) {
      this.$this_bucket = $this_bucket;
      this.$this_counter = $this_counter;
      this.$this_queue = $this_queue;
    }
    async push(m) {
      (await this.$this_queue.push(m));
      (await this.$this_bucket.put(String.raw({ raw: ["messages/", ""] }, (await this.$this_counter.inc())), m));
    }
    async replay() {
      for (const i of (await this.$this_bucket.list())) {
        (await this.$this_queue.push((await this.$this_bucket.get(i))));
      }
    }
  }
  return ReplayableQueue;
}
//# sourceMappingURL=inflight.ReplayableQueue-1.cjs.map
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
    "aws_dynamodb_table": {
      "ReplayableQueue_Counter_DC8AA656": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReplayableQueue/Counter/Default",
            "uniqueId": "ReplayableQueue_Counter_DC8AA656"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-Counter-c840545d"
      }
    },
    "aws_s3_bucket": {
      "ReplayableQueue_Bucket_80ACEB0D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReplayableQueue/Bucket/Default",
            "uniqueId": "ReplayableQueue_Bucket_80ACEB0D"
          }
        },
        "bucket_prefix": "bucket-c82dee6b-",
        "force_destroy": false
      }
    },
    "aws_sqs_queue": {
      "ReplayableQueue_4BC92C83": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReplayableQueue/Queue/Default",
            "uniqueId": "ReplayableQueue_4BC92C83"
          }
        },
        "message_retention_seconds": 3600,
        "name": "Queue-c8ed2458",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class ReplayableQueue extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.queue = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "Queue");
        this.bucket = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
        this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
      }
      setConsumer(fn) {
        (this.queue.setConsumer(fn));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ReplayableQueue-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const ReplayableQueueClient = ${ReplayableQueue._toInflightType()};
            const client = new ReplayableQueueClient({
              $this_bucket: ${$stdlib.core.liftObject(this.bucket)},
              $this_counter: ${$stdlib.core.liftObject(this.counter)},
              $this_queue: ${$stdlib.core.liftObject(this.queue)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "push": [
            [this.bucket, ["put"]],
            [this.counter, ["inc"]],
            [this.queue, ["push"]],
          ],
          "replay": [
            [this.bucket, [].concat(["list"], ["get"])],
            [this.queue, ["push"]],
          ],
          "$inflight_init": [
            [this.bucket, []],
            [this.counter, []],
            [this.queue, []],
          ],
        });
      }
    }
    const rq = new ReplayableQueue(this, "ReplayableQueue");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "main", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

