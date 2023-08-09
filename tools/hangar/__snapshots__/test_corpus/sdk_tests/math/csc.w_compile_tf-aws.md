# [csc.w](../../../../../../examples/tests/sdk_tests/math/csc.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(-0) == -math.INF")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.csc((-0))),(-$math_Util.INF))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(0) == math.INF")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.csc(0)),$math_Util.INF)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(1) == 1.1883951057781212")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.csc(1)),1.1883951057781212)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(-5) == 1.0428352127714058")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.csc((-5))),1.0428352127714058)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.PI / 2) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.csc(($math_Util.PI / 2))),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.TAU / 4) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.csc(($math_Util.TAU / 4))),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.PI * 3 / 2) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.csc((($math_Util.PI * 3) / 2))),(-1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.TAU * 3 / 4) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.csc((($math_Util.TAU * 3) / 4))),(-1))))};
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
      "value": "[[\"root/undefined/Default/test:inflight cosecant\",\"${aws_lambda_function.undefined_testinflightcosecant_Handler_7E063B19.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightcosecant_Handler_IamRole_11CCAA6C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight cosecant/Handler/IamRole",
            "uniqueId": "undefined_testinflightcosecant_Handler_IamRole_11CCAA6C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightcosecant_Handler_IamRolePolicy_B617643B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight cosecant/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightcosecant_Handler_IamRolePolicy_B617643B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightcosecant_Handler_IamRole_11CCAA6C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightcosecant_Handler_IamRolePolicyAttachment_B262735E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight cosecant/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightcosecant_Handler_IamRolePolicyAttachment_B262735E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightcosecant_Handler_IamRole_11CCAA6C.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightcosecant_Handler_7E063B19": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight cosecant/Handler/Default",
            "uniqueId": "undefined_testinflightcosecant_Handler_7E063B19"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c866f2df",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c866f2df",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightcosecant_Handler_IamRole_11CCAA6C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightcosecant_Handler_S3Object_BF727209.key}",
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
      "undefined_testinflightcosecant_Handler_S3Object_BF727209": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight cosecant/Handler/S3Object",
            "uniqueId": "undefined_testinflightcosecant_Handler_S3Object_BF727209"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(-0) == -math.INF")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.csc((-0))),(-math.Util.INF))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(0) == math.INF")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.csc(0)),math.Util.INF)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(1) == 1.1883951057781212")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.csc(1)),1.1883951057781212)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(-5) == 1.0428352127714058")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.csc((-5))),1.0428352127714058)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.PI / 2) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.csc((math.Util.PI / 2))),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.TAU / 4) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.csc((math.Util.TAU / 4))),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.PI * 3 / 2) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.csc(((math.Util.PI * 3) / 2))),(-1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.TAU * 3 / 4) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.csc(((math.Util.TAU * 3) / 4))),(-1))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight cosecant",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "csc", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

