# [cos.w](../../../../../../examples/tests/sdk_tests/math/cos.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(-0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.cos((-0))),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.cos(0)),1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(1) == 0.5403023058681398")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.cos(1)),0.5403023058681398)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(-5) == 0.28366218546322625")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.cos((-5))),0.28366218546322625)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(math.PI) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.cos($math_Util.PI)),(-1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(math.PI * 2) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.cos(($math_Util.PI * 2))),1)))};
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
      "value": "[[\"root/Default/Default/test:inflight cosine\",\"${aws_lambda_function.testinflightcosine_Handler_8C1A066C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightcosine_Handler_IamRole_3CB91B01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cosine/Handler/IamRole",
            "uniqueId": "testinflightcosine_Handler_IamRole_3CB91B01"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightcosine_Handler_IamRolePolicy_DEC09071": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cosine/Handler/IamRolePolicy",
            "uniqueId": "testinflightcosine_Handler_IamRolePolicy_DEC09071"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightcosine_Handler_IamRole_3CB91B01.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightcosine_Handler_IamRolePolicyAttachment_30BBA33F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cosine/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightcosine_Handler_IamRolePolicyAttachment_30BBA33F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightcosine_Handler_IamRole_3CB91B01.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightcosine_Handler_8C1A066C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cosine/Handler/Default",
            "uniqueId": "testinflightcosine_Handler_8C1A066C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c81ebe2a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c81ebe2a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightcosine_Handler_IamRole_3CB91B01.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightcosine_Handler_S3Object_20AE5FC3.key}",
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
      "testinflightcosine_Handler_S3Object_20AE5FC3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cosine/Handler/S3Object",
            "uniqueId": "testinflightcosine_Handler_S3Object_20AE5FC3"
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $math_Util: ${context._lift(math.Util)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"]
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(-0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.cos((-0))),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.cos(0)),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(1) == 0.5403023058681398")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.cos(1)),0.5403023058681398)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(-5) == 0.28366218546322625")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.cos((-5))),0.28366218546322625)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(math.PI) == -1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.cos(math.Util.PI)),(-1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.cos(math.PI * 2) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.cos((math.Util.PI * 2))),1)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight cosine",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "cos", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

