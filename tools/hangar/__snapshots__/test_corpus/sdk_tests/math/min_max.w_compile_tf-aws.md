# [min_max.w](../../../../../../examples/tests/sdk_tests/math/min_max.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util, $myArray }) {
  class $Closure1 {
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.min(myArray) == 1")})(((await $math_Util.min($myArray)) === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.max(myArray) == 5")})(((await $math_Util.max($myArray)) === 5))};
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
      "value": "[[\"root/Default/Default/test:inflight min--max\",\"${aws_lambda_function.root_testinflightminmax_Handler_79DF9911.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightminmax_Handler_IamRole_20604403": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight min--max/Handler/IamRole",
            "uniqueId": "root_testinflightminmax_Handler_IamRole_20604403"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightminmax_Handler_IamRolePolicy_5A201378": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight min--max/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightminmax_Handler_IamRolePolicy_5A201378"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightminmax_Handler_IamRole_20604403.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightminmax_Handler_IamRolePolicyAttachment_167D5323": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight min--max/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightminmax_Handler_IamRolePolicyAttachment_167D5323"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightminmax_Handler_IamRole_20604403.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightminmax_Handler_79DF9911": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight min--max/Handler/Default",
            "uniqueId": "root_testinflightminmax_Handler_79DF9911"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c88f3f4b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88f3f4b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightminmax_Handler_IamRole_20604403.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightminmax_Handler_S3Object_B973747E.key}",
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
      "root_testinflightminmax_Handler_S3Object_B973747E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight min--max/Handler/S3Object",
            "uniqueId": "root_testinflightminmax_Handler_S3Object_B973747E"
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
            $myArray: ${context._lift(myArray)},
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
          $Closure1._registerBindObject(myArray, host, []);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        super._registerTypeBind(host, ops);
      }
    }
    const myArray = Object.freeze([1, 2, 3, 4, 5]);
    {((cond) => {if (!cond) throw new Error("assertion failed: math.min(myArray) == 1")})(((math.Util.min(myArray)) === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.max(myArray) == 5")})(((math.Util.max(myArray)) === 5))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight min/max",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "min_max", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

