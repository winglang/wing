# [cot.w](../../../../../../examples/tests/sdk_tests/math/cot.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.cot(0) == math.INF")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.cot(0)),$math_Util.INF)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.cot(math.PI / 4)) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.round((await $math_Util.cot(($math_Util.PI / 4))))),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.cot(math.PI * 3 / 4)) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.round((await $math_Util.cot((($math_Util.PI * 3) / 4))))),(-1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.cot(-0) == -math.INF")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.cot((-0))),(-$math_Util.INF))))};
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
      "value": "[[\"root/Default/Default/test:inflight cotangent\",\"${aws_lambda_function.testinflightcotangent_Handler_93C199E4.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightcotangent_Handler_IamRole_4B4EF664": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cotangent/Handler/IamRole",
            "uniqueId": "testinflightcotangent_Handler_IamRole_4B4EF664"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightcotangent_Handler_IamRolePolicy_79041ED0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cotangent/Handler/IamRolePolicy",
            "uniqueId": "testinflightcotangent_Handler_IamRolePolicy_79041ED0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightcotangent_Handler_IamRole_4B4EF664.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightcotangent_Handler_IamRolePolicyAttachment_D8E7B217": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cotangent/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightcotangent_Handler_IamRolePolicyAttachment_D8E7B217"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightcotangent_Handler_IamRole_4B4EF664.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightcotangent_Handler_93C199E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cotangent/Handler/Default",
            "uniqueId": "testinflightcotangent_Handler_93C199E4"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8fc3a88",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8fc3a88",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightcotangent_Handler_IamRole_4B4EF664.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightcotangent_Handler_S3Object_3699819A.key}",
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
      "testinflightcotangent_Handler_S3Object_3699819A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cotangent/Handler/S3Object",
            "uniqueId": "testinflightcotangent_Handler_S3Object_3699819A"
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
          require("./inflight.$Closure1-1.js")({
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.cot(0) == math.INF")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.cot(0)),math.Util.INF)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.cot(math.PI / 4)) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.round((math.Util.cot((math.Util.PI / 4))))),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.cot(math.PI * 3 / 4)) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.round((math.Util.cot(((math.Util.PI * 3) / 4))))),(-1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.cot(-0) == -math.INF")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.cot((-0))),(-math.Util.INF))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight cotangent",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "cot", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

