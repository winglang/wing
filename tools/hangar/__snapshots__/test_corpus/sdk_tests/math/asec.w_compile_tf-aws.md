# [asec.w](../../../../../../examples/tests/sdk_tests/math/asec.w) | compile | tf-aws

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
      try {
        {console.log(String.raw({ raw: ["", ""] }, (await $math_Util.asec(0.5))))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be equal or greater than |1|.\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e,"Input value must be equal or greater than |1|.")))};
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(2) == 1.0471975511965979")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asec(2)),1.0471975511965979)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(1) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asec(1)),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(math.PI) == 1.2468502198629159")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asec($math_Util.PI)),1.2468502198629159)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-math.PI) == 1.8947424337268775")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asec((-$math_Util.PI))),1.8947424337268775)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-1) == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asec((-1))),$math_Util.PI)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-2) == 2.0943951023931957")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asec((-2))),2.0943951023931957)))};
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
      "value": "[[\"root/Default/Default/test:inflight arc cosecant\",\"${aws_lambda_function.testinflightarccosecant_Handler_B1D46C37.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightarccosecant_Handler_IamRole_63014DBB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosecant/Handler/IamRole",
            "uniqueId": "testinflightarccosecant_Handler_IamRole_63014DBB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightarccosecant_Handler_IamRolePolicy_B50BC665": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosecant/Handler/IamRolePolicy",
            "uniqueId": "testinflightarccosecant_Handler_IamRolePolicy_B50BC665"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightarccosecant_Handler_IamRole_63014DBB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightarccosecant_Handler_IamRolePolicyAttachment_5CC41860": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosecant/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightarccosecant_Handler_IamRolePolicyAttachment_5CC41860"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightarccosecant_Handler_IamRole_63014DBB.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightarccosecant_Handler_B1D46C37": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosecant/Handler/Default",
            "uniqueId": "testinflightarccosecant_Handler_B1D46C37"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c850f94d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c850f94d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightarccosecant_Handler_IamRole_63014DBB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightarccosecant_Handler_S3Object_1952C506.key}",
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
      "testinflightarccosecant_Handler_S3Object_1952C506": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc cosecant/Handler/S3Object",
            "uniqueId": "testinflightarccosecant_Handler_S3Object_1952C506"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const math = require('@winglang/sdk').math;
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
    try {
      {console.log(String.raw({ raw: ["", ""] }, (math.Util.asec(0.5))))};
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be equal or greater than |1|.\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e,"Input value must be equal or greater than |1|.")))};
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(2) == 1.0471975511965979")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asec(2)),1.0471975511965979)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(1) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asec(1)),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(math.PI) == 1.2468502198629159")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asec(math.Util.PI)),1.2468502198629159)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-math.PI) == 1.8947424337268775")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asec((-math.Util.PI))),1.8947424337268775)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-1) == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asec((-1))),math.Util.PI)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asec(-2) == 2.0943951023931957")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asec((-2))),2.0943951023931957)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc cosecant",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "asec", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```

