# [aws-bucket.test.w](../../../../../../examples/tests/sdk_tests/bucket/aws-bucket.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $bucketInfo, $target }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $if_let_value = $bucketInfo;
        if ($if_let_value != undefined) {
          const bucket = $if_let_value;
          if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($target,"tf-aws"))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: bucket.get(\"bucketArn\").contains(\"arn:aws:s3:::aws-wing-bucket\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(bucket, "bucketArn").includes("arn:aws:s3:::aws-wing-bucket"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: bucket.get(\"bucketName\").contains(\"aws-wing-bucket\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(bucket, "bucketName").includes("aws-wing-bucket"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: bucket.get(\"bucketArn\").contains(\"arn:aws:s3:::\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(bucket, "bucketArn").includes("arn:aws:s3:::"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: bucket.get(\"bucketArn\").contains(\"awswingbucket\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(bucket, "bucketArn").includes("awswingbucket"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: bucket.get(\"bucketName\").contains(\"awswingbucket\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(bucket, "bucketName").includes("awswingbucket"))};
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
    "aws_s3_bucket": {
      "aws-wing-bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-bucket/Default",
            "uniqueId": "aws-wing-bucket"
          }
        },
        "bucket_prefix": "aws-wing-bucket-c8f5eeeb-",
        "force_destroy": false
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
            $bucketInfo: ${$stdlib.core.liftObject(bucketInfo)},
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
          $Closure1._registerOnLiftObject(bucketInfo, host, []);
          $Closure1._registerOnLiftObject(target, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const target = (util.Util.env("WING_TARGET"));
    const bucket = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "aws-wing-bucket");
    const getBucketInfo = ((b) => {
      {
        const $if_let_value = (aws.Bucket.from(b));
        if ($if_let_value != undefined) {
          const bucket = $if_let_value;
          return ({"bucketName": bucket.bucketName, "bucketArn": bucket.bucketArn});
        }
      }
      return undefined;
    });
    const bucketInfo = (getBucketInfo(bucket));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:validates the AWS Bucket", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "aws-bucket.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```

