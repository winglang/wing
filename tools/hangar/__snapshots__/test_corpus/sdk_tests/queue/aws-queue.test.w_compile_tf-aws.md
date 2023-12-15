# [aws-queue.test.w](../../../../../../examples/tests/sdk_tests/queue/aws-queue.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $queueInfo, $target }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $if_let_value = $queueInfo;
        if ($if_let_value != undefined) {
          const queue = $if_let_value;
          if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($target,"tf-aws"))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: queue.get(\"queueArn\").contains(\"arn:aws:sqs:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(queue, "queueArn").includes("arn:aws:sqs:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: queue.get(\"queueArn\").contains(\"aws-wing-queue\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(queue, "queueArn").includes("aws-wing-queue"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: queue.get(\"queueName\").contains(\"aws-wing-queue\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(queue, "queueName").includes("aws-wing-queue"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: queue.get(\"queueArn\").contains(\"arn:aws:sqs:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(queue, "queueArn").includes("arn:aws:sqs:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: queue.get(\"queueArn\").contains(\"awswingqueue\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(queue, "queueArn").includes("awswingqueue"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: queue.get(\"queueName\").contains(\"awswingqueue\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(queue, "queueName").includes("awswingqueue"))};
          }
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
        }
      }
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_sqs_queue": {
      "aws-wing-queue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-queue/Default",
            "uniqueId": "aws-wing-queue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "aws-wing-queue-c87f4487",
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
const cloud = $stdlib.cloud;
const aws = $stdlib.aws;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $queueInfo: ${$stdlib.core.liftObject(queueInfo)},
            $target: ${$stdlib.core.liftObject(target)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(queueInfo, host, []);
          $Closure1._registerOnLiftObject(target, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const target = (util.Util.env("WING_TARGET"));
    const queue = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "aws-wing-queue");
    const getQueueInfo = ((q) => {
      {
        const $if_let_value = (aws.Queue.from(q));
        if ($if_let_value != undefined) {
          const queue = $if_let_value;
          return ({"queueName": queue.queueName, "queueUrl": queue.queueUrl, "queueArn": queue.queueArn});
        }
      }
      return undefined;
    });
    const queueInfo = (getQueueInfo(queue));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:validates the AWS queue name", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "aws-queue.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

