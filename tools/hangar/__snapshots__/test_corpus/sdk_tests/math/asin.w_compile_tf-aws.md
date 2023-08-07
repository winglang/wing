# [asin.w](../../../../../../examples/tests/sdk_tests/math/asin.w) | compile | tf-aws

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
        {console.log(String.raw({ raw: ["", ""] }, (await $math_Util.asin((-2)))))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be between -1 and 1, inclusive.\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e,"Input value must be between -1 and 1, inclusive.")))};
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(-1) == -1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asin((-1))),(-1.5707963267948966))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(-0) == -0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asin((-0))),(-0))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asin(0)),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(0.5) == 0.5235987755982989")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asin(0.5)),0.5235987755982989)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(1) == 1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.asin(1)),1.5707963267948966)))};
      try {
        {console.log(String.raw({ raw: ["", ""] }, (await $math_Util.asin(2))))};
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be between -1 and 1, inclusive.\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e,"Input value must be between -1 and 1, inclusive.")))};
      }
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
      "value": "[[\"root/Default/Default/test:inflight arc sine\",\"${aws_lambda_function.testinflightarcsine_Handler_7B606063.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightarcsine_Handler_IamRole_EBCCD81D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc sine/Handler/IamRole",
            "uniqueId": "testinflightarcsine_Handler_IamRole_EBCCD81D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightarcsine_Handler_IamRolePolicy_58AE68F0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc sine/Handler/IamRolePolicy",
            "uniqueId": "testinflightarcsine_Handler_IamRolePolicy_58AE68F0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightarcsine_Handler_IamRole_EBCCD81D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightarcsine_Handler_IamRolePolicyAttachment_62A643BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc sine/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightarcsine_Handler_IamRolePolicyAttachment_62A643BB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightarcsine_Handler_IamRole_EBCCD81D.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightarcsine_Handler_7B606063": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc sine/Handler/Default",
            "uniqueId": "testinflightarcsine_Handler_7B606063"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8343dcd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8343dcd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightarcsine_Handler_IamRole_EBCCD81D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightarcsine_Handler_S3Object_D9A3F771.key}",
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
      "testinflightarcsine_Handler_S3Object_D9A3F771": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc sine/Handler/S3Object",
            "uniqueId": "testinflightarcsine_Handler_S3Object_D9A3F771"
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
      {console.log(String.raw({ raw: ["", ""] }, (math.Util.asin((-2)))))};
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be between -1 and 1, inclusive.\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e,"Input value must be between -1 and 1, inclusive.")))};
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(-1) == -1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asin((-1))),(-1.5707963267948966))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(-0) == -0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asin((-0))),(-0))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asin(0)),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(0.5) == 0.5235987755982989")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asin(0.5)),0.5235987755982989)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.asin(1) == 1.5707963267948966")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.asin(1)),1.5707963267948966)))};
    try {
      {console.log(String.raw({ raw: ["", ""] }, (math.Util.asin(2))))};
    }
    catch ($error_e) {
      const e = $error_e.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: e == \"Input value must be between -1 and 1, inclusive.\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(e,"Input value must be between -1 and 1, inclusive.")))};
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc sine",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "asin", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```

