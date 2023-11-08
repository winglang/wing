# [capture_resource_and_data.test.w](../../../../../examples/tests/valid/capture_resource_and_data.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $data_size, $queue, $res }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: data.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($data_size,3)))};
      (await $res.put("file.txt", "world"));
      {((cond) => {if (!cond) throw new Error("assertion failed: res.get(\"file.txt\") == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $res.get("file.txt")),"world")))};
      (await $queue.push("spirulina"));
    }
  }
  return $Closure1;
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
    "aws_s3_bucket": {
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_sqs_queue": {
      "cloudQueue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "cloudQueue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "cloud-Queue-c86e03d8",
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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $data_size: ${context._lift(data.size)},
            $queue: ${context._lift(queue)},
            $res: ${context._lift(res)},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(data.size, host, []);
          $Closure1._registerOnLiftObject(queue, host, ["push"]);
          $Closure1._registerOnLiftObject(res, host, ["get", "put"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const data = new Set([1, 2, 3]);
    const res = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "cloud.Bucket");
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this, "cloud.Queue");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:resource and data", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "capture_resource_and_data.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

