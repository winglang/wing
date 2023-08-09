# [hypot.w](../../../../../../examples/tests/sdk_tests/math/hypot.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([3, 4]) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.hypot([3, 4])),5)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([5, 12]) == 13")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.hypot([5, 12])),13)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.hypot([3, 4, 5]), decimalPlaces: 2) == 7.07")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.round((await $math_Util.hypot([3, 4, 5])),{ decimalPlaces: 2 })),7.07)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([-5]) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.hypot([(-5)])),5)))};
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
      "value": "[[\"root/undefined/Default/test:inflight hypot\",\"${aws_lambda_function.undefined_testinflighthypot_Handler_32CC7137.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflighthypot_Handler_IamRole_A374815C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight hypot/Handler/IamRole",
            "uniqueId": "undefined_testinflighthypot_Handler_IamRole_A374815C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflighthypot_Handler_IamRolePolicy_68410923": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight hypot/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflighthypot_Handler_IamRolePolicy_68410923"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflighthypot_Handler_IamRole_A374815C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflighthypot_Handler_IamRolePolicyAttachment_3A70B865": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight hypot/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflighthypot_Handler_IamRolePolicyAttachment_3A70B865"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflighthypot_Handler_IamRole_A374815C.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflighthypot_Handler_32CC7137": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight hypot/Handler/Default",
            "uniqueId": "undefined_testinflighthypot_Handler_32CC7137"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c80213f5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c80213f5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflighthypot_Handler_IamRole_A374815C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflighthypot_Handler_S3Object_731F72F2.key}",
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
      "undefined_testinflighthypot_Handler_S3Object_731F72F2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight hypot/Handler/S3Object",
            "uniqueId": "undefined_testinflighthypot_Handler_S3Object_731F72F2"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([3, 4]) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.hypot([3, 4])),5)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([5, 12]) == 13")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.hypot([5, 12])),13)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.hypot([3, 4, 5]), decimalPlaces: 2) == 7.07")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.round((math.Util.hypot([3, 4, 5])),{ decimalPlaces: 2 })),7.07)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([-5]) == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.hypot([(-5)])),5)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight hypot",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "hypot", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

