# [inflight_class_inner_capture_mutable.w](../../../../../examples/tests/valid/inflight_class_inner_capture_mutable.w) | compile | tf-aws

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
      const y = [1];
      let i = 10;
      class Inner {
        async dang() {
          (await y.push(2));
          i = (i + 1);
          return ((await y.at(0)) + 10);
        }
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: new Inner().dang() == 11")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await new Inner().dang()),11)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: y.at(1) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await y.at(1)),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: i == 11")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(i,11)))};
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
      "value": "[[\"root/undefined/Default/test:inner inflight class capture immutable\",\"${aws_lambda_function.undefined_testinnerinflightclasscaptureimmutable_Handler_A7E11902.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinnerinflightclasscaptureimmutable_Handler_IamRole_8E9E31C4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inner inflight class capture immutable/Handler/IamRole",
            "uniqueId": "undefined_testinnerinflightclasscaptureimmutable_Handler_IamRole_8E9E31C4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinnerinflightclasscaptureimmutable_Handler_IamRolePolicy_149C4203": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inner inflight class capture immutable/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinnerinflightclasscaptureimmutable_Handler_IamRolePolicy_149C4203"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinnerinflightclasscaptureimmutable_Handler_IamRole_8E9E31C4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinnerinflightclasscaptureimmutable_Handler_IamRolePolicyAttachment_B1E8AD42": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inner inflight class capture immutable/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinnerinflightclasscaptureimmutable_Handler_IamRolePolicyAttachment_B1E8AD42"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinnerinflightclasscaptureimmutable_Handler_IamRole_8E9E31C4.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinnerinflightclasscaptureimmutable_Handler_A7E11902": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inner inflight class capture immutable/Handler/Default",
            "uniqueId": "undefined_testinnerinflightclasscaptureimmutable_Handler_A7E11902"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c817238b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c817238b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinnerinflightclasscaptureimmutable_Handler_IamRole_8E9E31C4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinnerinflightclasscaptureimmutable_Handler_S3Object_173DD36E.key}",
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
      "undefined_testinnerinflightclasscaptureimmutable_Handler_S3Object_173DD36E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inner inflight class capture immutable/Handler/S3Object",
            "uniqueId": "undefined_testinnerinflightclasscaptureimmutable_Handler_S3Object_173DD36E"
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inner inflight class capture immutable",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_class_inner_capture_mutable", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

