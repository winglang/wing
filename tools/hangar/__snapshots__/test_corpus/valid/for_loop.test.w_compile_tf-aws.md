# [for_loop.test.w](../../../../../examples/tests/valid/for_loop.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event) {
      for (const x of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,10,false)) {
        {((cond) => {if (!cond) throw new Error("assertion failed: x <= 0")})((x <= 0))};
        {((cond) => {if (!cond) throw new Error("assertion failed: x > 10")})((x > 10))};
        {console.log(String.raw({ raw: ["", ""] }, x))};
      }
    }
  }
  return $Closure1;
}

```

## inflight.Foo-1.js
```js
"use strict";
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    async hello() {
      for (const p of ["hello"]) {
        {console.log(p)};
      }
    }
  }
  return Foo;
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
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.arn}",
        "runtime": "nodejs18.x",
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
    }
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Foo-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this)};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["hello", "$inflight_init"];
      }
    }
    const words = ["wing", "lang", "dang"];
    const uniqueNumbers = new Set([1, 2, 3]);
    for (const word of words) {
      for (const number of uniqueNumbers) {
        {((cond) => {if (!cond) throw new Error("assertion failed: number > 0")})((number > 0))};
        {console.log(String.raw({ raw: ["", ": ", ""] }, word, number))};
      }
    }
    let i = 0;
    for (const word of words) {
      i = (i + 1);
      let preBreakHits = 0;
      let postBreakHits = 0;
      for (const number of uniqueNumbers) {
        {((cond) => {if (!cond) throw new Error("assertion failed: number > 0")})((number > 0))};
        {console.log(String.raw({ raw: ["", ": ", ""] }, word, number))};
        preBreakHits = (preBreakHits + 1);
        if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(number,2))) {
          break;
        }
        postBreakHits = (postBreakHits + 1);
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: preBreakHits == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(preBreakHits,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: postBreakHits == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(postBreakHits,1)))};
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: i == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(i,3)))};
    let j = 0;
    for (const word of words) {
      j = (j + 1);
      let preContinueHits = 0;
      let postContinueHits = 0;
      for (const number of uniqueNumbers) {
        {((cond) => {if (!cond) throw new Error("assertion failed: number > 0")})((number > 0))};
        {console.log(String.raw({ raw: ["", ": ", ""] }, word, number))};
        preContinueHits = (preContinueHits + 1);
        if ((number > 0)) {
          continue;
        }
        postContinueHits = (postContinueHits + 1);
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: preContinueHits == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(preContinueHits,3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: postContinueHits == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(postContinueHits,0)))};
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: j == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(j,3)))};
    {console.log("---\nfor x in 0..0 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 0, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
    }
    {console.log("there's no value to iterate")};
    {console.log("---\nfor x in 0..=0 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 0, true)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x,0)))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in 0..2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 2, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x >= 0")})((x >= 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x < 2")})((x < 2))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in 0..=2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 2, true)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x >= 0")})((x >= 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x <= 2")})((x <= 2))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in 2..0 { ... }")};
    for (const x of $stdlib.std.Range.of(2, 0, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x <= 2")})((x <= 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x > 0")})((x > 0))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in 2..=0 { ... }")};
    for (const x of $stdlib.std.Range.of(2, 0, true)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x <= 2")})((x <= 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x >= 0")})((x >= 0))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in 0..-2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, (-2), false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x <= 0")})((x <= 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x > -2")})((x > (-2)))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in 0..=-2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, (-2), true)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x <= 0")})((x <= 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x > -3")})((x > (-3)))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in -2..0 { ... }")};
    for (const x of $stdlib.std.Range.of((-2), 0, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x >= -2")})((x >= (-2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x < 0")})((x < 0))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in -2..=0 { ... }")};
    for (const x of $stdlib.std.Range.of((-2), 0, true)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x >= -2")})((x >= (-2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x <= 0")})((x <= 0))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    const z = 2;
    {console.log("---\nfor x in 0..z { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, z, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x >= 0")})((x >= 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x < 2")})((x < 2))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in 0..=z { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, z, true)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x >= 0")})((x >= 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x <= 2")})((x <= 2))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in z..0 { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(z, 0, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x <= 2")})((x <= 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x > 0")})((x > 0))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in 0..(z*2) { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, (z * 2), false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x >= 0")})((x >= 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x < 4")})((x < 4))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in 0..=(z*2) { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, (z * 2), true)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x >= 0")})((x >= 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x <= 4")})((x <= 4))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    {console.log("---\nfor x in (z*2)..0 { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of((z * 2), 0, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: x <= 4")})((x <= 4))};
      {((cond) => {if (!cond) throw new Error("assertion failed: x > 0")})((x > 0))};
      {console.log(String.raw({ raw: ["", ""] }, x))};
    }
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this, "cloud.Function", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "for_loop.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```

