# [prime.w](../../../../../../examples/tests/sdk_tests/math/prime.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(1) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(1)),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(2) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(2)),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(3) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(3)),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(4) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(4)),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(10) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(10)),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(11) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(11)),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(12) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.isPrime(12)),false)))};
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
      "value": "[[\"root/undefined/Default/test:inflight prime numbers\",\"${aws_lambda_function.undefined_testinflightprimenumbers_Handler_C9F7891F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightprimenumbers_Handler_IamRole_FD4098A2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight prime numbers/Handler/IamRole",
            "uniqueId": "undefined_testinflightprimenumbers_Handler_IamRole_FD4098A2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightprimenumbers_Handler_IamRolePolicy_0400E745": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight prime numbers/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightprimenumbers_Handler_IamRolePolicy_0400E745"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightprimenumbers_Handler_IamRole_FD4098A2.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightprimenumbers_Handler_IamRolePolicyAttachment_E2D2132E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight prime numbers/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightprimenumbers_Handler_IamRolePolicyAttachment_E2D2132E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightprimenumbers_Handler_IamRole_FD4098A2.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightprimenumbers_Handler_C9F7891F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight prime numbers/Handler/Default",
            "uniqueId": "undefined_testinflightprimenumbers_Handler_C9F7891F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c80a01e8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c80a01e8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightprimenumbers_Handler_IamRole_FD4098A2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightprimenumbers_Handler_S3Object_815EFED1.key}",
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
      "undefined_testinflightprimenumbers_Handler_S3Object_815EFED1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight prime numbers/Handler/S3Object",
            "uniqueId": "undefined_testinflightprimenumbers_Handler_S3Object_815EFED1"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(1) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(1)),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(2) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(2)),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(3) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(3)),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(4) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(4)),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(10) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(10)),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(11) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(11)),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(12) == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.isPrime(12)),false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight prime numbers",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "prime", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

