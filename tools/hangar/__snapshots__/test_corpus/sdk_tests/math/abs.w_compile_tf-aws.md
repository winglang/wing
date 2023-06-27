# [abs.w](../../../../../../examples/tests/sdk_tests/math/abs.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ pi, minus_pi, math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.abs(pi) == 3.41")})(((await math_Util.abs(pi)) === 3.41))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.abs(minus_pi) == 3.41")})(((await math_Util.abs(minus_pi)) === 3.41))};
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
      "value": "[[\"root/Default/Default/test:inflight absolute\",\"${aws_lambda_function.root_testinflightabsolute_Handler_FB8DE1CC.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightabsolute_Handler_IamRole_C8454350": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight absolute/Handler/IamRole",
            "uniqueId": "root_testinflightabsolute_Handler_IamRole_C8454350"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightabsolute_Handler_IamRolePolicy_EC52C249": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight absolute/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightabsolute_Handler_IamRolePolicy_EC52C249"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightabsolute_Handler_IamRole_C8454350.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightabsolute_Handler_IamRolePolicyAttachment_E40F6DB6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight absolute/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightabsolute_Handler_IamRolePolicyAttachment_E40F6DB6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightabsolute_Handler_IamRole_C8454350.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightabsolute_Handler_FB8DE1CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight absolute/Handler/Default",
            "uniqueId": "root_testinflightabsolute_Handler_FB8DE1CC"
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
        "role": "${aws_iam_role.root_testinflightabsolute_Handler_IamRole_C8454350.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightabsolute_Handler_S3Object_2DAB12E7.key}",
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
      "root_testinflightabsolute_Handler_S3Object_2DAB12E7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight absolute/Handler/S3Object",
            "uniqueId": "root_testinflightabsolute_Handler_S3Object_2DAB12E7"
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const pi_client = context._lift(pi);
        const minus_pi_client = context._lift(minus_pi);
        const math_UtilClient = math.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            pi: ${pi_client},
            minus_pi: ${minus_pi_client},
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
          $Closure1._registerBindObject(minus_pi, host, []);
          $Closure1._registerBindObject(pi, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(minus_pi, host, []);
          $Closure1._registerBindObject(pi, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const pi = 3.41;
    const minus_pi = (-pi);
    {((cond) => {if (!cond) throw new Error("assertion failed: math.abs(pi) == 3.41")})(((math.Util.abs(pi)) === 3.41))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.abs(minus_pi) == 3.41")})(((math.Util.abs(minus_pi)) === 3.41))};
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

