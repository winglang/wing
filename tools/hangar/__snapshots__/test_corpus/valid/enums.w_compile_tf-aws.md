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
      "value": "[[\"root/Default/Default/test:inflight\",\"${aws_lambda_function.testinflight_Handler_93A83C5E.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflight_Handler_IamRole_15C4E048": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight/Handler/IamRole",
            "uniqueId": "testinflight_Handler_IamRole_15C4E048"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflight_Handler_IamRolePolicy_DB97CD66": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight/Handler/IamRolePolicy",
            "uniqueId": "testinflight_Handler_IamRolePolicy_DB97CD66"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflight_Handler_IamRole_15C4E048.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflight_Handler_IamRolePolicyAttachment_576C539A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflight_Handler_IamRolePolicyAttachment_576C539A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflight_Handler_IamRole_15C4E048.name}"
      }
    },
    "aws_lambda_function": {
      "testinflight_Handler_93A83C5E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight/Handler/Default",
            "uniqueId": "testinflight_Handler_93A83C5E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85726ab",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85726ab",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflight_Handler_IamRole_15C4E048.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflight_Handler_S3Object_57D0B6F1.key}",
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
      "testinflight_Handler_S3Object_57D0B6F1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight/Handler/S3Object",
            "uniqueId": "testinflight_Handler_S3Object_57D0B6F1"
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

