# [function_returns_function.w](../../../../../examples/tests/valid/function_returns_function.w) | compile | tf-aws

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
      const iFn = async (s) => {
        return async () => {
          return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"wing"));
        }
        ;
      }
      ;
      const wingInflightFn = (await iFn("wing"));
      const dingInflightFn = (await iFn("ding"));
      {((cond) => {if (!cond) throw new Error("assertion failed: wingInflightFn()")})((await wingInflightFn()))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !dingInflightFn()")})((!(await dingInflightFn())))};
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
      "value": "[[\"root/Default/Default/test:inflight functions can return other inflight functions\",\"${aws_lambda_function.testinflightfunctionscanreturnotherinflightfunctions_Handler_7EBEFDAA.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_4EB0A887": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight functions can return other inflight functions/Handler/IamRole",
            "uniqueId": "testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_4EB0A887"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicy_7F73A8AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight functions can return other inflight functions/Handler/IamRolePolicy",
            "uniqueId": "testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicy_7F73A8AD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_4EB0A887.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicyAttachment_E544C997": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight functions can return other inflight functions/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicyAttachment_E544C997"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_4EB0A887.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightfunctionscanreturnotherinflightfunctions_Handler_7EBEFDAA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight functions can return other inflight functions/Handler/Default",
            "uniqueId": "testinflightfunctionscanreturnotherinflightfunctions_Handler_7EBEFDAA"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8801592",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8801592",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_4EB0A887.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightfunctionscanreturnotherinflightfunctions_Handler_S3Object_CA1E98C2.key}",
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
      "testinflightfunctionscanreturnotherinflightfunctions_Handler_S3Object_CA1E98C2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight functions can return other inflight functions/Handler/S3Object",
            "uniqueId": "testinflightfunctionscanreturnotherinflightfunctions_Handler_S3Object_CA1E98C2"
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
const cloud = $stdlib.cloud;
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
    const fn = ((s) => {
      return (() => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"wing"));
      });
    });
    const wingFn = (fn("wing"));
    const dingFn = (fn("ding"));
    {((cond) => {if (!cond) throw new Error("assertion failed: wingFn()")})((wingFn()))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !dingFn()")})((!(dingFn())))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight functions can return other inflight functions",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "function_returns_function", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```

