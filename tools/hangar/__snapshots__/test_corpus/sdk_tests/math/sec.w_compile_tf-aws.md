# [sec.w](../../../../../../examples/tests/sdk_tests/math/sec.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(-0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sec((-0))),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sec(0)),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(1) == 1.8508157176809255")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sec(1)),1.8508157176809255)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(-5) == 3.5253200858160887")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sec((-5))),3.5253200858160887)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(math.PI) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sec($math_Util.PI)),(-1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(math.TAU) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sec($math_Util.TAU)),1)))};
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
      "value": "[[\"root/undefined/Default/test:inflight secant\",\"${aws_lambda_function.undefined_testinflightsecant_Handler_58E3DCA6.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightsecant_Handler_IamRole_6838E634": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight secant/Handler/IamRole",
            "uniqueId": "undefined_testinflightsecant_Handler_IamRole_6838E634"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightsecant_Handler_IamRolePolicy_C86D5E1D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight secant/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightsecant_Handler_IamRolePolicy_C86D5E1D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightsecant_Handler_IamRole_6838E634.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightsecant_Handler_IamRolePolicyAttachment_460F58D1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight secant/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightsecant_Handler_IamRolePolicyAttachment_460F58D1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightsecant_Handler_IamRole_6838E634.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightsecant_Handler_58E3DCA6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight secant/Handler/Default",
            "uniqueId": "undefined_testinflightsecant_Handler_58E3DCA6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c83a1e6f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c83a1e6f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightsecant_Handler_IamRole_6838E634.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightsecant_Handler_S3Object_D9A95FA4.key}",
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
      "undefined_testinflightsecant_Handler_S3Object_D9A95FA4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight secant/Handler/S3Object",
            "uniqueId": "undefined_testinflightsecant_Handler_S3Object_D9A95FA4"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(-0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sec((-0))),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sec(0)),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(1) == 1.8508157176809255")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sec(1)),1.8508157176809255)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(-5) == 3.5253200858160887")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sec((-5))),3.5253200858160887)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(math.PI) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sec(math.Util.PI)),(-1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sec(math.TAU) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sec(math.Util.TAU)),1)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight secant",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "sec", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

