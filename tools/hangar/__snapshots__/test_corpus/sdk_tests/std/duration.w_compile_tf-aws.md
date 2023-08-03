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
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:duration\",\"${aws_lambda_function.testduration_Handler_50E6E252.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testduration_Handler_IamRole_E8904CA2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:duration/Handler/IamRole",
            "uniqueId": "testduration_Handler_IamRole_E8904CA2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testduration_Handler_IamRolePolicy_0F7DF922": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:duration/Handler/IamRolePolicy",
            "uniqueId": "testduration_Handler_IamRolePolicy_0F7DF922"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testduration_Handler_IamRole_E8904CA2.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testduration_Handler_IamRolePolicyAttachment_80DA5D49": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:duration/Handler/IamRolePolicyAttachment",
            "uniqueId": "testduration_Handler_IamRolePolicyAttachment_80DA5D49"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testduration_Handler_IamRole_E8904CA2.name}"
      }
    },
    "aws_lambda_function": {
      "testduration_Handler_50E6E252": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:duration/Handler/Default",
            "uniqueId": "testduration_Handler_50E6E252"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8eae108",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8eae108",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testduration_Handler_IamRole_E8904CA2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testduration_Handler_S3Object_0D531EBE.key}",
        "timeout": 30,
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
      "testduration_Handler_S3Object_0D531EBE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:duration/Handler/S3Object",
            "uniqueId": "testduration_Handler_S3Object_0D531EBE"
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
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
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
new $App({ outdir: $outdir, name: "duration", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

