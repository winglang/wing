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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(0) == 1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acot(0)),1.5707963267948966)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI / 2) == 0.5669115049410094")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acot(($math_Util.PI / 2))),0.5669115049410094)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI) == 0.30816907111598496")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acot($math_Util.PI)),0.30816907111598496)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.TAU) == 0.15783119028815887")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acot($math_Util.TAU)),0.15783119028815887)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(-0) == -1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.acot((-0))),(-1.5707963267948966))))};
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
      "value": "[[\"root/undefined/Default/test:inflight arc cotgent\",\"${aws_lambda_function.undefined_testinflightarccotgent_Handler_F96A36C9.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightarccotgent_Handler_IamRole_723D4022": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight arc cotgent/Handler/IamRole",
            "uniqueId": "undefined_testinflightarccotgent_Handler_IamRole_723D4022"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightarccotgent_Handler_IamRolePolicy_A31FD6EE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight arc cotgent/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightarccotgent_Handler_IamRolePolicy_A31FD6EE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightarccotgent_Handler_IamRole_723D4022.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightarccotgent_Handler_IamRolePolicyAttachment_40CD6731": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight arc cotgent/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightarccotgent_Handler_IamRolePolicyAttachment_40CD6731"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightarccotgent_Handler_IamRole_723D4022.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightarccotgent_Handler_F96A36C9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight arc cotgent/Handler/Default",
            "uniqueId": "undefined_testinflightarccotgent_Handler_F96A36C9"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a29020",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a29020",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightarccotgent_Handler_IamRole_723D4022.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightarccotgent_Handler_S3Object_8971F98F.key}",
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
      "undefined_testinflightarccotgent_Handler_S3Object_8971F98F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight arc cotgent/Handler/S3Object",
            "uniqueId": "undefined_testinflightarccotgent_Handler_S3Object_8971F98F"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(0) == 1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acot(0)),1.5707963267948966)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI / 2) == 0.5669115049410094")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acot((math.Util.PI / 2))),0.5669115049410094)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.PI) == 0.30816907111598496")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acot(math.Util.PI)),0.30816907111598496)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(math.TAU) == 0.15783119028815887")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acot(math.Util.TAU)),0.15783119028815887)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.acot(-0) == -1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.acot((-0))),(-1.5707963267948966))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc cotgent",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "acot", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

