# [tau.w](../../../../../../examples/tests/sdk_tests/math/tau.w) | compile | tf-aws

## inflight.$Closure1-6088d83b.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU / 4 == math.PI / 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(($math_Util.TAU / 4),($math_Util.PI / 2))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU / 2 == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(($math_Util.TAU / 2),$math_Util.PI)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU * 3 / 4 == math.PI * 3 / 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((($math_Util.TAU * 3) / 4),(($math_Util.PI * 3) / 2))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU == math.PI * 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($math_Util.TAU,($math_Util.PI * 2))))};
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
      "value": "[[\"root/Default/Default/test:TAU\",\"${aws_lambda_function.testTAU_Handler_FB9BAA33.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testTAU_Handler_IamRole_51C39285": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:TAU/Handler/IamRole",
            "uniqueId": "testTAU_Handler_IamRole_51C39285"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testTAU_Handler_IamRolePolicy_B4700D56": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:TAU/Handler/IamRolePolicy",
            "uniqueId": "testTAU_Handler_IamRolePolicy_B4700D56"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testTAU_Handler_IamRole_51C39285.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testTAU_Handler_IamRolePolicyAttachment_D96C3941": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:TAU/Handler/IamRolePolicyAttachment",
            "uniqueId": "testTAU_Handler_IamRolePolicyAttachment_D96C3941"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testTAU_Handler_IamRole_51C39285.name}"
      }
    },
    "aws_lambda_function": {
      "testTAU_Handler_FB9BAA33": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:TAU/Handler/Default",
            "uniqueId": "testTAU_Handler_FB9BAA33"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c86e3343",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c86e3343",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testTAU_Handler_IamRole_51C39285.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testTAU_Handler_S3Object_61434DF6.key}",
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
      "testTAU_Handler_S3Object_61434DF6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:TAU/Handler/S3Object",
            "uniqueId": "testTAU_Handler_S3Object_61434DF6"
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
          require("./inflight.$Closure1-6088d83b.js")({
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU / 4 == math.PI / 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.TAU / 4),(math.Util.PI / 2))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU / 2 == math.PI")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.TAU / 2),math.Util.PI)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU * 3 / 4 == math.PI * 3 / 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((math.Util.TAU * 3) / 4),((math.Util.PI * 3) / 2))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.TAU == math.PI * 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(math.Util.TAU,(math.Util.PI * 2))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:TAU",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "tau", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

