# [for_loop.test.w](../../../../../examples/tests/valid/for_loop.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      for (const x of $helpers.range(0,10,false)) {
        $helpers.assert((x <= 0), "x <= 0");
        $helpers.assert((x > 10), "x > 10");
        console.log(String.raw({ raw: ["", ""] }, x));
      }
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.Foo-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    async hello() {
      for (const p of ["hello"]) {
        console.log(p);
      }
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.js.map
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
    "aws_cloudwatch_log_group": {
      "cloudFunction_CloudwatchLogGroup_7399B890": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/CloudwatchLogGroup",
            "uniqueId": "cloudFunction_CloudwatchLogGroup_7399B890"
          }
        },
        "name": "/aws/lambda/cloud-Function-c8d2eca1",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudFunction_IamRole_5A4430DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "cloudFunction_IamRole_5A4430DC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudFunction_IamRolePolicy_618BF987": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "cloudFunction_IamRolePolicy_618BF987"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudFunction_IamRolePolicyAttachment_288B9653": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "cloudFunction_IamRolePolicyAttachment_288B9653"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      }
    },
    "aws_lambda_function": {
      "cloudFunction": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "cloudFunction"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "reserved_concurrent_executions": 10,
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudFunction_S3Object_71908BAD.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "cloudFunction_S3Object_71908BAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/S3Object",
            "uniqueId": "cloudFunction_S3Object_71908BAD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType()};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "hello": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const words = ["wing", "lang", "dang"];
    const uniqueNumbers = new Set([1, 2, 3]);
    for (const word of words) {
      for (const number of uniqueNumbers) {
        $helpers.assert((number > 0), "number > 0");
        console.log(String.raw({ raw: ["", ": ", ""] }, word, number));
      }
    }
    let i = 0;
    for (const word of words) {
      i = (i + 1);
      let preBreakHits = 0;
      let postBreakHits = 0;
      for (const number of uniqueNumbers) {
        $helpers.assert((number > 0), "number > 0");
        console.log(String.raw({ raw: ["", ": ", ""] }, word, number));
        preBreakHits = (preBreakHits + 1);
        if ($helpers.eq(number, 2)) {
          break;
        }
        postBreakHits = (postBreakHits + 1);
      }
      $helpers.assert($helpers.eq(preBreakHits, 2), "preBreakHits == 2");
      $helpers.assert($helpers.eq(postBreakHits, 1), "postBreakHits == 1");
    }
    $helpers.assert($helpers.eq(i, 3), "i == 3");
    let j = 0;
    for (const word of words) {
      j = (j + 1);
      let preContinueHits = 0;
      let postContinueHits = 0;
      for (const number of uniqueNumbers) {
        $helpers.assert((number > 0), "number > 0");
        console.log(String.raw({ raw: ["", ": ", ""] }, word, number));
        preContinueHits = (preContinueHits + 1);
        if ((number > 0)) {
          continue;
        }
        postContinueHits = (postContinueHits + 1);
      }
      $helpers.assert($helpers.eq(preContinueHits, 3), "preContinueHits == 3");
      $helpers.assert($helpers.eq(postContinueHits, 0), "postContinueHits == 0");
    }
    $helpers.assert($helpers.eq(j, 3), "j == 3");
    console.log("---\nfor x in 0..0 { ... }");
    for (const x of $helpers.range(0,0,false)) {
      $helpers.assert(false, "false");
    }
    console.log("there's no value to iterate");
    console.log("---\nfor x in 0..=0 { ... }");
    for (const x of $helpers.range(0,0,true)) {
      $helpers.assert($helpers.eq(x, 0), "x == 0");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in 0..2 { ... }");
    for (const x of $helpers.range(0,2,false)) {
      $helpers.assert((x >= 0), "x >= 0");
      $helpers.assert((x < 2), "x < 2");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in 0..=2 { ... }");
    for (const x of $helpers.range(0,2,true)) {
      $helpers.assert((x >= 0), "x >= 0");
      $helpers.assert((x <= 2), "x <= 2");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in 2..0 { ... }");
    for (const x of $helpers.range(2,0,false)) {
      $helpers.assert((x <= 2), "x <= 2");
      $helpers.assert((x > 0), "x > 0");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in 2..=0 { ... }");
    for (const x of $helpers.range(2,0,true)) {
      $helpers.assert((x <= 2), "x <= 2");
      $helpers.assert((x >= 0), "x >= 0");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in 0..-2 { ... }");
    for (const x of $helpers.range(0,(-2),false)) {
      $helpers.assert((x <= 0), "x <= 0");
      $helpers.assert((x > (-2)), "x > -2");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in 0..=-2 { ... }");
    for (const x of $helpers.range(0,(-2),true)) {
      $helpers.assert((x <= 0), "x <= 0");
      $helpers.assert((x > (-3)), "x > -3");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in -2..0 { ... }");
    for (const x of $helpers.range((-2),0,false)) {
      $helpers.assert((x >= (-2)), "x >= -2");
      $helpers.assert((x < 0), "x < 0");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in -2..=0 { ... }");
    for (const x of $helpers.range((-2),0,true)) {
      $helpers.assert((x >= (-2)), "x >= -2");
      $helpers.assert((x <= 0), "x <= 0");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    const z = 2;
    console.log("---\nfor x in 0..z { ... } <=> x = 2");
    for (const x of $helpers.range(0,z,false)) {
      $helpers.assert((x >= 0), "x >= 0");
      $helpers.assert((x < 2), "x < 2");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in 0..=z { ... } <=> x = 2");
    for (const x of $helpers.range(0,z,true)) {
      $helpers.assert((x >= 0), "x >= 0");
      $helpers.assert((x <= 2), "x <= 2");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in z..0 { ... } <=> x = 2");
    for (const x of $helpers.range(z,0,false)) {
      $helpers.assert((x <= 2), "x <= 2");
      $helpers.assert((x > 0), "x > 0");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in 0..(z*2) { ... } <=> x = 2");
    for (const x of $helpers.range(0,(z * 2),false)) {
      $helpers.assert((x >= 0), "x >= 0");
      $helpers.assert((x < 4), "x < 4");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in 0..=(z*2) { ... } <=> x = 2");
    for (const x of $helpers.range(0,(z * 2),true)) {
      $helpers.assert((x >= 0), "x >= 0");
      $helpers.assert((x <= 4), "x <= 4");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    console.log("---\nfor x in (z*2)..0 { ... } <=> x = 2");
    for (const x of $helpers.range((z * 2),0,false)) {
      $helpers.assert((x <= 4), "x <= 4");
      $helpers.assert((x > 0), "x > 0");
      console.log(String.raw({ raw: ["", ""] }, x));
    }
    this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "cloud.Function", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "for_loop.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```

