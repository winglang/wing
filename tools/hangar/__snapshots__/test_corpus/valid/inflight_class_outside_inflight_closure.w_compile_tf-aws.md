# [inflight_class_outside_inflight_closure.w](../../../../../examples/tests/valid/inflight_class_outside_inflight_closure.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ BinaryOperation }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      const op = new BinaryOperation(10,20);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await op.add()) === 30)'`)})(((await op.add()) === 30))};
    }
    async $inflight_init()  {
    }
  }
  return $Closure1;
}

```

## inflight.BinaryOperation.js
```js
module.exports = function({  }) {
  class BinaryOperation {
    async add()  {
      const __parent_this = this;
      return (this.lhs + this.rhs);
    }
     constructor(lhs, rhs)  {
      const __parent_this = this;
      this.lhs = lhs;
      this.rhs = rhs;
    }
  }
  return BinaryOperation;
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
      "value": "[[\"root/Default/Default/test:inflight class outside inflight closure\",\"${aws_lambda_function.root_testinflightclassoutsideinflightclosure_Handler_7E8271FF.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightclassoutsideinflightclosure_Handler_IamRole_6E6809B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class outside inflight closure/Handler/IamRole",
            "uniqueId": "root_testinflightclassoutsideinflightclosure_Handler_IamRole_6E6809B2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightclassoutsideinflightclosure_Handler_IamRolePolicy_DF311CB1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class outside inflight closure/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightclassoutsideinflightclosure_Handler_IamRolePolicy_DF311CB1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightclassoutsideinflightclosure_Handler_IamRole_6E6809B2.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightclassoutsideinflightclosure_Handler_IamRolePolicyAttachment_7D23E7B6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class outside inflight closure/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightclassoutsideinflightclosure_Handler_IamRolePolicyAttachment_7D23E7B6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightclassoutsideinflightclosure_Handler_IamRole_6E6809B2.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightclassoutsideinflightclosure_Handler_7E8271FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class outside inflight closure/Handler/Default",
            "uniqueId": "root_testinflightclassoutsideinflightclosure_Handler_7E8271FF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8046c38",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8046c38",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightclassoutsideinflightclosure_Handler_IamRole_6E6809B2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightclassoutsideinflightclosure_Handler_S3Object_9C751CA3.key}",
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
      "root_testinflightclassoutsideinflightclosure_Handler_S3Object_9C751CA3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class outside inflight closure/Handler/S3Object",
            "uniqueId": "root_testinflightclassoutsideinflightclosure_Handler_S3Object_9C751CA3"
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
    class BinaryOperation extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("add", "constructor", "lhs", "rhs");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.BinaryOperation.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BinaryOperationClient = ${BinaryOperation._toInflightType(this).text};
            const client = new BinaryOperationClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const BinaryOperationClient = BinaryOperation._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            BinaryOperation: ${BinaryOperationClient.text},
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight class outside inflight closure",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflight_class_outside_inflight_closure", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

