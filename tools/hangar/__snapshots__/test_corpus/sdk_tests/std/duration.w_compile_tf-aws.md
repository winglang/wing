# [duration.w](../../../../../../examples/tests/sdk_tests/std/duration.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ std_Duration }) {
  const std = {
    Duration: std_Duration,
  };
  class $Closure1 {
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: 12ms.seconds == 12 / 1000")})(((await std.Duration.fromSeconds(0.012)).seconds === (12 / 1000)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12s.seconds == 12")})(((await std.Duration.fromSeconds(12)).seconds === 12))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12m.seconds == 12 * 60")})(((await std.Duration.fromSeconds(720)).seconds === (12 * 60)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12h.seconds == 12 * 60 * 60")})(((await std.Duration.fromSeconds(43200)).seconds === ((12 * 60) * 60)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12d.seconds == 12 * 60 * 60 * 24")})(((await std.Duration.fromSeconds(1036800)).seconds === (((12 * 60) * 60) * 24)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12mo.seconds == (12 * 60 * 60 * 24 * 365) / 12")})(((await std.Duration.fromSeconds(31536000)).seconds === (((((12 * 60) * 60) * 24) * 365) / 12)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 12y.seconds == 12 * 60 * 60 * 24 * 365")})(((await std.Duration.fromSeconds(378432000)).seconds === ((((12 * 60) * 60) * 24) * 365)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(10).seconds == 10ms.seconds")})(((await std.Duration.fromMilliseconds(10)).seconds === (await std.Duration.fromSeconds(0.01)).seconds))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(10).seconds == 10m.seconds")})(((await std.Duration.fromMinutes(10)).seconds === (await std.Duration.fromSeconds(600)).seconds))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(10).seconds == 10s.seconds")})(((await std.Duration.fromSeconds(10)).seconds === (await std.Duration.fromSeconds(10)).seconds))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(10).seconds == 10h.seconds")})(((await std.Duration.fromHours(10)).seconds === (await std.Duration.fromSeconds(36000)).seconds))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(10).seconds == 10d.seconds")})(((await std.Duration.fromDays(10)).seconds === (await std.Duration.fromSeconds(864000)).seconds))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(10).seconds == 10mo.seconds")})(((await std.Duration.fromMonths(10)).seconds === (await std.Duration.fromSeconds(26280000)).seconds))};
      {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(10).seconds == 10y.seconds")})(((await std.Duration.fromYears(10)).seconds === (await std.Duration.fromSeconds(315360000)).seconds))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.milliseconds == 1000")})(((await std.Duration.fromSeconds(1)).milliseconds === 1000))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.minutes == 1 / 60")})(((await std.Duration.fromSeconds(1)).minutes === (1 / 60)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.hours == 1 / (60 * 60)")})(((await std.Duration.fromSeconds(1)).hours === (1 / (60 * 60))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.days == 1 / (60 * 60 * 24)")})(((await std.Duration.fromSeconds(1)).days === (1 / ((60 * 60) * 24))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.months == 1 / ((60 * 60 * 24 * 365) / 12)")})(((await std.Duration.fromSeconds(1)).months === (1 / ((((60 * 60) * 24) * 365) / 12))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: 1s.years == 1 / (60 * 60 * 24 * 365)")})(((await std.Duration.fromSeconds(1)).years === (1 / (((60 * 60) * 24) * 365))))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
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
      "version": "0.15.2"
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
      "value": "[[\"root/Default/Default/test:duration\",\"${aws_lambda_function.root_testduration_Handler_4617C618.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testduration_Handler_IamRole_85F00155": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:duration/Handler/IamRole",
            "uniqueId": "root_testduration_Handler_IamRole_85F00155"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testduration_Handler_IamRolePolicy_29B88A3B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:duration/Handler/IamRolePolicy",
            "uniqueId": "root_testduration_Handler_IamRolePolicy_29B88A3B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testduration_Handler_IamRole_85F00155.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testduration_Handler_IamRolePolicyAttachment_59FD14C2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:duration/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testduration_Handler_IamRolePolicyAttachment_59FD14C2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testduration_Handler_IamRole_85F00155.name}"
      }
    },
    "aws_lambda_function": {
      "root_testduration_Handler_4617C618": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:duration/Handler/Default",
            "uniqueId": "root_testduration_Handler_4617C618"
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
        "role": "${aws_iam_role.root_testduration_Handler_IamRole_85F00155.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testduration_Handler_S3Object_2FD544DA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_testduration_Handler_S3Object_2FD544DA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:duration/Handler/S3Object",
            "uniqueId": "root_testduration_Handler_S3Object_2FD544DA"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const lifted_std_Duration = std.Duration._toInflightType(context).text;
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({ 
            std_Duration: ${lifted_std_Duration},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${$Closure1._toInflightType(this).text})({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: 12ms.seconds == 12 / 1000")})(((std.Duration.fromSeconds(0.012)).seconds === (12 / 1000)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12s.seconds == 12")})(((std.Duration.fromSeconds(12)).seconds === 12))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12m.seconds == 12 * 60")})(((std.Duration.fromSeconds(720)).seconds === (12 * 60)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12h.seconds == 12 * 60 * 60")})(((std.Duration.fromSeconds(43200)).seconds === ((12 * 60) * 60)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12d.seconds == 12 * 60 * 60 * 24")})(((std.Duration.fromSeconds(1036800)).seconds === (((12 * 60) * 60) * 24)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12mo.seconds == (12 * 60 * 60 * 24 * 365) / 12")})(((std.Duration.fromSeconds(31536000)).seconds === (((((12 * 60) * 60) * 24) * 365) / 12)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 12y.seconds == 12 * 60 * 60 * 24 * 365")})(((std.Duration.fromSeconds(378432000)).seconds === ((((12 * 60) * 60) * 24) * 365)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMilliseconds(10).seconds == 10ms.seconds")})(((std.Duration.fromMilliseconds(10)).seconds === (std.Duration.fromSeconds(0.01)).seconds))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMinutes(10).seconds == 10m.seconds")})(((std.Duration.fromMinutes(10)).seconds === (std.Duration.fromSeconds(600)).seconds))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromSeconds(10).seconds == 10s.seconds")})(((std.Duration.fromSeconds(10)).seconds === (std.Duration.fromSeconds(10)).seconds))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromHours(10).seconds == 10h.seconds")})(((std.Duration.fromHours(10)).seconds === (std.Duration.fromSeconds(36000)).seconds))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromDays(10).seconds == 10d.seconds")})(((std.Duration.fromDays(10)).seconds === (std.Duration.fromSeconds(864000)).seconds))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromMonths(10).seconds == 10mo.seconds")})(((std.Duration.fromMonths(10)).seconds === (std.Duration.fromSeconds(26280000)).seconds))};
    {((cond) => {if (!cond) throw new Error("assertion failed: duration.fromYears(10).seconds == 10y.seconds")})(((std.Duration.fromYears(10)).seconds === (std.Duration.fromSeconds(315360000)).seconds))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.milliseconds == 1000")})(((std.Duration.fromSeconds(1)).milliseconds === 1000))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.minutes == 1 / 60")})(((std.Duration.fromSeconds(1)).minutes === (1 / 60)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.hours == 1 / (60 * 60)")})(((std.Duration.fromSeconds(1)).hours === (1 / (60 * 60))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.days == 1 / (60 * 60 * 24)")})(((std.Duration.fromSeconds(1)).days === (1 / ((60 * 60) * 24))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.months == 1 / ((60 * 60 * 24 * 365) / 12)")})(((std.Duration.fromSeconds(1)).months === (1 / ((((60 * 60) * 24) * 365) / 12))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: 1s.years == 1 / (60 * 60 * 24 * 365)")})(((std.Duration.fromSeconds(1)).years === (1 / (((60 * 60) * 24) * 365))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:duration",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "duration", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

