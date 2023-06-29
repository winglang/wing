# [factorial.w](../../../../../../examples/tests/sdk_tests/math/factorial.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(0) == 1")})(((await math_Util.factorial(0)) === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(1) == 1")})(((await math_Util.factorial(1)) === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(2) == 2")})(((await math_Util.factorial(2)) === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(3) == 6")})(((await math_Util.factorial(3)) === 6))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(4) == 24")})(((await math_Util.factorial(4)) === 24))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(5) == 120")})(((await math_Util.factorial(5)) === 120))};
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
      "value": "[[\"root/Default/Default/test:inflight factorial\",\"${aws_lambda_function.root_testinflightfactorial_Handler_8BCF64D0.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightfactorial_Handler_IamRole_9D27D5FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight factorial/Handler/IamRole",
            "uniqueId": "root_testinflightfactorial_Handler_IamRole_9D27D5FF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightfactorial_Handler_IamRolePolicy_BED966C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight factorial/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightfactorial_Handler_IamRolePolicy_BED966C4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightfactorial_Handler_IamRole_9D27D5FF.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightfactorial_Handler_IamRolePolicyAttachment_6B41E48A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight factorial/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightfactorial_Handler_IamRolePolicyAttachment_6B41E48A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightfactorial_Handler_IamRole_9D27D5FF.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightfactorial_Handler_8BCF64D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight factorial/Handler/Default",
            "uniqueId": "root_testinflightfactorial_Handler_8BCF64D0"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c818ed07",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c818ed07",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightfactorial_Handler_IamRole_9D27D5FF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightfactorial_Handler_S3Object_645DEE08.key}",
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
      "root_testinflightfactorial_Handler_S3Object_645DEE08": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight factorial/Handler/S3Object",
            "uniqueId": "root_testinflightfactorial_Handler_S3Object_645DEE08"
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
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const math_UtilClient = math.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            math_Util: ${math_UtilClient.text},
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(0) == 1")})(((math.Util.factorial(0)) === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(1) == 1")})(((math.Util.factorial(1)) === 1))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(2) == 2")})(((math.Util.factorial(2)) === 2))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(3) == 6")})(((math.Util.factorial(3)) === 6))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(4) == 24")})(((math.Util.factorial(4)) === 24))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.factorial(5) == 120")})(((math.Util.factorial(5)) === 120))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight factorial",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "factorial", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

