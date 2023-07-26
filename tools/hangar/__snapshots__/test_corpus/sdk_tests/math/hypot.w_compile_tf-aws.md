# [hypot.w](../../../../../../examples/tests/sdk_tests/math/hypot.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([3, 4]) == 5")})(((await $math_Util.hypot(Object.freeze([3, 4]))) === 5))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([5, 12]) == 13")})(((await $math_Util.hypot(Object.freeze([5, 12]))) === 13))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.hypot([3, 4, 5]), decimalPlaces: 2) == 7.07")})(((await $math_Util.round((await $math_Util.hypot(Object.freeze([3, 4, 5]))),{ decimalPlaces: 2 })) === 7.07))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([-5]) == 5")})(((await $math_Util.hypot(Object.freeze([(-5)]))) === 5))};
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
      "value": "[[\"root/Default/Default/test:inflight hypot\",\"${aws_lambda_function.testinflighthypot_Handler_892C5ACF.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflighthypot_Handler_IamRole_1958850E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight hypot/Handler/IamRole",
            "uniqueId": "testinflighthypot_Handler_IamRole_1958850E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflighthypot_Handler_IamRolePolicy_3A895B06": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight hypot/Handler/IamRolePolicy",
            "uniqueId": "testinflighthypot_Handler_IamRolePolicy_3A895B06"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflighthypot_Handler_IamRole_1958850E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflighthypot_Handler_IamRolePolicyAttachment_D2DB4216": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight hypot/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflighthypot_Handler_IamRolePolicyAttachment_D2DB4216"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflighthypot_Handler_IamRole_1958850E.name}"
      }
    },
    "aws_lambda_function": {
      "testinflighthypot_Handler_892C5ACF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight hypot/Handler/Default",
            "uniqueId": "testinflighthypot_Handler_892C5ACF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8289cd0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8289cd0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflighthypot_Handler_IamRole_1958850E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflighthypot_Handler_S3Object_7DF86846.key}",
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
      "testinflighthypot_Handler_S3Object_7DF86846": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight hypot/Handler/S3Object",
            "uniqueId": "testinflighthypot_Handler_S3Object_7DF86846"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([3, 4]) == 5")})(((math.Util.hypot(Object.freeze([3, 4]))) === 5))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([5, 12]) == 13")})(((math.Util.hypot(Object.freeze([5, 12]))) === 13))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.hypot([3, 4, 5]), decimalPlaces: 2) == 7.07")})(((math.Util.round((math.Util.hypot(Object.freeze([3, 4, 5]))),{ decimalPlaces: 2 })) === 7.07))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([-5]) == 5")})(((math.Util.hypot(Object.freeze([(-5)]))) === 5))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight hypot",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "hypot", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

