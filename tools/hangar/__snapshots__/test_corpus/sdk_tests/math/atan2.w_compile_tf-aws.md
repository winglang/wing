# [atan2.w](../../../../../../examples/tests/sdk_tests/math/atan2.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(90, 15) == 1.4056476493802699")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(90,15)),1.4056476493802699)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(15, 90) == 0.16514867741462683")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(15,90)),0.16514867741462683)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-1, -1) == -1 * math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2((-1),(-1))),((((-1) * $math_Util.PI) * 3) / 4))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-0, -1) == -1 * math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2((-0),(-1))),((-1) * $math_Util.PI))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, -1) == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(0,(-1))),$math_Util.PI)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(1, -1) == math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(1,(-1))),(($math_Util.PI * 3) / 4))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, 0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan2(0,0)),0)))};
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
      "value": "[[\"root/Default/Default/test:inflight arc tangent 2\",\"${aws_lambda_function.testinflightarctangent2_Handler_412D0A11.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightarctangent2_Handler_IamRole_A44E8A65": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent 2/Handler/IamRole",
            "uniqueId": "testinflightarctangent2_Handler_IamRole_A44E8A65"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightarctangent2_Handler_IamRolePolicy_09C9F58C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent 2/Handler/IamRolePolicy",
            "uniqueId": "testinflightarctangent2_Handler_IamRolePolicy_09C9F58C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightarctangent2_Handler_IamRole_A44E8A65.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightarctangent2_Handler_IamRolePolicyAttachment_E30CFCB6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent 2/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightarctangent2_Handler_IamRolePolicyAttachment_E30CFCB6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightarctangent2_Handler_IamRole_A44E8A65.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightarctangent2_Handler_412D0A11": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent 2/Handler/Default",
            "uniqueId": "testinflightarctangent2_Handler_412D0A11"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c88af4a6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88af4a6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightarctangent2_Handler_IamRole_A44E8A65.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightarctangent2_Handler_S3Object_B9ED1582.key}",
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
      "testinflightarctangent2_Handler_S3Object_B9ED1582": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent 2/Handler/S3Object",
            "uniqueId": "testinflightarctangent2_Handler_S3Object_B9ED1582"
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(90, 15) == 1.4056476493802699")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(90,15)),1.4056476493802699)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(15, 90) == 0.16514867741462683")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(15,90)),0.16514867741462683)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-1, -1) == -1 * math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2((-1),(-1))),((((-1) * math.Util.PI) * 3) / 4))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(-0, -1) == -1 * math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2((-0),(-1))),((-1) * math.Util.PI))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, -1) == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(0,(-1))),math.Util.PI)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(1, -1) == math.PI * 3 / 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(1,(-1))),((math.Util.PI * 3) / 4))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan2(0, 0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan2(0,0)),0)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc tangent 2",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "atan2", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```

