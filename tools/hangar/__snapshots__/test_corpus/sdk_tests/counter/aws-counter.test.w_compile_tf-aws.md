# [aws-counter.test.w](../../../../../../examples/tests/sdk_tests/counter/aws-counter.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $counterInfo, $target }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $if_let_value = $counterInfo;
        if ($if_let_value != undefined) {
          const counter = $if_let_value;
          if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($target,"tf-aws"))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: counter.get(\"dynamoTableArn\").contains(\"arn:aws:dynamodb:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(counter, "dynamoTableArn").includes("arn:aws:dynamodb:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: counter.get(\"dynamoTableArn\").contains(\"aws-wing-counter\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(counter, "dynamoTableArn").includes("aws-wing-counter"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: counter.get(\"dynamoTableName\").contains(\"aws-wing-counter\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(counter, "dynamoTableName").includes("aws-wing-counter"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: counter.get(\"dynamoTableArn\").contains(\"arn:aws:dynamodb:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(counter, "dynamoTableArn").includes("arn:aws:dynamodb:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: counter.get(\"dynamoTableArn\").contains(\"awswingcounter\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(counter, "dynamoTableArn").includes("awswingcounter"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: counter.get(\"dynamoTableName\").contains(\"awswingcounter\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(counter, "dynamoTableName").includes("awswingcounter"))};
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
    "aws_dynamodb_table": {
      "aws-wing-counter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-counter/Default",
            "uniqueId": "aws-wing-counter"
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
        "name": "wing-counter-aws-wing-counter-c86dc608"
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
            $counterInfo: ${$stdlib.core.liftObject(counterInfo)},
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
          $Closure1._registerOnLiftObject(counterInfo, host, []);
          $Closure1._registerOnLiftObject(target, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const target = (util.Util.env("WING_TARGET"));
    const counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "aws-wing-counter", { initial: 1 });
    const getCounterInfo = ((c) => {
      {
        const $if_let_value = (aws.Counter.from(c));
        if ($if_let_value != undefined) {
          const counter = $if_let_value;
          return ({"dynamoTableArn": counter.dynamoTableArn, "dynamoTableName": counter.dynamoTableName});
        }
      }
      return undefined;
    });
    const counterInfo = (getCounterInfo(counter));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:validates the AWS counter name", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "aws-counter.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

