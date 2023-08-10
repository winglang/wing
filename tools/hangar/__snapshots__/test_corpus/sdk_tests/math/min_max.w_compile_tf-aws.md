# [min_max.w](../../../../../../examples/tests/sdk_tests/math/min_max.w) | compile | tf-aws

## inflight.$Closure1-0c8f53b1.js
```js
module.exports = function({ $math_Util, $myArray }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.min(myArray) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.min($myArray)),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.max(myArray) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.max($myArray)),5)))};
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
      "value": "[[\"root/Default/Default/test:inflight min--max\",\"${aws_lambda_function.testinflightmin--max_Handler_7896C0CC.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightmin--max_Handler_IamRole_F9B896A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight min--max/Handler/IamRole",
            "uniqueId": "testinflightmin--max_Handler_IamRole_F9B896A0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightmin--max_Handler_IamRolePolicy_2C02F5B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight min--max/Handler/IamRolePolicy",
            "uniqueId": "testinflightmin--max_Handler_IamRolePolicy_2C02F5B3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightmin--max_Handler_IamRole_F9B896A0.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightmin--max_Handler_IamRolePolicyAttachment_5612AA50": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight min--max/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightmin--max_Handler_IamRolePolicyAttachment_5612AA50"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightmin--max_Handler_IamRole_F9B896A0.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightmin--max_Handler_7896C0CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight min--max/Handler/Default",
            "uniqueId": "testinflightmin--max_Handler_7896C0CC"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c88f3f4b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88f3f4b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightmin--max_Handler_IamRole_F9B896A0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightmin--max_Handler_S3Object_8C967067.key}",
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
      "testinflightmin--max_Handler_S3Object_8C967067": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight min--max/Handler/S3Object",
            "uniqueId": "testinflightmin--max_Handler_S3Object_8C967067"
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
          require("./inflight.$Closure1-0c8f53b1.js")({
            $math_Util: ${context._lift(math.Util)},
            $myArray: ${context._lift(myArray)},
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
          $Closure1._registerBindObject(myArray, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const myArray = [1, 2, 3, 4, 5];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.min(myArray) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.min(myArray)),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.max(myArray) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.max(myArray)),5)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight min/max",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "min_max", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

