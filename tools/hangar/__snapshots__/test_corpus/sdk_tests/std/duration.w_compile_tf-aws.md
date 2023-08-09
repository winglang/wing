# [duration.w](../../../../../../examples/tests/sdk_tests/std/duration.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $std_Duration }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: 12ms.seconds == 12 / 1000")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(0.012)).seconds,(12 / 1000))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12s.seconds == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(12)).seconds,12)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12m.seconds == 12 * 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(720)).seconds,(12 * 60))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12h.seconds == 12 * 60 * 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(43200)).seconds,((12 * 60) * 60))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12d.seconds == 12 * 60 * 60 * 24")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1036800)).seconds,(((12 * 60) * 60) * 24))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12mo.seconds == (12 * 60 * 60 * 24 * 365) / 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(31536000)).seconds,(((((12 * 60) * 60) * 24) * 365) / 12))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12y.seconds == 12 * 60 * 60 * 24 * 365")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(378432000)).seconds,((((12 * 60) * 60) * 24) * 365))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(10).seconds == 10ms.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMilliseconds(10)).seconds,(await $std_Duration.fromSeconds(0.01)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(10).seconds == 10m.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMinutes(10)).seconds,(await $std_Duration.fromSeconds(600)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(10).seconds == 10s.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(10)).seconds,(await $std_Duration.fromSeconds(10)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(10).seconds == 10h.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromHours(10)).seconds,(await $std_Duration.fromSeconds(36000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(10).seconds == 10d.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromDays(10)).seconds,(await $std_Duration.fromSeconds(864000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(10).seconds == 10mo.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromMonths(10)).seconds,(await $std_Duration.fromSeconds(26280000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(10).seconds == 10y.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromYears(10)).seconds,(await $std_Duration.fromSeconds(315360000)).seconds)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.milliseconds == 1000")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).milliseconds,1000)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.minutes == 1 / 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).minutes,(1 / 60))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.hours == 1 / (60 * 60)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).hours,(1 / (60 * 60)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.days == 1 / (60 * 60 * 24)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).days,(1 / ((60 * 60) * 24)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.months == 1 / ((60 * 60 * 24 * 365) / 12)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).months,(1 / ((((60 * 60) * 24) * 365) / 12)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.years == 1 / (60 * 60 * 24 * 365)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $std_Duration.fromSeconds(1)).years,(1 / (((60 * 60) * 24) * 365)))))};
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:duration\",\"${aws_lambda_function.undefined_testduration_Handler_A99D79B6.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testduration_Handler_IamRole_B8EBC3FD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:duration/Handler/IamRole",
            "uniqueId": "undefined_testduration_Handler_IamRole_B8EBC3FD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testduration_Handler_IamRolePolicy_06D9D543": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:duration/Handler/IamRolePolicy",
            "uniqueId": "undefined_testduration_Handler_IamRolePolicy_06D9D543"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testduration_Handler_IamRole_B8EBC3FD.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testduration_Handler_IamRolePolicyAttachment_5B09F88A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:duration/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testduration_Handler_IamRolePolicyAttachment_5B09F88A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testduration_Handler_IamRole_B8EBC3FD.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testduration_Handler_A99D79B6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:duration/Handler/Default",
            "uniqueId": "undefined_testduration_Handler_A99D79B6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8eaca69",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8eaca69",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testduration_Handler_IamRole_B8EBC3FD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testduration_Handler_S3Object_DC2AC016.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_testduration_Handler_S3Object_DC2AC016": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:duration/Handler/S3Object",
            "uniqueId": "undefined_testduration_Handler_S3Object_DC2AC016"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $std_Duration: ${context._lift(std.Duration)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: 12ms.seconds == 12 / 1000")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(0.012)).seconds,(12 / 1000))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12s.seconds == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(12)).seconds,12)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12m.seconds == 12 * 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(720)).seconds,(12 * 60))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12h.seconds == 12 * 60 * 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(43200)).seconds,((12 * 60) * 60))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12d.seconds == 12 * 60 * 60 * 24")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1036800)).seconds,(((12 * 60) * 60) * 24))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12mo.seconds == (12 * 60 * 60 * 24 * 365) / 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(31536000)).seconds,(((((12 * 60) * 60) * 24) * 365) / 12))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12y.seconds == 12 * 60 * 60 * 24 * 365")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(378432000)).seconds,((((12 * 60) * 60) * 24) * 365))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(10).seconds == 10ms.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromMilliseconds(10)).seconds,(std.Duration.fromSeconds(0.01)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(10).seconds == 10m.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromMinutes(10)).seconds,(std.Duration.fromSeconds(600)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(10).seconds == 10s.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(10)).seconds,(std.Duration.fromSeconds(10)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(10).seconds == 10h.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromHours(10)).seconds,(std.Duration.fromSeconds(36000)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(10).seconds == 10d.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromDays(10)).seconds,(std.Duration.fromSeconds(864000)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(10).seconds == 10mo.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromMonths(10)).seconds,(std.Duration.fromSeconds(26280000)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(10).seconds == 10y.seconds")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromYears(10)).seconds,(std.Duration.fromSeconds(315360000)).seconds)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.milliseconds == 1000")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).milliseconds,1000)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.minutes == 1 / 60")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).minutes,(1 / 60))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.hours == 1 / (60 * 60)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).hours,(1 / (60 * 60)))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.days == 1 / (60 * 60 * 24)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).days,(1 / ((60 * 60) * 24)))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.months == 1 / ((60 * 60 * 24 * 365) / 12)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).months,(1 / ((((60 * 60) * 24) * 365) / 12)))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.years == 1 / (60 * 60 * 24 * 365)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((std.Duration.fromSeconds(1)).years,(1 / (((60 * 60) * 24) * 365)))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:duration",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "duration", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

