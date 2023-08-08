# [sqrt.w](../../../../../../examples/tests/sdk_tests/math/sqrt.w) | compile | tf-aws

## inflight.$Closure1-6ac0d056.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      try {
        {console.log(String.raw({ raw: ["", ""] }, (await $math_Util.sqrt((-1)))))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be greater than or equal to 0.\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e,"Input value must be greater than or equal to 0.")))};
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(-0) == -0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sqrt((-0))),(-0))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sqrt(0)),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(1) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sqrt(1)),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(2) == 1.4142135623730951")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sqrt(2)),1.4142135623730951)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(9) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sqrt(9)),3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(math.INF) == math.INF")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.sqrt($math_Util.INF)),$math_Util.INF)))};
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
      "value": "[[\"root/Default/Default/test:inflight square root\",\"${aws_lambda_function.testinflightsquareroot_Handler_2121E9F7.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightsquareroot_Handler_IamRole_5F64DF30": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight square root/Handler/IamRole",
            "uniqueId": "testinflightsquareroot_Handler_IamRole_5F64DF30"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightsquareroot_Handler_IamRolePolicy_BB3920C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight square root/Handler/IamRolePolicy",
            "uniqueId": "testinflightsquareroot_Handler_IamRolePolicy_BB3920C3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightsquareroot_Handler_IamRole_5F64DF30.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightsquareroot_Handler_IamRolePolicyAttachment_6869E2D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight square root/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightsquareroot_Handler_IamRolePolicyAttachment_6869E2D7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightsquareroot_Handler_IamRole_5F64DF30.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightsquareroot_Handler_2121E9F7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight square root/Handler/Default",
            "uniqueId": "testinflightsquareroot_Handler_2121E9F7"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c88a288d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88a288d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightsquareroot_Handler_IamRole_5F64DF30.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightsquareroot_Handler_S3Object_016D3297.key}",
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
      "testinflightsquareroot_Handler_S3Object_016D3297": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight square root/Handler/S3Object",
            "uniqueId": "testinflightsquareroot_Handler_S3Object_016D3297"
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
          require("./inflight.$Closure1-6ac0d056.js")({
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
    try {
      {console.log(String.raw({ raw: ["", ""] }, (math.Util.sqrt((-1)))))};
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be greater than or equal to 0.\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e,"Input value must be greater than or equal to 0.")))};
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(-0) == -0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sqrt((-0))),(-0))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sqrt(0)),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(1) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sqrt(1)),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(2) == 1.4142135623730951")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sqrt(2)),1.4142135623730951)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(9) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sqrt(9)),3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.sqrt(math.INF) == math.INF")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.sqrt(math.Util.INF)),math.Util.INF)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight square root",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "sqrt", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

