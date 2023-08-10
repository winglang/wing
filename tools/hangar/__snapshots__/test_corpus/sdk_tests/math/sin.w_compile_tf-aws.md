# [sin.w](../../../../../../examples/tests/sdk_tests/math/sin.w) | compile | tf-aws

## inflight.$Closure1-3b9f5a5b.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sin(-0) == -0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sin((-0))),(-0))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sin(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sin(0)),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sin(1) == 0.8414709848078965")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sin(1)),0.8414709848078965)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sin(-5) == 0.9589242746631385")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sin((-5))),0.9589242746631385)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sin(math.PI / 2) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sin(($math_Util.PI / 2))),1)))};
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
      "value": "[[\"root/Default/Default/test:inflight sine\",\"${aws_lambda_function.testinflightsine_Handler_C32FE4B8.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightsine_Handler_IamRole_8DD2DA91": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight sine/Handler/IamRole",
            "uniqueId": "testinflightsine_Handler_IamRole_8DD2DA91"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightsine_Handler_IamRolePolicy_E84601AE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight sine/Handler/IamRolePolicy",
            "uniqueId": "testinflightsine_Handler_IamRolePolicy_E84601AE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightsine_Handler_IamRole_8DD2DA91.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightsine_Handler_IamRolePolicyAttachment_A95E724C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight sine/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightsine_Handler_IamRolePolicyAttachment_A95E724C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightsine_Handler_IamRole_8DD2DA91.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightsine_Handler_C32FE4B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight sine/Handler/Default",
            "uniqueId": "testinflightsine_Handler_C32FE4B8"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8977bb8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8977bb8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightsine_Handler_IamRole_8DD2DA91.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightsine_Handler_S3Object_75C2B40C.key}",
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
      "testinflightsine_Handler_S3Object_75C2B40C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight sine/Handler/S3Object",
            "uniqueId": "testinflightsine_Handler_S3Object_75C2B40C"
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
          require("./inflight.$Closure1-3b9f5a5b.js")({
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sin(-0) == -0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sin((-0))),(-0))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sin(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sin(0)),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sin(1) == 0.8414709848078965")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sin(1)),0.8414709848078965)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sin(-5) == 0.9589242746631385")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sin((-5))),0.9589242746631385)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sin(math.PI / 2) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sin((math.Util.PI / 2))),1)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight sine",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "sin", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

