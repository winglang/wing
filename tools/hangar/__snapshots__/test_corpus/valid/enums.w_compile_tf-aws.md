# [enums.w](../../../../../examples/tests/valid/enums.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $SomeEnum, $one, $two }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: one == SomeEnum.ONE")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($one,$SomeEnum.ONE)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: two == SomeEnum.TWO")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($two,$SomeEnum.TWO)))};
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
      "value": "[[\"root/undefined/Default/test:inflight\",\"${aws_lambda_function.undefined_testinflight_Handler_0BD9A9FB.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflight_Handler_IamRole_5C67F8B2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight/Handler/IamRole",
            "uniqueId": "undefined_testinflight_Handler_IamRole_5C67F8B2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflight_Handler_IamRolePolicy_76B06807": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflight_Handler_IamRolePolicy_76B06807"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflight_Handler_IamRole_5C67F8B2.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflight_Handler_IamRolePolicyAttachment_BC294534": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflight_Handler_IamRolePolicyAttachment_BC294534"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflight_Handler_IamRole_5C67F8B2.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflight_Handler_0BD9A9FB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight/Handler/Default",
            "uniqueId": "undefined_testinflight_Handler_0BD9A9FB"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c898625b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c898625b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflight_Handler_IamRole_5C67F8B2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflight_Handler_S3Object_8DDA6B5F.key}",
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
      "undefined_testinflight_Handler_S3Object_8DDA6B5F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight/Handler/S3Object",
            "uniqueId": "undefined_testinflight_Handler_S3Object_8DDA6B5F"
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
            $SomeEnum: ${context._lift(SomeEnum)},
            $one: ${context._lift(one)},
            $two: ${context._lift(two)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(one, host, []);
          $Closure1._registerBindObject(two, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const SomeEnum =
      (function (tmp) {
        tmp[tmp["ONE"] = 0] = "ONE";
        tmp[tmp["TWO"] = 1] = "TWO";
        tmp[tmp["THREE"] = 2] = "THREE";
        return tmp;
      })({})
    ;
    const one = SomeEnum.ONE;
    const two = SomeEnum.TWO;
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "enums", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

