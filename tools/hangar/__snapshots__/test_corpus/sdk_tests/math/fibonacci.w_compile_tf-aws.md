# [fibonacci.w](../../../../../../examples/tests/sdk_tests/math/fibonacci.w) | compile | tf-aws

## inflight.$Closure1-e3853de5.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(0)),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(1) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(1)),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(2) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(2)),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(3) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(3)),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(4) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(4)),3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(5) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(5)),5)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(6) == 8")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(6)),8)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(7) == 13")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(7)),13)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(8) == 21")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(8)),21)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(9) == 34")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(9)),34)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(10) == 55")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.fibonacci(10)),55)))};
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
      "value": "[[\"root/Default/Default/test:inflight fibonacci\",\"${aws_lambda_function.testinflightfibonacci_Handler_5DF5857A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightfibonacci_Handler_IamRole_654132EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight fibonacci/Handler/IamRole",
            "uniqueId": "testinflightfibonacci_Handler_IamRole_654132EC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightfibonacci_Handler_IamRolePolicy_00ECCCC9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight fibonacci/Handler/IamRolePolicy",
            "uniqueId": "testinflightfibonacci_Handler_IamRolePolicy_00ECCCC9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightfibonacci_Handler_IamRole_654132EC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightfibonacci_Handler_IamRolePolicyAttachment_BA853587": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight fibonacci/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightfibonacci_Handler_IamRolePolicyAttachment_BA853587"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightfibonacci_Handler_IamRole_654132EC.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightfibonacci_Handler_5DF5857A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight fibonacci/Handler/Default",
            "uniqueId": "testinflightfibonacci_Handler_5DF5857A"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c87dfd42",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c87dfd42",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightfibonacci_Handler_IamRole_654132EC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightfibonacci_Handler_S3Object_60E100A8.key}",
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
      "testinflightfibonacci_Handler_S3Object_60E100A8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight fibonacci/Handler/S3Object",
            "uniqueId": "testinflightfibonacci_Handler_S3Object_60E100A8"
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
          require("./inflight.$Closure1-e3853de5.js")({
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(0)),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(1) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(1)),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(2) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(2)),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(3) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(3)),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(4) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(4)),3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(5) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(5)),5)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(6) == 8")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(6)),8)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(7) == 13")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(7)),13)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(8) == 21")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(8)),21)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(9) == 34")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(9)),34)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.fibonacci(10) == 55")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.fibonacci(10)),55)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight fibonacci",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "fibonacci", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

