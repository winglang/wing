# [floor_ceil_round.w](../../../../../../examples/tests/sdk_tests/math/floor_ceil_round.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $__x_, $__y_, $math_Util, $x, $y }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.floor(x) == 5")})(((await $math_Util.floor($x)) === 5))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.ceil(x) == 6")})(((await $math_Util.ceil($x)) === 6))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(x) == 5")})(((await $math_Util.round($x)) === 5))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(y) == 6")})(((await $math_Util.round($y)) === 6))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(-x) == -5")})(((await $math_Util.round($__x_)) === (-5)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(-y) == -6")})(((await $math_Util.round($__y_)) === (-6)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 1) == 2.7")})(((await $math_Util.round($math_Util.E,{ decimalPlaces: 1 })) === 2.7))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 2) == 2.72")})(((await $math_Util.round($math_Util.E,{ decimalPlaces: 2 })) === 2.72))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 3) == 2.718")})(((await $math_Util.round($math_Util.E,{ decimalPlaces: 3 })) === 2.718))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 4) == 2.7183")})(((await $math_Util.round($math_Util.E,{ decimalPlaces: 4 })) === 2.7183))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 5) == 2.71828")})(((await $math_Util.round($math_Util.E,{ decimalPlaces: 5 })) === 2.71828))};
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
      "value": "[[\"root/Default/Default/test:inflight floor--ceil--round\",\"${aws_lambda_function.testinflightfloor--ceil--round_Handler_90E85A3F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightfloor--ceil--round_Handler_IamRole_70C76120": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight floor--ceil--round/Handler/IamRole",
            "uniqueId": "testinflightfloor--ceil--round_Handler_IamRole_70C76120"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightfloor--ceil--round_Handler_IamRolePolicy_FA154202": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight floor--ceil--round/Handler/IamRolePolicy",
            "uniqueId": "testinflightfloor--ceil--round_Handler_IamRolePolicy_FA154202"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightfloor--ceil--round_Handler_IamRole_70C76120.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightfloor--ceil--round_Handler_IamRolePolicyAttachment_A4FE3D1C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight floor--ceil--round/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightfloor--ceil--round_Handler_IamRolePolicyAttachment_A4FE3D1C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightfloor--ceil--round_Handler_IamRole_70C76120.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightfloor--ceil--round_Handler_90E85A3F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight floor--ceil--round/Handler/Default",
            "uniqueId": "testinflightfloor--ceil--round_Handler_90E85A3F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8bf255a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8bf255a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightfloor--ceil--round_Handler_IamRole_70C76120.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightfloor--ceil--round_Handler_S3Object_CBAFAFCF.key}",
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
      "testinflightfloor--ceil--round_Handler_S3Object_CBAFAFCF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight floor--ceil--round/Handler/S3Object",
            "uniqueId": "testinflightfloor--ceil--round_Handler_S3Object_CBAFAFCF"
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $__x_: ${context._lift((-x))},
            $__y_: ${context._lift((-y))},
            $math_Util: ${context._lift(math.Util)},
            $x: ${context._lift(x)},
            $y: ${context._lift(y)},
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
          $Closure1._registerBindObject((-x), host, []);
          $Closure1._registerBindObject((-y), host, []);
          $Closure1._registerBindObject(x, host, []);
          $Closure1._registerBindObject(y, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const x = 5.05;
    const y = 5.95;
    {((cond) => {if (!cond) throw new Error("assertion failed: math.floor(x) == 5")})(((math.Util.floor(x)) === 5))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.ceil(x) == 6")})(((math.Util.ceil(x)) === 6))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(x) == 5")})(((math.Util.round(x)) === 5))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(y) == 6")})(((math.Util.round(y)) === 6))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(-x) == -5")})(((math.Util.round((-x))) === (-5)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(-y) == -6")})(((math.Util.round((-y))) === (-6)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E) == 3")})(((math.Util.round(math.Util.E)) === 3))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 1) == 2.7")})(((math.Util.round(math.Util.E,{ decimalPlaces: 1 })) === 2.7))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 2) == 2.72")})(((math.Util.round(math.Util.E,{ decimalPlaces: 2 })) === 2.72))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 3) == 2.718")})(((math.Util.round(math.Util.E,{ decimalPlaces: 3 })) === 2.718))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 4) == 2.7183")})(((math.Util.round(math.Util.E,{ decimalPlaces: 4 })) === 2.7183))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.E, decimalPlaces: 5) == 2.71828")})(((math.Util.round(math.Util.E,{ decimalPlaces: 5 })) === 2.71828))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight floor/ceil/round",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "floor_ceil_round", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

