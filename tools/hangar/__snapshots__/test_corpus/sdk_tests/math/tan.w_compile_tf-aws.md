# [tan.w](../../../../../../examples/tests/sdk_tests/math/tan.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(-0) == -0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.tan((-0))),(-0))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.tan(0)),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(1) == 1.5574077246549023")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.tan(1)),1.5574077246549023)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(math.PI / 4) == 0.9999999999999999")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.tan(($math_Util.PI / 4))),0.9999999999999999)))};
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
      "value": "[[\"root/Default/Default/test:inflight tangent\",\"${aws_lambda_function.testinflighttangent_Handler_C5A37FFB.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflighttangent_Handler_IamRole_A44BF0B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight tangent/Handler/IamRole",
            "uniqueId": "testinflighttangent_Handler_IamRole_A44BF0B4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflighttangent_Handler_IamRolePolicy_8BE35603": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight tangent/Handler/IamRolePolicy",
            "uniqueId": "testinflighttangent_Handler_IamRolePolicy_8BE35603"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflighttangent_Handler_IamRole_A44BF0B4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflighttangent_Handler_IamRolePolicyAttachment_60FAB5D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight tangent/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflighttangent_Handler_IamRolePolicyAttachment_60FAB5D8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflighttangent_Handler_IamRole_A44BF0B4.name}"
      }
    },
    "aws_lambda_function": {
      "testinflighttangent_Handler_C5A37FFB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight tangent/Handler/Default",
            "uniqueId": "testinflighttangent_Handler_C5A37FFB"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8879d07",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8879d07",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflighttangent_Handler_IamRole_A44BF0B4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflighttangent_Handler_S3Object_B7B06C62.key}",
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
      "testinflighttangent_Handler_S3Object_B7B06C62": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight tangent/Handler/S3Object",
            "uniqueId": "testinflighttangent_Handler_S3Object_B7B06C62"
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
const math = require('@winglang/sdk').math;
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(-0) == -0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.tan((-0))),(-0))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.tan(0)),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(1) == 1.5574077246549023")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.tan(1)),1.5574077246549023)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(math.PI / 4) == 0.9999999999999999")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.tan((math.Util.PI / 4))),0.9999999999999999)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight tangent",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "tan", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

