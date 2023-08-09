# [atan2.w](../../../../../../examples/tests/sdk_tests/math/atan2.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(90, 15) == 1.4056476493802699")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(90,15)),1.4056476493802699)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(15, 90) == 0.16514867741462683")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(15,90)),0.16514867741462683)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-1, -1) == -1 * math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2((-1),(-1))),((((-1) * $math_Util.PI) * 3) / 4))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-0, -1) == -1 * math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2((-0),(-1))),((-1) * $math_Util.PI))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, -1) == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(0,(-1))),$math_Util.PI)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(1, -1) == math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(1,(-1))),(($math_Util.PI * 3) / 4))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, 0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(0,0)),0)))};
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:inflight arc tangent 2\",\"${aws_lambda_function.undefined_testinflightarctangent2_Handler_8BB9F5E6.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightarctangent2_Handler_IamRole_55DE4EFF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight arc tangent 2/Handler/IamRole",
            "uniqueId": "undefined_testinflightarctangent2_Handler_IamRole_55DE4EFF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightarctangent2_Handler_IamRolePolicy_0178AF13": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight arc tangent 2/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightarctangent2_Handler_IamRolePolicy_0178AF13"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightarctangent2_Handler_IamRole_55DE4EFF.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightarctangent2_Handler_IamRolePolicyAttachment_3312E0FE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight arc tangent 2/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightarctangent2_Handler_IamRolePolicyAttachment_3312E0FE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightarctangent2_Handler_IamRole_55DE4EFF.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightarctangent2_Handler_8BB9F5E6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight arc tangent 2/Handler/Default",
            "uniqueId": "undefined_testinflightarctangent2_Handler_8BB9F5E6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c88b245f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88b245f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightarctangent2_Handler_IamRole_55DE4EFF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightarctangent2_Handler_S3Object_2F4CDEF1.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_testinflightarctangent2_Handler_S3Object_2F4CDEF1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight arc tangent 2/Handler/S3Object",
            "uniqueId": "undefined_testinflightarctangent2_Handler_S3Object_2F4CDEF1"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(90, 15) == 1.4056476493802699")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(90,15)),1.4056476493802699)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(15, 90) == 0.16514867741462683")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(15,90)),0.16514867741462683)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-1, -1) == -1 * math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2((-1),(-1))),((((-1) * math.Util.PI) * 3) / 4))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-0, -1) == -1 * math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2((-0),(-1))),((-1) * math.Util.PI))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, -1) == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(0,(-1))),math.Util.PI)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(1, -1) == math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(1,(-1))),((math.Util.PI * 3) / 4))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, 0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(0,0)),0)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc tangent 2",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "atan2", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

