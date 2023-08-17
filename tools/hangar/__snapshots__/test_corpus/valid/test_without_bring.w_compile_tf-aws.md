# [test_without_bring.w](../../../../../examples/tests/valid/test_without_bring.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
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
      "value": "[[\"root/Default/Default/test:hello test\",\"${aws_lambda_function.testhellotest_Handler_388AC021.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testhellotest_Handler_IamRole_CAF7D6BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello test/Handler/IamRole",
            "uniqueId": "testhellotest_Handler_IamRole_CAF7D6BC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testhellotest_Handler_IamRolePolicy_CD1018B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello test/Handler/IamRolePolicy",
            "uniqueId": "testhellotest_Handler_IamRolePolicy_CD1018B8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testhellotest_Handler_IamRole_CAF7D6BC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testhellotest_Handler_IamRolePolicyAttachment_E69D859C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello test/Handler/IamRolePolicyAttachment",
            "uniqueId": "testhellotest_Handler_IamRolePolicyAttachment_E69D859C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testhellotest_Handler_IamRole_CAF7D6BC.name}"
      }
    },
    "aws_lambda_function": {
      "testhellotest_Handler_388AC021": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello test/Handler/Default",
            "uniqueId": "testhellotest_Handler_388AC021"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8123dd7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8123dd7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testhellotest_Handler_IamRole_CAF7D6BC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testhellotest_Handler_S3Object_57438463.key}",
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
      "testhellotest_Handler_S3Object_57438463": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:hello test/Handler/S3Object",
            "uniqueId": "testhellotest_Handler_S3Object_57438463"
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
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
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
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:hello test",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "test_without_bring", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

