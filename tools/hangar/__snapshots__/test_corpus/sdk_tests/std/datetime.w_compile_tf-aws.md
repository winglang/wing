# [datetime.w](../../../../../../examples/tests/sdk_tests/std/datetime.w) | compile | tf-aws

## inflight.$Closure1-bddd785f.js
```js
module.exports = function({ $_d4_toUtc____hours, $d4_hours, $d4_timezone, $math_Util, $std_Datetime, $std_Duration, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const d5 = (await $std_Datetime.systemNow());
      const d6 = (await d5.toUtc());
      {((cond) => {if (!cond) throw new Error("assertion failed: d5.timestampMs == d6.timestampMs")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d5.timestampMs,d6.timestampMs)))};
      const d7 = (await $std_Datetime.fromIso("2023-07-18T20:18:25.177-03:00"));
      const d8 = (await $std_Datetime.fromComponents({ year: 2023, month: 6, day: 18, hour: 20, min: 18, sec: 25, ms: 177, tz: 180 }));
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.timestampMs == 1689722305177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.timestampMs,1689722305177)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.hours == 23")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.hours,23)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.min == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.min,18)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.sec == 25")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.sec,25)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.ms == 177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.ms,177)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.dayOfMonth == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.dayOfMonth,18)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.dayOfWeek == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.dayOfWeek,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.month == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.month,6)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d7.year == 2023")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d7.year,2023)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d8.hours == 20")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d8.hours,20)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.floor(d7.timestamp) == math.floor(d8.timestamp)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.floor(d7.timestamp)),(await $math_Util.floor(d8.timestamp)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d4.toUtc().hours == (d4.hours + (d4.timezone / 60))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_d4_toUtc____hours,($d4_hours + ($d4_timezone / 60)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: d8.toUtc().hours == (d8.hours + (d8.timezone / 60))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await d8.toUtc()).hours,(d8.hours + (d8.timezone / 60)))))};
      const beforeSleep = (await $std_Datetime.systemNow());
      (await $util_Util.sleep((await $std_Duration.fromSeconds(1))));
      const afterSleep = (await $std_Datetime.systemNow());
      {((cond) => {if (!cond) throw new Error("assertion failed: afterSleep.timestampMs - beforeSleep.timestampMs > 0")})(((afterSleep.timestampMs - beforeSleep.timestampMs) > 0))};
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
      "value": "[[\"root/Default/Default/test:inflight datetime\",\"${aws_lambda_function.testinflightdatetime_Handler_CCA19CA1.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightdatetime_Handler_IamRole_F29772B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight datetime/Handler/IamRole",
            "uniqueId": "testinflightdatetime_Handler_IamRole_F29772B9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightdatetime_Handler_IamRolePolicy_BA52AB3F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight datetime/Handler/IamRolePolicy",
            "uniqueId": "testinflightdatetime_Handler_IamRolePolicy_BA52AB3F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightdatetime_Handler_IamRole_F29772B9.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightdatetime_Handler_IamRolePolicyAttachment_BBFA8051": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight datetime/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightdatetime_Handler_IamRolePolicyAttachment_BBFA8051"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightdatetime_Handler_IamRole_F29772B9.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightdatetime_Handler_CCA19CA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight datetime/Handler/Default",
            "uniqueId": "testinflightdatetime_Handler_CCA19CA1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8211bab",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8211bab",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightdatetime_Handler_IamRole_F29772B9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightdatetime_Handler_S3Object_972D133E.key}",
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
      "testinflightdatetime_Handler_S3Object_972D133E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight datetime/Handler/S3Object",
            "uniqueId": "testinflightdatetime_Handler_S3Object_972D133E"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const math = $stdlib.math;
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
          require("./inflight.$Closure1-bddd785f.js")({
            $_d4_toUtc____hours: ${context._lift((d4.toUtc()).hours)},
            $d4_hours: ${context._lift(d4.hours)},
            $d4_timezone: ${context._lift(d4.timezone)},
            $math_Util: ${context._lift(math.Util)},
            $std_Datetime: ${context._lift(std.Datetime)},
            $std_Duration: ${context._lift(std.Duration)},
            $util_Util: ${context._lift(util.Util)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject((d4.toUtc()).hours, host, []);
          $Closure1._registerBindObject(d4.hours, host, []);
          $Closure1._registerBindObject(d4.timezone, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const d1 = (std.Datetime.systemNow());
    const d2 = (d1.toUtc());
    {((cond) => {if (!cond) throw new Error("assertion failed: d1.timestampMs == d2.timestampMs")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d1.timestampMs,d2.timestampMs)))};
    const d3 = (std.Datetime.fromIso("2023-07-18T20:18:25.177+03:00"));
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.timestampMs == 1689700705177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.timestampMs,1689700705177)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.hours == 17")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.hours,17)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.min == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.min,18)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.sec == 25")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.sec,25)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.ms == 177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.ms,177)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.dayOfMonth == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.dayOfMonth,18)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.dayOfWeek == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.dayOfWeek,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.month == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.month,6)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d3.year == 2023")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d3.year,2023)))};
    const d4 = (std.Datetime.fromComponents({ year: 2023, month: 6, day: 18, hour: 19, min: 18, sec: 25, ms: 177, tz: (-120) }));
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.timezone == -120")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.timezone,(-120))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.timestampMs == 1689700705177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.timestampMs,1689700705177)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.hours == 19")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.hours,19)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.min == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.min,18)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.sec == 25")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.sec,25)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.ms == 177")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.ms,177)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.dayOfMonth == 18")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.dayOfMonth,18)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.dayOfWeek == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.dayOfWeek,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.month == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.month,6)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.year == 2023")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(d4.year,2023)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: d4.toUtc().hours == (d4.hours + (d4.timezone / 60))")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((d4.toUtc()).hours,(d4.hours + (d4.timezone / 60)))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight datetime",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "datetime", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

