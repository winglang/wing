# [aws-topic.test.w](../../../../../../examples/tests/sdk_tests/topic/aws-topic.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $target, $topicInfo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $if_let_value = $topicInfo;
        if ($if_let_value != undefined) {
          const topic = $if_let_value;
          if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($target,"tf-aws"))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: topic.get(\"topicArn\").contains(\"arn:aws:sns:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(topic, "topicArn").includes("arn:aws:sns:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: topic.get(\"topicArn\").contains(\"aws-wing-topic\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(topic, "topicArn").includes("aws-wing-topic"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: topic.get(\"topicName\").contains(\"aws-wing-topic\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(topic, "topicName").includes("aws-wing-topic"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: topic.get(\"topicArn\").contains(\"arn:aws:sns:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(topic, "topicArn").includes("arn:aws:sns:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: topic.get(\"topicArn\").contains(\"awswingtopic\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(topic, "topicArn").includes("awswingtopic"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: topic.get(\"topicName\").contains(\"awswingtopic\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(topic, "topicName").includes("awswingtopic"))};
          }
        }
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
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
    "aws_sns_topic": {
      "aws-wing-topic": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-topic/Default",
            "uniqueId": "aws-wing-topic"
          }
        },
        "name": "aws-wing-topic-c89ce2b1"
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
            $target: ${$stdlib.core.liftObject(target)},
            $topicInfo: ${$stdlib.core.liftObject(topicInfo)},
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
          $Closure1._registerOnLiftObject(target, host, []);
          $Closure1._registerOnLiftObject(topicInfo, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const target = (util.Util.env("WING_TARGET"));
    const topic = this.node.root.new("@winglang/sdk.cloud.Topic", cloud.Topic, this, "aws-wing-topic");
    const getTopicInfo = ((t) => {
      {
        const $if_let_value = (aws.Topic.from(t));
        if ($if_let_value != undefined) {
          const topic = $if_let_value;
          return ({"topicName": topic.topicName, "topicArn": topic.topicArn});
        }
      }
      return undefined;
    });
    const topicInfo = (getTopicInfo(topic));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:validates the AWS topic name", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "aws-topic.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

