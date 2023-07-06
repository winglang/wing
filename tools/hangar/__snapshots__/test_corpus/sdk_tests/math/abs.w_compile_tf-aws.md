# [abs.w](../../../../../../examples/tests/sdk_tests/math/abs.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util, $x, $y }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.abs(x - y) == 2")})(((await $math_Util.abs(($x - $y))) === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.abs(y - x) == 2")})(((await $math_Util.abs(($y - $x))) === 2))};
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
      "value": "[[\"root/Default/Default/test:inflight absolute\",\"${aws_lambda_function.testinflightabsolute_Handler_DB051761.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightabsolute_Handler_IamRole_73FC0806": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight absolute/Handler/IamRole",
            "uniqueId": "testinflightabsolute_Handler_IamRole_73FC0806"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightabsolute_Handler_IamRolePolicy_6FD74632": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight absolute/Handler/IamRolePolicy",
            "uniqueId": "testinflightabsolute_Handler_IamRolePolicy_6FD74632"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightabsolute_Handler_IamRole_73FC0806.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightabsolute_Handler_IamRolePolicyAttachment_C2286158": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight absolute/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightabsolute_Handler_IamRolePolicyAttachment_C2286158"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightabsolute_Handler_IamRole_73FC0806.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightabsolute_Handler_DB051761": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight absolute/Handler/Default",
            "uniqueId": "testinflightabsolute_Handler_DB051761"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c84ad0c4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c84ad0c4",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightabsolute_Handler_IamRole_73FC0806.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightabsolute_Handler_S3Object_B9AB2D8D.key}",
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
      "testinflightabsolute_Handler_S3Object_B9AB2D8D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight absolute/Handler/S3Object",
            "uniqueId": "testinflightabsolute_Handler_S3Object_B9AB2D8D"
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
            $x: ${context._lift(x)},
            $y: ${context._lift(y)},
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
          $Closure1._registerBindObject(x, host, []);
          $Closure1._registerBindObject(y, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const x = 3;
    const y = 5;
    {((cond) => {if (!cond) throw new Error("assertion failed: math.abs(y - x) == 2")})(((math.Util.abs((y - x))) === 2))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.abs(x - y) == 2")})(((math.Util.abs((x - y))) === 2))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight absolute",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "abs", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

