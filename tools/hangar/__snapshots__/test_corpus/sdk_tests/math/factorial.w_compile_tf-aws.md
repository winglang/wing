# [factorial.w](../../../../../../examples/tests/sdk_tests/math/factorial.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.factorial(0)),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(1) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.factorial(1)),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(2) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.factorial(2)),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(3) == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.factorial(3)),6)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(4) == 24")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.factorial(4)),24)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(5) == 120")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.factorial(5)),120)))};
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
      "value": "[[\"root/undefined/Default/test:inflight factorial\",\"${aws_lambda_function.undefined_testinflightfactorial_Handler_1F88C883.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightfactorial_Handler_IamRole_BE108DF6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight factorial/Handler/IamRole",
            "uniqueId": "undefined_testinflightfactorial_Handler_IamRole_BE108DF6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightfactorial_Handler_IamRolePolicy_B2B5B879": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight factorial/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightfactorial_Handler_IamRolePolicy_B2B5B879"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightfactorial_Handler_IamRole_BE108DF6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightfactorial_Handler_IamRolePolicyAttachment_48830A5A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight factorial/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightfactorial_Handler_IamRolePolicyAttachment_48830A5A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightfactorial_Handler_IamRole_BE108DF6.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightfactorial_Handler_1F88C883": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight factorial/Handler/Default",
            "uniqueId": "undefined_testinflightfactorial_Handler_1F88C883"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c811a319",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c811a319",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightfactorial_Handler_IamRole_BE108DF6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightfactorial_Handler_S3Object_A09D2350.key}",
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
      "undefined_testinflightfactorial_Handler_S3Object_A09D2350": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight factorial/Handler/S3Object",
            "uniqueId": "undefined_testinflightfactorial_Handler_S3Object_A09D2350"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.factorial(0)),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(1) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.factorial(1)),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(2) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.factorial(2)),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(3) == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.factorial(3)),6)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(4) == 24")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.factorial(4)),24)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(5) == 120")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.factorial(5)),120)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight factorial",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "factorial", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

