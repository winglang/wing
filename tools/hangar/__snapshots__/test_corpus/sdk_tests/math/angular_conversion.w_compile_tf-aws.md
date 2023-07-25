# [angular_conversion.w](../../../../../../examples/tests/sdk_tests/math/angular_conversion.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(360) == math.TAU")})(((await $math_Util.degreesToRadians(360)) === $math_Util.TAU))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(180) == math.PI")})(((await $math_Util.degreesToRadians(180)) === $math_Util.PI))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(90) == math.PI / 2")})(((await $math_Util.degreesToRadians(90)) === ($math_Util.PI / 2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(60) == math.PI / 3")})(((await $math_Util.degreesToRadians(60)) === ($math_Util.PI / 3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(45) == math.PI / 4")})(((await $math_Util.degreesToRadians(45)) === ($math_Util.PI / 4)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(30) == math.PI / 6")})(((await $math_Util.degreesToRadians(30)) === ($math_Util.PI / 6)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.TAU) == 360")})(((await $math_Util.radiansToDegrees($math_Util.TAU)) === 360))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI) == 180")})(((await $math_Util.radiansToDegrees($math_Util.PI)) === 180))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI / 2) == 90")})(((await $math_Util.radiansToDegrees(($math_Util.PI / 2))) === 90))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.radiansToDegrees(math.PI / 3)) == 60")})(((await $math_Util.round((await $math_Util.radiansToDegrees(($math_Util.PI / 3))))) === 60))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI / 4) == 45")})(((await $math_Util.radiansToDegrees(($math_Util.PI / 4))) === 45))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.radiansToDegrees(math.PI / 6)) == 30")})(((await $math_Util.round((await $math_Util.radiansToDegrees(($math_Util.PI / 6))))) === 30))};
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
      "value": "[[\"root/Default/Default/test:inflight angular conversions\",\"${aws_lambda_function.testinflightangularconversions_Handler_70CD171D.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightangularconversions_Handler_IamRole_AEAE2854": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight angular conversions/Handler/IamRole",
            "uniqueId": "testinflightangularconversions_Handler_IamRole_AEAE2854"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightangularconversions_Handler_IamRolePolicy_C649FC50": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight angular conversions/Handler/IamRolePolicy",
            "uniqueId": "testinflightangularconversions_Handler_IamRolePolicy_C649FC50"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightangularconversions_Handler_IamRole_AEAE2854.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightangularconversions_Handler_IamRolePolicyAttachment_1DB6ACA8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight angular conversions/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightangularconversions_Handler_IamRolePolicyAttachment_1DB6ACA8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightangularconversions_Handler_IamRole_AEAE2854.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightangularconversions_Handler_70CD171D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight angular conversions/Handler/Default",
            "uniqueId": "testinflightangularconversions_Handler_70CD171D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85ddda6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85ddda6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightangularconversions_Handler_IamRole_AEAE2854.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightangularconversions_Handler_S3Object_87548D7C.key}",
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
      "testinflightangularconversions_Handler_S3Object_87548D7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight angular conversions/Handler/S3Object",
            "uniqueId": "testinflightangularconversions_Handler_S3Object_87548D7C"
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
const math = $stdlib.math;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $math_Util: ${context._lift(math.Util)},
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(360) == math.TAU")})(((math.Util.degreesToRadians(360)) === math.Util.TAU))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(180) == math.PI")})(((math.Util.degreesToRadians(180)) === math.Util.PI))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(90) == math.PI / 2")})(((math.Util.degreesToRadians(90)) === (math.Util.PI / 2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(60) == math.PI / 3")})(((math.Util.degreesToRadians(60)) === (math.Util.PI / 3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(45) == math.PI / 4")})(((math.Util.degreesToRadians(45)) === (math.Util.PI / 4)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.degreesToRadians(30) == math.PI / 6")})(((math.Util.degreesToRadians(30)) === (math.Util.PI / 6)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.TAU) == 360")})(((math.Util.radiansToDegrees(math.Util.TAU)) === 360))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI) == 180")})(((math.Util.radiansToDegrees(math.Util.PI)) === 180))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI / 2) == 90")})(((math.Util.radiansToDegrees((math.Util.PI / 2))) === 90))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.radiansToDegrees(math.PI / 3)) == 60")})(((math.Util.round((math.Util.radiansToDegrees((math.Util.PI / 3))))) === 60))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.radiansToDegrees(math.PI / 4) == 45")})(((math.Util.radiansToDegrees((math.Util.PI / 4))) === 45))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.radiansToDegrees(math.PI / 6)) == 30")})(((math.Util.round((math.Util.radiansToDegrees((math.Util.PI / 6))))) === 30))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight angular conversions",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "angular_conversion", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

