# [assert-equal-string.w](../../../../../../examples/tests/sdk_tests/testing/assert-equal-string.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $testing_Assert }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $testing_Assert.equalStr("hello","hello"));
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
      "value": "[[\"root/Default/Default/test:inflight base64\",\"${aws_lambda_function.testinflightbase64_Handler_31E9772F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightbase64_Handler_IamRole_49F68A60": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight base64/Handler/IamRole",
            "uniqueId": "testinflightbase64_Handler_IamRole_49F68A60"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightbase64_Handler_IamRolePolicy_031C1061": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight base64/Handler/IamRolePolicy",
            "uniqueId": "testinflightbase64_Handler_IamRolePolicy_031C1061"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightbase64_Handler_IamRole_49F68A60.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightbase64_Handler_IamRolePolicyAttachment_FA451656": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight base64/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightbase64_Handler_IamRolePolicyAttachment_FA451656"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightbase64_Handler_IamRole_49F68A60.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightbase64_Handler_31E9772F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight base64/Handler/Default",
            "uniqueId": "testinflightbase64_Handler_31E9772F"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c853d8cf",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c853d8cf",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightbase64_Handler_IamRole_49F68A60.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightbase64_Handler_S3Object_C9A792F2.key}",
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
      "testinflightbase64_Handler_S3Object_C9A792F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight base64/Handler/S3Object",
            "uniqueId": "testinflightbase64_Handler_S3Object_C9A792F2"
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const util = $stdlib.util;
const testing = $stdlib.testing;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $testing_Assert: ${context._lift(testing.Assert)},
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
        return ["handle", "$inflight_init"];
      }
    }
    (testing.Assert.equalStr("hello","hello"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight base64",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "assert-equal-string", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

