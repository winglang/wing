# [bring_jsii_path.w](../../../../../examples/tests/valid/bring_jsii_path.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $greeting }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: greeting == \"Hello, wingnuts\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($greeting,"Hello, wingnuts")))};
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
      "value": "[[\"root/undefined/Default/test:sayHello\",\"${aws_lambda_function.undefined_testsayHello_Handler_2CC447B7.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testsayHello_Handler_IamRole_F95A8F81": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:sayHello/Handler/IamRole",
            "uniqueId": "undefined_testsayHello_Handler_IamRole_F95A8F81"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testsayHello_Handler_IamRolePolicy_020D1190": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:sayHello/Handler/IamRolePolicy",
            "uniqueId": "undefined_testsayHello_Handler_IamRolePolicy_020D1190"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testsayHello_Handler_IamRole_F95A8F81.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testsayHello_Handler_IamRolePolicyAttachment_6CF85D77": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:sayHello/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testsayHello_Handler_IamRolePolicyAttachment_6CF85D77"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testsayHello_Handler_IamRole_F95A8F81.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testsayHello_Handler_2CC447B7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:sayHello/Handler/Default",
            "uniqueId": "undefined_testsayHello_Handler_2CC447B7"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c868e689",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c868e689",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testsayHello_Handler_IamRole_F95A8F81.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testsayHello_Handler_S3Object_C0A39EA3.key}",
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
      "undefined_testsayHello_Handler_S3Object_C0A39EA3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:sayHello/Handler/S3Object",
            "uniqueId": "undefined_testsayHello_Handler_S3Object_C0A39EA3"
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
const cloud = $stdlib.cloud;
const jsiiCodeSamples = require("./node_modules/jsii-code-samples");
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
            $greeting: ${context._lift(greeting)},
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
          $Closure1._registerBindObject(greeting, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const hello = new jsiiCodeSamples.HelloWorld();
    const greeting = (hello.sayHello("wingnuts"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:sayHello",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bring_jsii_path", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

