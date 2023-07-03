# [prime.w](../../../../../../examples/tests/sdk_tests/math/prime.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(1) == false")})(((await $math_Util.isPrime(1)) === false))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(2) == true")})(((await $math_Util.isPrime(2)) === true))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(3) == true")})(((await $math_Util.isPrime(3)) === true))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(4) == false")})(((await $math_Util.isPrime(4)) === false))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(10) == false")})(((await $math_Util.isPrime(10)) === false))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(11) == true")})(((await $math_Util.isPrime(11)) === true))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(12) == false")})(((await $math_Util.isPrime(12)) === false))};
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
      "value": "[[\"root/Default/Default/test:inflight prime numbers\",\"${aws_lambda_function.root_testinflightprimenumbers_Handler_D84E45D0.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightprimenumbers_Handler_IamRole_239615E9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight prime numbers/Handler/IamRole",
            "uniqueId": "root_testinflightprimenumbers_Handler_IamRole_239615E9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightprimenumbers_Handler_IamRolePolicy_B1CFEADD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight prime numbers/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightprimenumbers_Handler_IamRolePolicy_B1CFEADD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightprimenumbers_Handler_IamRole_239615E9.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightprimenumbers_Handler_IamRolePolicyAttachment_41DBC244": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight prime numbers/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightprimenumbers_Handler_IamRolePolicyAttachment_41DBC244"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightprimenumbers_Handler_IamRole_239615E9.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightprimenumbers_Handler_D84E45D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight prime numbers/Handler/Default",
            "uniqueId": "root_testinflightprimenumbers_Handler_D84E45D0"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c80a9be6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c80a9be6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightprimenumbers_Handler_IamRole_239615E9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightprimenumbers_Handler_S3Object_CDE54AB3.key}",
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
      "root_testinflightprimenumbers_Handler_S3Object_CDE54AB3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight prime numbers/Handler/S3Object",
            "uniqueId": "root_testinflightprimenumbers_Handler_S3Object_CDE54AB3"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(1) == false")})(((math.Util.isPrime(1)) === false))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(2) == true")})(((math.Util.isPrime(2)) === true))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(3) == true")})(((math.Util.isPrime(3)) === true))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(4) == false")})(((math.Util.isPrime(4)) === false))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(10) == false")})(((math.Util.isPrime(10)) === false))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(11) == true")})(((math.Util.isPrime(11)) === true))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.isPrime(12) == false")})(((math.Util.isPrime(12)) === false))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight prime numbers",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "prime", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

