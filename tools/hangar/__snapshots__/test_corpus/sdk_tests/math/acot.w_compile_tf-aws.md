# [acot.w](../../../../../../examples/tests/sdk_tests/math/acot.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(0) == 1.5707963267948966")})(((await $math_Util.acot(0)) === 1.5707963267948966))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI / 2) == 0.5669115049410094")})(((await $math_Util.acot(($math_Util.PI / 2))) === 0.5669115049410094))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI) == 0.30816907111598496")})(((await $math_Util.acot($math_Util.PI)) === 0.30816907111598496))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.TAU) == 0.15783119028815887")})(((await $math_Util.acot($math_Util.TAU)) === 0.15783119028815887))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(-0) == -1.5707963267948966")})(((await $math_Util.acot((-0))) === (-1.5707963267948966)))};
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
      "value": "[[\"root/Default/Default/test:inflight arc cotgent\",\"${aws_lambda_function.testinflightarccotgent_Handler_E7A125FF.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightarccotgent_Handler_IamRole_5DBFD930": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cotgent/Handler/IamRole",
            "uniqueId": "testinflightarccotgent_Handler_IamRole_5DBFD930"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightarccotgent_Handler_IamRolePolicy_BC8B89F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cotgent/Handler/IamRolePolicy",
            "uniqueId": "testinflightarccotgent_Handler_IamRolePolicy_BC8B89F2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightarccotgent_Handler_IamRole_5DBFD930.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightarccotgent_Handler_IamRolePolicyAttachment_19D8D49F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cotgent/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightarccotgent_Handler_IamRolePolicyAttachment_19D8D49F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightarccotgent_Handler_IamRole_5DBFD930.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightarccotgent_Handler_E7A125FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cotgent/Handler/Default",
            "uniqueId": "testinflightarccotgent_Handler_E7A125FF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e6e1b8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e6e1b8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightarccotgent_Handler_IamRole_5DBFD930.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightarccotgent_Handler_S3Object_2DFE3117.key}",
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
      "testinflightarccotgent_Handler_S3Object_2DFE3117": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cotgent/Handler/S3Object",
            "uniqueId": "testinflightarccotgent_Handler_S3Object_2DFE3117"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(0) == 1.5707963267948966")})(((math.Util.acot(0)) === 1.5707963267948966))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI / 2) == 0.5669115049410094")})(((math.Util.acot((math.Util.PI / 2))) === 0.5669115049410094))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI) == 0.30816907111598496")})(((math.Util.acot(math.Util.PI)) === 0.30816907111598496))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.TAU) == 0.15783119028815887")})(((math.Util.acot(math.Util.TAU)) === 0.15783119028815887))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(-0) == -1.5707963267948966")})(((math.Util.acot((-0))) === (-1.5707963267948966)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc cotgent",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "acot", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

