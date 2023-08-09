# [test_without_bring.w](../../../../../examples/tests/valid/test_without_bring.w) | compile | tf-aws

## inflight.$Closure1.js
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
      "value": "[[\"root/undefined/Default/test:hello test\",\"${aws_lambda_function.undefined_testhellotest_Handler_2199FE8E.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testhellotest_Handler_IamRole_46BA6F8C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:hello test/Handler/IamRole",
            "uniqueId": "undefined_testhellotest_Handler_IamRole_46BA6F8C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testhellotest_Handler_IamRolePolicy_F8F67033": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:hello test/Handler/IamRolePolicy",
            "uniqueId": "undefined_testhellotest_Handler_IamRolePolicy_F8F67033"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testhellotest_Handler_IamRole_46BA6F8C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testhellotest_Handler_IamRolePolicyAttachment_762C5628": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:hello test/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testhellotest_Handler_IamRolePolicyAttachment_762C5628"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testhellotest_Handler_IamRole_46BA6F8C.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testhellotest_Handler_2199FE8E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:hello test/Handler/Default",
            "uniqueId": "undefined_testhellotest_Handler_2199FE8E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8638da9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8638da9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testhellotest_Handler_IamRole_46BA6F8C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testhellotest_Handler_S3Object_2305F11B.key}",
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
      "undefined_testhellotest_Handler_S3Object_2305F11B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:hello test/Handler/S3Object",
            "uniqueId": "undefined_testhellotest_Handler_S3Object_2305F11B"
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:hello test",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "test_without_bring", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

