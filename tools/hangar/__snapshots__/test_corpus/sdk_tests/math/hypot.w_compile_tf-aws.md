# [hypot.w](../../../../../../examples/tests/sdk_tests/math/hypot.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([3, 4]) == 5")})(((await $math_Util.hypot(Object.freeze([3, 4]))) === 5))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([5, 12]) == 13")})(((await $math_Util.hypot(Object.freeze([5, 12]))) === 13))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.hypot([3, 4, 5]), decimalPlaces: 2) == 7.07")})(((await $math_Util.round((await $math_Util.hypot(Object.freeze([3, 4, 5]))),{ decimalPlaces: 2 })) === 7.07))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([-5]) == 5")})(((await $math_Util.hypot(Object.freeze([(-5)]))) === 5))};
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
      "value": "[[\"root/Default/Default/test:inflight hypot\",\"${aws_lambda_function.root_testinflighthypot_Handler_D0ED3393.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflighthypot_Handler_IamRole_9DFB9267": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight hypot/Handler/IamRole",
            "uniqueId": "root_testinflighthypot_Handler_IamRole_9DFB9267"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflighthypot_Handler_IamRolePolicy_A98E0B1F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight hypot/Handler/IamRolePolicy",
            "uniqueId": "root_testinflighthypot_Handler_IamRolePolicy_A98E0B1F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflighthypot_Handler_IamRole_9DFB9267.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflighthypot_Handler_IamRolePolicyAttachment_85AA6FED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight hypot/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflighthypot_Handler_IamRolePolicyAttachment_85AA6FED"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflighthypot_Handler_IamRole_9DFB9267.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflighthypot_Handler_D0ED3393": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight hypot/Handler/Default",
            "uniqueId": "root_testinflighthypot_Handler_D0ED3393"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8289cd0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8289cd0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflighthypot_Handler_IamRole_9DFB9267.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflighthypot_Handler_S3Object_45B643BC.key}",
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
      "root_testinflighthypot_Handler_S3Object_45B643BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight hypot/Handler/S3Object",
            "uniqueId": "root_testinflighthypot_Handler_S3Object_45B643BC"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([3, 4]) == 5")})(((math.Util.hypot(Object.freeze([3, 4]))) === 5))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([5, 12]) == 13")})(((math.Util.hypot(Object.freeze([5, 12]))) === 13))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.round(math.hypot([3, 4, 5]), decimalPlaces: 2) == 7.07")})(((math.Util.round((math.Util.hypot(Object.freeze([3, 4, 5]))),{ decimalPlaces: 2 })) === 7.07))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.hypot([-5]) == 5")})(((math.Util.hypot(Object.freeze([(-5)]))) === 5))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight hypot",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "hypot", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

