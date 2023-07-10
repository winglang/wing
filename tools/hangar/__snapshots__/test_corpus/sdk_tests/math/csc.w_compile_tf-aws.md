# [csc.w](../../../../../../examples/tests/sdk_tests/math/csc.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(-0) == -math.INF")})(((await $math_Util.csc((-0))) === (-$math_Util.INF)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(0) == math.INF")})(((await $math_Util.csc(0)) === $math_Util.INF))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(1) == 1.1883951057781212")})(((await $math_Util.csc(1)) === 1.1883951057781212))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(-5) == 1.0428352127714058")})(((await $math_Util.csc((-5))) === 1.0428352127714058))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.PI / 2) == 1")})(((await $math_Util.csc(($math_Util.PI / 2))) === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.TAU / 4) == 1")})(((await $math_Util.csc(($math_Util.TAU / 4))) === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.PI * 3 / 2) == -1")})(((await $math_Util.csc((($math_Util.PI * 3) / 2))) === (-1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.TAU * 3 / 4) == -1")})(((await $math_Util.csc((($math_Util.TAU * 3) / 4))) === (-1)))};
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
      "value": "[[\"root/Default/Default/test:inflight cosecant\",\"${aws_lambda_function.testinflightcosecant_Handler_0491DCB0.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightcosecant_Handler_IamRole_D7226B8F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cosecant/Handler/IamRole",
            "uniqueId": "testinflightcosecant_Handler_IamRole_D7226B8F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightcosecant_Handler_IamRolePolicy_09309D29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cosecant/Handler/IamRolePolicy",
            "uniqueId": "testinflightcosecant_Handler_IamRolePolicy_09309D29"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightcosecant_Handler_IamRole_D7226B8F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightcosecant_Handler_IamRolePolicyAttachment_79166A81": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cosecant/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightcosecant_Handler_IamRolePolicyAttachment_79166A81"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightcosecant_Handler_IamRole_D7226B8F.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightcosecant_Handler_0491DCB0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cosecant/Handler/Default",
            "uniqueId": "testinflightcosecant_Handler_0491DCB0"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8baaa0a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8baaa0a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightcosecant_Handler_IamRole_D7226B8F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightcosecant_Handler_S3Object_82EC6921.key}",
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
      "testinflightcosecant_Handler_S3Object_82EC6921": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight cosecant/Handler/S3Object",
            "uniqueId": "testinflightcosecant_Handler_S3Object_82EC6921"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(-0) == -math.INF")})(((math.Util.csc((-0))) === (-math.Util.INF)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(0) == math.INF")})(((math.Util.csc(0)) === math.Util.INF))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(1) == 1.1883951057781212")})(((math.Util.csc(1)) === 1.1883951057781212))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(-5) == 1.0428352127714058")})(((math.Util.csc((-5))) === 1.0428352127714058))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.PI / 2) == 1")})(((math.Util.csc((math.Util.PI / 2))) === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.TAU / 4) == 1")})(((math.Util.csc((math.Util.TAU / 4))) === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.PI * 3 / 2) == -1")})(((math.Util.csc(((math.Util.PI * 3) / 2))) === (-1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.csc(math.TAU * 3 / 4) == -1")})(((math.Util.csc(((math.Util.TAU * 3) / 4))) === (-1)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight cosecant",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "csc", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

