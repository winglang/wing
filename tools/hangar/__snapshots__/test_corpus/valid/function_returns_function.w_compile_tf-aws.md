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
    async $inflight_init()  {
    }
    async handle()  {
      const iFn = async (s) =>  {
        return async () =>  {
          return (s === "wing");
        }
        ;
      }
      ;
      const wingInflightFn = (await iFn("wing"));
      const dingInflightFn = (await iFn("ding"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wingInflightFn())'`)})((await wingInflightFn()))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(!(await dingInflightFn()))'`)})((!(await dingInflightFn())))};
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
      "version": "0.15.2"
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
      "value": "[[\"root/Default/Default/test:inflight functions can return other inflight functions\",\"${aws_lambda_function.root_testinflightfunctionscanreturnotherinflightfunctions_Handler_808366D4.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_B1D75C5C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight functions can return other inflight functions/Handler/IamRole",
            "uniqueId": "root_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_B1D75C5C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicy_BFC85BA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight functions can return other inflight functions/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicy_BFC85BA5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_B1D75C5C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicyAttachment_E917CC4E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight functions can return other inflight functions/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRolePolicyAttachment_E917CC4E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_B1D75C5C.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightfunctionscanreturnotherinflightfunctions_Handler_808366D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight functions can return other inflight functions/Handler/Default",
            "uniqueId": "root_testinflightfunctionscanreturnotherinflightfunctions_Handler_808366D4"
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
        "role": "${aws_iam_role.root_testinflightfunctionscanreturnotherinflightfunctions_Handler_IamRole_B1D75C5C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightfunctionscanreturnotherinflightfunctions_Handler_S3Object_7701BFE2.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_testinflightfunctionscanreturnotherinflightfunctions_Handler_S3Object_7701BFE2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight functions can return other inflight functions/Handler/S3Object",
            "uniqueId": "root_testinflightfunctionscanreturnotherinflightfunctions_Handler_S3Object_7701BFE2"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    const fn =  (s) =>  {
      return  () =>  {
        return (s === "wing");
      }
      ;
    }
    ;
    const wingFn = (fn("wing"));
    const dingFn = (fn("ding"));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(wingFn())'`)})((wingFn()))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(!(dingFn()))'`)})((!(dingFn())))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight functions can return other inflight functions",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "function_returns_function", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

