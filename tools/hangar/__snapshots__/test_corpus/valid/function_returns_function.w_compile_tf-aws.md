# [function_returns_function.w](../../../../../examples/tests/valid/function_returns_function.w) | compile | tf-aws

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
      "value": "[[\"root/undefined/Default/test:inflight functions can return other inflight functions\",\"${aws_lambda_function.undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_93351885.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_FA431FD9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight functions can return other inflight functions/Handler/IamRole",
            "uniqueId": "undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_FA431FD9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicy_E14F8D15": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight functions can return other inflight functions/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicy_E14F8D15"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_FA431FD9.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicyAttachment_DE6941E0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight functions can return other inflight functions/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicyAttachment_DE6941E0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_FA431FD9.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_93351885": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight functions can return other inflight functions/Handler/Default",
            "uniqueId": "undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_93351885"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f78836",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f78836",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_FA431FD9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_S3Object_C5D7300B.key}",
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
      "undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_S3Object_C5D7300B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight functions can return other inflight functions/Handler/S3Object",
            "uniqueId": "undefined_testinflightfunctionscanreturnotherinflightfunctions_Handler_S3Object_C5D7300B"
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

