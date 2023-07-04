# [tan.w](../../../../../../examples/tests/sdk_tests/math/tan.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(-0) == -0")})(((await $math_Util.tan((-0))) === (-0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(0) == 0")})(((await $math_Util.tan(0)) === 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(1) == 1.5574077246549023")})(((await $math_Util.tan(1)) === 1.5574077246549023))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(math.PI / 4) == 0.9999999999999999")})(((await $math_Util.tan(($math_Util.PI / 4))) === 0.9999999999999999))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
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
      "value": "[[\"root/Default/Default/test:inflight tangent\",\"${aws_lambda_function.root_testinflighttangent_Handler_8C860B05.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflighttangent_Handler_IamRole_3B2773E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight tangent/Handler/IamRole",
            "uniqueId": "root_testinflighttangent_Handler_IamRole_3B2773E3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflighttangent_Handler_IamRolePolicy_5107E2E1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight tangent/Handler/IamRolePolicy",
            "uniqueId": "root_testinflighttangent_Handler_IamRolePolicy_5107E2E1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflighttangent_Handler_IamRole_3B2773E3.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflighttangent_Handler_IamRolePolicyAttachment_705DB180": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight tangent/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflighttangent_Handler_IamRolePolicyAttachment_705DB180"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflighttangent_Handler_IamRole_3B2773E3.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflighttangent_Handler_8C860B05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight tangent/Handler/Default",
            "uniqueId": "root_testinflighttangent_Handler_8C860B05"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8879d07",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8879d07",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflighttangent_Handler_IamRole_3B2773E3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflighttangent_Handler_S3Object_0687EE7F.key}",
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
      "root_testinflighttangent_Handler_S3Object_0687EE7F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight tangent/Handler/S3Object",
            "uniqueId": "root_testinflighttangent_Handler_S3Object_0687EE7F"
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
const math = require('@winglang/sdk').math;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $math_Util: ${context._lift(math.Util)},
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(-0) == -0")})(((math.Util.tan((-0))) === (-0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(0) == 0")})(((math.Util.tan(0)) === 0))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(1) == 1.5574077246549023")})(((math.Util.tan(1)) === 1.5574077246549023))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.tan(math.PI / 4) == 0.9999999999999999")})(((math.Util.tan((math.Util.PI / 4))) === 0.9999999999999999))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight tangent",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "tan", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

